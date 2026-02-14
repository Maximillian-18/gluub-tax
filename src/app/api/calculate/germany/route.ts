import { NextRequest, NextResponse } from "next/server";

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
}

const CHURCH_TAX_RATES: { [key: string]: number } = {
  "baden-wurttemberg": 8,
  "bayern": 8,
  "berlin": 9,
  "brandenburg": 9,
  "bremen": 9,
  "hamburg": 9,
  "hessen": 9,
  "mecklenburg-vorpommern": 9,
  "niedersachsen": 9,
  "nordrhein-westfalen": 9,
  "rheinland-pfalz": 9,
  "saarland": 9,
  "sachsen": 9,
  "sachsen-anhalt": 9,
  "schleswig-holstein": 9,
  "thuringen": 9,
};

const SOCIAL_INSURANCE_RATES = {
  health: { rate: 7.3, ceiling: 69750 },
  pension: { rate: 9.3, ceiling: 101400 },
  unemployment: { rate: 1.3, ceiling: 101400 },
  nursingCare: { rate: 1.7, ceiling: 69750 },
};

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

function calculateGermanTax(annualIncome: number): number {
  if (annualIncome <= 12348) {
    return 0;
  }
  
  const y = (annualIncome - 12348) / 10000;
  const z = (annualIncome - 17005) / 10000;
  
  if (annualIncome <= 17005) {
    return (914.51 * y + 1400) * y;
  } else if (annualIncome <= 66760) {
    return (176.64 * z + 2397) * z + 1015.13;
  } else if (annualIncome <= 277825) {
    return 0.42 * annualIncome - 9236.64;
  } else {
    return 0.45 * annualIncome - 17571.13;
  }
}

function calculateSolidaritySurcharge(incomeTax: number): number {
  const SOLI_THRESHOLD = 20350;
  if (incomeTax <= SOLI_THRESHOLD) {
    return 0;
  }
  return incomeTax * 0.055;
}

export async function POST(request: NextRequest) {
  try {
    const body: GermanyCalculateRequest = await request.json();

    const { grossIncome, frequency, taxCategory, churchTax, hasChildren, healthInsurance, pensionInsurance, unemploymentInsurance, healthInsuranceSupplementary, state } = body;

    const annualGross = normalizeToAnnual(grossIncome, frequency);

        const socialInsurance = calculateSocialInsurance(
      annualGross,
      healthInsurance,
      pensionInsurance,
      unemploymentInsurance,
      healthInsuranceSupplementary || 2.9,
      hasChildren
    );

    const taxableIncome = annualGross * 0.76;
    const incomeTax = calculateGermanTax(taxableIncome);
    const solidaritySurcharge = calculateSolidaritySurcharge(incomeTax);

    let churchTaxAmount = 0;
    if (churchTax) {
      const stateKey = state?.toLowerCase().replace(/ /g, "-") || "bayern";
      const churchRate = CHURCH_TAX_RATES[stateKey] || 9;
      churchTaxAmount = (incomeTax * churchRate) / 100;
    }

    const totalTax = incomeTax + solidaritySurcharge + churchTaxAmount + socialInsurance.healthInsurance + socialInsurance.pensionInsurance + socialInsurance.unemploymentInsurance + socialInsurance.nursingCareInsurance;
    const netAnnual = annualGross - totalTax;

    const response = {
      breakdown: {
        grossSalary: annualGross,
        totalGross: annualGross,
      },
      deductions: {
        incomeTax: Math.round(incomeTax * 100) / 100,
        solidaritySurcharge: Math.round(solidaritySurcharge * 100) / 100,
        churchTax: Math.round(churchTaxAmount * 100) / 100,
        healthInsurance: socialInsurance.healthInsurance,
        nursingCareInsurance: socialInsurance.nursingCareInsurance,
        pensionInsurance: socialInsurance.pensionInsurance,
        unemploymentInsurance: socialInsurance.unemploymentInsurance,
        total: Math.round(totalTax * 100) / 100,
      },
      netIncome: {
        annual: Math.round(netAnnual * 100) / 100,
        monthly: Math.round((netAnnual / 12) * 100) / 100,
      },
      taxCategory,
      taxYear: "2026",
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to calculate German tax" },
      { status: 500 }
    );
  }
}
