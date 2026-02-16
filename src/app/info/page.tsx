"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Info() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-[#020806] text-[#2ecc71] flex flex-col">
      <main className="flex-1 px-4 md:px-8 py-12 pt-24 max-w-4xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2ecc71] mb-4">
            Tax Information & Resources
          </h1>
          <p className="text-lg text-[#2ecc71]/70">
            Official resources and country-specific tax information
          </p>
        </div>

        {/* General Information */}
        <section className="mb-12">
          <div className="bg-[#0a1f15] rounded-xl p-6 md:p-8 border border-[#2ecc71]/20">
            <h2 className="text-2xl font-bold text-[#2ecc71] mb-4">
              About These Calculations
            </h2>
            <div className="space-y-4 text-[#2ecc71]/80">
              <p>
                Our tax calculators provide estimates based on official government tax rates for each country. 
                While we strive for accuracy, individual circumstances may vary.
              </p>
              <p>
                <strong className="text-[#2ecc71]">Disclaimer:</strong> These calculations are for informational purposes only. 
                For exact figures and complex tax situations, please consult a qualified tax professional.
              </p>
              <p>
                Tax rates are updated annually for each tax year. Last updated: 2025-2026.
              </p>
            </div>
          </div>
        </section>

        {/* UK Section */}
        <section className="mb-6">
          <button
            onClick={() => toggleSection("uk")}
            className="w-full flex items-center justify-between bg-[#0a1f15] rounded-xl p-6 border border-[#2ecc71]/20 hover:border-[#2ecc71]/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🇬🇧</span>
              <h2 className="text-xl font-bold text-[#2ecc71]">United Kingdom</h2>
            </div>
            <ChevronDown 
              className={`w-6 h-6 text-[#2ecc71] transition-transform ${openSection === "uk" ? "rotate-180" : ""}`} 
            />
          </button>
          
          {openSection === "uk" && (
            <div className="mt-2 bg-[#0a1f15] rounded-xl p-6 border border-[#2ecc71]/20">
              <div className="space-y-6">
                {/* Official Links */}
                <div>
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-3">Official Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="https://www.gov.uk/hmrc" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#2ecc71]/80 hover:text-[#2ecc71] underline hover:no-underline"
                      >
                        HM Revenue & Customs (HMRC) →
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.gov.uk/income-tax" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#2ecc71]/80 hover:text-[#2ecc71] underline hover:no-underline"
                      >
                        Income Tax Guide →
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.gov.uk/calculate-income-tax" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#2ecc71]/80 hover:text-[#2ecc71] underline hover:no-underline"
                      >
                        Income Tax Calculator (Official) →
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Tax Year */}
                <div>
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-2">Tax Year</h3>
                  <p className="text-[#2ecc71]/80">
                    6 April to 5 April (e.g., 2025-2026 tax year runs 6 April 2025 to 5 April 2026)
                  </p>
                </div>

                {/* Personal Allowance Taper */}
                <div>
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-2">Personal Allowance Taper</h3>
                  <p className="text-[#2ecc71]/80">
                    Your personal allowance (currently £12,570) reduces by £1 for every £2 you earn over £100,000. 
                    This means your personal allowance is completely removed once your income reaches £125,140 or more.
                  </p>
                </div>

                {/* National Insurance */}
                <div>
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-2">National Insurance</h3>
                  <p className="text-[#2ecc71]/80">
                    Employees pay National Insurance on earnings above the Primary Threshold. 
                    Rates and thresholds are reviewed annually in the Spring Budget.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Germany Section */}
        <section className="mb-6">
          <button
            onClick={() => toggleSection("germany")}
            className="w-full flex items-center justify-between bg-[#0a1f15] rounded-xl p-6 border border-[#2ecc71]/20 hover:border-[#2ecc71]/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🇩🇪</span>
              <h2 className="text-xl font-bold text-[#2ecc71]">Germany</h2>
            </div>
            <ChevronDown 
              className={`w-6 h-6 text-[#2ecc71] transition-transform ${openSection === "germany" ? "rotate-180" : ""}`} 
            />
          </button>
          
          {openSection === "germany" && (
            <div className="mt-2 bg-[#0a1f15] rounded-xl p-6 border border-[#2ecc71]/20">
              <div className="space-y-6">
                {/* Official Links */}
                <div>
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-3">Official Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="https://www.bzst.de/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#2ecc71]/80 hover:text-[#2ecc71] underline hover:no-underline"
                      >
                        Bundeszentralamt für Steuern (BZSt) →
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.elster.de/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#2ecc71]/80 hover:text-[#2ecc71] underline hover:no-underline"
                      >
                        ELSTER (Electronic Tax Return) →
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Steuern/steuerarten/lohnsteuer/lohnsteuerklassen.html" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#2ecc71]/80 hover:text-[#2ecc71] underline hover:no-underline"
                      >
                        Tax Classes (Lohnsteuerklassen) →
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Tax Year */}
                <div>
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-2">Tax Year</h3>
                  <p className="text-[#2ecc71]/80">
                    Calendar year (1 January to 31 December). Tax returns are typically due by 31 July of the following year.
                  </p>
                </div>

                {/* Tax Classes */}
                <div>
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-2">Tax Classes (Lohnsteuerklassen)</h3>
                  <p className="text-[#2ecc71]/80">
                    Germany uses six tax classes (I-VI) based on marital status and income situation. 
                    Class I is for single persons, Class III/IV for married couples, etc.
                  </p>
                </div>

                {/* Social Contributions */}
                <div>
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-2">Social Insurance</h3>
                  <p className="text-[#2ecc71]/80">
                    Employees and employers each pay roughly half of the social insurance contributions, 
                    covering health insurance, pension insurance, nursing care insurance, and unemployment insurance.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Denmark Section */}
        <section className="mb-6">
          <button
            onClick={() => toggleSection("denmark")}
            className="w-full flex items-center justify-between bg-[#0a1f15] rounded-xl p-6 border border-[#2ecc71]/20 hover:border-[#2ecc71]/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🇩🇰</span>
              <h2 className="text-xl font-bold text-[#2ecc71]">Denmark</h2>
            </div>
            <ChevronDown 
              className={`w-6 h-6 text-[#2ecc71] transition-transform ${openSection === "denmark" ? "rotate-180" : ""}`} 
            />
          </button>
          
          {openSection === "denmark" && (
            <div className="mt-2 bg-[#0a1f15] rounded-xl p-6 border border-[#2ecc71]/20">
              <div className="space-y-6">
                {/* Official Links */}
                <div>
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-3">Official Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="https://skat.dk/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#2ecc71]/80 hover:text-[#2ecc71] underline hover:no-underline"
                      >
                        SKAT (Danish Tax Authority) →
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.tastselv.skat.dk/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#2ecc71]/80 hover:text-[#2ecc71] underline hover:no-underline"
                      >
                        TastSelv (Self-Service Tax Portal) →
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://skat.dk/en-us/help/tax-rates" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#2ecc71]/80 hover:text-[#2ecc71] underline hover:no-underline"
                      >
                        Tax Rates (Official) →
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Tax Year */}
                <div>
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-2">Tax Year</h3>
                  <p className="text-[#2ecc71]/80">
                    Calendar year (1 January to 31 December). Tax returns are typically due by 1 May of the following year.
                  </p>
                </div>

                {/* Tax System */}
                <div>
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-2">Danish Tax System</h3>
                  <p className="text-[#2ecc71]/80">
                    Denmark has a progressive tax system with municipal taxes (kommuneskat), county taxes (regionsskat), 
                    and state taxes (statsskat). The total tax rate varies by municipality, typically between 30-40%.
                  </p>
                </div>

                {/* ATP */}
                <div>
                  <h3 className="text-lg font-bold text-[#2ecc71] mb-2">ATP (Labour Market Pension)</h3>
                  <p className="text-[#2ecc71]/80">
                    All employees in Denmark must contribute to ATP, a supplementary pension scheme. 
                    Contributions are split between employer and employee.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Back to Calculator */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-block px-8 py-4 bg-[#f1c40f] text-[#020806] text-lg font-bold rounded-lg hover:bg-[#f39c12] transition-all duration-300 shadow-lg"
          >
            Calculate Your Taxes
          </Link>
        </div>

      </main>
    </div>
  );
}
