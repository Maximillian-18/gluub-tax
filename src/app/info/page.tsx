"use client";

import { useScrollSpy } from "./components/useScrollSpy";
import InfoLayoutWrapper from "./components/InfoLayoutWrapper";

const sectionIds = [
  "what-is-income-tax",
  "how-tax-calculated",
  "tax-brackets",
];

export default function InfoPage() {
  const activeSection = useScrollSpy(sectionIds, 0.6);

  return (
    <InfoLayoutWrapper scrollSpyActiveId={activeSection}>
      <InfoContent />
    </InfoLayoutWrapper>
  );
}

function InfoContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2ecc71] mb-4">
          Tax Information
        </h1>
        <p className="text-[#2ecc71]/70 text-lg">
          Everything you need to understand income tax, tax brackets, and how your salary is calculated
        </p>
      </header>

      {/* Introduction */}
      <section id="what-is-income-tax" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          What is Income Tax?
        </h2>
        <p className="text-[#2ecc71]/80 mb-4 leading-relaxed">
          Income tax is money you pay to the government based on how much you earn. It's one of the main ways governments fund public services like healthcare, education, roads, and infrastructure. Most people pay income tax automatically through their employer before they receive their salary.
        </p>
        <p className="text-[#2ecc71]/80 leading-relaxed">
          The amount of tax you pay depends on several factors: how much you earn, which country you live in, your tax code, and any deductions or allowances you're entitled to.
        </p>
      </section>

      {/* How Tax is Calculated */}
      <section id="how-tax-calculated" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          How is Tax Calculated?
        </h2>
        
        <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-[#2ecc71] mt-8 mb-4">The Basic Formula</h3>
          <div className="space-y-3 font-mono text-sm">
            <p className="text-[#2ecc71]/70">1. Start with your Gross Income (total earnings)</p>
            <p className="text-[#2ecc71]/70">2. Subtract your Personal Allowance (tax-free amount)</p>
            <p className="text-[#2ecc71]/70">3. Apply tax rates to each portion of remaining income</p>
            <p className="text-[#2ecc71]">4. Result = Your Income Tax</p>
          </div>
        </div>

        <p className="text-[#2ecc71]/80 mb-4 leading-relaxed">
          Tax is calculated in bands or brackets. You don't pay the same rate on all your income. Instead, you pay different rates on different portions of your earnings. This is called a progressive tax system.
        </p>

        <div className="bg-[#2ecc71]/5 border-l-4 border-[#2ecc71] p-4 rounded-r-lg">
          <p className="text-[#2ecc71]/90 text-sm">
            <strong>Example:</strong> If the tax-free allowance is £12,570 and you earn £30,000, you only pay tax on £17,430 (£30,000 - £12,570). The first portion might be taxed at 20%, and higher portions at higher rates.
          </p>
        </div>
      </section>

      {/* Understanding Tax Brackets */}
      <section id="tax-brackets" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Understanding Tax Brackets
        </h2>
        
        <p className="text-[#2ecc71]/80 mb-6 leading-relaxed">
          Tax brackets divide your income into portions, with each portion taxed at a different rate. As you earn more, you move into higher brackets, but only the income within each bracket is taxed at that rate. Different countries use different approaches to structuring their tax brackets.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Fixed/Step Tax Brackets */}
          <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#2ecc71] mb-4">Fixed (Step) Tax Brackets</h3>
            <p className="text-[#2ecc71]/70 text-sm mb-4">
              Used in: UK, USA, Denmark, and many others
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#2ecc71]/30 text-sm">
                <thead>
                  <tr className="bg-[#2ecc71]/10">
                    <th className="border border-[#2ecc71]/30 px-3 py-2 text-left text-[#2ecc71]">Tax Band</th>
                    <th className="border border-[#2ecc71]/30 px-3 py-2 text-left text-[#2ecc71]">Income Range</th>
                    <th className="border border-[#2ecc71]/30 px-3 py-2 text-left text-[#2ecc71]">Rate</th>
                  </tr>
                </thead>
                <tbody className="text-[#2ecc71]/80">
                  <tr>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">Band 1</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">€0 - €10,000</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">0%</td>
                  </tr>
                  <tr className="bg-[#2ecc71]/5">
                    <td className="border border-[#2ecc71]/30 px-3 py-2">Band 2</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">€10,001 - €30,000</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">20%</td>
                  </tr>
                  <tr>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">Band 3</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">€30,001 - €60,000</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">30%</td>
                  </tr>
                  <tr className="bg-[#2ecc71]/5">
                    <td className="border border-[#2ecc71]/30 px-3 py-2">Band 4</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">Over €60,000</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">40%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[#2ecc71]/60 text-xs mt-3">
              Each bracket has a fixed rate. If you earn €40,000, you pay 0% on first €10,000, 20% on next €20,000, and 30% on final €10,000.
            </p>
          </div>

          {/* Progressive Tax Rates */}
          <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#2ecc71] mb-4">Progressive Tax Rates</h3>
            <p className="text-[#2ecc71]/70 text-sm mb-4">
              Used in: Germany and some other countries
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#2ecc71]/30 text-sm">
                <thead>
                  <tr className="bg-[#2ecc71]/10">
                    <th className="border border-[#2ecc71]/30 px-3 py-2 text-left text-[#2ecc71]">Zone</th>
                    <th className="border border-[#2ecc71]/30 px-3 py-2 text-left text-[#2ecc71]">Income Range</th>
                    <th className="border border-[#2ecc71]/30 px-3 py-2 text-left text-[#2ecc71]">Rate Range</th>
                  </tr>
                </thead>
                <tbody className="text-[#2ecc71]/80">
                  <tr>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">Basic</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">Up to €12,348</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">0%</td>
                  </tr>
                  <tr className="bg-[#2ecc71]/5">
                    <td className="border border-[#2ecc71]/30 px-3 py-2">Zone 1</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">€12,349 - €17,799</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">14% - 24%</td>
                  </tr>
                  <tr>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">Zone 2</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">€17,800 - €69,878</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">24% - 42%</td>
                  </tr>
                  <tr className="bg-[#2ecc71]/5">
                    <td className="border border-[#2ecc71]/30 px-3 py-2">Zone 3</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">€69,879+</td>
                    <td className="border border-[#2ecc71]/30 px-3 py-2">42%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[#2ecc71]/60 text-xs mt-3">
              Uses mathematical formulas to smoothly increase the tax rate within each zone. Rates gradually rise from 14% to 24%, then 24% to 42%.
            </p>
          </div>
        </div>

        <div className="bg-[#e74c3c]/5 border-l-4 border-[#e74c3c] p-4 rounded-r-lg">
          <p className="text-[#2ecc71]/90 text-sm">
            <strong>Important:</strong> Moving into a higher tax bracket doesn't mean all your income is taxed at the higher rate. Only the portion that falls within that bracket is taxed at the higher rate. You never lose money by earning more!
          </p>
        </div>
      </section>

      {/* Key Terms */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Key Terms Explained
        </h2>

        <div className="space-y-4">
          <div className="border-b border-[#2ecc71]/20 pb-4">
            <h3 className="text-lg font-semibold text-[#2ecc71] mb-2">Gross Income</h3>
            <p className="text-[#2ecc71]/80">Your total earnings before any deductions (tax, National Insurance, pension, etc.)</p>
          </div>

          <div className="border-b border-[#2ecc71]/20 pb-4">
            <h3 className="text-lg font-semibold text-[#2ecc71] mb-2">Net Income / Take Home Pay</h3>
            <p className="text-[#2ecc71]/80">What you actually receive after all deductions have been taken</p>
          </div>

          <div className="border-b border-[#2ecc71]/20 pb-4">
            <h3 className="text-lg font-semibold text-[#2ecc71] mb-2">Personal Allowance</h3>
            <p className="text-[#2ecc71]/80">The amount you can earn each year without paying any income tax</p>
          </div>

          <div className="border-b border-[#2ecc71]/20 pb-4">
            <h3 className="text-lg font-semibold text-[#2ecc71] mb-2">Tax Code</h3>
            <p className="text-[#2ecc71]/80">A code used by your employer to calculate how much tax to deduct (e.g., 1257L)</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#2ecc71] mb-2">Marginal Tax Rate</h3>
            <p className="text-[#2ecc71]/80">The tax rate that applies to your highest portion of income</p>
          </div>
        </div>
      </section>
    </article>
  );
}
