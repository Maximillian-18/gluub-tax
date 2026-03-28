import { NextRequest, NextResponse } from "next/server";
import { TAX_BRACKETS } from "../../../calculator/denmark/data/taxBrackets";

interface DenmarkCalculateRequest {
  grossIncome: number;
  frequency: "year" | "month";
  municipalityTaxRate: number;
  churchTax: boolean;
  personalAllowance: boolean;
  taxYear: string;
  pensionType: "default" | "amount" | "percentage";
  pensionValue: number;
  personalPensionType: "amount" | "percentage";
  personalPensionValue: number;
}

function normalizeToAnnual(amount: number, frequency: "year" | "month"): number {
  return frequency === "month" ? amount * 12 : amount;
}

function calculateDanishTax(annualGross: number, pensionType: string, pensionValue: number, personalPensionType: string, personalPensionValue: number, personalAllowance: boolean, taxYear: string, municipalityTaxRate: number): {
  pension: number;
  personalPension: number;
  grossAfterPension: number;
  personalAllowanceAmount: number;
  taxableIncome: number;
  bottomTax: number;
  middleTax: number;
  topTax: number;
  topTopTax: number;
  municipalTax: number;
  labourMarketTax: number;
  churchTax: number;
  total: number;
} {
  const year = (taxYear === "2025" ? "2025" : "2026") as "2025" | "2026";
  const taxBrackets = TAX_BRACKETS[year];
  const personalAllowanceAmount = personalAllowance ? taxBrackets.personalAllowance : 0;
  
  let annualPension = 0;
  
  if (pensionType === "default") {
    annualPension = 99 * 12;
  } else if (pensionType === "amount") {
    annualPension = pensionValue * 12;
  } else if (pensionType === "percentage") {
    annualPension = annualGross * (pensionValue / 100);
  }

  let personalPension = 0;
  if (personalPensionType === "amount") {
    personalPension = personalPensionValue * 12;
  } else if (personalPensionType === "percentage") {
    personalPension = annualGross * (personalPensionValue / 100);
  }

  const grossAfterPension = Math.max(0, annualGross - annualPension - personalPension);
  const taxableIncome = Math.max(0, grossAfterPension - personalAllowanceAmount);
  
  const incomeAfterAM = annualGross * 0.92;

  const bottomTax = taxableIncome * 0.1201;

  let middleTax = 0;
  if (incomeAfterAM > taxBrackets.middleTaxThreshold) {
    middleTax = (incomeAfterAM - taxBrackets.middleTaxThreshold) * 0.075;
  }

  let topTax = 0;
  if (incomeAfterAM > taxBrackets.topTaxThreshold) {
    topTax = (incomeAfterAM - taxBrackets.topTaxThreshold) * 0.075;
  }

  let topTopTax = 0;
  if (incomeAfterAM > taxBrackets.topTopTaxThreshold) {
    topTopTax = (incomeAfterAM - taxBrackets.topTopTaxThreshold) * 0.05;
  }

  const municipalTax = taxableIncome * (municipalityTaxRate / 100);
  const labourMarketTax = annualGross * 0.08;
  const churchTax = taxableIncome * 0.0064;

  const total = bottomTax + middleTax + topTax + topTopTax + municipalTax + labourMarketTax + churchTax;

  return {
    pension: annualPension,
    personalPension,
    grossAfterPension,
    personalAllowanceAmount,
    taxableIncome,
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

    const { grossIncome, frequency, municipalityTaxRate, churchTax, personalAllowance, taxYear, pensionType, pensionValue, personalPensionType, personalPensionValue } = body;

    const annualGross = normalizeToAnnual(grossIncome, frequency);

    const taxResult = calculateDanishTax(
      annualGross,
      pensionType,
      pensionValue,
      personalPensionType,
      personalPensionValue,
      personalAllowance,
      taxYear,
      municipalityTaxRate
    );

    const churchTaxAmount = churchTax ? taxResult.churchTax : 0;
    const totalTax = churchTax 
      ? taxResult.total 
      : taxResult.total - taxResult.churchTax;
    const netAnnual = taxResult.grossAfterPension - totalTax;

    const response = {
      breakdown: {
        grossSalary: annualGross,
        totalGross: taxResult.grossAfterPension,
        pensionContribution: taxResult.pension,
        personalPensionContribution: taxResult.personalPension,
        personalAllowance: taxResult.personalAllowanceAmount,
        taxableIncome: taxResult.taxableIncome,
      },
      deductions: {
        bottomTax: taxResult.bottomTax,
        middleTax: taxResult.middleTax,
        topTax: taxResult.topTax,
        topTopTax: taxResult.topTopTax,
        municipalTax: taxResult.municipalTax,
        labourMarketTax: taxResult.labourMarketTax,
        churchTax: churchTaxAmount,
        total: Math.round(totalTax * 100) / 100,
      },
      netIncome: {
        annual: Math.round(netAnnual * 100) / 100,
        monthly: Math.round((netAnnual / 12) * 100) / 100,
        weekly: Math.round((netAnnual / 52) * 100) / 100,
      },
      taxYear: taxYear,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to calculate Danish tax" },
      { status: 500 }
    );
  }
}
