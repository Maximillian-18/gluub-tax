export interface TaxBand {
  min: number;
  max: number | null;
  rate: number;
}

export const TAX_BANDS_ENGLAND_2025: TaxBand[] = [
  { min: 0, max: 12570, rate: 0 },
  { min: 12570, max: 50270, rate: 20 },
  { min: 50270, max: 125140, rate: 40 },
  { min: 125140, max: null, rate: 45 },
];

export const TAX_BANDS_ENGLAND_2026: TaxBand[] = [
  { min: 0, max: 12570, rate: 0 },
  { min: 12570, max: 50270, rate: 20 },
  { min: 50270, max: 125140, rate: 40 },
  { min: 125140, max: null, rate: 45 },
];

export const TAX_BANDS_SCOTLAND_2025: TaxBand[] = [
  { min: 0, max: 12570, rate: 0 },
  { min: 12570, max: 14732, rate: 19 },
  { min: 14732, max: 21303, rate: 20 },
  { min: 21303, max: 43662, rate: 21 },
  { min: 43662, max: 75000, rate: 42 },
  { min: 75000, max: 125140, rate: 45 },
  { min: 125140, max: null, rate: 48 },
];

export const TAX_BANDS_SCOTLAND_2026: TaxBand[] = [
  { min: 0, max: 12570, rate: 0 },
  { min: 12570, max: 14732, rate: 19 },
  { min: 14732, max: 21303, rate: 20 },
  { min: 21303, max: 43662, rate: 21 },
  { min: 43662, max: 75000, rate: 42 },
  { min: 75000, max: 125140, rate: 45 },
  { min: 125140, max: null, rate: 48 },
];
