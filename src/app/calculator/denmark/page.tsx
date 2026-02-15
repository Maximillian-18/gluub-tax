"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomSelect } from "@/components/CustomSelect";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

interface CalculationResult {
  breakdown: {
    grossSalary: number;
    totalGross: number;
    pensionContribution: number;
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
  };
}

const numberInputClass = "flex-1 px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const preventNegative = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "-" || e.key === "e" || e.key === "E") {
    e.preventDefault();
  }
};

export default function DenmarkCalculator() {
  const [grossIncome, setGrossIncome] = useState("");
  const [incomeFrequency, setIncomeFrequency] = useState("per-year");
  const [municipalityTaxRate, setMunicipalityTaxRate] = useState("25.049");
  const [churchTax, setChurchTax] = useState(false);
  const [pensionType, setPensionType] = useState<"default" | "amount" | "percentage">("default");
  const [pensionValue, setPensionValue] = useState("");
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
      const response = await fetch("/api/calculate/denmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grossIncome: parseFloat(grossIncome) || 0,
          frequency: incomeFrequency === "per-year" ? "year" : "month",
          municipalityTaxRate: parseFloat(municipalityTaxRate) || 25.049,
          churchTax,
          pensionType,
          pensionValue: parseFloat(pensionValue) || 0,
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
    return new Intl.NumberFormat("da-DK", {
      style: "currency",
      currency: "DKK",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#05100a] text-[#2ecc71] flex flex-col">
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

          {/* Municipality Tax Rate */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              Municipality Tax Rate (%)
            </label>
            <Input
              type="number"
              value={municipalityTaxRate}
              onChange={(e) => setMunicipalityTaxRate(e.target.value)}
              onKeyDown={preventNegative}
              placeholder="25.049"
              className={numberInputClass}
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

          {/* Pension Type */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              Pension (ATP)
            </label>
            <CustomSelect
              value={pensionType}
              onValueChange={(value) => setPensionType(value as "default" | "amount" | "percentage")}
              options={[
                { value: "default", label: "Default (99 kr/month)" },
                { value: "amount", label: "Custom Amount" },
                { value: "percentage", label: "Custom %" },
              ]}
              placeholder="Select pension type"
              className="w-full md:w-[250px]"
            />
          </div>

          {/* Pension Value (Conditional) */}
          {(pensionType === "amount" || pensionType === "percentage") && (
            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                {pensionType === "amount" ? "Custom Pension Amount (DKK/year)" : "Custom Pension %"}
              </label>
              <Input
                type="number"
                value={pensionValue}
                onChange={(e) => setPensionValue(e.target.value)}
                onKeyDown={preventNegative}
                placeholder={pensionType === "amount" ? "Enter annual amount" : "Enter percentage"}
                className={numberInputClass}
              />
            </div>
          )}

          {/* Calculate Button */}
          <Button 
            type="button"
            disabled={loading}
            onClick={() => handleCalculate(false)}
            className={`px-6 py-3 bg-[#f1c40f] text-[#05100a] text-lg font-bold rounded-lg hover:bg-[#f39c12] transition-all duration-300 shadow-lg ${buttonPressed ? 'scale-95 bg-[#e67e22]' : ''}`}
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
              <div className="bg-[#05100a] rounded-lg p-4">
                <p className="text-xs md:text-sm text-[#2ecc71]/70 mb-1">Annual Gross</p>
                <p className="text-xl md:text-2xl font-bold text-[#2ecc71]">
                  {formatCurrency(result.breakdown.totalGross)}
                </p>
              </div>
              <div className="bg-[#05100a] rounded-lg p-4">
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
                    <tr className="border-b border-[#2ecc71]/30 bg-[#2ecc71]/10">
                      <td className="py-2 px-1 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap text-xs md:text-sm">Total Gross</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.totalGross / 52)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.totalGross / 12)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.totalGross)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deductions - State Taxes */}
            <div className="mb-8 -mx-2 md:mx-0">
              <h3 className="text-lg font-bold text-[#2ecc71] mb-4">State Taxes</h3>
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
                      <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Bottom Tax</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.bottomTax / 52)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.bottomTax / 12)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.bottomTax)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Middle Tax</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.middleTax / 52)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.middleTax / 12)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.middleTax)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Top Tax</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.topTax / 52)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.topTax / 12)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.topTax)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Top-Top Tax</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.topTopTax / 52)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.topTopTax / 12)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.topTopTax)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deductions - Local Taxes */}
            <div className="mb-8 -mx-2 md:mx-0">
              <h3 className="text-lg font-bold text-[#2ecc71] mb-4">Local Taxes</h3>
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
                      <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Municipal Tax</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.municipalTax / 52)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.municipalTax / 12)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.municipalTax)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Labour Market Tax</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.labourMarketTax / 52)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.labourMarketTax / 12)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.labourMarketTax)}</td>
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
                    <tr className="border-b border-[#2ecc71]/20">
                      <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Pension (ATP)</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.pensionContribution / 52)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.pensionContribution / 12)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.pensionContribution)}</td>
                    </tr>
                    <tr className="border-b border-[#2ecc71]/30 bg-[#2ecc71]/10">
                      <td className="py-2 px-1 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap text-xs md:text-sm">Social Insurance Total</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.pensionContribution / 52)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.pensionContribution / 12)}</td>
                      <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.pensionContribution)}</td>
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

            {/* Effective Tax Rate */}
            <div className="mb-8 bg-[#05100a] rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-[#2ecc71] font-bold">Effective Tax Rate</span>
                <span className="text-lg md:text-xl font-bold text-[#f1c40f]">
                  {result.breakdown.totalGross > 0 
                    ? ((result.deductions.total / result.breakdown.totalGross) * 100).toFixed(1)
                    : 0}%
                </span>
              </div>
            </div>

            {/* Net Pay */}
            <div className="mt-8 bg-[#05100a] rounded-lg p-4 space-y-2">
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

      <Footer />
    </div>
  );
}
