import { NextRequest, NextResponse } from "next/server";

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

interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

interface FilingStatusBracket {
  single: TaxBracket[];
  married_jointly: TaxBracket[];
}

const FEDERAL_BRACKETS_2025: TaxBracket[] = [
  { min: 0, max: 11925, rate: 10 },
  { min: 11925, max: 48475, rate: 12 },
  { min: 48475, max: 103350, rate: 22 },
  { min: 103350, max: 197300, rate: 24 },
  { min: 197300, max: 250525, rate: 32 },
  { min: 250525, max: 626350, rate: 35 },
  { min: 626350, max: null, rate: 37 },
];

const FEDERAL_BRACKETS_2026: TaxBracket[] = [
  { min: 0, max: 12400, rate: 10 },
  { min: 12400, max: 50400, rate: 12 },
  { min: 50400, max: 105700, rate: 22 },
  { min: 105700, max: 201775, rate: 24 },
  { min: 201775, max: 256225, rate: 32 },
  { min: 256225, max: 640600, rate: 35 },
  { min: 640600, max: null, rate: 37 },
];

const STANDARD_DEDUCTIONS_2025 = {
  single: 15750,
  married_jointly: 31500,
  married_separately: 15750,
  head_of_household: 23625,
};

const STANDARD_DEDUCTIONS_2026 = {
  single: 16100,
  married_jointly: 32200,
  married_separately: 16100,
  head_of_household: 24150,
};

const STATE_TAX_RATES: Record<string, { rate: number; type: "flat" | "graduated" }> = {
  AL: { rate: 5, type: "graduated" },
  AK: { rate: 0, type: "flat" },
  AZ: { rate: 2.5, type: "flat" },
  AR: { rate: 3.9, type: "graduated" },
  CA: { rate: 13.3, type: "graduated" },
  CO: { rate: 4.4, type: "flat" },
  CT: { rate: 6.99, type: "graduated" },
  DE: { rate: 6.6, type: "graduated" },
  FL: { rate: 0, type: "flat" },
  GA: { rate: 5.19, type: "flat" },
  HI: { rate: 11, type: "graduated" },
  ID: { rate: 5.3, type: "flat" },
  IL: { rate: 4.95, type: "flat" },
  IN: { rate: 2.95, type: "flat" },
  IA: { rate: 3.8, type: "flat" },
  KS: { rate: 5.58, type: "graduated" },
  KY: { rate: 3.5, type: "graduated" },
  LA: { rate: 3, type: "flat" },
  ME: { rate: 7.15, type: "graduated" },
  MD: { rate: 6.5, type: "graduated" },
  MA: { rate: 9, type: "graduated" },
  MI: { rate: 4.25, type: "flat" },
  MN: { rate: 9.85, type: "graduated" },
  MS: { rate: 4, type: "graduated" },
  MO: { rate: 4.7, type: "graduated" },
  MT: { rate: 5.65, type: "graduated" },
  NE: { rate: 5.2, type: "graduated" },
  NV: { rate: 0, type: "flat" },
  NH: { rate: 0, type: "flat" },
  NJ: { rate: 10.75, type: "graduated" },
  NM: { rate: 4.9, type: "graduated" },
  NY: { rate: 10.9, type: "graduated" },
  NC: { rate: 4.75, type: "flat" },
  ND: { rate: 2.5, type: "flat" },
  OH: { rate: 3.99, type: "graduated" },
  OK: { rate: 4.5, type: "graduated" },
  OR: { rate: 9.9, type: "graduated" },
  PA: { rate: 3.07, type: "flat" },
  RI: { rate: 5.99, type: "graduated" },
  SC: { rate: 6.4, type: "graduated" },
  SD: { rate: 0, type: "flat" },
  TN: { rate: 0, type: "flat" },
  TX: { rate: 0, type: "flat" },
  UT: { rate: 4.85, type: "flat" },
  VT: { rate: 8.75, type: "graduated" },
  VA: { rate: 5.75, type: "graduated" },
  WA: { rate: 0, type: "flat" },
  WV: { rate: 5.12, type: "graduated" },
  WI: { rate: 7.65, type: "graduated" },
  WY: { rate: 0, type: "flat" },
  DC: { rate: 10.75, type: "graduated" },
};

const STATE_BRACKETS: Record<string, FilingStatusBracket> = {
  AL: {
    single: [
      { min: 0, max: 500, rate: 2 },
      { min: 500, max: 3000, rate: 4 },
      { min: 3000, max: null, rate: 5 },
    ],
    married_jointly: [
      { min: 0, max: 1000, rate: 2 },
      { min: 1000, max: 6000, rate: 4 },
      { min: 6000, max: null, rate: 5 },
    ],
  },
  AR: {
    single: [
      { min: 0, max: 4600, rate: 2 },
      { min: 4600, max: null, rate: 3.9 },
    ],
    married_jointly: [
      { min: 0, max: 4600, rate: 2 },
      { min: 4600, max: null, rate: 3.9 },
    ],
  },
  CA: {
    single: [
      { min: 0, max: 11079, rate: 1 },
      { min: 11079, max: 26264, rate: 2 },
      { min: 26264, max: 41452, rate: 4 },
      { min: 41452, max: 57542, rate: 6 },
      { min: 57542, max: 72724, rate: 8 },
      { min: 72724, max: 371479, rate: 9.3 },
      { min: 371479, max: 445771, rate: 10.3 },
      { min: 445771, max: 742953, rate: 11.3 },
      { min: 742953, max: 1000000, rate: 12.3 },
      { min: 1000000, max: null, rate: 13.3 },
    ],
    married_jointly: [
      { min: 0, max: 22158, rate: 1 },
      { min: 22158, max: 52528, rate: 2 },
      { min: 52528, max: 82904, rate: 4 },
      { min: 82904, max: 115084, rate: 6 },
      { min: 115084, max: 145448, rate: 8 },
      { min: 145448, max: 742958, rate: 9.3 },
      { min: 742958, max: 891542, rate: 10.3 },
      { min: 891542, max: 1485906, rate: 11.3 },
      { min: 1485906, max: 2000000, rate: 12.3 },
      { min: 2000000, max: null, rate: 13.3 },
    ],
  },
  CT: {
    single: [
      { min: 0, max: 10000, rate: 2 },
      { min: 10000, max: 50000, rate: 4.5 },
      { min: 50000, max: 100000, rate: 5.5 },
      { min: 100000, max: 200000, rate: 6 },
      { min: 200000, max: 250000, rate: 6.5 },
      { min: 250000, max: 500000, rate: 6.9 },
      { min: 500000, max: null, rate: 6.99 },
    ],
    married_jointly: [
      { min: 0, max: 20000, rate: 2 },
      { min: 20000, max: 100000, rate: 4.5 },
      { min: 100000, max: 200000, rate: 5.5 },
      { min: 200000, max: 400000, rate: 6 },
      { min: 400000, max: 500000, rate: 6.5 },
      { min: 500000, max: 1000000, rate: 6.9 },
      { min: 1000000, max: null, rate: 6.99 },
    ],
  },
  DE: {
    single: [
      { min: 0, max: 2000, rate: 2.2 },
      { min: 2000, max: 5000, rate: 3.9 },
      { min: 5000, max: 10000, rate: 4.8 },
      { min: 10000, max: 20000, rate: 5.2 },
      { min: 20000, max: 25000, rate: 5.55 },
      { min: 25000, max: 60000, rate: 6.6 },
      { min: 60000, max: null, rate: 6.6 },
    ],
    married_jointly: [
      { min: 0, max: 2000, rate: 2.2 },
      { min: 2000, max: 5000, rate: 3.9 },
      { min: 5000, max: 10000, rate: 4.8 },
      { min: 10000, max: 20000, rate: 5.2 },
      { min: 20000, max: 25000, rate: 5.55 },
      { min: 25000, max: 60000, rate: 6.6 },
      { min: 60000, max: null, rate: 6.6 },
    ],
  },
  HI: {
    single: [
      { min: 0, max: 9600, rate: 1.4 },
      { min: 9600, max: 14400, rate: 3.2 },
      { min: 14400, max: 19200, rate: 5.5 },
      { min: 19200, max: 24000, rate: 6.4 },
      { min: 24000, max: 36000, rate: 6.8 },
      { min: 36000, max: 48000, rate: 7.2 },
      { min: 48000, max: 125000, rate: 7.6 },
      { min: 125000, max: 175000, rate: 8.25 },
      { min: 175000, max: 225000, rate: 9 },
      { min: 225000, max: 275000, rate: 10 },
      { min: 275000, max: 325000, rate: 11 },
      { min: 325000, max: null, rate: 11 },
    ],
    married_jointly: [
      { min: 0, max: 19200, rate: 1.4 },
      { min: 19200, max: 28800, rate: 3.2 },
      { min: 28800, max: 38400, rate: 5.5 },
      { min: 38400, max: 48000, rate: 6.4 },
      { min: 48000, max: 72000, rate: 6.8 },
      { min: 72000, max: 96000, rate: 7.2 },
      { min: 96000, max: 250000, rate: 7.6 },
      { min: 250000, max: 350000, rate: 8.25 },
      { min: 350000, max: 450000, rate: 9 },
      { min: 450000, max: 550000, rate: 10 },
      { min: 550000, max: 650000, rate: 11 },
      { min: 650000, max: null, rate: 11 },
    ],
  },
  KS: {
    single: [
      { min: 0, max: 23000, rate: 5.2 },
      { min: 23000, max: null, rate: 5.58 },
    ],
    married_jointly: [
      { min: 0, max: 46000, rate: 5.2 },
      { min: 46000, max: null, rate: 5.58 },
    ],
  },
  KY: {
    single: [
      { min: 0, max: null, rate: 3.5 },
    ],
    married_jointly: [
      { min: 0, max: null, rate: 3.5 },
    ],
  },
  ME: {
    single: [
      { min: 0, max: 27399, rate: 5.8 },
      { min: 27399, max: 64849, rate: 6.75 },
      { min: 64849, max: null, rate: 7.15 },
    ],
    married_jointly: [
      { min: 0, max: 54849, rate: 5.8 },
      { min: 54849, max: 129749, rate: 6.75 },
      { min: 129749, max: null, rate: 7.15 },
    ],
  },
  MD: {
    single: [
      { min: 0, max: 1000, rate: 2 },
      { min: 1000, max: 2000, rate: 3 },
      { min: 2000, max: 3000, rate: 4 },
      { min: 3000, max: 100000, rate: 4.75 },
      { min: 100000, max: 125000, rate: 5 },
      { min: 125000, max: 150000, rate: 5.25 },
      { min: 150000, max: 250000, rate: 5.5 },
      { min: 250000, max: 500000, rate: 5.75 },
      { min: 500000, max: 1000000, rate: 6.25 },
      { min: 1000000, max: null, rate: 6.5 },
    ],
    married_jointly: [
      { min: 0, max: 1000, rate: 2 },
      { min: 1000, max: 2000, rate: 3 },
      { min: 2000, max: 3000, rate: 4 },
      { min: 3000, max: 150000, rate: 4.75 },
      { min: 150000, max: 175000, rate: 5 },
      { min: 175000, max: 225000, rate: 5.25 },
      { min: 225000, max: 300000, rate: 5.5 },
      { min: 300000, max: 600000, rate: 5.75 },
      { min: 600000, max: 1200000, rate: 6.25 },
      { min: 1200000, max: null, rate: 6.5 },
    ],
  },
  MA: {
    single: [
      { min: 0, max: 1083150, rate: 5 },
      { min: 1083150, max: null, rate: 9 },
    ],
    married_jointly: [
      { min: 0, max: 1083150, rate: 5 },
      { min: 1083150, max: null, rate: 9 },
    ],
  },
  MN: {
    single: [
      { min: 0, max: 33310, rate: 5.35 },
      { min: 33310, max: 109430, rate: 6.8 },
      { min: 109430, max: 203150, rate: 7.85 },
      { min: 203150, max: null, rate: 9.85 },
    ],
    married_jointly: [
      { min: 0, max: 48700, rate: 5.35 },
      { min: 48700, max: 193480, rate: 6.8 },
      { min: 193480, max: 337930, rate: 7.85 },
      { min: 337930, max: null, rate: 9.85 },
    ],
  },
  MS: {
    single: [
      { min: 0, max: 10000, rate: 4 },
    ],
    married_jointly: [
      { min: 0, max: 10000, rate: 4 },
    ],
  },
  MO: {
    single: [
      { min: 0, max: 1348, rate: 2 },
      { min: 1348, max: 2696, rate: 2.5 },
      { min: 2696, max: 4044, rate: 3 },
      { min: 4044, max: 5392, rate: 3.5 },
      { min: 5392, max: 6740, rate: 4 },
      { min: 6740, max: 8088, rate: 4.5 },
      { min: 8088, max: 9436, rate: 4.7 },
    ],
    married_jointly: [
      { min: 0, max: 1348, rate: 2 },
      { min: 1348, max: 2696, rate: 2.5 },
      { min: 2696, max: 4044, rate: 3 },
      { min: 4044, max: 5392, rate: 3.5 },
      { min: 5392, max: 6740, rate: 4 },
      { min: 6740, max: 8088, rate: 4.5 },
      { min: 8088, max: 9436, rate: 4.7 },
    ],
  },
  MT: {
    single: [
      { min: 0, max: 47500, rate: 4.7 },
      { min: 47500, max: null, rate: 5.65 },
    ],
    married_jointly: [
      { min: 0, max: 95000, rate: 4.7 },
      { min: 95000, max: null, rate: 5.65 },
    ],
  },
  NE: {
    single: [
      { min: 0, max: 4130, rate: 2.46 },
      { min: 4130, max: 24760, rate: 3.51 },
      { min: 24760, max: null, rate: 4.55 },
    ],
    married_jointly: [
      { min: 0, max: 8250, rate: 2.46 },
      { min: 8250, max: 49530, rate: 3.51 },
      { min: 49530, max: null, rate: 4.55 },
    ],
  },
  NJ: {
    single: [
      { min: 0, max: 20000, rate: 1.4 },
      { min: 20000, max: 35000, rate: 1.75 },
      { min: 35000, max: 40000, rate: 3.5 },
      { min: 40000, max: 75000, rate: 5.525 },
      { min: 75000, max: 500000, rate: 6.37 },
      { min: 500000, max: 1000000, rate: 8.97 },
      { min: 1000000, max: null, rate: 10.75 },
    ],
    married_jointly: [
      { min: 0, max: 20000, rate: 1.4 },
      { min: 20000, max: 50000, rate: 1.75 },
      { min: 50000, max: 70000, rate: 2.45 },
      { min: 70000, max: 80000, rate: 3.5 },
      { min: 80000, max: 150000, rate: 5.525 },
      { min: 150000, max: 500000, rate: 6.37 },
      { min: 500000, max: 1000000, rate: 8.97 },
      { min: 1000000, max: null, rate: 10.75 },
    ],
  },
  NM: {
    single: [
      { min: 0, max: 5500, rate: 1.5 },
      { min: 5500, max: 16500, rate: 3.2 },
      { min: 16500, max: 33500, rate: 4.3 },
      { min: 33500, max: 54000, rate: 4.7 },
      { min: 54000, max: null, rate: 4.9 },
    ],
    married_jointly: [
      { min: 0, max: 8000, rate: 1.5 },
      { min: 8000, max: 25000, rate: 3.2 },
      { min: 25000, max: 50000, rate: 4.3 },
      { min: 50000, max: 80000, rate: 4.7 },
      { min: 80000, max: null, rate: 4.9 },
    ],
  },
  NY: {
    single: [
      { min: 0, max: 8500, rate: 4 },
      { min: 8500, max: 11700, rate: 4.5 },
      { min: 11700, max: 13900, rate: 5.25 },
      { min: 13900, max: 80650, rate: 5.5 },
      { min: 80650, max: 215400, rate: 6 },
      { min: 215400, max: 1077550, rate: 6.85 },
      { min: 1077550, max: 5000000, rate: 9.65 },
      { min: 5000000, max: null, rate: 10.9 },
    ],
    married_jointly: [
      { min: 0, max: 17000, rate: 4 },
      { min: 17000, max: 23400, rate: 4.5 },
      { min: 23400, max: 27800, rate: 5.25 },
      { min: 27800, max: 161300, rate: 5.5 },
      { min: 161300, max: 430800, rate: 6 },
      { min: 430800, max: 2155100, rate: 6.85 },
      { min: 2155100, max: 10000000, rate: 9.65 },
      { min: 10000000, max: null, rate: 10.9 },
    ],
  },
  OH: {
    single: [
      { min: 0, max: 26050, rate: 0 },
      { min: 26050, max: 100000, rate: 2.75 },
      { min: 100000, max: 115000, rate: 3.5 },
      { min: 115000, max: null, rate: 3.99 },
    ],
    married_jointly: [
      { min: 0, max: 26050, rate: 0 },
      { min: 26050, max: 100000, rate: 2.75 },
      { min: 100000, max: 115000, rate: 3.5 },
      { min: 115000, max: null, rate: 3.99 },
    ],
  },
  OK: {
    single: [
      { min: 0, max: 1000, rate: 0.25 },
      { min: 1000, max: 2500, rate: 0.5 },
      { min: 2500, max: 3750, rate: 1 },
      { min: 3750, max: 4900, rate: 2 },
      { min: 4900, max: 7200, rate: 3 },
      { min: 7200, max: null, rate: 4.5 },
    ],
    married_jointly: [
      { min: 0, max: 2000, rate: 0.25 },
      { min: 2000, max: 5000, rate: 0.5 },
      { min: 5000, max: 7500, rate: 1 },
      { min: 7500, max: 9800, rate: 2 },
      { min: 9800, max: 14400, rate: 3 },
      { min: 14400, max: null, rate: 4.5 },
    ],
  },
  OR: {
    single: [
      { min: 0, max: 4150, rate: 4.75 },
      { min: 4150, max: 10400, rate: 6.75 },
      { min: 10400, max: 125000, rate: 8.75 },
      { min: 125000, max: null, rate: 9.9 },
    ],
    married_jointly: [
      { min: 0, max: 8300, rate: 4.75 },
      { min: 8300, max: 20800, rate: 6.75 },
      { min: 20800, max: 250000, rate: 8.75 },
      { min: 250000, max: null, rate: 9.9 },
    ],
  },
  RI: {
    single: [
      { min: 0, max: 83525, rate: 3.75 },
      { min: 83525, max: 170050, rate: 4.75 },
      { min: 170050, max: null, rate: 5.99 },
    ],
    married_jointly: [
      { min: 0, max: 167050, rate: 3.75 },
      { min: 167050, max: 340100, rate: 4.75 },
      { min: 340100, max: null, rate: 5.99 },
    ],
  },
  SC: {
    single: [
      { min: 0, max: 3460, rate: 0 },
      { min: 3460, max: 17330, rate: 3 },
      { min: 17330, max: null, rate: 6.4 },
    ],
    married_jointly: [
      { min: 0, max: 6920, rate: 0 },
      { min: 6920, max: 34660, rate: 3 },
      { min: 34660, max: null, rate: 6.4 },
    ],
  },
  VT: {
    single: [
      { min: 0, max: 45400, rate: 3.35 },
      { min: 45400, max: 110050, rate: 6.6 },
      { min: 110050, max: 229550, rate: 7.6 },
      { min: 229550, max: null, rate: 8.75 },
    ],
    married_jointly: [
      { min: 0, max: 90800, rate: 3.35 },
      { min: 90800, max: 220100, rate: 6.6 },
      { min: 220100, max: 459100, rate: 7.6 },
      { min: 459100, max: null, rate: 8.75 },
    ],
  },
  VA: {
    single: [
      { min: 0, max: 3000, rate: 2 },
      { min: 3000, max: 5000, rate: 3 },
      { min: 5000, max: 17000, rate: 5 },
      { min: 17000, max: null, rate: 5.75 },
    ],
    married_jointly: [
      { min: 0, max: 6000, rate: 2 },
      { min: 6000, max: 10000, rate: 3 },
      { min: 10000, max: 34000, rate: 5 },
      { min: 34000, max: null, rate: 5.75 },
    ],
  },
  WV: {
    single: [
      { min: 0, max: 10000, rate: 2.36 },
      { min: 10000, max: 25000, rate: 3.15 },
      { min: 25000, max: 40000, rate: 4.18 },
      { min: 40000, max: 60000, rate: 5.05 },
      { min: 60000, max: null, rate: 5.12 },
    ],
    married_jointly: [
      { min: 0, max: 20000, rate: 2.36 },
      { min: 20000, max: 50000, rate: 3.15 },
      { min: 50000, max: 80000, rate: 4.18 },
      { min: 80000, max: 120000, rate: 5.05 },
      { min: 120000, max: null, rate: 5.12 },
    ],
  },
  WI: {
    single: [
      { min: 0, max: 14320, rate: 3.5 },
      { min: 14320, max: 28640, rate: 4.4 },
      { min: 28640, max: 315310, rate: 5.3 },
      { min: 315310, max: 347000, rate: 7.65 },
      { min: 347000, max: null, rate: 7.65 },
    ],
    married_jointly: [
      { min: 0, max: 19100, rate: 3.5 },
      { min: 19100, max: 38200, rate: 4.4 },
      { min: 38200, max: 420420, rate: 5.3 },
      { min: 420420, max: 462700, rate: 7.65 },
      { min: 462700, max: null, rate: 7.65 },
    ],
  },
  DC: {
    single: [
      { min: 0, max: 10000, rate: 4 },
      { min: 10000, max: 40000, rate: 6 },
      { min: 40000, max: 60000, rate: 6.5 },
      { min: 60000, max: 250000, rate: 8.5 },
      { min: 250000, max: 500000, rate: 9.25 },
      { min: 500000, max: 1000000, rate: 9.75 },
      { min: 1000000, max: null, rate: 10.75 },
    ],
    married_jointly: [
      { min: 0, max: 20000, rate: 4 },
      { min: 20000, max: 80000, rate: 6 },
      { min: 80000, max: 120000, rate: 6.5 },
      { min: 120000, max: 500000, rate: 8.5 },
      { min: 500000, max: 1000000, rate: 9.25 },
      { min: 1000000, max: 2000000, rate: 9.75 },
      { min: 2000000, max: null, rate: 10.75 },
    ],
  },
};

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
