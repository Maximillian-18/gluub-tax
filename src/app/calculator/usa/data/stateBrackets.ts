import { TaxBracket } from "./federalBrackets";

export interface FilingStatusBracket {
  single: TaxBracket[];
  married_jointly: TaxBracket[];
}

export const STATE_BRACKETS: Record<string, FilingStatusBracket> = {
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
