"use client";

import { useScrollSpy } from "../components/useScrollSpy";
import InfoLayoutWrapper from "../components/InfoLayoutWrapper";

const sectionIds = [
  "basics",
  "tax-brackets",
  "tax-classes",
  "social-security",
  "church-tax",
  "solidarity-surcharge",
  "payslip",
];

export default function GermanyTaxGuide() {
  const activeSection = useScrollSpy(sectionIds, 0.6);

  return (
    <InfoLayoutWrapper scrollSpyActiveId={activeSection}>
      <GermanyTaxContent />
    </InfoLayoutWrapper>
  );
}

function GermanyTaxContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2ecc71] mb-4">
          Germany Income Tax Guide
        </h1>
        <p className="text-[#2ecc71]/70 text-lg">
          Everything you need to know about income tax in Germany (2026)
        </p>
      </header>

      {/* Section 1: Tax Basics */}
      <section id="basics" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Income Tax Basics
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Income tax in Germany is known as <strong>Einkommensteuer</strong> (income tax) or <strong>Lohnsteuer</strong> (wage tax) for employees. It's a progressive tax system, meaning the rate increases as your income rises. Most employees have tax automatically deducted from their salary by their employer through the Lohnsteuer system.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Who Needs to Pay Income Tax?</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed mb-4">
            You pay income tax if you earn more than the <strong>Grundfreibetrag</strong> (basic allowance) — the amount you can earn tax-free each year. For 2026, this is €12,348 for single taxpayers (€24,696 for married couples filing jointly).
          </p>

          <div className="bg-[#2ecc71]/5 border border-[#2ecc71]/20 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-[#2ecc71] mb-3">Example Calculation</h4>
            <p className="text-[#2ecc71]/80 mb-3">If you earn €50,000 per year:</p>
            <ul className="space-y-2 text-[#2ecc71]/70">
              <li>• First €12,348: Tax-free (0%) = €0</li>
              <li>• €12,349 - €17,799: Taxed progressively (14-24%)</li>
              <li>• €17,800 - €50,000: Taxed progressively (24-42%)</li>
              <li>• <strong>Income tax paid: approximately €9,500</strong></li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">The German Tax Year</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed">
            The German tax year runs from <strong>1 January to 31 December</strong> (Kalenderjahr). This is the same as the calendar year. If you're employed, your employer deducts Lohnsteuer monthly from your salary. You can file an annual tax return (Steuererklärung) to claim back any overpaid tax.
          </p>
        </div>
      </section>

      {/* Section 2: Tax Brackets */}
      <section id="tax-brackets" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          2026 Tax Brackets & Rates
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Germany uses a progressive tax system with multiple zones. Unlike simple bracket systems, Germany uses mathematical formulas to calculate tax smoothly across each zone. Here are the current tax brackets:
          </p>

          {/* Tax Brackets Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#2ecc71]/30">
              <thead>
                <tr className="bg-[#2ecc71]/10">
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Tax Zone</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Taxable Income</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Tax Rate</th>
                </tr>
              </thead>
              <tbody className="text-[#2ecc71]/80">
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Basic Allowance</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Up to €12,348</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">0%</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Progressive Zone 1</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">€12,349 - €17,799</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">14% - 24%</td>
                </tr>
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Progressive Zone 2</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">€17,800 - €69,878</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">24% - 42%</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Proportional Zone</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">€69,879 - €277,825</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">42%</td>
                </tr>
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Top Rate (Reichensteuer)</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Over €277,826</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">45%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Real Examples */}
          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Real-World Examples</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">€35,000 Salary</h4>
              <ul className="text-sm text-[#2ecc71]/70 space-y-1">
                <li>Tax-free: €12,348</li>
                <li>Progressive zones: €22,652</li>
                <li className="font-semibold text-[#2ecc71]">Income Tax: ~€4,100</li>
              </ul>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">€60,000 Salary</h4>
              <ul className="text-sm text-[#2ecc71]/70 space-y-1">
                <li>Tax-free: €12,348</li>
                <li>Progressive zones: €47,652</li>
                <li className="font-semibold text-[#2ecc71]">Income Tax: ~€12,800</li>
              </ul>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">€100,000 Salary</h4>
              <ul className="text-sm text-[#2ecc71]/70 space-y-1">
                <li>Tax-free: €12,348</li>
                <li>At 42%: €87,652</li>
                <li className="font-semibold text-[#2ecc71]">Income Tax: ~€30,600</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#2ecc71]/5 border-l-4 border-[#2ecc71] p-4 rounded-r-lg mt-6">
            <p className="text-[#2ecc71]/90 text-sm">
              <strong>Important:</strong> These calculations are income tax only. They don't include social security contributions, church tax, or solidarity surcharge. Use our <a href="/calculator/germany" className="underline hover:no-underline">German Tax Calculator</a> to see your complete take-home pay.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Tax Classes */}
      <section id="tax-classes" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Tax Classes (Steuerklassen)
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Germany has six tax classes (Steuerklassen) that determine how much tax is deducted from your salary. Your employer uses this to calculate Lohnsteuer. You can change your tax class at the Finanzamt (tax office).
          </p>

          <div className="space-y-4">
            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-2">Class I (I)</h3>
              <p className="text-[#2ecc71]/70 mb-3">Single, divorced, separated, or widowed</p>
              <p className="text-[#2ecc71]/80 text-sm">This is the most common class for single people. No special deductions apply.</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-2">Class II (II)</h3>
              <p className="text-[#2ecc71]/70 mb-3">Single parents living with at least one child</p>
              <p className="text-[#2ecc71]/80 text-sm">Includes a tax relief amount (Entlastungsbetrag) for single parents.</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-2">Class III (III)</h3>
              <p className="text-[#2ecc71]/70 mb-3">Married couples where one spouse earns significantly more</p>
              <p className="text-[#2ecc71]/80 text-sm">The higher earner uses this class while the partner uses Class V. The couple gets the combined allowance but tax is front-loaded on the higher earner.</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-2">Class IV (IV)</h3>
              <p className="text-[#2ecc71]/70 mb-3">Married couples with similar incomes</p>
              <p className="text-[#2ecc71]/80 text-sm">Both spouses use Class IV. Similar to Class I but with double the basic allowance.</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-2">Class V (V)</h3>
              <p className="text-[#2ecc71]/70 mb-3">Married couples where one spouse earns significantly less</p>
              <p className="text-[#2ecc71]/80 text-sm">Used by the lower-earning spouse in a married couple (when partner uses Class III). Higher tax rates apply.</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-2">Class VI (VI)</h3>
              <p className="text-[#2ecc71]/70 mb-3">Second job or multiple employments</p>
              <p className="text-[#2ecc71]/80 text-sm">If you have more than one employer, your second job uses Class VI with no basic allowance. Very little tax is taken at source, so you'll likely owe tax when filing.</p>
            </div>
          </div>

          <div className="bg-[#2ecc71]/5 border-l-4 border-[#2ecc71] p-4 rounded-r-lg mt-6">
            <p className="text-[#2ecc71]/90 text-sm">
              <strong>Tip:</strong> Married couples should consider their combined income when choosing between Classes III/IV and III/V. The total tax paid is the same, but the distribution between spouses differs.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Social Security */}
      <section id="social-security" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Social Security Contributions
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Germany has a comprehensive social security system. Employees and employers both contribute. The employee's share is deducted from their gross salary. Here are the main components:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#2ecc71]/30">
              <thead>
                <tr className="bg-[#2ecc71]/10">
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Insurance Type</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Employee Rate</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">2026 Ceiling</th>
                </tr>
              </thead>
              <tbody className="text-[#2ecc71]/80">
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Health Insurance (Krankenversicherung)</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">7.3% + supplementary (typically 1.3-2.9%)</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">€69,750/year</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Pension Insurance (Rentenversicherung)</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">9.3%</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">€101,400/year</td>
                </tr>
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Unemployment Insurance (Arbeitslosenversicherung)</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">1.3%</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">€101,400/year</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Nursing Care Insurance (Pflegeversicherung)</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">1.7% (+0.6% if no children)</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">€69,750/year</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Contribution Ceilings (Beitragsbemessungsgrenze)</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Social security contributions are capped. Even if you earn more than the ceiling, you only pay contributions up to that limit. This means high earners pay a lower percentage of their total income in social security contributions.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Private vs Statutory Insurance</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Above a certain income threshold (€69,750 in 2026), you can choose private health insurance instead of statutory (gesetzliche) insurance. Private insurance can be cheaper or more expensive depending on your situation, but it doesn't include unemployment or pension contributions from the employer.
          </p>
        </div>
      </section>

      {/* Section 5: Church Tax */}
      <section id="church-tax" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Church Tax (Kirchensteuer)
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            If you're a member of a Christian church (Catholic, Protestant) or another religious community that collects church tax in Germany, you'll pay <strong>Kirchensteuer</strong> (church tax). This is typically 8-9% of your income tax liability.
          </p>

          <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#2ecc71] mb-4">Church Tax Rates by State</h3>
            <ul className="space-y-2 text-[#2ecc71]/70">
              <li>• <strong>8%</strong> of income tax: Baden-Württemberg, Bayern (Bavaria)</li>
              <li>• <strong>9%</strong> of income tax: All other states</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">How Church Tax Works</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Church tax is calculated as a percentage of your income tax (not your gross income). If your income tax is €5,000 and you're in a 9% state, you'll pay €450 in church tax. It's automatically deducted by your employer if you're registered with a church.
          </p>

          <div className="bg-[#2ecc71]/5 border-l-4 border-[#2ecc71] p-4 rounded-r-lg mt-6">
            <p className="text-[#2ecc71]/90 text-sm">
              <strong>Important:</strong> You can opt out of church tax by formally leaving your church at the local court (Amtsgericht). However, this is a serious decision with implications beyond tax.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Solidarity Surcharge */}
      <section id="solidarity-surcharge" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Solidarity Surcharge (Solidaritätszuschlag)
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            The <strong>Solidaritätszuschlag</strong> (solidarity surcharge) was originally introduced in 1991 to help fund German reunification. It applies to most taxpayers and is calculated as a percentage of your income tax.
          </p>

          <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#2ecc71] mb-4">2026 Solidarity Surcharge Rules</h3>
            <ul className="space-y-2 text-[#2ecc71]/70">
              <li>• <strong>Rate:</strong> 5.5% of income tax</li>
              <li>• <strong>Threshold:</strong> Only applies if income tax exceeds €20,350/year</li>
              <li>• <strong>Exemption:</strong> Most low and middle-income earners are exempt</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Example Calculation</h3>
          <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
            <p className="text-[#2ecc71]/80 mb-2">If your income tax is €15,000:</p>
            <p className="text-[#2ecc71]/70">No solidarity surcharge (below €20,350 threshold)</p>
          </div>
          <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
            <p className="text-[#2ecc71]/80 mb-2">If your income tax is €25,000:</p>
            <p className="text-[#2ecc71]/70">Solidarity surcharge = €25,000 × 5.5% = €1,375</p>
          </div>

          <p className="text-[#2ecc71]/80 leading-relaxed">
            There's also a "mitigation zone" (Milderungszone) that phases in the surcharge gradually for those just above the threshold, so you won't see a sudden jump in the total amount owed.
          </p>
        </div>
      </section>

      {/* Section 7: Payslip */}
      <section id="payslip" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Understanding Your German Payslip
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            German payslips (Gehaltsabrechnung or Entgeltnachweis) contain detailed information about your earnings and deductions. Here's what you'll typically find:
          </p>

          <div className="space-y-4">
            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-3">Bruttogehalt (Gross Pay)</h3>
              <p className="text-[#2ecc71]/80">
                Your total salary before any deductions. This includes your base salary plus any bonuses, overtime, or allowances.
              </p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-3">Lohnsteuer (Wage Tax)</h3>
              <p className="text-[#2ecc71]/80 mb-3">The main income tax deducted from your salary. This is calculated based on your tax class and taxable income.</p>
              <p className="text-[#2ecc71]/80 text-sm">Also shows: Solidaritätszuschlag (surcharge), Kirchensteuer (church tax if applicable)</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-3">Sozialversicherungsbeiträge (Social Security)</h3>
              <p className="text-[#2ecc71]/80 mb-3">Your share of contributions:</p>
              <ul className="space-y-1 text-[#2ecc71]/70 text-sm ml-4">
                <li>• Krankenversicherung (Health Insurance)</li>
                <li>• Rentenversicherung (Pension Insurance)</li>
                <li>• Arbeitslosenversicherung (Unemployment Insurance)</li>
                <li>• Pflegeversicherung (Nursing Care Insurance)</li>
              </ul>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-3">Nettogehalt (Net Pay)</h3>
              <p className="text-[#2ecc71]/80">
                Your take-home pay after all deductions. This is what gets transferred to your bank account.
              </p>
            </div>
          </div>

          <div className="bg-[#2ecc71]/5 border-l-4 border-[#2ecc71] p-4 rounded-r-lg mt-6">
            <p className="text-[#2ecc71]/90 text-sm">
              <strong>Tip:</strong> Your payslip should show a "Brutto-Netto-Verhältnis" (gross-to-net ratio). In Germany, the employee typically covers about 20-22% of their gross salary in taxes and social contributions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-12 pt-8 border-t border-[#2ecc71]/20">
        <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#2ecc71] mb-4">
            Calculate Your German Take-Home Pay
          </h2>
          <p className="text-[#2ecc71]/70 mb-6 max-w-2xl mx-auto">
            Now you understand how German income tax works, use our calculator to see exactly how much you'll take home based on your salary and circumstances.
          </p>
          <a
            href="/calculator/germany"
            className="inline-block px-8 py-4 bg-[#f1c40f] text-[#020806] text-lg font-bold rounded-lg hover:bg-[#f39c12] active:scale-95 active:bg-[#e67e22] transition-all duration-300 shadow-lg"
          >
            Try the German Tax Calculator
          </a>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="text-sm text-[#2ecc71]/50 pt-8 border-t border-[#2ecc71]/10">
        <p>
          The information on this page is for general guidance only. Tax rules can change, and individual circumstances vary. For personalized tax advice, please consult a qualified tax professional or visit the <a href="https://www.bmf-steuerrechner.de" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">official German Federal Ministry of Finance website</a>.
        </p>
      </section>
    </article>
  );
}
