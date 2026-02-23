"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/CustomSelect";
import { SearchableSelect } from "@/components/SearchableSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Plus, X } from "lucide-react";

const numberInputClass = "flex-1 px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const preventNegative = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
  }
};

interface CalculationResult {
  breakdown: {
    grossIncome: number;
    aboveTheLineDeductions: {
      contribution401k: number;
      contributionIRA: number;
      studentLoanInterest: number;
      total: number;
    };
    agi: number;
    deduction: {
      type: string;
      amount: number;
      standardAmount?: number;
      itemizedAmount?: number;
      breakdown?: {
        mortgage: number;
        charity: number;
        state_tax: number;
        property_tax: number;
        medical: number;
      } | null;
    };
    taxableIncome: number;
  };
  taxes: {
    federal: {
      amount: number;
      marginalRate: number;
      effectiveRate: number;
    };
    fica: {
      socialSecurity: number;
      medicare: number;
      additionalMedicare: number;
      total: number;
    };
    state: {
      amount: number;
      state: string;
      marginalRate: number;
    };
    local: {
      amount: number;
      rate: number;
    };
    total: number;
  };
  netIncome: {
    annual: number;
    monthly: number;
    weekly: number;
  };
}

const STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District of Columbia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

const ITEMIZED_DEDUCTION_TYPES = [
  { value: "mortgage", label: "Mortgage Interest" },
  { value: "charity", label: "Charitable Donations" },
  { value: "state_tax", label: "State Income Tax" },
  { value: "property_tax", label: "Property Tax" },
  { value: "medical", label: "Medical Expenses" },
];

interface ItemizedDeduction {
  id: number;
  type: string;
  amount: number;
}

export default function USACalculator() {
  const [grossIncome, setGrossIncome] = useState("");
  const [incomeFrequency, setIncomeFrequency] = useState("per-year");
  const [taxYear, setTaxYear] = useState("2026");
  const [filingStatus, setFilingStatus] = useState("single");
  const [state, setState] = useState("CA");
  const [contribution401k, setContribution401k] = useState("");
  const [contributionIRA, setContributionIRA] = useState("");
  const [studentLoanInterest, setStudentLoanInterest] = useState("");
  const [localTaxRate, setLocalTaxRate] = useState("");
  const [deductionType, setDeductionType] = useState<"standard" | "itemized">("standard");
  const [itemizedDeductions, setItemizedDeductions] = useState<ItemizedDeduction[]>([]);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedDeductionType = localStorage.getItem("usa-deduction-type");
    if (savedDeductionType === "standard" || savedDeductionType === "itemized") {
      setDeductionType(savedDeductionType);
    }
  }, []);

  const handleDeductionTypeChange = (type: "standard" | "itemized") => {
    setDeductionType(type);
    localStorage.setItem("usa-deduction-type", type);
  };

  const addItemizedDeduction = () => {
    const newId = itemizedDeductions.length > 0
      ? Math.max(...itemizedDeductions.map(d => d.id)) + 1
      : 1;
    setItemizedDeductions([...itemizedDeductions, { id: newId, type: "mortgage", amount: 0 }]);
  };

  const removeItemizedDeduction = (id: number) => {
    setItemizedDeductions(itemizedDeductions.filter(d => d.id !== id));
  };

  const updateItemizedDeduction = (id: number, field: "type" | "amount", value: string | number) => {
    setItemizedDeductions(itemizedDeductions.map(d =>
      d.id === id ? { ...d, [field]: field === "amount" ? Number(value) : value } : d
    ));
  };

  const handleCalculate = async (fromEnter?: boolean) => {
    if (fromEnter) {
      setButtonPressed(true);
      setTimeout(() => setButtonPressed(false), 150);
    }
    setLoading(true);
    try {
      const response = await fetch("/api/calculate/usa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grossIncome: parseFloat(grossIncome) || 0,
          frequency: incomeFrequency === "per-year" ? "year" : incomeFrequency === "per-month" ? "month" : "week",
          taxYear: taxYear as "2025" | "2026",
          filingStatus: filingStatus as "single" | "married_jointly" | "married_separately" | "head_of_household",
          state,
          contribution401k: parseFloat(contribution401k) || 0,
          contributionIRA: parseFloat(contributionIRA) || 0,
          studentLoanInterest: parseFloat(studentLoanInterest) || 0,
          localTaxRate: parseFloat(localTaxRate) || 0,
          deductionType,
          itemizedDeductions: itemizedDeductions.map(d => ({ type: d.type, amount: d.amount })),
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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#020806] text-[#2ecc71]">
      <main className="flex-1 px-4 md:px-8 py-8 md:py-12 pt-20 md:pt-24 max-w-2xl mx-auto w-full">
        <div className="w-full">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#2ecc71] mb-2">
              USA Take Home Pay Calculator
            </h1>
            <p className="text-[#2ecc71]/70 text-sm mb-4">
              Calculate your take home pay in the USA ({taxYear})
            </p>
            <div className="flex flex-wrap gap-4">
              <CustomSelect
                value={taxYear}
                onValueChange={setTaxYear}
                options={[
                  { value: "2026", label: "2026" },
                  { value: "2025", label: "2025" },
                ]}
                placeholder="Tax Year"
                className="w-[120px]"
              />
              <SearchableSelect
                value={state}
                onValueChange={setState}
                options={STATES}
                placeholder="Select State"
                className="w-[180px]"
              />
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleCalculate(true); }} className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                Gross Income ($)
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
                    { value: "per-week", label: "Per week" },
                  ]}
                  placeholder="Per year"
                  className="w-full sm:w-[140px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                Filing Status
              </label>
              <CustomSelect
                value={filingStatus}
                onValueChange={setFilingStatus}
                options={[
                  { value: "single", label: "Single" },
                  { value: "married_jointly", label: "Married Filing Jointly" },
                  { value: "married_separately", label: "Married Filing Separately" },
                  { value: "head_of_household", label: "Head of Household" },
                ]}
                placeholder="Select filing status"
                className="w-full md:w-[240px]"
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2 flex items-center gap-2">
                401(k) Contribution
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center text-sm text-[#2ecc71]/60">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10} className="bg-[#020806] border border-[#2ecc71]/30 text-[#2ecc71] text-xs max-w-[320px] p-3">
                    <p className="leading-normal">Traditional 401(k) contributions reduce your taxable income.</p>
                    <p className="leading-normal text-[#2ecc71]/70 mt-1">2026 limit: $23,500</p>
                  </TooltipContent>
                </Tooltip>
              </label>
              <Input
                type="number"
                min={0}
                value={contribution401k}
                onChange={(e) => setContribution401k(e.target.value)}
                onKeyDown={preventNegative}
                placeholder="Enter 401(k) contribution"
                className="w-full px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2 flex items-center gap-2">
                Traditional IRA Contribution
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center text-sm text-[#2ecc71]/60">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10} className="bg-[#020806] border border-[#2ecc71]/30 text-[#2ecc71] text-xs max-w-[320px] p-3">
                    <p className="leading-normal">Traditional IRA contributions may be tax-deductible.</p>
                    <p className="leading-normal text-[#2ecc71]/70 mt-1">2026 limit: $7,000 ($8,000 if 50+)</p>
                  </TooltipContent>
                </Tooltip>
              </label>
              <Input
                type="number"
                min={0}
                value={contributionIRA}
                onChange={(e) => setContributionIRA(e.target.value)}
                onKeyDown={preventNegative}
                placeholder="Enter IRA contribution"
                className="w-full px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2 flex items-center gap-2">
                Student Loan Interest
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center text-sm text-[#2ecc71]/60">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10} className="bg-[#020806] border border-[#2ecc71]/30 text-[#2ecc71] text-xs max-w-[320px] p-3">
                    <p className="leading-normal">You can deduct up to $2,500 of student loan interest paid.</p>
                    <p className="leading-normal text-[#2ecc71]/70 mt-1">Income limits apply for this deduction.</p>
                  </TooltipContent>
                </Tooltip>
              </label>
              <Input
                type="number"
                min={0}
                value={studentLoanInterest}
                onChange={(e) => setStudentLoanInterest(e.target.value)}
                onKeyDown={preventNegative}
                placeholder="Enter student loan interest paid"
                className="w-full px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2 flex items-center gap-2">
                Local Tax Rate (%)
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center text-sm text-[#2ecc71]/60">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10} className="bg-[#020806] border border-[#2ecc71]/30 text-[#2ecc71] text-xs max-w-[320px] p-3">
                    <p className="leading-normal">Some cities/counties charge local income tax.</p>
                    <p className="leading-normal text-[#2ecc71]/70 mt-1">NYC: ~3.876% | Most areas: 0%</p>
                  </TooltipContent>
                </Tooltip>
              </label>
              <Input
                type="number"
                min={0}
                max={15}
                step={0.001}
                value={localTaxRate}
                onChange={(e) => setLocalTaxRate(e.target.value)}
                onKeyDown={preventNegative}
                placeholder="Enter local tax rate (e.g. 3.876 for NYC)"
                className="w-full px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>

            {/* Deduction Type Toggle */}
            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                Deduction Type
              </label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={deductionType === "standard"}
                    onCheckedChange={() => handleDeductionTypeChange("standard")}
                    className="w-5 h-5 border-[#2ecc71] data-[state=checked]:bg-[#2ecc71] data-[state=checked]:border-[#2ecc71]"
                  />
                  <label className="text-base text-[#2ecc71]">
                    Standard Deduction
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={deductionType === "itemized"}
                    onCheckedChange={() => handleDeductionTypeChange("itemized")}
                    className="w-5 h-5 border-[#2ecc71] data-[state=checked]:bg-[#2ecc71] data-[state=checked]:border-[#2ecc71]"
                  />
                  <label className="text-base text-[#2ecc71]">
                    Itemized Deductions
                  </label>
                </div>
              </div>
              {deductionType === "itemized" && (
                <p className="mt-2 text-sm text-[#2ecc71]/70">
                  Itemized deductions only reduce your tax if the total exceeds the standard deduction. The calculator will automatically use whichever is higher.
                </p>
              )}
            </div>

            {/* Itemized Deductions */}
            {deductionType === "itemized" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-lg font-bold text-[#2ecc71]">
                    Itemized Deductions
                  </label>
                  <Button
                    type="button"
                    onClick={addItemizedDeduction}
                    variant="outline"
                    className="border-[#2ecc71] text-[#2ecc71] hover:bg-[#2ecc71]/10"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
                
                {itemizedDeductions.map((deduction) => (
                  <div key={deduction.id} className="flex gap-2 items-center">
                    <CustomSelect
                      value={deduction.type}
                      onValueChange={(value) => updateItemizedDeduction(deduction.id, "type", value)}
                      options={ITEMIZED_DEDUCTION_TYPES}
                      placeholder="Select type"
                      className="w-[200px]"
                      position="top"
                    />
                    <Input
                      type="number"
                      min={0}
                      value={deduction.amount || ""}
                      onChange={(e) => updateItemizedDeduction(deduction.id, "amount", e.target.value)}
                      onKeyDown={preventNegative}
                      placeholder="Amount"
                      className="flex-1 px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <Button
                      type="button"
                      onClick={() => removeItemizedDeduction(deduction.id)}
                      className="h-9 px-2 border border-[#2ecc71] text-[#2ecc71] bg-transparent hover:bg-[#2ecc71]/20 active:bg-[#2ecc71]/30"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Button 
              type="submit"
              disabled={loading}
              className={`px-6 py-3 bg-[#f1c40f] text-[#020806] text-lg font-bold rounded-lg hover:bg-[#f39c12] transition-all duration-300 shadow-lg ${buttonPressed ? 'scale-95 bg-[#e67e22]' : 'active:scale-95 active:bg-[#e67e22]'}`}
            >
              Calculate
            </Button>
          </form>

          {result && (
            <div className="mt-12 bg-[#0a1f15] rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#2ecc71] mb-6">
                Your Tax Breakdown
              </h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#020806] rounded-lg p-3 md:p-4">
                  <p className="text-xs md:text-sm text-[#2ecc71]/70 mb-1">Annual Gross</p>
                  <p className="text-xl md:text-2xl font-bold text-[#2ecc71]">
                    {formatCurrency(result.breakdown.grossIncome)}
                  </p>
                </div>
                <div className="bg-[#020806] rounded-lg p-3 md:p-4">
                  <p className="text-xs md:text-sm text-[#2ecc71]/70 mb-1">Annual Net</p>
                  <p className="text-xl md:text-2xl font-bold text-[#2ecc71]">
                    {formatCurrency(result.netIncome.annual)}
                  </p>
                </div>
              </div>

              {/* Weekly/Monthly/Annual Table */}
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
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">Gross Income</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.grossIncome / 52)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.grossIncome / 12)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.grossIncome)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8 -mx-2 md:mx-0">
                <h3 className="text-lg font-bold text-[#2ecc71] mb-4">Above-the-Line Deductions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-[#2ecc71]/30">
                        <th className="text-left py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Deduction</th>
                        <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Annual</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">401(k) Contribution</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.aboveTheLineDeductions.contribution401k)}</td>
                      </tr>
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">IRA Contribution</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.aboveTheLineDeductions.contributionIRA)}</td>
                      </tr>
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">Student Loan Interest</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.aboveTheLineDeductions.studentLoanInterest)}</td>
                      </tr>
                      <tr className="border-b border-[#2ecc71]/30 bg-[#2ecc71]/10">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap text-xs md:text-sm">Adjusted Gross Income (AGI)</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.agi)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8 -mx-2 md:mx-0">
                <h3 className="text-lg font-bold text-[#2ecc71] mb-4">Taxable Income</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-[#2ecc71]/30">
                        <th className="text-left py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Description</th>
                        <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Annual</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.breakdown.deduction.type === "itemized" && result.breakdown.deduction.breakdown && (
                        <>
                          {result.breakdown.deduction.breakdown.mortgage > 0 && (
                            <tr className="border-b border-[#2ecc71]/20">
                              <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm pl-4">Mortgage Interest</td>
                              <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.deduction.breakdown.mortgage)}</td>
                            </tr>
                          )}
                          {result.breakdown.deduction.breakdown.charity > 0 && (
                            <tr className="border-b border-[#2ecc71]/20">
                              <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm pl-4">Charitable Donations</td>
                              <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.deduction.breakdown.charity)}</td>
                            </tr>
                          )}
                          {result.breakdown.deduction.breakdown.state_tax > 0 && (
                            <tr className="border-b border-[#2ecc71]/20">
                              <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm pl-4">State Income Tax</td>
                              <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.deduction.breakdown.state_tax)}</td>
                            </tr>
                          )}
                          {result.breakdown.deduction.breakdown.property_tax > 0 && (
                            <tr className="border-b border-[#2ecc71]/20">
                              <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm pl-4">Property Tax</td>
                              <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.deduction.breakdown.property_tax)}</td>
                            </tr>
                          )}
                          {result.breakdown.deduction.breakdown.medical > 0 && (
                            <tr className="border-b border-[#2ecc71]/20">
                              <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm pl-4">Medical Expenses</td>
                              <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.deduction.breakdown.medical)}</td>
                            </tr>
                          )}
                        </>
                      )}
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">
                          {result.breakdown.deduction.type === "standard" ? "Standard Deduction" : "Itemized Deductions"}
                          {result.breakdown.deduction.type === "itemized" && result.breakdown.deduction.standardAmount && result.breakdown.deduction.itemizedAmount && result.breakdown.deduction.itemizedAmount > result.breakdown.deduction.standardAmount && (
                            <span className="text-[#2ecc71]/50 text-xs ml-1">(exceeds standard)</span>
                          )}
                        </td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.breakdown.deduction.amount)}</td>
                      </tr>
                      <tr className="border-b border-[#2ecc71]/30 bg-[#2ecc71]/10">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap text-xs md:text-sm">Taxable Income</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.taxableIncome)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8 -mx-2 md:mx-0">
                <h3 className="text-lg font-bold text-[#2ecc71] mb-4">Tax Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-[#2ecc71]/30">
                        <th className="text-left py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Tax Type</th>
                        <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Marginal Rate</th>
                        <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Effective Rate</th>
                        <th className="text-right py-2 px-1 md:px-3 text-[#2ecc71] font-medium text-xs md:text-sm whitespace-nowrap">Annual</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">Federal Income Tax</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">{result.taxes.federal.marginalRate}%</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">{result.taxes.federal.effectiveRate.toFixed(2)}%</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.taxes.federal.amount)}</td>
                      </tr>
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm pl-6">Social Security</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">6.2%</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">{((result.taxes.fica.socialSecurity / result.breakdown.grossIncome) * 100).toFixed(2)}%</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.taxes.fica.socialSecurity)}</td>
                      </tr>
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm pl-6">Medicare</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">1.45%</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">{((result.taxes.fica.medicare / result.breakdown.grossIncome) * 100).toFixed(2)}%</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.taxes.fica.medicare)}</td>
                      </tr>
                      {result.taxes.fica.additionalMedicare > 0 && (
                        <tr className="border-b border-[#2ecc71]/20">
                          <td className="py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm pl-6">Additional Medicare</td>
                          <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">0.9%</td>
                          <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">{((result.taxes.fica.additionalMedicare / result.breakdown.grossIncome) * 100).toFixed(2)}%</td>
                          <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.taxes.fica.additionalMedicare)}</td>
                        </tr>
                      )}
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">FICA Total</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">7.65%</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">{((result.taxes.fica.total / result.breakdown.grossIncome) * 100).toFixed(2)}%</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.taxes.fica.total)}</td>
                      </tr>
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">State Tax</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">{result.taxes.state.marginalRate > 0 ? `${result.taxes.state.marginalRate}%` : '-'}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">{((result.taxes.state.amount / result.breakdown.grossIncome) * 100).toFixed(2)}%</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.taxes.state.amount)}</td>
                      </tr>
                      {result.taxes.local.amount > 0 && (
                        <tr className="border-b border-[#2ecc71]/20">
                          <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">Local Income Tax</td>
                          <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">{result.taxes.local.rate}%</td>
                          <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">{((result.taxes.local.amount / result.breakdown.grossIncome) * 100).toFixed(2)}%</td>
                          <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.taxes.local.amount)}</td>
                        </tr>
                      )}
                      <tr className="border-b border-[#2ecc71]/30 bg-[#2ecc71]/10">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap text-xs md:text-sm">Total Tax</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">-</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71]/70 whitespace-nowrap text-xs md:text-sm">{((result.taxes.total / result.breakdown.grossIncome) * 100).toFixed(2)}%</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.taxes.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#020806] rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#2ecc71]">Weekly Net</span>
                  <span className="text-lg md:text-xl font-bold text-[#2ecc71]">{formatCurrency(result.netIncome.weekly)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#2ecc71]">Monthly Net</span>
                  <span className="text-lg md:text-xl font-bold text-[#2ecc71]">{formatCurrency(result.netIncome.monthly)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#2ecc71]">Annual Net</span>
                  <span className="text-lg md:text-xl font-bold text-[#2ecc71]">{formatCurrency(result.netIncome.annual)}</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-[#2ecc71]/50">
                * This is an estimate. For exact calculations, please consult a tax professional.
              </p>
            </div>
          )}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "USA Tax Calculator",
              "alternateName": "USA Take Home Pay Calculator",
              "description": "Calculate your take home pay in the USA with our free tax calculator. Includes federal income tax, FICA, state tax, and local tax calculations.",
              "url": "https://gluub.com/calculator/usa",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "USA income tax calculation",
                "FICA (Social Security + Medicare)",
                "State income tax calculation",
                "Local income tax",
                "401(k) and IRA deductions",
                "Student loan interest deduction",
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
