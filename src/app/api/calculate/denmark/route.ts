import { NextRequest, NextResponse } from "next/server";

interface DenmarkCalculateRequest {
  grossIncome: number;
  frequency: "year" | "month";
  municipalityTaxRate: number;
  churchTax: boolean;
  pensionType: "default" | "amount" | "percentage";
  pensionValue: number;
}

const TAX_BRACKETS_2026 = {
  middleTaxThreshold: 696956,
  topTaxThreshold: 845543,
  topTopTaxThreshold: 2818152,
};

function normalizeToAnnual(amount: number, frequency: "year" | "month"): number {
  return frequency === "month" ? amount * 12 : amount;
}

function calculateDanishTax(annualGross: number, pensionType: string, pensionValue: number): {
  pension: number;
  bottomTax: number;
  middleTax: number;
  topTax: number;
  topTopTax: number;
  municipalTax: number;
  labourMarketTax: number;
  churchTax: number;
  total: number;
} {
  let annualPension = 0;
  
  if (pensionType === "default") {
    annualPension = 99 * 12;
  } else if (pensionType === "amount") {
    annualPension = pensionValue;
  } else if (pensionType === "percentage") {
    annualPension = annualGross * (pensionValue / 100);
  }

  const personalIncome = Math.max(0, annualGross - annualPension);

  const bottomTax = personalIncome * 0.1201;

  let middleTax = 0;
  if (personalIncome > TAX_BRACKETS_2026.middleTaxThreshold) {
    middleTax = (personalIncome - TAX_BRACKETS_2026.middleTaxThreshold) * 0.075;
  }

  let topTax = 0;
  if (personalIncome > TAX_BRACKETS_2026.topTaxThreshold) {
    topTax = (personalIncome - TAX_BRACKETS_2026.topTaxThreshold) * 0.075;
  }

  let topTopTax = 0;
  if (personalIncome > TAX_BRACKETS_2026.topTopTaxThreshold) {
    topTopTax = (personalIncome - TAX_BRACKETS_2026.topTopTaxThreshold) * 0.05;
  }

  const municipalTax = personalIncome * 0.25049;
  const labourMarketTax = personalIncome * 0.08;
  const churchTax = personalIncome * 0.0064;

  const total = bottomTax + middleTax + topTax + topTopTax + municipalTax + labourMarketTax + churchTax;

  return {
    pension: annualPension,
    bottomTax: Math.round(bottomTax * 100) / 100,
    middleTax: Math.round(middleTax * 100) / 100,
    topTax: Math.round(topTax * 100) / 100,
    topTopTax: Math.round(topTopTax * 100) / 100,
    municipalTax: Math.round(municipalTax * 100) / 100,
    labourMarketTax: Math.round(labourMarketTax * 100) / 100,
    churchTax: Math.round(churchTax * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: DenmarkCalculateRequest = await request.json();

    const { grossIncome, frequency, municipalityTaxRate, churchTax, pensionType, pensionValue } = body;

    const annualGross = normalizeToAnnual(grossIncome, frequency);

    const taxResult = calculateDanishTax(
      annualGross,
      pensionType,
      pensionValue
    );

    const churchTaxAmount = churchTax ? taxResult.churchTax : 0;
    const totalTax = churchTax 
      ? taxResult.total 
      : taxResult.total - taxResult.churchTax;
    const netAnnual = annualGross - totalTax;

    const response = {
      breakdown: {
        grossSalary: annualGross,
        totalGross: annualGross,
        pensionContribution: taxResult.pension,
      },
      deductions: {
        bottomTax: taxResult.bottomTax,
        middleTax: taxResult.middleTax,
        topTax: taxResult.topTax,
        topTopTax: taxResult.topTopTax,
        municipalTax: Math.round((taxResult.municipalTax * (municipalityTaxRate / 25.049)) * 100) / 100,
        labourMarketTax: taxResult.labourMarketTax,
        churchTax: churchTaxAmount,
        total: Math.round(totalTax * 100) / 100,
      },
      netIncome: {
        annual: Math.round(netAnnual * 100) / 100,
        monthly: Math.round((netAnnual / 12) * 100) / 100,
      },
      taxYear: "2026",
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to calculate Danish tax" },
      { status: 500 }
    );
  }
}
