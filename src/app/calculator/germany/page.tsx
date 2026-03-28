"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomSelect } from "@/components/CustomSelect";
import { SearchableSelect } from "@/components/SearchableSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GERMAN_STATES } from "./data/states";
import { I18nProvider, useI18n } from "@/contexts/I18nContext";

interface CalculationResult {
  breakdown: {
    grossSalary: number;
    totalGross: number;
    personalAllowance: number;
    taxableIncome: number;
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
    weekly: number;
  };
}

const numberInputClass = "flex-1 px-4 py-2 bg-transparent border-[#2ecc71] text-[#2ecc71] text-lg font-medium placeholder:text-[#2ecc71]/50 focus:ring-[#2ecc71] focus:border-[#2ecc71] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const preventNegative = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
  }
};

function LanguageToggle() {
  const { language, setLanguage } = useI18n();
  
  return (
    <div className="flex gap-1">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1.5 text-sm rounded transition-colors ${
          language === "en" 
            ? "bg-[#2ecc71] text-[#020806] font-bold" 
            : "bg-[#0a1f15] text-[#2ecc71] hover:bg-[#2ecc71]/20"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("de")}
        className={`px-3 py-1.5 text-sm rounded transition-colors ${
          language === "de" 
            ? "bg-[#2ecc71] text-[#020806] font-bold" 
            : "bg-[#0a1f15] text-[#2ecc71] hover:bg-[#2ecc71]/20"
        }`}
      >
        DE
      </button>
    </div>
  );
}

export default function GermanyCalculator() {
  return (
    <I18nProvider defaultLanguage="de">
      <GermanyCalculatorContent />
    </I18nProvider>
  );
}

function GermanyCalculatorContent() {
  const { t } = useI18n();
  
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
  const [taxYear, setTaxYear] = useState("2026");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
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
          taxYear,
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
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#2ecc71] mb-2">
              {t("title")}
            </h1>
            <p className="text-[#2ecc71]/70 text-sm">
              {t("subtitle")} ({taxYear})
            </p>
          </div>
          <div className="flex-shrink-0 pt-1">
            <LanguageToggle />
          </div>
        </div>

        <div className="space-y-6">
          {/* Gross Income */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              {t("labels.grossSalary")} (€)
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="number"
                min={0}
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                onKeyDown={preventNegative}
                placeholder={t("placeholders.enterSalary")}
                className={numberInputClass}
              />
              <CustomSelect
                value={incomeFrequency}
                onValueChange={setIncomeFrequency}
                options={[
                  { value: "per-year", label: t("options.perYear") },
                  { value: "per-month", label: t("options.perMonth") },
                ]}
                placeholder={t("labels.frequency")}
                className="w-full sm:w-[140px]"
              />
            </div>
          </div>

          {/* Tax Year */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              {t("labels.taxYear")}
            </label>
            <CustomSelect
              value={taxYear}
              onValueChange={setTaxYear}
              options={[
                { value: "2026", label: "2026" },
                { value: "2025", label: "2025" },
              ]}
              placeholder={t("labels.taxYear")}
              className="w-[180px]"
            />
          </div>

          {/* Tax Category */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              {t("labels.taxCategory")}
            </label>
            <CustomSelect
              value={taxCategory}
              onValueChange={setTaxCategory}
              options={[
                { value: "1", label: t("taxCategories.cat1") },
                { value: "2", label: t("taxCategories.cat2") },
                { value: "3", label: t("taxCategories.cat3") },
                { value: "4", label: t("taxCategories.cat4") },
                { value: "5", label: t("taxCategories.cat5") },
                { value: "6", label: t("taxCategories.cat6") },
              ]}
              placeholder={t("placeholders.selectTaxCategory")}
              className="w-full md:w-[300px]"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              {t("labels.state")}
            </label>
            <SearchableSelect
              value={state}
              onValueChange={setState}
              options={GERMAN_STATES}
              placeholder={t("placeholders.selectState")}
              className="w-full md:w-[250px]"
            />
          </div>

          {/* Health Insurance */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              {t("labels.healthInsurance")}
            </label>
            <CustomSelect
              value={healthInsurance}
              onValueChange={setHealthInsurance}
              options={[
                { value: "statutory", label: t("options.statutory") },
                { value: "private", label: t("options.private") },
                { value: "none", label: t("options.none") },
              ]}
              placeholder={t("placeholders.selectHealthInsurance")}
              className="w-full md:w-[250px]"
            />
          </div>

          {/* Health Insurance Supplementary */}
          {healthInsurance === "statutory" && (
            <div>
              <label className="block text-lg font-bold text-[#2ecc71] mb-2">
                {t("labels.supplementaryContribution")}
              </label>
              <Input
                type="number"
                min={0}
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
              {t("labels.pensionInsurance")}
            </label>
            <CustomSelect
              value={pensionInsurance}
              onValueChange={setPensionInsurance}
              options={[
                { value: "statutory", label: t("options.statutory") },
                { value: "private", label: t("options.private") },
                { value: "none", label: t("options.none") },
              ]}
              placeholder={t("placeholders.selectOption")}
              className="w-full md:w-[250px]"
            />
          </div>

          {/* Unemployment Insurance */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              {t("labels.unemploymentInsurance")}
            </label>
            <CustomSelect
              value={unemploymentInsurance}
              onValueChange={setUnemploymentInsurance}
              options={[
                { value: "statutory", label: t("options.statutory") },
                { value: "private", label: t("options.private") },
                { value: "none", label: t("options.none") },
              ]}
              placeholder={t("placeholders.selectOption")}
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
              {t("labels.churchTax")}
            </label>
          </div>

          {/* Has Children */}
          <div>
            <label className="block text-lg font-bold text-[#2ecc71] mb-2">
              {t("labels.hasChildren")}
            </label>
            <CustomSelect
              value={hasChildren}
              onValueChange={setHasChildren}
              options={[
                { value: "no", label: t("options.no") },
                { value: "yes", label: t("options.yes") },
              ]}
              placeholder={t("labels.hasChildren")}
              className="w-full md:w-[200px]"
            />
          </div>

          {/* Calculate Button */}
          <div className="flex gap-4">
            <Button 
              type="button"
              onClick={() => handleCalculate(true)}
              disabled={loading}
              className={`px-6 py-3 bg-[#f1c40f] text-[#020806] text-lg font-bold rounded-lg hover:bg-[#f39c12] transition-all duration-300 shadow-lg ${buttonPressed ? 'scale-95 bg-[#e67e22]' : ''}`}
            >
              {t("calculate")}
            </Button>
            {result && (
              <button 
                type="button"
                onClick={() => setShowResults(true)}
                className="text-lg text-[#2ecc71] underline hover:text-[#2ecc71]/80 transition-all"
              >
                {t("viewResults")}
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
                  {t("results.title")}
                </DialogTitle>
              </DialogHeader>

              {/* Main 2-column layout */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-6">
                
                {/* LEFT COLUMN - Summary Cards */}
                <div className="xl:col-span-5 space-y-3">
                  {/* Annual Gross */}
                  <div className="bg-[#020806] rounded-lg p-3 md:p-4">
                    <p className="text-sm font-bold text-[#2ecc71] mb-1">{t("results.annualGross")}</p>
                    <p className="text-lg md:text-xl font-bold text-[#2ecc71] truncate">
                      {formatCurrency(result!.breakdown.totalGross)}
                    </p>
                  </div>

                  {/* Tax Info */}
                  <div className="bg-[#020806] rounded-lg p-3 md:p-4 space-y-1">
                    <p className="text-sm font-bold text-[#2ecc71] mb-1">{t("results.taxInfo")}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2ecc71]/70">{t("results.personalAllowance")}</span>
                      <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(result!.breakdown.personalAllowance)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2ecc71]/70">{t("results.taxable")}</span>
                      <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(result!.breakdown.taxableIncome)}</span>
                    </div>
                  </div>

                  {/* Net Income Breakdown */}
                  <div className="bg-[#020806] rounded-lg p-3 md:p-4 space-y-1">
                    <p className="text-sm font-bold text-[#2ecc71] mb-1">{t("results.netIncome")}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2ecc71]/70">{t("results.weekly")}</span>
                      <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(result!.netIncome.weekly)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2ecc71]/70">{t("results.monthly")}</span>
                      <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(result!.netIncome.monthly)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2ecc71]/70">{t("results.annual")}</span>
                      <span className="text-[#2ecc71] font-bold truncate">{formatCurrency(result!.netIncome.annual)}</span>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-xs text-[#2ecc71]/50 pt-2">
                    * {t("disclaimer")}
                  </p>
                </div>

                {/* RIGHT COLUMN - Tables */}
                <div className="xl:col-span-7 space-y-4">
                  {/* Income breakdown Table */}
                  <div>
                    <h3 className="text-base font-bold text-[#2ecc71] mb-2">{t("results.incomeBreakdown")}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs md:text-sm table-fixed">
                        <thead>
                          <tr className="border-b border-[#2ecc71]/30">
                            <th className="text-left py-1.5 px-2 md:px-3 text-[#2ecc71] font-medium whitespace-nowrap w-[120px]">Item</th>
                            <th className="text-right py-1.5 px-2 md:px-3 text-[#2ecc71] font-medium whitespace-nowrap w-[100px]">{t("results.weekly")}</th>
                            <th className="text-right py-1.5 px-2 md:px-3 text-[#2ecc71] font-medium whitespace-nowrap w-[100px]">{t("results.monthly")}</th>
                            <th className="text-right py-1.5 px-2 md:px-3 text-[#2ecc71] font-medium whitespace-nowrap w-[100px]">{t("results.annual")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#2ecc71] whitespace-nowrap w-[120px]">{t("results.grossSalary")}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#2ecc71] whitespace-nowrap w-[100px]">{formatCurrency(result!.breakdown.grossSalary / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#2ecc71] whitespace-nowrap w-[100px]">{formatCurrency(result!.breakdown.grossSalary / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#2ecc71] whitespace-nowrap w-[100px]">{formatCurrency(result!.breakdown.grossSalary)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Deductions Table */}
                  <div>
                    <h3 className="text-base font-bold text-[#2ecc71] mb-2">{t("results.deductions")}</h3>
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
                            <td className="py-1.5 px-2 md:px-3 text-[#2ecc71]/70 whitespace-nowrap w-[120px] font-bold" colSpan={4}>{t("results.taxes")}</td>
                          </tr>
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px] pl-6">{t("results.incomeTax")}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.incomeTax / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.incomeTax / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.incomeTax)}</td>
                          </tr>
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px] pl-6">{t("results.solidaritySurcharge")}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.solidaritySurcharge / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.solidaritySurcharge / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.solidaritySurcharge)}</td>
                          </tr>
                          {result!.deductions.churchTax > 0 && (
                            <tr className="border-b border-[#2ecc71]/20">
                              <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px] pl-6">{t("results.churchTax")}</td>
                              <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.churchTax / 52)}</td>
                              <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.churchTax / 12)}</td>
                              <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.churchTax)}</td>
                            </tr>
                          )}
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#2ecc71]/70 whitespace-nowrap w-[120px] font-bold" colSpan={4}>{t("results.socialSecurity")}</td>
                          </tr>
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px] pl-6">{t("results.healthInsurance")}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.healthInsurance / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.healthInsurance / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.healthInsurance)}</td>
                          </tr>
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px] pl-6">{t("results.nursingCare")}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.nursingCareInsurance / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.nursingCareInsurance / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.nursingCareInsurance)}</td>
                          </tr>
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px] pl-6">{t("results.pensionInsurance")}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.pensionInsurance / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.pensionInsurance / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.pensionInsurance)}</td>
                          </tr>
                          <tr className="border-b border-[#2ecc71]/20">
                            <td className="py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[120px] pl-6">{t("results.unemploymentInsurance")}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.unemploymentInsurance / 52)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.unemploymentInsurance / 12)}</td>
                            <td className="text-right py-1.5 px-2 md:px-3 text-[#e74c3c] whitespace-nowrap w-[100px]">-{formatCurrency(result!.deductions.unemploymentInsurance)}</td>
                          </tr>
                          <tr className="border-b border-[#2ecc71]/30 bg-[#2ecc71]/10">
                            <td className="py-1.5 px-2 md:px-3 text-[#2ecc71] font-bold whitespace-nowrap w-[120px]">{t("results.totalDeductions")}</td>
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
                  {t("results.return")}
                </Button>
              </div>
            </div>
          </DialogContent>
          )}
        </Dialog>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Germany Tax Calculator",
            "alternateName": "German Salary Calculator",
            "description": "Calculate your take home pay in Germany with our free, accurate tax calculator. Includes Lohnsteuer, social security contributions, church tax, and solidarity surcharge for 2026.",
            "url": "https://gluub.com/calculator/germany",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            },
            "featureList": [
              "German income tax (Lohnsteuer) calculation",
              "Social security contributions",
              "Church tax calculation",
              "Solidarity surcharge",
              "Take home pay breakdown"
            ],
            "browserRequirements": "Requires JavaScript"
          }),
        }}
      />
    </div>
  );
}
