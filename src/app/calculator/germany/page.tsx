"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomSelect } from "@/components/CustomSelect";
import { Button } from "@/components/ui/button";

interface CalculationResult {
  breakdown: {
    grossSalary: number;
    totalGross: number;
  };
  deductions: {
    incomeTax: number;
    solidaritySurcharge: number;
    churchTax: number;
    healthInsurance: number;
    nursingCareInsurance: number;
    pensionInsurance: number;
    unemploymentInsurance: number;
    total: number;
  };
  netIncome: {
    annual: number;
    monthly: number;
  };
}

const numberInputClass = "flex-1 px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const preventNegative = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "-" || e.key === "e" || e.key === "E") {
    e.preventDefault();
  }
};

const GERMAN_STATES = [
  { value: "baden-wurttemberg", label: "Baden-Württemberg" },
  { value: "bayern", label: "Bayern" },
  { value: "berlin", label: "Berlin" },
  { value: "brandenburg", label: "Brandenburg" },
  { value: "bremen", label: "Bremen" },
  { value: "hamburg", label: "Hamburg" },
  { value: "hessen", label: "Hessen" },
  { value: "mecklenburg-vorpommern", label: "Mecklenburg-Vorpommern" },
  { value: "niedersachsen", label: "Niedersachsen" },
  { value: "nordrhein-westfalen", label: "Nordrhein-Westfalen" },
  { value: "rheinland-pfalz", label: "Rheinland-Pfalz" },
  { value: "saarland", label: "Saarland" },
  { value: "sachsen", label: "Sachsen" },
  { value: "sachsen-anhalt", label: "Sachsen-Anhalt" },
  { value: "schleswig-holstein", label: "Schleswig-Holstein" },
  { value: "thuringen", label: "Thüringen" },
];

export default function GermanyCalculator() {
  const [grossIncome, setGrossIncome] = useState("");
  const [incomeFrequency, setIncomeFrequency] = useState("per-year");
  const [taxCategory, setTaxCategory] = useState("1");
  const [churchTax, setChurchTax] = useState(false);
  const [hasChildren, setHasChildren] = useState("no");
  const [healthInsurance, setHealthInsurance] = useState("statutory");
  const [healthInsuranceSupplementary, setHealthInsuranceSupplementary] = useState("2.9");
  const [pensionInsurance, setPensionInsurance] = useState("statutory");
  const [unemploymentInsurance, setUnemploymentInsurance] = useState("statutory");
  const [state, setState] = useState("bayern");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleCalculate = async (fromEnter?: boolean) => {
    if (fromEnter) {
      setButtonPressed(true);
      setTimeout(() => setButtonPressed(false), 150);
    }
    setLoading(true);
    try {
      const response = await fetch("/api/calculate/germany", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grossIncome: parseFloat(grossIncome) || 0,
          frequency: incomeFrequency === "per-year" ? "year" : "month",
          taxCategory: taxCategory as "1" | "2" | "3" | "4" | "5" | "6",
          churchTax,
          hasChildren,
          healthInsurance,
          healthInsuranceSupplementary: parseFloat(healthInsuranceSupplementary) || 2.9,
          pensionInsurance,
          unemploymentInsurance,
          state,
        }),
      });

      const data = await response.json();
      setResult(data);
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
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#020806] text-[#2ecc71] flex flex-col">
      <main className="flex-1 px-4 md:px-8 py-8 md:py-12 pt-20 md:pt-24 max-w-2xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2ecc71] mb-2">
            German Income Tax Calculator
          </h1>
          <p className="text-[#2ecc71]/70 text-sm">
            Calculate your net salary in Germany (2026)
          </p>
        </div>

        <div className="space-y-6">
          {/* Gross Income */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              Gross Salary (€)
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                onKeyDown={preventNegative}
                placeholder="Enter gross salary"
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
              value="2026"
              onValueChange={() => {}}
              options={[
                { value: "2026", label: "2026" },
                { value: "2025", label: "2025" },
              ]}
              placeholder="Tax year"
              className="w-[180px]"
            />
          </div>

          {/* Tax Category */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              Tax Category (Steuerklasse)
            </label>
            <CustomSelect
              value={taxCategory}
              onValueChange={setTaxCategory}
              options={[
                { value: "1", label: "Category I - Single" },
                { value: "2", label: "Category II - Single parent" },
                { value: "3", label: "Category III - Married (high income)" },
                { value: "4", label: "Category IV - Married (equal income)" },
                { value: "5", label: "Category V - Married (low income)" },
                { value: "6", label: "Category VI - Second job" },
              ]}
              placeholder="Select tax category"
              className="w-full md:w-[300px]"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              State (Bundesland)
            </label>
            <CustomSelect
              value={state}
              onValueChange={setState}
              options={GERMAN_STATES}
              placeholder="Select state"
              className="w-full md:w-[250px]"
            />
          </div>

          {/* Health Insurance */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              Health Insurance (Krankenversicherung)
            </label>
            <CustomSelect
              value={healthInsurance}
              onValueChange={setHealthInsurance}
              options={[
                { value: "statutory", label: "Statutory (Gesetzlich)" },
                { value: "private", label: "Private (Privat)" },
                { value: "none", label: "None / Exempt" },
              ]}
              placeholder="Select health insurance"
              className="w-full md:w-[250px]"
            />
          </div>

          {/* Health Insurance Supplementary */}
          {healthInsurance === "statutory" && (
            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                Supplementary Contribution (Zusatzbeitrag) %
              </label>
              <Input
                type="number"
                value={healthInsuranceSupplementary}
                onChange={(e) => setHealthInsuranceSupplementary(e.target.value)}
                onKeyDown={preventNegative}
                placeholder="2.9"
                className="w-24 px-3 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          )}

          {/* Pension Insurance */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              Pension Insurance (Rentenversicherung)
            </label>
            <CustomSelect
              value={pensionInsurance}
              onValueChange={setPensionInsurance}
              options={[
                { value: "statutory", label: "Statutory (Gesetzlich)" },
                { value: "private", label: "Private (Privat)" },
                { value: "none", label: "None / Exempt" },
              ]}
              placeholder="Select pension insurance"
              className="w-full md:w-[250px]"
            />
          </div>

          {/* Unemployment Insurance */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              Unemployment Insurance (Arbeitslosenversicherung)
            </label>
            <CustomSelect
              value={unemploymentInsurance}
              onValueChange={setUnemploymentInsurance}
              options={[
                { value: "statutory", label: "Statutory (Gesetzlich)" },
                { value: "private", label: "Private (Privat)" },
                { value: "none", label: "None / Exempt" },
              ]}
              placeholder="Select unemployment insurance"
              className="w-full md:w-[250px]"
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
              Church Tax (Kirchensteuer)
            </label>
          </div>

          {/* Has Children */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              Do you have children? (Kinder)
            </label>
            <CustomSelect
              value={hasChildren}
              onValueChange={setHasChildren}
              options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
              ]}
              placeholder="Do you have children?"
              className="w-full md:w-[200px]"
            />
          </div>

          {/* Calculate Button */}
          <Button 
            type="button"
            onClick={() => handleCalculate(true)}
            disabled={loading}
            className={`px-6 py-3 bg-[#f1c40f] text-[#020806] text-lg font-bold rounded-lg hover:bg-[#f39c12] transition-all duration-300 shadow-lg ${buttonPressed ? 'scale-95 bg-[#e67e22]' : ''}`}
          >
            Calculate
          </Button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-12 bg-[#0a1f15] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#2ecc71] mb-6">
              Your Tax Breakdown
            </h2>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#020806] rounded-lg p-4">
                <p className="text-xs md:text-sm text-[#2ecc71]/70 mb-1">Annual Gross</p>
                <p className="text-xl md:text-2xl font-bold text-[#2ecc71]">
                  {formatCurrency(result.breakdown.totalGross)}
                </p>
              </div>
              <div className="bg-[#020806] rounded-lg p-4">
                <p className="text-xs md:text-sm text-[#2ecc71]/70 mb-1">Annual Net</p>
                <p className="text-xl md:text-2xl font-bold text-[#2ecc71]">
                  {formatCurrency(result.netIncome.annual)}
                </p>
              </div>
            </div>

            {/* Income Breakdown */}
            <div className="mb-8 -mx-2 md:mx-0">
              <h3 className="text-lg font-bold text-[#2ecc71] mb-4">Income Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-[#2ecc71]/30">
                      <th className="text-left py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Item</th>
                      <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Weekly</th>
                      <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Monthly</th>
                      <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Annual</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">Gross Salary</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.totalGross / 52)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.totalGross / 12)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.totalGross)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deductions - Taxes */}
            <div className="mb-8 -mx-2 md:mx-0">
              <h3 className="text-lg font-bold text-[#2ecc71] mb-4">Taxes</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-[#2ecc71]/30">
                      <th className="text-left py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Tax</th>
                      <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Weekly</th>
                      <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Monthly</th>
                      <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Annual</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Wage Tax</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.incomeTax / 52)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.incomeTax / 12)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.incomeTax)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Solidarity Surcharge</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.solidaritySurcharge / 52)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.solidaritySurcharge / 12)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.solidaritySurcharge)}</td>
                    </tr>
                    {result.deductions.churchTax > 0 && (
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Church Tax</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.churchTax / 52)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.churchTax / 12)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.churchTax)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deductions - Social Insurance */}
            <div className="mb-8 -mx-2 md:mx-0">
              <h3 className="text-lg font-bold text-[#2ecc71] mb-4">Social Insurance</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-[#2ecc71]/30">
                      <th className="text-left py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Deduction</th>
                      <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Weekly</th>
                      <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Monthly</th>
                      <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Annual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.deductions.healthInsurance > 0 && (
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Health Insurance</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.healthInsurance / 52)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.healthInsurance / 12)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.healthInsurance)}</td>
                      </tr>
                    )}
                    {result.deductions.nursingCareInsurance > 0 && (
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Nursing Care Insurance</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.nursingCareInsurance / 52)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.nursingCareInsurance / 12)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.nursingCareInsurance)}</td>
                      </tr>
                    )}
                    {result.deductions.pensionInsurance > 0 && (
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Pension Insurance</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.pensionInsurance / 52)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.pensionInsurance / 12)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.pensionInsurance)}</td>
                      </tr>
                    )}
                    {result.deductions.unemploymentInsurance > 0 && (
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Unemployment Insurance</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.unemploymentInsurance / 52)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.unemploymentInsurance / 12)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.unemploymentInsurance)}</td>
                      </tr>
                    )}
                    <tr className="border-b border-[#2ecc71]/30 bg-[#2ecc71]/10">
                      <td className="py-2 px-1 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap text-xs md:text-sm">Social Insurance Total</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap text-xs md:text-sm">-{formatCurrency((result.deductions.healthInsurance + result.deductions.nursingCareInsurance + result.deductions.pensionInsurance + result.deductions.unemploymentInsurance) / 52)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap text-xs md:text-sm">-{formatCurrency((result.deductions.healthInsurance + result.deductions.nursingCareInsurance + result.deductions.pensionInsurance + result.deductions.unemploymentInsurance) / 12)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.healthInsurance + result.deductions.nursingCareInsurance + result.deductions.pensionInsurance + result.deductions.unemploymentInsurance)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Deductions */}
            <div className="mb-8 -mx-2 md:mx-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <tbody>
                    <tr className="border-b border-[#2ecc71]/30 bg-[#2ecc71]/10">
                      <td className="py-3 px-1 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap text-sm md:text-base">Total Deductions</td>
                      <td className="text-right py-3 px-1 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap text-sm md:text-base">-{formatCurrency(result.deductions.total / 52)}</td>
                      <td className="text-right py-3 px-1 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap text-sm md:text-base">-{formatCurrency(result.deductions.total / 12)}</td>
                      <td className="text-right py-3 px-1 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap text-sm md:text-base">-{formatCurrency(result.deductions.total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Net Pay */}
            <div className="mt-8 bg-[#020806] rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-[#2ecc71]">Weekly Net</span>
                <span className="text-lg md:text-xl font-bold text-[#2ecc71]">{formatCurrency(result.netIncome.annual / 52)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2ecc71]">Monthly Net</span>
                <span className="text-lg md:text-xl font-bold text-[#2ecc71]">{formatCurrency(result.netIncome.monthly)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2ecc71]">Annual Net</span>
                <span className="text-lg md:text-xl font-bold text-[#2ecc71]">{formatCurrency(result.netIncome.annual)}</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#2ecc71]/50">
              * This is an estimate. For exact calculations, please consult a tax professional.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
