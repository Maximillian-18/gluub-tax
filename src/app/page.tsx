"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const countries = [
  { 
    name: "United Kingdom", 
    flag: "🇬🇧",
    slug: "uk",
  },
  { 
    name: "United States", 
    flag: "🇺🇸",
    slug: "usa",
  },
  { 
    name: "Germany", 
    flag: "🇩🇪",
    slug: "germany",
  },
  { 
    name: "Denmark", 
    flag: "🇩🇰",
    slug: "denmark",
  },
];

// UK Example: £40,000 salary (England, 5% pension, Plan 2 student loan)
const ukExample = {
  salary: 40000,
  currency: "£",
  personalAllowance: 12570,
  taxableIncome: 25430,
  incomeBreakdown: {
    grossSalary: 40000,
  },
  deductions: {
    incomeTax: 5086,
    nationalInsurance: 2194,
    pension: 2000,
    studentLoan: 1037,
  } as Record<string, number>,
  netIncome: {
    weekly: 571,
    monthly: 2474,
    annual: 29683,
  }
};

// US Example: $60,000 salary (California, 5% 401k, 2026)
const usExample = {
  salary: 60000,
  currency: "$",
  personalAllowance: 16100,
  taxableIncome: 40900,
  incomeBreakdown: {
    grossSalary: 60000,
  },
  deductions: {
    contribution401k: 3000,
    federalTax: 4660,
    socialSecurity: 3720,
    medicare: 870,
    stateTax: 1000,
  } as Record<string, number>,
  netIncome: {
    weekly: 899,
    monthly: 3896,
    annual: 46750,
  }
};

// Germany Example: €50,000 salary (Cat 1, statutory insurance, no church)
const germanyExample = {
  salary: 50000,
  currency: "€",
  personalAllowance: 12348,
  taxableIncome: 37652,
  incomeBreakdown: {
    grossSalary: 50000,
  },
  deductions: {
    incomeTax: 5056,
    solidaritySurcharge: 278,
    socialInsurance: 9411,
  } as Record<string, number>,
  netIncome: {
    weekly: 690,
    monthly: 2988,
    annual: 35855,
  }
};

// Denmark Example: 400,000 DKK salary (Copenhagen, default pension)
const denmarkExample = {
  salary: 400000,
  currency: "DKK",
  personalAllowance: 54100,
  taxableIncome: 344712,
  incomeBreakdown: {
    grossSalary: 400000,
  },
  deductions: {
    atpPension: 1188,
    bottomTax: 41390,
    municipalTax: 80619,
    labourMarketTax: 32000,
    churchTax: 2206,
  } as Record<string, number>,
  netIncome: {
    weekly: 4667,
    monthly: 20217,
    annual: 242597,
  }
};

const examples = [
  { ...ukExample, flag: "🇬🇧", name: "United Kingdom", salaryFormatted: "£40,000" },
  { ...usExample, flag: "🇺🇸", name: "United States", salaryFormatted: "$60,000" },
  { ...germanyExample, flag: "🇩🇪", name: "Germany", salaryFormatted: "€50,000" },
  { ...denmarkExample, flag: "🇩🇰", name: "Denmark", salaryFormatted: "400,000 DKK" },
];

const countryFeatures = [
  {
    title: "United Kingdom",
    features: [
      "Personal Allowance (tax-free amount)",
      "National Insurance contributions",
      "Pension contributions (percentage or fixed)",
      "Student Loan (Plan 1, 2, 4, Postgraduate)",
      "Custom allowances",
      "Tax code support",
      "Bonus/overtime calculations",
    ],
  },
  {
    title: "United States",
    features: [
      "Federal income tax (2026 brackets)",
      "State tax (all 50 states + DC)",
      "401(k) contributions",
      "IRA deductions",
      "Standard vs Itemized deductions",
      "FICA (Social Security + Medicare)",
    ],
  },
  {
    title: "Germany",
    features: [
      "Progressive income tax",
      "Church tax (optional)",
      "Solidarity surcharge",
      "Social insurance (health, pension,",
      "unemployment, nursing care)",
      "Tax categories (1-6)",
      "Children allowance",
    ],
  },
  {
    title: "Denmark",
    features: [
      "Municipal tax (all municipalities)",
      "Labour Market Tax (AM-contribution)",
      "ATP pension",
      "Bottom/Middle/Top/Top-Top tax brackets",
      "Church tax (optional)",
    ],
  },
];

function formatCurrency(value: number, currency: string = "£"): string {
  return `${currency}${value.toLocaleString()}`;
}

export default function Home() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<any>(null);

  const handleCountryClick = (slug: string) => {
    router.push(`/calculator/${slug}`);
  };

  const handleCarouselApiChange = (api: any) => {
    setCarouselApi(api);
    if (api) {
      api.on("select", () => {
        setActiveIndex(api.selectedScrollSnap());
      });
    }
  };

  const renderExample = (example: typeof examples[0]) => (
    <div className="h-full flex flex-col">
      <div className="bg-[#0a1f15] border border-[#2ecc71]/30 rounded-xl p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{example.flag}</span>
          <div>
            <h3 className="text-base font-bold text-[#2ecc71]">{example.name}</h3>
            <p className="text-[#2ecc71]/70 text-xs">Salary: {example.salaryFormatted}</p>
          </div>
        </div>

        {/* Annual Gross - Dark Green Frame */}
        <div className="bg-[#020806] rounded-lg p-2 md:p-3 mb-2">
          <p className="text-xs font-bold text-[#2ecc71] mb-1">Annual Gross</p>
          <p className="text-sm md:text-base font-bold text-[#2ecc71] truncate">
            {formatCurrency(example.incomeBreakdown.grossSalary, example.currency)}
          </p>
        </div>

        {/* Tax Info - Dark Green Frame */}
        <div className="bg-[#020806] rounded-lg p-2 md:p-3 space-y-1 mb-2">
          <p className="text-xs font-bold text-[#2ecc71] mb-1">Tax Info</p>
          <div className="flex justify-between text-xs">
            <span className="text-[#2ecc71]/70">
              {example.name === "Germany" ? "Basic Allowance" : example.name === "Denmark" ? "Personal Allowance" : example.name === "United States" ? "Standard Deduction" : "Personal Allowance"}
            </span>
            <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(example.personalAllowance, example.currency)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#2ecc71]/70">Taxable</span>
            <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(example.taxableIncome, example.currency)}</span>
          </div>
        </div>

        {/* Income Breakdown Table */}
        <div className="mb-2">
          <h4 className="text-xs font-bold text-[#2ecc71] mb-1">Income Breakdown</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] md:text-xs">
              <thead>
                <tr className="border-b border-[#2ecc71]/30">
                  <th className="text-left py-1 px-1 text-[#2ecc71] font-medium whitespace-nowrap">Item</th>
                  <th className="text-right py-1 px-1 text-[#2ecc71] font-medium whitespace-nowrap">Annual</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#2ecc71]/20">
                  <td className="py-1 px-1 text-[#2ecc71] whitespace-nowrap">{example.name === "United States" ? "Gross Income" : "Gross Salary"}</td>
                  <td className="text-right py-1 px-1 text-[#2ecc71] whitespace-nowrap">{formatCurrency(example.incomeBreakdown.grossSalary, example.currency)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Deductions Table */}
        <div className="mb-2 flex-1">
          <h4 className="text-xs font-bold text-[#2ecc71] mb-1">Deductions</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] md:text-xs">
              <thead>
                <tr className="border-b border-[#2ecc71]/30">
                  <th className="text-left py-1 px-1 text-[#2ecc71] font-medium whitespace-nowrap">Deduction</th>
                  <th className="text-right py-1 px-1 text-[#2ecc71] font-medium whitespace-nowrap">Annual</th>
                </tr>
              </thead>
              <tbody>
                {example.name === "United Kingdom" && (
                  <>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">Income Tax</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.incomeTax || 0, example.currency)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">National Insurance</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.nationalInsurance || 0, example.currency)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">Pension</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.pension || 0, example.currency)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">Student Loan</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.studentLoan || 0, example.currency)}</td>
                    </tr>
                  </>
                )}
                {example.name === "United States" && (
                  <>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">401(k)</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.contribution401k || 0, example.currency)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">Federal Tax</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.federalTax || 0, example.currency)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">Social Security</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.socialSecurity || 0, example.currency)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">Medicare</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.medicare || 0, example.currency)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">State Tax</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.stateTax || 0, example.currency)}</td>
                    </tr>
                  </>
                )}
                {example.name === "Germany" && (
                  <>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">Income Tax</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.incomeTax || 0, example.currency)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">Solidarity Surcharge</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.solidaritySurcharge || 0, example.currency)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">Social Insurance</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.socialInsurance || 0, example.currency)}</td>
                    </tr>
                  </>
                )}
                {example.name === "Denmark" && (
                  <>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">ATP Pension</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.atpPension || 0, example.currency)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">Bottom Tax</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.bottomTax || 0, example.currency)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">Municipal Tax</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.municipalTax || 0, example.currency)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">Labour Market</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.labourMarketTax || 0, example.currency)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-1 px-1 text-[#e74c3c] whitespace-nowrap">Church Tax</td>
                      <td className="text-right py-1 px-1 text-[#e74c3c] whitespace-nowrap">-{formatCurrency(example.deductions.churchTax || 0, example.currency)}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Net Income - Dark Green Frame - Always at bottom */}
        <div className="bg-[#020806] rounded-lg p-2 md:p-3 space-y-1 mt-auto">
          <p className="text-xs font-bold text-[#2ecc71] mb-1">Net Income</p>
          <div className="flex justify-between text-xs">
            <span className="text-[#2ecc71]/70">Weekly</span>
            <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(example.netIncome.weekly, example.currency)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#2ecc71]/70">Monthly</span>
            <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(example.netIncome.monthly, example.currency)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#2ecc71]/70">Annual</span>
            <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(example.netIncome.annual, example.currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020806] text-[#2ecc71] flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-2 md:px-8 py-20 pt-44 md:pt-52">
        <div className="w-full max-w-7xl">
          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight text-[#2ecc71]">
              Calculate Take Home Pay
            </h1>
            <p className="text-[#2ecc71]/70 text-base md:text-lg">
              Select the country you want to calculate income tax for
            </p>
          </div>

          {/* Country Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-20">
            {countries.map((country) => (
              <button
                key={country.slug}
                onClick={() => handleCountryClick(country.slug)}
                className="group bg-[#0a1f15] border border-[#2ecc71]/30 rounded-xl p-3 md:p-5 text-center transition-all duration-300 hover:border-[#2ecc71]/80 hover:bg-[#0f2920] hover:scale-105 hover:shadow-lg hover:shadow-[#2ecc71]/10"
              >
                <div className="text-2xl md:text-4xl mb-1">{country.flag}</div>
                <h2 className="text-sm md:text-base font-bold text-[#2ecc71]">
                  {country.name}
                </h2>
              </button>
            ))}
          </div>

          {/* Example Calculations - Carousel Layout */}
          <div className="mt-40">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2ecc71] mb-32 text-center">
              Example Calculations
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 lg:gap-4 items-start justify-items-center lg:justify-items-start">
              {/* Left Column - Feature Text */}
              <div className="hidden lg:block lg:pt-[100px]">
                <div
                  key={activeIndex}
                  className="animate-in fade-in duration-300 translate-x-48 xl:translate-x-64"
                >
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-4">
                    Country specific deductions:
                  </h3>
                  <ul className="space-y-2">
                    {countryFeatures[activeIndex].features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#2ecc71]/80 text-sm">
                        <span className="text-[#2ecc71] mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Carousel */}
              <div className="-ml-12 lg:-ml-64">
                <Carousel
                  className="w-full"
                  setApi={handleCarouselApiChange}
                >
                  {/* Desktop arrows - hidden on mobile */}
                  <div className="hidden lg:block">
                    <div className="relative">
                      <CarouselContent className="-ml-2 md:-ml-4">
                        {examples.map((example) => (
                          <CarouselItem key={example.name} className="pl-2 md:pl-4">
                            <div className="h-full w-[320px] md:w-[380px] lg:w-[360px] mx-auto">
                              {renderExample(example)}
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {/* Left Arrow */}
                      <CarouselPrevious className="absolute left-16 top-1/2 -translate-y-1/2 w-10 h-10 border-[#2ecc71]/30 bg-[#0a1f15] text-[#2ecc71] hover:bg-[#0f2920] hover:border-[#2ecc71]/60" />
                      {/* Right Arrow */}
                      <CarouselNext className="absolute right-16 top-1/2 -translate-y-1/2 w-10 h-10 border-[#2ecc71]/30 bg-[#0a1f15] text-[#2ecc71] hover:bg-[#0f2920] hover:border-[#2ecc71]/60" />
                    </div>
                  </div>
                  {/* Mobile arrows - smaller below card */}
                  <div className="lg:hidden flex justify-center gap-8 mt-4">
                    <button
                      onClick={() => carouselApi?.scrollPrev()}
                      className="text-[#2ecc71] text-2xl hover:text-[#2ecc71]/70"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => carouselApi?.scrollNext()}
                      className="text-[#2ecc71] text-2xl hover:text-[#2ecc71]/70"
                    >
                      ›
                    </button>
                  </div>
                  {/* Mobile card only */}
                  <div className="lg:hidden px-8">
                    <CarouselContent>
                      {examples.map((example) => (
                        <CarouselItem key={example.name}>
                          <div className="h-full w-[320px] mx-auto">
                            {renderExample(example)}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
