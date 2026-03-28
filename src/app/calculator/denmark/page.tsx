"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomSelect } from "@/components/CustomSelect";
import { SearchableSelect } from "@/components/SearchableSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CalculationResult {
  breakdown: {
    grossSalary: number;
    totalGross: number;
    pensionContribution: number;
    personalPensionContribution: number;
    personalAllowance: number;
    taxableIncome: number;
  };
  deductions: {
    bottomTax: number;
    middleTax: number;
    topTax: number;
    topTopTax: number;
    municipalTax: number;
    labourMarketTax: number;
    churchTax: number;
    total: number;
  };
  netIncome: {
    annual: number;
    monthly: number;
    weekly: number;
  };
}

const municipalities = [
  { value: "aabenraa", label: "Aabenraa", rate: 25.60 },
  { value: "aaborg", label: "Aalborg", rate: 25.60 },
  { value: "aarhus", label: "Aarhus", rate: 24.52 },
  { value: "assens", label: "Assens", rate: 26.10 },
  { value: "ballerup", label: "Ballerup", rate: 25.50 },
  { value: "billund", label: "Billund", rate: 24.00 },
  { value: "bornholm", label: "Bornholm", rate: 26.20 },
  { value: "broenderslev", label: "Brønderslev", rate: 26.30 },
  { value: "broendby", label: "Brøndby", rate: 24.30 },
  { value: "dragor", label: "Dragør", rate: 24.80 },
  { value: "egedal", label: "Egedal", rate: 25.70 },
  { value: "esbjerg", label: "Esbjerg", rate: 26.10 },
  { value: "faaborg-midtfyn", label: "Faaborg-Midtfyn", rate: 26.10 },
  { value: "fanø", label: "Fanø", rate: 26.10 },
  { value: "faxe", label: "Faxe", rate: 25.80 },
  { value: "favrskov", label: "Favrskov", rate: 25.70 },
  { value: "fredericia", label: "Fredericia", rate: 25.50 },
  { value: "frederiksberg", label: "Frederiksberg", rate: 24.50 },
  { value: "frederikshavn", label: "Frederikshavn", rate: 26.20 },
  { value: "frederikssund", label: "Frederikssund", rate: 25.60 },
  { value: "gentofte", label: "Gentofte", rate: 24.14 },
  { value: "gladsaxe", label: "Gladsaxe", rate: 23.60 },
  { value: "glostrup", label: "Glostrup", rate: 24.60 },
  { value: "greve", label: "Greve", rate: 24.59 },
  { value: "gribskov", label: "Gribskov", rate: 25.40 },
  { value: "guldborgsund", label: "Guldborgsund", rate: 25.80 },
  { value: "haderslev", label: "Haderslev", rate: 26.30 },
  { value: "halsnaes", label: "Halsnæs", rate: 25.70 },
  { value: "hedensted", label: "Hedensted", rate: 25.52 },
  { value: "helsingoer", label: "Elsinore", rate: 25.82 },
  { value: "herlev", label: "Herlev", rate: 23.70 },
  { value: "herning", label: "Herning", rate: 25.40 },
  { value: "hilleroed", label: "Hillerød", rate: 25.60 },
  { value: "hjorring", label: "Hjørring", rate: 26.21 },
  { value: "hoje-taastrup", label: "Høje-Taastrup", rate: 24.60 },
  { value: "holbaek", label: "Holbæk", rate: 25.30 },
  { value: "holstebro", label: "Holstebro", rate: 25.50 },
  { value: "horsens", label: "Horsens", rate: 25.69 },
  { value: "hoersholm", label: "Hørsholm", rate: 23.70 },
  { value: "hvidovre", label: "Hvidovre", rate: 25.40 },
  { value: "ikast-brande", label: "Ikast-Brande", rate: 25.10 },
  { value: "ishoj", label: "Ishøj", rate: 25.00 },
  { value: "jammerbugt", label: "Jammerbugt", rate: 25.70 },
  { value: "kalundborg", label: "Kalundborg", rate: 24.20 },
  { value: "kerteminde", label: "Kerteminde", rate: 26.10 },
  { value: "kolding", label: "Kolding", rate: 25.50 },
  { value: "koebenhavn", label: "Copenhagen", rate: 23.39 },
  { value: "koege", label: "Køge", rate: 25.26 },
  { value: "laesoe", label: "Læsø", rate: 26.30 },
  { value: "langeland", label: "Langeland", rate: 26.30 },
  { value: "lemvig", label: "Lemvig", rate: 25.70 },
  { value: "lolland", label: "Lolland", rate: 26.30 },
  { value: "lyngby-taarbaek", label: "Lyngby-Taarbæk", rate: 24.38 },
  { value: "mariagerfjord", label: "Mariagerfjord", rate: 25.90 },
  { value: "middelfart", label: "Middelfart", rate: 25.80 },
  { value: "morsoe", label: "Morsø", rate: 25.80 },
  { value: "naestved", label: "Næstved", rate: 25.00 },
  { value: "norddjurs", label: "Norddjurs", rate: 26.00 },
  { value: "nordfyns", label: "Nordfyns", rate: 26.00 },
  { value: "nyborg", label: "Nyborg", rate: 26.30 },
  { value: "odder", label: "Odder", rate: 25.10 },
  { value: "odense", label: "Odense", rate: 25.50 },
  { value: "odsherred", label: "Odsherred", rate: 26.30 },
  { value: "randers", label: "Randers", rate: 26.00 },
  { value: "rebild", label: "Rebild", rate: 25.83 },
  { value: "ringkobing-skjern", label: "Ringkøbing-Skjern", rate: 25.00 },
  { value: "ringsted", label: "Ringsted", rate: 26.10 },
  { value: "roskilde", label: "Roskilde", rate: 25.20 },
  { value: "rudersdal", label: "Rudersdal", rate: 23.47 },
  { value: "roedovre", label: "Rødovre", rate: 25.70 },
  { value: "samsoe", label: "Samsø", rate: 25.90 },
  { value: "silkeborg", label: "Silkeborg", rate: 25.50 },
  { value: "skanderborg", label: "Skanderborg", rate: 26.00 },
  { value: "skive", label: "Skive", rate: 25.50 },
  { value: "slagelse", label: "Slagelse", rate: 26.10 },
  { value: "soenderborg", label: "Sønderborg", rate: 25.70 },
  { value: "solroed", label: "Solrød", rate: 24.99 },
  { value: "soroe", label: "Sorø", rate: 26.30 },
  { value: "stevns", label: "Stevns", rate: 26.00 },
  { value: "struer", label: "Struer", rate: 25.30 },
  { value: "svendborg", label: "Svendborg", rate: 26.30 },
  { value: "syddjurs", label: "Syddjurs", rate: 25.90 },
  { value: "taarnby", label: "Tårnby", rate: 24.10 },
  { value: "thisted", label: "Thisted", rate: 25.50 },
  { value: "toender", label: "Tønder", rate: 25.30 },
  { value: "vallensbaek", label: "Vallensbæk", rate: 25.60 },
  { value: "varde", label: "Varde", rate: 25.10 },
  { value: "vejle", label: "Vejle", rate: 23.40 },
  { value: "vejen", label: "Vejen", rate: 25.80 },
  { value: "vesthimmerland", label: "Vesthimmerland", rate: 26.30 },
  { value: "viborg", label: "Viborg", rate: 25.50 },
  { value: "vordingborg", label: "Vordingborg", rate: 26.30 },
  { value: "aeroe", label: "Ærø", rate: 26.10 },
  { value: "alleroed", label: "Allerød", rate: 25.30 },
  { value: "fredensborg", label: "Fredensborg", rate: 25.30 },
  { value: "furesoe", label: "Furesø", rate: 24.88 },
  { value: "lejre", label: "Lejre", rate: 25.31 },
];

const municipalityRates: Record<string, number> = municipalities.reduce((acc, m) => {
  acc[m.value] = m.rate;
  return acc;
}, {} as Record<string, number>);

const municipalityNames: Record<string, string> = municipalities.reduce((acc, m) => {
  acc[m.value] = m.label;
  return acc;
}, {} as Record<string, string>);

const numberInputClass = "flex-1 px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const preventNegative = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
  }
};

export default function DenmarkCalculator() {
  const [grossIncome, setGrossIncome] = useState("");
  const [incomeFrequency, setIncomeFrequency] = useState("per-year");
  const [taxYear, setTaxYear] = useState("2026");
  const [municipality, setMunicipality] = useState("");
  const [churchTax, setChurchTax] = useState(false);
  const [personalAllowance, setPersonalAllowance] = useState(true);
  const [pensionType, setPensionType] = useState<"default" | "amount" | "percentage">("default");
  const [pensionValue, setPensionValue] = useState("");
  const [personalPensionType, setPersonalPensionType] = useState<"amount" | "percentage">("amount");
  const [personalPensionValue, setPersonalPensionValue] = useState("");
const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleCalculate = async (fromEnter?: boolean) => {
    if (fromEnter) {
      setButtonPressed(true);
      setTimeout(() => setButtonPressed(false), 150);
    }
    setLoading(true);
    try {
      const response = await fetch("/api/calculate/denmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grossIncome: parseFloat(grossIncome) || 0,
          frequency: incomeFrequency === "per-year" ? "year" : "month",
          municipalityTaxRate: municipality ? municipalityRates[municipality] || 25.049 : 25.049,
          churchTax,
          personalAllowance,
          taxYear,
          pensionType,
          pensionValue: parseFloat(pensionValue) || 0,
          personalPensionType,
          personalPensionValue: parseFloat(personalPensionValue) || 0,
        }),
      });

const data = await response.json();
      setResult(data);
      setShowResults(true);
    } catch (error) {
      console.error("Calculation error:", error);
    }
    setLoading(false);
  };

  const handleCalculateRef = useRef(handleCalculate);
  handleCalculateRef.current = handleCalculate;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "BUTTON") {
        e.preventDefault();
        handleCalculateRef.current(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("da-DK", {
      style: "currency",
      currency: "DKK",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#020806] text-[#2ecc71] flex flex-col">
      <main className="flex-1 px-4 md:px-8 py-8 md:py-12 pt-20 md:pt-24 max-w-2xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2ecc71] mb-2">
            Danish Income Tax Calculator
          </h1>
          <p className="text-[#2ecc71]/70 text-sm">
            Calculate your net salary in Denmark (2026)
          </p>
        </div>

        <div className="space-y-8">
          {/* Gross Income */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              Gross Income (DKK)
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="number"
                min={0}
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                onKeyDown={(e) => {
                  preventNegative(e);
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCalculate(true);
                  }
                }}
                placeholder="Enter gross income"
                className={numberInputClass}
              />
              <CustomSelect
                value={incomeFrequency}
                onValueChange={setIncomeFrequency}
                options={[
                  { value: "per-year", label: "Per year" },
                  { value: "per-month", label: "Per month" },
                ]}
                placeholder="Period"
                className="w-full sm:w-[140px]"
              />
            </div>
          </div>

          {/* Tax Year */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              Tax Year
            </label>
            <CustomSelect
              value={taxYear}
              onValueChange={setTaxYear}
              options={[
                { value: "2026", label: "2026" },
                { value: "2025", label: "2025" },
              ]}
              placeholder="Tax year"
              className="w-[180px]"
            />
          </div>

          {/* Personal Allowance */}
          <div className="flex items-center gap-3">
            <Checkbox 
              checked={personalAllowance}
              onCheckedChange={(checked) => setPersonalAllowance(checked as boolean)}
              className="w-5 h-5 border-[#2ecc71] data-[state=checked]:bg-[#f1c40f] data-[state=checked]:text-[#020806] data-[state=checked]:border-[#f1c40f]"
            />
            <label className="text-base text-[#2ecc71]">
              Personal allowance ({taxYear === "2025" ? "51,600" : "54,100"} DKK)
            </label>
          </div>

          {/* Municipality Tax Rate */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              Municipality
            </label>
            <SearchableSelect
              value={municipality}
              onValueChange={setMunicipality}
              options={municipalities}
              placeholder="Select municipality"
              className="w-full md:w-[280px]"
              formatSelected={(option) => {
                const rate = municipalityRates[option.value];
                return `${option.label} - ${rate}%`;
              }}
            />
          </div>

          {/* Church Tax */}
          <div className="flex items-center gap-3">
            <Checkbox 
              checked={churchTax}
              onCheckedChange={(checked) => setChurchTax(checked as boolean)}
              className="w-5 h-5 border-[#2ecc71] data-[state=checked]:bg-[#2ecc71] data-[state=checked]:border-[#2ecc71]"
            />
            <label className="text-base text-[#2ecc71]">
              Church Tax (Kirkeskat)
            </label>
          </div>

          {/* Company Pension */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              Company Pension Contribution (ATP) {pensionType === "percentage" ? "(% of salary)" : pensionType === "amount" ? "(DKK/month)" : "(99 kr/month)"}
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Tabs value={pensionType} onValueChange={(v) => setPensionType(v as "default" | "percentage" | "amount")} className="w-auto">
                <TabsList className="bg-transparent border border-[#2ecc71]">
                  <TabsTrigger 
                    value="default" 
                    className="px-3 md:px-4 py-2 text-sm md:text-base text-[#2ecc71] data-[state=active]:bg-[#2ecc71] data-[state=active]:text-[#020806]"
                  >
                    Default
                  </TabsTrigger>
                  <TabsTrigger 
                    value="percentage" 
                    className="px-3 md:px-4 py-2 text-sm md:text-base text-[#2ecc71] data-[state=active]:bg-[#2ecc71] data-[state=active]:text-[#020806]"
                  >
                    Percentage
                  </TabsTrigger>
                  <TabsTrigger 
                    value="amount"
                    className="px-3 md:px-4 py-2 text-sm md:text-base text-[#2ecc71] data-[state=active]:bg-[#2ecc71] data-[state=active]:text-[#020806]"
                  >
                    Amount
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              {(pensionType === "amount" || pensionType === "percentage") && (
                <Input
                  type="number"
                  min={0}
                  value={pensionValue}
                  onChange={(e) => setPensionValue(e.target.value)}
                  onKeyDown={preventNegative}
                  placeholder={pensionType === "percentage" ? "e.g., 5" : "Enter monthly amount"}
                  className={numberInputClass}
                />
              )}
            </div>
          </div>

          {/* Personal Pension */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              Personal Pension Contribution {personalPensionType === "percentage" ? "(% of salary)" : "(DKK/month)"}
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Tabs value={personalPensionType} onValueChange={(v) => setPersonalPensionType(v as "percentage" | "amount")} className="w-auto">
                <TabsList className="bg-transparent border border-[#2ecc71]">
                  <TabsTrigger 
                    value="percentage" 
                    className="px-3 md:px-4 py-2 text-sm md:text-base text-[#2ecc71] data-[state=active]:bg-[#2ecc71] data-[state=active]:text-[#020806]"
                  >
                    Percentage
                  </TabsTrigger>
                  <TabsTrigger 
                    value="amount"
                    className="px-3 md:px-4 py-2 text-sm md:text-base text-[#2ecc71] data-[state=active]:bg-[#2ecc71] data-[state=active]:text-[#020806]"
                  >
                    Amount
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Input
                type="number"
                min={0}
                value={personalPensionValue}
                onChange={(e) => setPersonalPensionValue(e.target.value)}
                onKeyDown={preventNegative}
                placeholder={personalPensionType === "percentage" ? "e.g., 5" : "Enter monthly amount"}
                className={numberInputClass}
              />
            </div>
          </div>

          {/* Calculate Button */}
            <div className="flex gap-4">
              <Button 
                type="button"
                disabled={loading}
                onClick={() => handleCalculate(false)}
                className={`px-6 py-3 bg-[#f1c40f] text-[#020806] text-lg font-bold rounded-lg hover:bg-[#f39c12] transition-all duration-300 shadow-lg ${buttonPressed ? 'scale-95 bg-[#e67e22]' : ''}`}
              >
                Calculate
              </Button>
              {result && (
                <button 
                  type="button"
                  onClick={() => setShowResults(true)}
                  className="text-lg text-[#2ecc71] underline hover:text-[#2ecc71]/80 transition-all"
                >
                  View Results
                </button>
              )}
            </div>
        </div>

        {/* Results Dialog */}
        <Dialog open={showResults} onOpenChange={(open) => {
            if (!open) setShowResults(false);
          }}>
          {result && (
          <DialogContent 
            showCloseButton={false}
            className="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-45%] w-[95vw] xl:w-[66vw] max-h-[90vh] xl:max-h-[85vh] bg-[#0a1f15] border-[#2ecc71]/30 p-3 xl:p-6 overflow-y-auto"
            data-dialog-open={showResults}
          >
            <div>
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl font-bold text-[#2ecc71] mb-4">
                  Your Tax Breakdown
                </DialogTitle>
              </DialogHeader>

              {/* Main 2-column layout */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-6">
                
                {/* LEFT COLUMN - Summary Cards */}
                <div className="xl:col-span-5 space-y-3">
                  {/* Annual Gross */}
                  <div className="bg-[#020806] rounded-lg p-3 md:p-4">
                    <p className="text-sm font-bold text-[#2ecc71] mb-1">Annual Gross</p>
                    <p className="text-lg md:text-xl font-bold text-[#2ecc71] truncate">
                      {formatCurrency(result!.breakdown.totalGross)}
                    </p>
                  </div>

                  {/* Tax Info */}
                  <div className="bg-[#020806] rounded-lg p-3 md:p-4 space-y-1">
                    <p className="text-sm font-bold text-[#2ecc71] mb-1">Tax Info</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2ecc71]/70">Personal Allowance</span>
                      <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(result!.breakdown.personalAllowance)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2ecc71]/70">Taxable</span>
                      <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(result!.breakdown.taxableIncome)}</span>
                    </div>
                  </div>

                  {/* Net Income Breakdown */}
                  <div className="bg-[#020806] rounded-lg p-3 md:p-4 space-y-1">
                    <p className="text-sm font-bold text-[#2ecc71] mb-1">Net Income</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2ecc71]/70">Weekly</span>
                      <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(result!.netIncome.weekly)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2ecc71]/70">Monthly</span>
                      <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(result!.netIncome.monthly)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2ecc71]/70">Annual</span>
                      <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(result!.netIncome.annual)}</span>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-xs text-[#2ecc71]/50 pt-2">
                    * This is an estimate. For exact calculations, please consult a tax professional.
                  </p>
                </div>

                {/* RIGHT COLUMN - Tables */}
                <div className="xl:col-span-7 space-y-4">
                  {/* Income Breakdown Table */}
                  <div>
                    <h3 className="text-base font-bold text-[#2ecc71] mb-2">Income Breakdown</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs md:text-sm table-fixed">
                        <colgroup>
                          <col className="w-[120px]" />
                          <col className="w-[100px]" />
                          <col className="w-[100px]" />
                          <col className="w-[100px]" />
                        </colgroup>
                        <thead>
                          <tr className="border-b border-[#2ecc71]/30">
                            <th className="text-left py-1.5 px-2 md:px-3 text-[#2ecc71] font-medium whitespace-nowrap w-[120px]">Item</th>
                            <th className="text-right py-1.5 px-2 md:px-3 text-[#2ecc71] font-medium whitespace-nowrap w-[100px]">Weekly</th>
                            <th className="text-right py-1.5 px-2 md:px-3 text-[#2ecc71] font-medium whitespace-nowrap w-[100px]">Monthly</th>
                            <th className="text-right py-1.5 px-2 md:px-3 text-[#2ecc71] font-medium whitespace-nowrap w-[100px]">Annual</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#2ecc71] whitespace-nowrap w-[120px]">Gross Salary</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#2ecc71] whitespace-nowrap w-[100px]">{formatCurrency(result!.breakdown.grossSalary / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#2ecc71] whitespace-nowrap w-[100px]">{formatCurrency(result!.breakdown.grossSalary / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#2ecc71] whitespace-nowrap w-[100px]">{formatCurrency(result!.breakdown.grossSalary)}</td>
                          </tr>
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px]">ATP Pension</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.breakdown.pensionContribution / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.breakdown.pensionContribution / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.breakdown.pensionContribution)}</td>
                          </tr>
                          {result!.breakdown.personalPensionContribution > 0 && (
                            <tr className="border-b border-[#2ecc71]/20">
                              <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px]">Personal Pension</td>
                              <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.breakdown.personalPensionContribution / 52)}</td>
                              <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.breakdown.personalPensionContribution / 12)}</td>
                              <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.breakdown.personalPensionContribution)}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Deductions Table */}
                  <div>
                    <h3 className="text-base font-bold text-[#2ecc71] mb-2">Taxes</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs md:text-sm table-fixed">
                        <colgroup>
                          <col className="w-[120px]" />
                          <col className="w-[100px]" />
                          <col className="w-[100px]" />
                          <col className="w-[100px]" />
                        </colgroup>
                        <tbody>
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px]">Bottom Tax</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.bottomTax / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.bottomTax / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.bottomTax)}</td>
                          </tr>
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px]">Middle Tax</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.middleTax / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.middleTax / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.middleTax)}</td>
                          </tr>
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px]">Top Tax</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.topTax / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.topTax / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.topTax)}</td>
                          </tr>
                          {result!.deductions.topTopTax > 0 && (
                            <tr className="border-b border-[#2ecc71]/20">
                              <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px]">Top Top Tax</td>
                              <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.topTopTax / 52)}</td>
                              <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.topTopTax / 12)}</td>
                              <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.topTopTax)}</td>
                            </tr>
                          )}
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px]">Municipal Tax</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.municipalTax / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.municipalTax / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.municipalTax)}</td>
                          </tr>
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px]">Labour Market</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.labourMarketTax / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.labourMarketTax / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.labourMarketTax)}</td>
                          </tr>
                          {result!.deductions.churchTax > 0 && (
                            <tr className="border-b border-[#2ecc71]/20">
                              <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px]">Church Tax</td>
                              <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.churchTax / 52)}</td>
                              <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.churchTax / 12)}</td>
                              <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.churchTax)}</td>
                            </tr>
                          )}
                          <tr className="border-b border-[#2ecc71]/30 bg-[#2ecc71]/10">
                            <td className="py-1.5 px-2 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap w-[120px]">Total Tax</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.total / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.total / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.total)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Button - Bottom Left */}
              <div className="flex justify-start mt-4">
                <Button 
                  onClick={() => setShowResults(false)}
                  className="px-5 py-2 bg-[#f1c40f] text-[#020806] text-base font-bold rounded-lg hover:bg-[#f39c12] transition-all duration-300 shadow-lg"
                >
                  Return
                </Button>
              </div>
            </div>
          </DialogContent>
          )}
        </Dialog>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Denmark Tax Calculator",
              "alternateName": "Danish Salary Calculator",
              "description": "Calculate your take home pay in Denmark with our free, accurate tax calculator. Includes ATP, pension contributions, and AM-contribution for 2025-2026.",
              "url": "https://gluub.com/calculator/denmark",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "DKK"
              },
              "featureList": [
                "Danish income tax calculation",
                "ATP pension contribution",
                "Labor market contribution (AM-contribution)",
                "Pension contributions",
                "Take home pay breakdown"
              ],
              "browserRequirements": "Requires JavaScript"
            }),
          }}
        />
      </main>
    </div>
  );
}
