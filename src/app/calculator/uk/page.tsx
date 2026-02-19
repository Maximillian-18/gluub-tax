"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CustomSelect } from "@/components/CustomSelect";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import Link from "next/link";

const numberInputClass = "flex-1 px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const smallNumberInputClass = "w-[140px] px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const customAllowanceInputClass = "flex-1 px-3 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-base font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const customAllowanceAmountClass = "w-[120px] px-3 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-base font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const preventNegative = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
  }
};

interface CustomAllowance {
  id: number;
  name: string;
  amount: number;
}

interface CalculationResult {
  breakdown: {
    grossSalary: number;
    bonus: number;
    overtime: number;
    totalGross: number;
    pensionDeduction: number;
    customAllowances: number;
    taxFreeAllowance: number;
    taxableIncome: number;
  };
  deductions: {
    incomeTax: number;
    nationalInsurance: number;
    studentLoan: number;
    pension: number;
    total: number;
  };
  netIncome: {
    annual: number;
    monthly: number;
    weekly: number;
  };
  bonusBreakdown: {
    grossBonus: number;
    tax: number;
    nationalInsurance: number;
    net: number;
  };
}

export default function UKCalculator() {
  const [region, setRegion] = useState("england");
  const [incomeFrequency, setIncomeFrequency] = useState("per-year");
  const [taxYear, setTaxYear] = useState("2025-2026");
  const [pensionType, setPensionType] = useState<"percentage" | "amount">("percentage");
  const [studentLoan, setStudentLoan] = useState("none");
  
  const [grossIncome, setGrossIncome] = useState("");
  const [bonus, setBonus] = useState("");
  const [overtime, setOvertime] = useState("");
  const [pensionValue, setPensionValue] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [blindAllowance, setBlindAllowance] = useState(false);
  const [marriageAllowance, setMarriageAllowance] = useState(false);
  const [excludeNI, setExcludeNI] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  
  const [customAllowances, setCustomAllowances] = useState<CustomAllowance[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const addCustomAllowance = () => {
    const newId = customAllowances.length > 0 
      ? Math.max(...customAllowances.map(a => a.id)) + 1 
      : 1;
    setCustomAllowances([...customAllowances, { id: newId, name: "", amount: 0 }]);
  };

  const removeCustomAllowance = (id: number) => {
    setCustomAllowances(customAllowances.filter(a => a.id !== id));
  };

  const updateCustomAllowance = (id: number, field: "name" | "amount", value: string) => {
    setCustomAllowances(customAllowances.map(a => 
      a.id === id ? { ...a, [field]: field === "amount" ? parseFloat(value) || 0 : value } : a
));
  };

  const handleCalculate = async (fromEnter?: boolean) => {
    if (fromEnter) {
      setButtonPressed(true);
      setTimeout(() => setButtonPressed(false), 150);
    }
    setLoading(true);
    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grossIncome: parseFloat(grossIncome) || 0,
          frequency: incomeFrequency === "per-year" ? "year" : incomeFrequency === "per-month" ? "month" : "week",
          bonus: parseFloat(bonus) || 0,
          overtime: parseFloat(overtime) || 0,
          pension: { type: pensionType, value: parseFloat(pensionValue) || 0 },
          region: region as "england" | "scotland" | "wales" | "northern-ireland",
          taxYear: taxYear as "2025-2026" | "2024-2025",
          taxCode: taxCode,
          studentLoan: studentLoan as "none" | "plan1" | "plan2" | "plan4" | "postgrad",
          blindAllowance,
          marriageAllowance,
          excludeNI,
          customAllowances: customAllowances.map(a => ({ name: a.name, amount: a.amount })),
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
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#020806] text-[#2ecc71] flex flex-col">
      <main className="flex-1 flex flex-col items-center px-4 md:px-8 py-8 md:py-12 pt-20 md:pt-24 gap-8 md:gap-12">
        {/* Form Section */}
        <div className="w-full max-w-2xl">
            <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#2ecc71] mb-2">
              2026 UK Take Home Pay Calculator
            </h1>
            <p className="text-[#2ecc71]/70 text-sm mb-4">
              Calculate your take home pay in the UK (2026)
            </p>
            <CustomSelect
              value={region}
              onValueChange={setRegion}
              options={[
                { value: "england", label: "England" },
                { value: "scotland", label: "Scotland" },
              ]}
              placeholder="Select region"
              className="w-full md:w-[200px]"
            />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleCalculate(true); }} className="space-y-6">
            {/* Gross Income */}
            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                Gross income (£)
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

            {/* Tax Year */}
            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                Tax year
              </label>
            <CustomSelect
              value={taxYear}
              onValueChange={setTaxYear}
              options={[
                { value: "2025-2026", label: "2025 - 2026" },
                { value: "2024-2025", label: "2024 - 2025" },
              ]}
              placeholder="Tax year"
              className="w-[180px]"
            />
            </div>

            {/* Tax Code */}
            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                Tax Code
              </label>
              <Input
                value={taxCode}
                onChange={(e) => setTaxCode(e.target.value)}
                placeholder="e.g., 1257L"
                className="w-[180px] px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              />
            </div>

            {/* Bonus */}
            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                Bonus (annual)
              </label>
              <Input
                type="number"
                min={0}
                value={bonus}
                onChange={(e) => setBonus(e.target.value)}
                onKeyDown={preventNegative}
                placeholder="Enter bonus amount"
                className="w-full px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>

            {/* Overtime */}
            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                Overtime (annual)
              </label>
              <Input
                type="number"
                min={0}
                value={overtime}
                onChange={(e) => setOvertime(e.target.value)}
                onKeyDown={preventNegative}
                placeholder="Enter overtime amount"
                className="w-full px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>

            {/* Pension */}
            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                Pension contributions {pensionType === "percentage" ? "(% of salary)" : "(per month)"}
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Tabs value={pensionType} onValueChange={(v) => setPensionType(v as "percentage" | "amount")} className="w-auto">
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
                  value={pensionValue}
                  onChange={(e) => setPensionValue(e.target.value)}
                  onKeyDown={preventNegative}
                  placeholder={pensionType === "percentage" ? "e.g., 5" : "e.g., 200"}
                  className={smallNumberInputClass}
                />
              </div>
            </div>

            {/* Student Loan */}
            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                Student Loan Plan
              </label>
              <CustomSelect
                value={studentLoan}
                onValueChange={setStudentLoan}
                options={[
                  { value: "none", label: "None" },
                  { value: "plan1", label: "Plan 1" },
                  { value: "plan2", label: "Plan 2" },
                  { value: "plan4", label: "Plan 4" },
                  { value: "postgrad", label: "Postgraduate" },
                ]}
                placeholder="Select plan"
                className="w-[200px]"
              />
            </div>

            {/* Allowances */}
            <div className="space-y-3">
              <label className="block text-lg font-bold text-[#2ecc71]">
                Allowances
              </label>
              
              <div className="flex items-center gap-3">
                <Checkbox 
                  checked={blindAllowance}
                  onCheckedChange={(checked) => setBlindAllowance(checked as boolean)}
                  className="w-5 h-5 border-[#2ecc71] data-[state=checked]:bg-[#2ecc71] data-[state=checked]:border-[#2ecc71]"
                />
                <label className="text-base text-[#2ecc71]">
                  Blind Person&apos;s Allowance
                </label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox 
                  checked={marriageAllowance}
                  onCheckedChange={(checked) => setMarriageAllowance(checked as boolean)}
                  className="w-5 h-5 border-[#2ecc71] data-[state=checked]:bg-[#2ecc71] data-[state=checked]:border-[#2ecc71]"
                />
                <label className="text-base text-[#2ecc71]">
                  Marriage Allowance
                </label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox 
                  checked={excludeNI}
                  onCheckedChange={(checked) => setExcludeNI(checked as boolean)}
                  className="w-5 h-5 border-[#2ecc71] data-[state=checked]:bg-[#2ecc71] data-[state=checked]:border-[#2ecc71]"
                />
                <label className="text-base text-[#2ecc71]">
                  Exclude National Insurance
                </label>
              </div>
            </div>

            {/* Custom Allowances */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-lg font-bold text-[#2ecc71]">
                  Custom Allowances (Annual)
                </label>
                <Button
                  type="button"
                  onClick={addCustomAllowance}
                  variant="outline"
                  className="border-[#2ecc71] text-[#2ecc71] hover:bg-[#2ecc71]/10"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              
              {customAllowances.map((allowance) => (
                <div key={allowance.id} className="flex gap-2 items-center">
                  <Input
                    value={allowance.name}
                    onChange={(e) => updateCustomAllowance(allowance.id, "name", e.target.value)}
                    placeholder="Allowance name"
                    className={customAllowanceInputClass}
                  />
                  <Input
                    type="number"
                    min={0}
                    value={allowance.amount || ""}
                    onChange={(e) => updateCustomAllowance(allowance.id, "amount", e.target.value)}
                    onKeyDown={preventNegative}
                    placeholder="Amount"
                    className={customAllowanceAmountClass}
                  />
                  <Button
                    type="button"
                    onClick={() => removeCustomAllowance(allowance.id)}
                    variant="ghost"
                    className="text-[#2ecc71] hover:bg-[#2ecc71]/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Calculate Button */}
            <Button 
              type="submit"
              disabled={loading}
              className={`px-6 py-3 bg-[#f1c40f] text-[#020806] text-lg font-bold rounded-lg hover:bg-[#f39c12] transition-all duration-300 shadow-lg ${buttonPressed ? 'scale-95 bg-[#e67e22]' : 'active:scale-95 active:bg-[#e67e22]'}`}
            >
              Calculate
            </Button>
          </form>
        </div>

        {/* Results Section */}
        <div className="w-full max-w-2xl">
          {result && (
            <div className="bg-[#0a1f15] rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#2ecc71] mb-6">
                Your Tax Breakdown
              </h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#020806] rounded-lg p-3 md:p-4">
                  <p className="text-xs md:text-sm text-[#2ecc71]/70 mb-1">Annual Gross</p>
                  <p className="text-xl md:text-2xl font-bold text-[#2ecc71]">
                    {formatCurrency(result.breakdown.totalGross)}
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
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">Gross Salary</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.grossSalary / 52)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.grossSalary / 12)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.grossSalary)}</td>
                      </tr>
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">Bonus</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.bonus / 52)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.bonus / 12)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.bonus)}</td>
                      </tr>
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">Overtime</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.overtime / 52)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.overtime / 12)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">{formatCurrency(result.breakdown.overtime)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Deductions Table */}
              <div className="mb-8 -mx-2 md:mx-0">
                <h3 className="text-lg font-bold text-[#2ecc71] mb-4">Deductions</h3>
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
                        <td className="py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">Income Tax</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.incomeTax / 52)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.incomeTax / 12)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.incomeTax)}</td>
                      </tr>
                      <tr className="border-b border-[#2ecc71]/20">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">National Insurance</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.nationalInsurance / 52)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.nationalInsurance / 12)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.nationalInsurance)}</td>
                      </tr>
                      {result.deductions.studentLoan > 0 && (
                        <tr className="border-b border-[#2ecc71]/20">
                          <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">Student Loan</td>
                          <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.studentLoan / 52)}</td>
                          <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.studentLoan / 12)}</td>
                          <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.studentLoan)}</td>
                        </tr>
                      )}
                      {result.deductions.pension > 0 && (
                        <tr className="border-b border-[#2ecc71]/20">
                          <td className="py-2 px-1 md:px-3 text-[#2ecc71] whitespace-nowrap text-xs md:text-sm">Pension</td>
                          <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.pension / 52)}</td>
                          <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.pension / 12)}</td>
                          <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.pension)}</td>
                        </tr>
                      )}
                      <tr className="border-b border-[#2ecc71]/30 bg-[#2ecc71]/10">
                        <td className="py-2 px-1 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap text-xs md:text-sm">Total Deductions</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.total / 52)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.total / 12)}</td>
                        <td className="text-right py-2 px-1 md:px-3 text-[#e74c3c] font-bold whitespace-nowrap text-xs md:text-sm">-{formatCurrency(result.deductions.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Net Pay */}
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

              {/* Bonus Breakdown */}
              {result.breakdown.bonus > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-4">Bonus Breakdown</h3>
                  <div className="bg-[#020806] rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#2ecc71]">Gross Bonus</span>
                      <span className="text-[#2ecc71]">{formatCurrency(result.bonusBreakdown.grossBonus)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2ecc71]">Tax</span>
                      <span className="text-[#e74c3c]">-{formatCurrency(result.bonusBreakdown.tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2ecc71]">National Insurance</span>
                      <span className="text-[#e74c3c]">-{formatCurrency(result.bonusBreakdown.nationalInsurance)}</span>
                    </div>
                    <div className="flex justify-between border-t border-[#2ecc71]/30 pt-2">
                      <span className="text-[#2ecc71] font-bold">Net Bonus</span>
                      <span className="text-[#2ecc71] font-bold">{formatCurrency(result.bonusBreakdown.net)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tax Free Allowance Info */}
              <div className="mt-6 text-sm text-[#2ecc71]/70">
                <p>Tax-free allowance: <Link href="/info" className="underline hover:text-[#2ecc71]/80">{formatCurrency(result.breakdown.taxFreeAllowance)}</Link><span className="text-[#e74c3c]">*</span></p>
                <p>Taxable income: {formatCurrency(result.breakdown.taxableIncome)}</p>
              </div>

              <p className="mt-4 text-xs text-[#2ecc71]/50">
                * This is an estimate. For exact calculations, please consult a tax professional.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
