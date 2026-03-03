import { NextRequest, NextResponse } from "next/server";
import { FEDERAL_BRACKETS_2025, FEDERAL_BRACKETS_2026, TaxBracket } from "../../../calculator/usa/data/federalBrackets";
import { STANDARD_DEDUCTIONS_2025, STANDARD_DEDUCTIONS_2026 } from "../../../calculator/usa/data/standardDeductions";
import { STATE_TAX_RATES } from "../../../calculator/usa/data/stateTaxRates";
import { STATE_BRACKETS } from "../../../calculator/usa/data/stateBrackets";

interface CalculateUSARequest {
  grossIncome: number;
  frequency: "year" | "month" | "week";
  taxYear: "2025" | "2026";
  filingStatus: "single" | "married_jointly" | "married_separately" | "head_of_household";
  state: string;
  contribution401k: number;
  contributionIRA: number;
  studentLoanInterest: number;
  localTaxRate: number;
  deductionType: "standard" | "itemized";
  itemizedDeductions: { type: string; amount: number }[];
}

interface FilingStatusBracket {
  single: TaxBracket[];
  married_jointly: TaxBracket[];
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

function calculateProgressiveTax(taxableIncome: number, brackets: TaxBracket[]): number {
  let tax = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;

    const bracketSize = bracket.max !== null ? bracket.max - bracket.min : Infinity;
    const incomeInBracket = Math.min(remainingIncome, bracketSize);

    tax += (incomeInBracket * bracket.rate) / 100;
    remainingIncome -= incomeInBracket;
  }

  return tax;
}

function calculateFICA(grossIncome: number, taxYear: "2025" | "2026"): {
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  total: number;
} {
  const ssWageBase2025 = 168600;
  const ssWageBase2026 = 176100;
  const ssWageBase = taxYear === "2025" ? ssWageBase2025 : ssWageBase2026;
  const ssRate = 0.062;
  const medicareRate = 0.0145;
  const additionalMedicareRate = 0.009;
  const additionalMedicareThreshold = 200000;

  const socialSecurity = Math.min(grossIncome, ssWageBase) * ssRate;
  const medicare = grossIncome * medicareRate;
  const additionalMedicare = grossIncome > additionalMedicareThreshold
    ? (grossIncome - additionalMedicareThreshold) * additionalMedicareRate
    : 0;

  return {
    socialSecurity,
    medicare,
    additionalMedicare,
    total: socialSecurity + medicare + additionalMedicare,
  };
}

function calculateStateTax(taxableIncome: number, state: string, filingStatus: string): { tax: number; marginalRate: number } {
  const stateInfo = STATE_TAX_RATES[state];
  if (!stateInfo || stateInfo.rate === 0) return { tax: 0, marginalRate: 0 };

  if (stateInfo.type === "flat") {
    return { tax: (taxableIncome * stateInfo.rate) / 100, marginalRate: stateInfo.rate };
  }

  const stateBrackets = STATE_BRACKETS[state];
  if (!stateBrackets) {
    return { tax: (taxableIncome * stateInfo.rate) / 100, marginalRate: stateInfo.rate };
  }

  const brackets = filingStatus === "married_jointly"
    ? stateBrackets.married_jointly
    : stateBrackets.single;

  const tax = calculateProgressiveTax(taxableIncome, brackets);
  
  const marginalRate = brackets.find(bracket => {
    if (bracket.max === null) return taxableIncome >= bracket.min;
    return taxableIncome <= bracket.max;
  })?.rate || stateInfo.rate;

  return { tax, marginalRate };
}

export async function POST(request: NextRequest) {
  try {
    const body: CalculateUSARequest = await request.json();
    const {
      grossIncome,
      frequency,
      taxYear,
      filingStatus,
      state,
      contribution401k,
      contributionIRA,
      studentLoanInterest,
      localTaxRate,
      deductionType,
      itemizedDeductions,
    } = body;

    const annualGross = normalizeToAnnual(grossIncome, frequency);

    const maxStudentLoan = 2500;
    const deductibleStudentLoan = Math.min(studentLoanInterest, maxStudentLoan);

    const aboveTheLineDeductions = contribution401k + contributionIRA + deductibleStudentLoan;
    const agi = annualGross - aboveTheLineDeductions;

    const standardDeductions = taxYear === "2025" ? STANDARD_DEDUCTIONS_2025 : STANDARD_DEDUCTIONS_2026;
    const standardDeduction = standardDeductions[filingStatus];

    let itemizedTotal = 0;
    const itemizedBreakdown: Record<string, number> = {
      mortgage: 0,
      charity: 0,
      state_tax: 0,
      property_tax: 0,
      medical: 0,
    };

    if (deductionType === "itemized" && itemizedDeductions) {
      for (const ded of itemizedDeductions) {
        let amount = ded.amount || 0;
        
        if (ded.type === "state_tax") {
          amount = Math.min(amount, 10000);
        } else if (ded.type === "property_tax") {
          amount = Math.min(amount, 10000);
        } else if (ded.type === "medical") {
          const medicalThreshold = agi * 0.075;
          amount = Math.max(0, amount - medicalThreshold);
        }
        
        itemizedBreakdown[ded.type] = (itemizedBreakdown[ded.type] || 0) + amount;
        itemizedTotal += amount;
      }
    }

    const usedDeduction = deductionType === "itemized" && itemizedTotal > standardDeduction
      ? itemizedTotal
      : standardDeduction;
    
    const deductionMethod = deductionType === "itemized" && itemizedTotal > standardDeduction
      ? "itemized"
      : "standard";

    const taxableIncome = Math.max(0, agi - usedDeduction);

    const federalBrackets = taxYear === "2025" ? FEDERAL_BRACKETS_2025 : FEDERAL_BRACKETS_2026;
    const federalTax = calculateProgressiveTax(taxableIncome, federalBrackets);

    const fica = calculateFICA(annualGross, taxYear);

    const stateTaxResult = calculateStateTax(taxableIncome, state, filingStatus);
    const stateTax = stateTaxResult.tax;
    const stateMarginalRate = stateTaxResult.marginalRate;
    const localTax = (taxableIncome * localTaxRate) / 100;

    const totalTax = federalTax + fica.total + stateTax + localTax;
    const netIncome = annualGross - totalTax;

    const marginalRate = federalBrackets.find(bracket => {
      if (bracket.max === null) return taxableIncome >= bracket.min;
      return taxableIncome <= bracket.max;
    })?.rate || 37;

    const effectiveRate = annualGross > 0 ? (federalTax / annualGross) * 100 : 0;

    return NextResponse.json({
      breakdown: {
        grossIncome: annualGross,
        aboveTheLineDeductions: {
          contribution401k,
          contributionIRA,
          studentLoanInterest: deductibleStudentLoan,
          total: aboveTheLineDeductions,
        },
        agi,
        deduction: {
          type: deductionMethod,
          amount: usedDeduction,
          standardAmount: standardDeduction,
          itemizedAmount: itemizedTotal,
          breakdown: deductionType === "itemized" ? itemizedBreakdown : null,
        },
        taxableIncome,
      },
      taxes: {
        federal: {
          amount: federalTax,
          marginalRate,
          effectiveRate,
        },
        fica: {
          socialSecurity: fica.socialSecurity,
          medicare: fica.medicare,
          additionalMedicare: fica.additionalMedicare,
          total: fica.total,
        },
        state: {
          amount: stateTax,
          state,
          marginalRate: stateMarginalRate,
        },
        local: {
          amount: localTax,
          rate: localTaxRate,
        },
        total: totalTax,
      },
      netIncome: {
        annual: netIncome,
        monthly: netIncome / 12,
        weekly: netIncome / 52,
      },
    });
  } catch (error) {
    console.error("Error calculating USA tax:", error);
    return NextResponse.json(
      { error: "Failed to calculate tax" },
      { status: 500 }
    );
  }
}
