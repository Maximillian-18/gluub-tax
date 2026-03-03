export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

export const FEDERAL_BRACKETS_2025: TaxBracket[] = [
  { min: 0, max: 11925, rate: 10 },
  { min: 11925, max: 48475, rate: 12 },
  { min: 48475, max: 103350, rate: 22 },
  { min: 103350, max: 197300, rate: 24 },
  { min: 197300, max: 250525, rate: 32 },
  { min: 250525, max: 626350, rate: 35 },
  { min: 626350, max: null, rate: 37 },
];

export const FEDERAL_BRACKETS_2026: TaxBracket[] = [
  { min: 0, max: 12400, rate: 10 },
  { min: 12400, max: 50400, rate: 12 },
  { min: 50400, max: 105700, rate: 22 },
  { min: 105700, max: 201775, rate: 24 },
  { min: 201775, max: 256225, rate: 32 },
  { min: 256225, max: 640600, rate: 35 },
  { min: 640600, max: null, rate: 37 },
];
