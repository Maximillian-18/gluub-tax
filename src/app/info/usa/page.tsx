"use client";

import { useScrollSpy } from "../components/useScrollSpy";
import InfoLayoutWrapper from "../components/InfoLayoutWrapper";

const sectionIds = [
  "basics",
  "tax-brackets",
  "fica",
  "state-taxes",
  "deductions",
  "tax-credits",
];

export default function USATaxGuide() {
  const activeSection = useScrollSpy(sectionIds, 0.6);

  return (
    <InfoLayoutWrapper scrollSpyActiveId={activeSection}>
      <USATaxContent />
    </InfoLayoutWrapper>
  );
}

function USATaxContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2ecc71] mb-4">
          USA Income Tax Guide
        </h1>
        <p className="text-[#2ecc71]/70 text-lg">
          Everything you need to know about US federal income tax (2026)
        </p>
      </header>

      {/* Section 1: Tax Basics */}
      <section id="basics" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Income Tax Basics
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            The US federal income tax is the primary source of revenue for the federal government. It's a progressive tax system, meaning higher incomes are taxed at higher rates. Most workers have taxes automatically withheld from their paychecks through the W-4 form system.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Who Needs to Pay Federal Income Tax?</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed mb-4">
            You must file a federal tax return if your income exceeds the standard deduction. For 2026, the standard deduction is $15,000 for single filers ($30,000 for married filing jointly).
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">The US Tax Year</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed">
            The US tax year runs from <strong>January 1 to December 31</strong>. Tax returns for the previous year are typically due by April 15 (or the next business day if it falls on a weekend or holiday).
          </p>
        </div>
      </section>

      {/* Section 2: Tax Brackets */}
      <section id="tax-brackets" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          2026 Federal Tax Brackets
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            The US uses a progressive tax system with seven tax brackets. Your taxable income is divided across these brackets, with each portion taxed at its corresponding rate.
          </p>

          {/* Tax Brackets Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#2ecc71]/30">
              <thead>
                <tr className="bg-[#2ecc71]/10">
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Tax Rate</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Single Filers</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Married Filing Jointly</th>
                </tr>
              </thead>
              <tbody className="text-[#2ecc71]/80">
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">10%</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">$0 - $12,400</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">$0 - $24,800</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">12%</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">$12,401 - $50,400</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">$24,801 - $100,800</td>
                </tr>
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">22%</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">$50,401 - $105,700</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">$100,801 - $211,400</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">24%</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">$105,701 - $201,775</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">$211,401 - $403,550</td>
                </tr>
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">32%</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">$201,776 - $256,225</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">$403,551 - $512,450</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">35%</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">$256,226 - $640,600</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">$512,451 - $768,700</td>
                </tr>
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">37%</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Over $640,600</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Over $768,700</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Real Examples */}
          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Real-World Examples</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">$50,000 Income</h4>
              <ul className="text-sm text-[#2ecc71]/70 space-y-1">
                <li>Standard deduction: $15,000</li>
                <li>Taxable: $35,000</li>
                <li className="font-semibold text-[#2ecc71]">Federal Tax: ~$3,700</li>
              </ul>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">$85,000 Income</h4>
              <ul className="text-sm text-[#2ecc71]/70 space-y-1">
                <li>Standard deduction: $15,000</li>
                <li>Taxable: $70,000</li>
                <li className="font-semibold text-[#2ecc71]">Federal Tax: ~$9,100</li>
              </ul>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">$120,000 Income</h4>
              <ul className="text-sm text-[#2ecc71]/70 space-y-1">
                <li>Standard deduction: $15,000</li>
                <li>Taxable: $105,000</li>
                <li className="font-semibold text-[#2ecc71]">Federal Tax: ~$17,800</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#2ecc71]/5 border-l-4 border-[#2ecc71] p-4 rounded-r-lg mt-6">
            <p className="text-[#2ecc71]/90 text-sm">
              <strong>Important:</strong> These are federal income tax estimates only. They don't include FICA taxes (Social Security and Medicare), state taxes, or any deductions. Use our <a href="/calculator/usa" className="underline hover:no-underline">US Tax Calculator</a> to see your complete take-home pay.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: FICA */}
      <section id="fica" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          FICA: Social Security & Medicare
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            <strong>FICA</strong> (Federal Insurance Contributions Act) taxes fund Social Security and Medicare programs. These are separate from federal income tax and are calculated on your gross income.
          </p>

          <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-[#2ecc71] mb-4">2026 FICA Rates</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#2ecc71] mb-2">Social Security</h4>
                <ul className="text-[#2ecc71]/70 space-y-1">
                  <li>• <strong>Employee rate:</strong> 6.2% of wages</li>
                  <li>• <strong>Wage base limit:</strong> $184,500 (earnings above this aren't taxed)</li>
                  <li>• Maximum employee contribution: $11,439</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-[#2ecc71]/20">
                <h4 className="font-semibold text-[#2ecc71] mb-2">Medicare</h4>
                <ul className="text-[#2ecc71]/70 space-y-1">
                  <li>• <strong>Employee rate:</strong> 1.45% of all wages</li>
                  <li>• <strong>Additional Medicare:</strong> 0.45% on earnings over $200,000 (single)</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">What FICA Funds</h3>
          <ul className="space-y-2 text-[#2ecc71]/70 ml-4">
            <li>• <strong>Social Security:</strong> Retirement benefits, disability benefits, survivor benefits</li>
            <li>• <strong>Medicare:</strong> Health insurance for people 65 and older, some younger disabled individuals</li>
          </ul>
        </div>
      </section>

      {/* Section 4: State Taxes */}
      <section id="state-taxes" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          State Income Tax
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            In addition to federal tax, most states impose their own income tax. State tax rates and rules vary significantly by state.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">States with No Income Tax</h4>
              <p className="text-sm text-[#2ecc71]/70">
                Alaska, Florida, Nevada, New Hampshire (dividends/interest only), South Dakota, Tennessee, Texas, Washington, Wyoming
              </p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">States with Flat Tax</h4>
              <p className="text-sm text-[#2ecc71]/70">
                Colorado, Illinois, Indiana, Kentucky, Massachusetts, Michigan, North Carolina, Pennsylvania, Utah
              </p>
            </div>
          </div>

          <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
            <h4 className="font-semibold text-[#2ecc71] mb-2">States with Graduated Tax</h4>
            <p className="text-sm text-[#2ecc71]/70">
              California, New York, New Jersey, Oregon, Minnesota, and most other states use progressive tax brackets similar to the federal system.
            </p>
          </div>

          <div className="bg-[#2ecc71]/5 border-l-4 border-[#2ecc71] p-4 rounded-r-lg mt-6">
            <p className="text-[#2ecc71]/90 text-sm">
              <strong>Note:</strong> Some states allow deductions for contributions to 401(k) plans and IRAs, while others don't. State tax rates range from 0% to over 13%. Our calculator accounts for state-specific rules.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Deductions */}
      <section id="deductions" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Deductions & Adjustments
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Deductions reduce your taxable income, lowering the amount of tax you owe. There are two main types: above-the-line deductions (adjustments) and itemized deductions.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Above-the-Line Deductions (Adjustments)</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed mb-4">
            These reduce your gross income before calculating AGI and are available even if you take the standard deduction:
          </p>

          <ul className="space-y-2 text-[#2ecc71]/70 ml-4">
            <li>• <strong>401(k) contributions:</strong> Pre-tax contributions to employer retirement plans (2026 limit: $24,500)</li>
            <li>• <strong>Traditional IRA:</strong> Deductible contributions if you don't have a workplace plan (2026 limit: $7,500)</li>
            <li>• <strong>HSA contributions:</strong> Health Savings Account contributions (2026 limit: $4,400 individual, $8,750 family)</li>
            <li>• <strong>Student loan interest:</strong> Up to $2,500 per year (income limits apply)</li>
            <li>• <strong>Self-employment expenses:</strong> Business expenses, home office, etc.</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Itemized Deductions</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed mb-4">
            If your itemized deductions exceed the standard deduction, you may benefit from itemizing:
          </p>

          <ul className="space-y-2 text-[#2ecc71]/70 ml-4">
            <li>• <strong>State and local taxes (SALT):</strong> Up to $10,000 per year</li>
            <li>• <strong>Mortgage interest:</strong> On primary and secondary residences</li>
            <li>• <strong>Charitable contributions:</strong> Cash and property donations</li>
            <li>• <strong>Medical expenses:</strong> Exceeding 7.5% of AGI</li>
          </ul>

            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-bold text-[#2ecc71] mb-4">2026 Standard Deduction</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-[#2ecc71]/70">Single</p>
                <p className="text-2xl font-bold text-[#2ecc71]">$16,100</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#2ecc71]/70">Married Filing Jointly</p>
                <p className="text-2xl font-bold text-[#2ecc71]">$32,200</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#2ecc71]/70">Head of Household</p>
                <p className="text-2xl font-bold text-[#2ecc71]">$24,150</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Tax Credits */}
      <section id="tax-credits" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Tax Credits
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Tax credits directly reduce the amount of tax you owe, dollar for dollar. They're more valuable than deductions because they reduce your tax bill rather than just your taxable income.
          </p>

          <div className="space-y-4">
            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">Child Tax Credit</h4>
              <p className="text-sm text-[#2ecc71]/70">Up to $2,000 per dependent child under 17. Partially refundable.</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">Earned Income Tax Credit (EITC)</h4>
              <p className="text-sm text-[#2ecc71]/70">Refundable credit for low-to-moderate income workers. Amount depends on income and family size.</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">Education Credits</h4>
              <p className="text-sm text-[#2ecc71]/70">American Opportunity Credit (up to $2,500) and Lifetime Learning Credit for qualified education expenses.</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">Clean Vehicle Credit</h4>
              <p className="text-sm text-[#2ecc71]/70">Up to $7,500 for new electric vehicles meeting domestic production requirements.</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">Energy Efficient Home Credits</h4>
              <p className="text-sm text-[#2ecc71]/70">Credits for qualifying energy-efficient improvements to your home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-12 pt-8 border-t border-[#2ecc71]/20">
        <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#2ecc71] mb-4">
            Calculate Your US Take-Home Pay
          </h2>
          <p className="text-[#2ecc71]/70 mb-6 max-w-2xl mx-auto">
            Now you understand how US income tax works, use our calculator to see exactly how much you'll take home based on your salary, state, and deductions.
          </p>
          <a
            href="/calculator/usa"
            className="inline-block px-8 py-4 bg-[#f1c40f] text-[#020806] text-lg font-bold rounded-lg hover:bg-[#f39c12] active:scale-95 active:bg-[#e67e22] transition-all duration-300 shadow-lg"
          >
            Try the US Tax Calculator
          </a>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="text-sm text-[#2ecc71]/50 pt-8 border-t border-[#2ecc71]/10">
        <p>
          The information on this page is for general guidance only. Tax rules can change, and individual circumstances vary. For personalized tax advice, please consult a qualified tax professional or visit the <a href="https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">official IRS website</a>.
        </p>
      </section>
    </article>
  );
}
