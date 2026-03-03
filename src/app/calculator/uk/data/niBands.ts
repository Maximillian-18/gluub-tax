export interface NIBand {
  min: number;
  max: number | null;
  rate: number;
}

export const NI_BANDS_2025: NIBand[] = [
  { min: 0, max: 12570, rate: 0 },
  { min: 12570, max: 50270, rate: 8 },
  { min: 50270, max: null, rate: 2 },
];

export const NI_BANDS_2026: NIBand[] = [
  { min: 0, max: 12570, rate: 0 },
  { min: 12570, max: 50270, rate: 8 },
  { min: 50270, max: null, rate: 2 },
];
