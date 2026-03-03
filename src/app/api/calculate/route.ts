import { NextRequest, NextResponse } from "next/server";
import { TAX_BANDS_ENGLAND_2025, TAX_BANDS_SCOTLAND_2025, TaxBand } from "../../calculator/uk/data/taxBands";
import { NI_BANDS_2025 } from "../../calculator/uk/data/niBands";
import { STUDENT_LOAN_THRESHOLDS } from "../../calculator/uk/data/studentLoan";

interface CalculateRequest {
  grossIncome: number;
  frequency: "year" | "month" | "week";
  bonus: number;
  overtime: number;
  pension: { type: "percentage" | "amount"; value: number };
  region: "england" | "scotland" | "wales" | "northern-ireland";
  taxYear: "2025-2026" | "2024-2025";
  taxCode: string;
  studentLoan: "none" | "plan1" | "plan2" | "plan4" | "postgrad";
  blindAllowance: boolean;
  marriageAllowance: boolean;
  excludeNI: boolean;
  customAllowances: { name: string; amount: number }[];
}

function normalizeToAnnual(amount: number, frequency: "year" | "month" | "week"): number {
  switch (frequency) {
    case "year":
      return amount;
    case "month":
      return amount * 12;
    case "week":
      return amount * 52;
  }
}

function parseTaxCode(taxCode: string): number {
  const code = taxCode.toUpperCase().replace(/\s/g, "");
  
  if (code === "NT" || code === "0T") {
    return 0;
  }

  if (code.startsWith("K")) {
    const numericPart = code.slice(1);
    const kAmount = parseInt(numericPart) * 10;
    return Math.max(0, 12570 - kAmount);
  }

  if (code.endsWith("L") || code.endsWith("M") || code.endsWith("N")) {
    const numericPart = code.slice(0, -1);
    const allowance = parseInt(numericPart) * 10;
    return allowance || 12570;
  }

  const numericPart = code.replace(/[A-Z]/g, "");
  if (numericPart) {
    return parseInt(numericPart) * 10 || 12570;
  }

  return 12570;
}

function calculateTaxOnBand(taxableIncome: number, bands: TaxBand[]): number {
  let tax = 0;
  let incomeRemaining = taxableIncome;

  for (let i = 1; i < bands.length; i++) {
    if (incomeRemaining <= 0) break;

    const band = bands[i];
    const bandMin = band.min;
    const bandMax = band.max ?? Infinity;
    const bandRate = band.rate;

    const bandStart = bandMin;
    const bandEnd = bandMax;
    const bandSize = bandEnd - bandStart;

    const incomeInBand = Math.min(incomeRemaining, bandSize);

    if (incomeInBand > 0 && bandRate > 0) {
      tax += incomeInBand * (bandRate / 100);
    }

    incomeRemaining -= incomeInBand;
  }

  return tax;
}

function calculateNI(annualIncome: number): number {
  let ni = 0;
  let cumulativeIncome = 0;

  for (const band of NI_BANDS_2025) {
    if (annualIncome <= band.min) break;

    const bandMax = band.max ?? Infinity;
    const bandRate = band.rate;

    const incomeAtBandStart = Math.max(cumulativeIncome, band.min);
    const incomeAtBandEnd = Math.min(annualIncome, bandMax);

    if (incomeAtBandEnd > incomeAtBandStart && bandRate > 0) {
      const incomeInBand = incomeAtBandEnd - incomeAtBandStart;
      ni += incomeInBand * (bandRate / 100);
    }

    cumulativeIncome = bandMax;
  }

  return ni;
}

function calculateStudentLoan(annualIncome: number, plan: string): number {
  if (plan === "none") return 0;

  const threshold = STUDENT_LOAN_THRESHOLDS[plan as keyof typeof STUDENT_LOAN_THRESHOLDS] || 0;
  const rate = plan === "postgrad" ? 6 : 9;

  if (annualIncome <= threshold) return 0;

  const taxableAmount = annualIncome - threshold;
  return (taxableAmount * rate) / 100;
}

export async function POST(request: NextRequest) {
  try {
    const body: CalculateRequest = await request.json();

    const {
      grossIncome,
      frequency,
      bonus = 0,
      overtime = 0,
      pension,
      region,
      taxYear,
      taxCode,
      studentLoan,
      blindAllowance,
      marriageAllowance,
      excludeNI,
      customAllowances = [],
    } = body;

    let annualGross = normalizeToAnnual(grossIncome, frequency);
    const annualBonus = bonus;
    const annualOvertime = overtime;

    const totalGross = annualGross + annualBonus + annualOvertime;

    let pensionDeduction = 0;
    if (pension.type === "percentage") {
      pensionDeduction = annualGross * (pension.value / 100);
    } else {
      pensionDeduction = pension.value * 12;
    }

    const totalPension = pensionDeduction;

    let taxFreeAllowance = parseTaxCode(taxCode);

    if (totalGross > 100000) {
      const withdrawal = Math.floor((totalGross - 100000) / 2);
      taxFreeAllowance = Math.max(0, taxFreeAllowance - withdrawal);
    }

    if (blindAllowance) {
      taxFreeAllowance += 3100;
    }

    if (marriageAllowance) {
      taxFreeAllowance += 1310;
    }

    const customAllowancesTotal = customAllowances.reduce(
      (sum: number, item: { amount: number }) => sum + item.amount,
      0
    );

    const totalAllowances = taxFreeAllowance + customAllowancesTotal;

    const taxableIncome = Math.max(0, totalGross - totalPension - totalAllowances);

    const bands =
      region === "scotland" ? TAX_BANDS_SCOTLAND_2025 : TAX_BANDS_ENGLAND_2025;

    const annualIncomeTax = calculateTaxOnBand(taxableIncome, bands);

    const annualNI = excludeNI ? 0 : calculateNI(annualGross);

    const annualStudentLoan = calculateStudentLoan(totalGross, studentLoan);

    const totalDeductions =
      annualIncomeTax + annualNI + annualStudentLoan + totalPension;

    const netAnnual = totalGross - totalDeductions;

    const bonusTax = calculateTaxOnBand(
      Math.max(0, bonus - Math.min(bonus, 500)),
      bands
    );
    const bonusNI = excludeNI ? 0 : calculateNI(bonus) - calculateNI(0);

    const response = {
      breakdown: {
        grossSalary: annualGross,
        bonus: annualBonus,
        overtime: annualOvertime,
        totalGross: totalGross,
        pensionDeduction: totalPension,
        customAllowances: customAllowancesTotal,
        taxFreeAllowance: totalAllowances,
        taxableIncome: taxableIncome,
      },
      deductions: {
        incomeTax: Math.round(annualIncomeTax * 100) / 100,
        nationalInsurance: Math.round(annualNI * 100) / 100,
        studentLoan: Math.round(annualStudentLoan * 100) / 100,
        pension: Math.round(totalPension * 100) / 100,
        total: Math.round(totalDeductions * 100) / 100,
      },
      netIncome: {
        annual: Math.round(netAnnual * 100) / 100,
        monthly: Math.round((netAnnual / 12) * 100) / 100,
        weekly: Math.round((netAnnual / 52) * 100) / 100,
      },
      bonusBreakdown: {
        grossBonus: annualBonus,
        tax: Math.round(bonusTax * 100) / 100,
        nationalInsurance: Math.round(Math.max(0, (annualBonus / 100) * calculateNI(annualBonus + annualGross) - calculateNI(annualGross)) * 100) / 100,
        net: Math.round((annualBonus - bonusTax) * 100) / 100,
      },
      region,
      taxYear,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to calculate tax" },
      { status: 500 }
    );
  }
}
