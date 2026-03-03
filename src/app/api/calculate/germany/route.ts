import { NextRequest, NextResponse } from "next/server";
import { PERSONAL_ALLOWANCE, CHURCH_TAX_RATES, SOCIAL_INSURANCE_RATES } from "../../../calculator/germany/data/taxRates";

interface GermanyCalculateRequest {
  grossIncome: number;
  frequency: "year" | "month";
  taxCategory: "1" | "2" | "3" | "4" | "5" | "6";
  churchTax: boolean;
  hasChildren: "yes" | "no";
  healthInsurance: "statutory" | "private" | "none";
  pensionInsurance: "statutory" | "private" | "none";
  unemploymentInsurance: "statutory" | "private" | "none";
  healthInsuranceSupplementary: number;
  state?: string;
  taxYear?: string;
}

function calculateSocialInsurance(
  annualGross: number,
  healthInsurance: "statutory" | "private" | "none",
  pensionInsurance: "statutory" | "private" | "none",
  unemploymentInsurance: "statutory" | "private" | "none",
  healthInsuranceSupplementary: number,
  hasChildren: "yes" | "no"
) {
  const healthBase = healthInsurance === "statutory" 
    ? Math.min(annualGross, SOCIAL_INSURANCE_RATES.health.ceiling) * (SOCIAL_INSURANCE_RATES.health.rate / 100)
    : 0;
  
  const healthSupplementary = healthInsurance === "statutory"
    ? Math.min(annualGross, SOCIAL_INSURANCE_RATES.health.ceiling) * ((healthInsuranceSupplementary / 2) / 100)
    : 0;
  
  const pension = pensionInsurance === "statutory"
    ? Math.min(annualGross, SOCIAL_INSURANCE_RATES.pension.ceiling) * (SOCIAL_INSURANCE_RATES.pension.rate / 100)
    : 0;
  
  const unemployment = unemploymentInsurance === "statutory"
    ? Math.min(annualGross, SOCIAL_INSURANCE_RATES.unemployment.ceiling) * (SOCIAL_INSURANCE_RATES.unemployment.rate / 100)
    : 0;

  const nursingCareRate = SOCIAL_INSURANCE_RATES.nursingCare.rate + (hasChildren === "no" ? 0.6 : 0);
  const nursingCare = healthInsurance === "statutory"
    ? Math.min(annualGross, SOCIAL_INSURANCE_RATES.nursingCare.ceiling) * (nursingCareRate / 100)
    : 0;

  return {
    healthInsurance: Math.round((healthBase + healthSupplementary) * 100) / 100,
    pensionInsurance: Math.round(pension * 100) / 100,
    unemploymentInsurance: Math.round(unemployment * 100) / 100,
    nursingCareInsurance: Math.round(nursingCare * 100) / 100,
    employeeShareForTax: 0,
  };
}

function normalizeToAnnual(amount: number, frequency: "year" | "month"): number {
  return frequency === "month" ? amount * 12 : amount;
}

function calculateGermanTax(annualIncome: number, personalAllowance: number): { incomeTax: number; taxableIncome: number } {
  const taxableIncome = Math.max(0, annualIncome - personalAllowance);
  
  if (taxableIncome <= 0) {
    return { incomeTax: 0, taxableIncome: 0 };
  }
  
  const y = (taxableIncome - 12348) / 10000;
  const z = (taxableIncome - 17799) / 10000;
  
  let incomeTax: number;
  if (taxableIncome <= 17799) {
    incomeTax = (914.51 * y + 1400) * y;
  } else if (taxableIncome <= 66760) {
    incomeTax = (181.19 * z + 2397) * z + 1025.38;
  } else if (taxableIncome <= 277825) {
    incomeTax = 0.42 * taxableIncome - 10602.13;
  } else {
    incomeTax = 0.45 * taxableIncome - 18936.88;
  }
  
  return {
    incomeTax: Math.round(incomeTax * 100) / 100,
    taxableIncome: Math.round(taxableIncome * 100) / 100,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: GermanyCalculateRequest = await request.json();
    const {
      grossIncome,
      frequency,
      taxCategory,
      churchTax,
      hasChildren,
      healthInsurance,
      pensionInsurance,
      unemploymentInsurance,
      healthInsuranceSupplementary,
      state,
      taxYear,
    } = body;

    const annualGross = normalizeToAnnual(grossIncome, frequency);
    const year = (taxYear === "2025" ? "2025" : "2026") as "2025" | "2026";
    const personalAllowance = PERSONAL_ALLOWANCE[year];

    const socialInsurance = calculateSocialInsurance(
      annualGross,
      healthInsurance,
      pensionInsurance,
      unemploymentInsurance,
      healthInsuranceSupplementary,
      hasChildren
    );

    const taxableGross = Math.max(0, annualGross - socialInsurance.pensionInsurance - socialInsurance.unemploymentInsurance);

    let personalAllowanceAdjusted = personalAllowance;
    if (taxCategory === "2" || taxCategory === "3") {
      personalAllowanceAdjusted *= 2;
    } else if (taxCategory === "4") {
      personalAllowanceAdjusted *= 2;
    }

    if (hasChildren === "yes") {
      personalAllowanceAdjusted += 8980;
    }

    const taxResult = calculateGermanTax(taxableGross, personalAllowanceAdjusted);
    let incomeTax = taxResult.incomeTax;

    let churchTaxAmount = 0;
    if (churchTax && state && CHURCH_TAX_RATES[state]) {
      churchTaxAmount = incomeTax * (CHURCH_TAX_RATES[state] / 100);
    }

    const totalDeductions =
      incomeTax +
      (incomeTax > 18130 ? incomeTax * 0.055 : 0) +
      churchTaxAmount +
      socialInsurance.healthInsurance +
      socialInsurance.pensionInsurance +
      socialInsurance.unemploymentInsurance +
      socialInsurance.nursingCareInsurance;

    const netAnnual = annualGross - totalDeductions;

    return NextResponse.json({
      breakdown: {
        grossSalary: annualGross,
        totalGross: annualGross,
        personalAllowance: personalAllowanceAdjusted,
        taxableIncome: taxResult.taxableIncome,
      },
      deductions: {
        incomeTax: Math.round(incomeTax * 100) / 100,
        solidaritySurcharge: Math.round((incomeTax > 18130 ? incomeTax * 0.055 : 0) * 100) / 100,
        churchTax: Math.round(churchTaxAmount * 100) / 100,
        healthInsurance: socialInsurance.healthInsurance,
        nursingCareInsurance: socialInsurance.nursingCareInsurance,
        pensionInsurance: socialInsurance.pensionInsurance,
        unemploymentInsurance: socialInsurance.unemploymentInsurance,
        total: Math.round(totalDeductions * 100) / 100,
      },
      netIncome: {
        annual: Math.round(netAnnual * 100) / 100,
        monthly: Math.round((netAnnual / 12) * 100) / 100,
      },
    });
  } catch (error) {
    console.error("Error calculating Germany tax:", error);
    return NextResponse.json(
      { error: "Failed to calculate tax" },
      { status: 500 }
    );
  }
}
