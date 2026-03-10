"use client";

import { useScrollSpy } from "../components/useScrollSpy";
import InfoLayoutWrapper from "../components/InfoLayoutWrapper";

const sectionIds = [
  "basics",
  "tax-brackets",
  "municipal-tax",
  "atp-pension",
  "labour-market",
  "church-tax",
];

export default function DenmarkTaxGuide() {
  const activeSection = useScrollSpy(sectionIds, 0.6);

  return (
    <InfoLayoutWrapper scrollSpyActiveId={activeSection}>
      <DenmarkTaxContent />
    </InfoLayoutWrapper>
  );
}

function DenmarkTaxContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2ecc71] mb-4">
          Denmark Income Tax Guide
        </h1>
        <p className="text-[#2ecc71]/70 text-lg">
          Everything you need to know about Danish income tax (2026)
        </p>
      </header>

      {/* Section 1: Tax Basics */}
      <section id="basics" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Income Tax Basics
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Denmark has a progressive tax system with some of the highest tax rates in the world. However, the tax revenue funds an extensive welfare system including free healthcare, education, and generous social benefits. Most employees have taxes automatically deducted from their salary (A-skat) by their employer.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Who Needs to Pay Income Tax?</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed mb-4">
            Everyone who works in Denmark is subject to income tax. The tax is calculated on your gross income after the ATP pension contribution. The system is designed so that your employer handles most of the tax withholding automatically.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">The Danish Tax Year</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed">
            The Danish tax year runs from <strong>January 1 to December 31</strong> (kalenderår). If your circumstances change during the year (e.g., you move, get married, or change jobs), you should report these changes to SKAT (the Danish tax authority). You can file an annual tax return to claim back any overpaid tax.
          </p>
        </div>
      </section>

      {/* Section 2: Tax Brackets */}
      <section id="tax-brackets" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          National Income Tax Brackets
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Denmark has a progressive tax system with four national income tax brackets. In 2026, a major tax reform replaced the old two-bracket system with a new four-tier system (bundskat, mellemskat, topskat, and top-topskat). The thresholds are calculated on income after AM-bidrag (labour market contribution).
          </p>

          {/* Tax Brackets Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#2ecc71]/30">
              <thead>
                <tr className="bg-[#2ecc71]/10">
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Tax Type</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Income Above (after AM-bidrag)</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Tax Rate</th>
                </tr>
              </thead>
              <tbody className="text-[#2ecc71]/80">
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Bottom Tax (Bundskat)</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Above kr. 54,100</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">12.01%</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Middle Tax (Mellemskat)</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Above kr. 641,200</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">7.5%</td>
                </tr>
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Top Tax (Topskat)</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Above kr. 777,900</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">7.5%</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Top Top Tax (Toptopskat)</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Above kr. 2,592,700</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">5%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Real Examples */}
          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Real-World Examples</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">400,000 DKK</h4>
              <ul className="text-sm text-[#2ecc71]/70 space-y-1">
                <li>Bottom Tax: ~kr. 41,600</li>
                <li className="font-semibold text-[#2ecc71]">State Tax: ~kr. 41,600</li>
              </ul>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">700,000 DKK</h4>
              <ul className="text-sm text-[#2ecc71]/70 space-y-1">
                <li>Bottom Tax: ~kr. 41,600</li>
                <li>Middle Tax: ~kr. 4,410</li>
                <li className="font-semibold text-[#2ecc71]">State Tax: ~kr. 46,010</li>
              </ul>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">900,000 DKK</h4>
              <ul className="text-sm text-[#2ecc71]/70 space-y-1">
                <li>Bottom Tax: ~kr. 41,600</li>
                <li>Middle Tax: ~kr. 19,410</li>
                <li>Top Tax: ~kr. 916</li>
                <li className="font-semibold text-[#2ecc71]">State Tax: ~kr. 61,926</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#2ecc71]/5 border-l-4 border-[#2ecc71] p-4 rounded-r-lg mt-6">
            <p className="text-[#2ecc71]/90 text-sm">
              <strong>Important:</strong> These calculations include national taxes only. They don't include municipal tax, labour market contribution (AM-bidrag), or church tax. Use our <a href="/calculator/denmark" className="underline hover:no-underline">Danish Tax Calculator</a> to see your complete take-home pay.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Municipal Tax */}
      <section id="municipal-tax" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Municipal Tax (Kommuneskat)
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            In addition to national taxes, you pay a municipal tax (kommuneskat) to your local municipality. This tax funds local services like schools, elderly care, and public transportation.
          </p>

          <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-[#2ecc71] mb-4">2026 Municipal Tax Rates</h3>
            <ul className="space-y-2 text-[#2ecc71]/70">
              <li>• <strong>Average rate:</strong> Approximately 25%</li>
              <li>• <strong>Range:</strong> Approximately 22% - 27% depending on municipality</li>
              <li>• <strong>Copenhagen:</strong> Approximately 23.8%</li>
              <li>• <strong>Aarhus:</strong> Approximately 24.5%</li>
            </ul>
          </div>

          <p className="text-[#2ecc71]/80 leading-relaxed">
            The municipal tax is calculated on your total income (before national taxes). It's deducted automatically by your employer along with your national tax.
          </p>
        </div>
      </section>

      {/* Section 4: ATP Pension */}
      <section id="atp-pension" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          ATP Pension (Labour Market Pension)
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            <strong>ATP</strong> (Arbejdsmarkedets Tillægspension) is a mandatory pension scheme that provides supplementary retirement benefits. Almost all employees in Denmark are required to contribute to ATP.
          </p>

          <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-[#2ecc71] mb-4">2026 ATP Contributions (Private Sector)</h3>
            <p className="text-[#2ecc71]/70 mb-4">For full-time employees (117+ hours/month):</p>
            <ul className="space-y-2 text-[#2ecc71]/70">
              <li>• <strong>Employee's share (1/3):</strong> 99 DKK per month (1,188 DKK per year)</li>
              <li>• <strong>Employer's share (2/3):</strong> 198 DKK per month (2,376 DKK per year)</li>
              <li>• <strong>Total contribution:</strong> 297 DKK per month (3,564 DKK per year)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">How ATP Works</h3>
          <ul className="space-y-2 text-[#2ecc71]/70 ml-4">
            <li>• Contributions are automatically deducted from your salary</li>
            <li>• The contribution is split between employee and employer</li>
            <li>• ATP provides a guaranteed supplement to your folkepension (state pension)</li>
            <li>• Benefits are calculated based on your contribution period</li>
          </ul>

          <div className="bg-[#2ecc71]/5 border-l-4 border-[#2ecc71] p-4 rounded-r-lg mt-6">
            <p className="text-[#2ecc71]/90 text-sm">
              <strong>Note:</strong> ATP contributions are deducted from your gross salary before calculating income tax. This makes ATP a tax-advantaged retirement savings vehicle.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Labour Market Contribution */}
      <section id="labour-market" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Labour Market Contribution (AM-Bidrag)
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            The <strong>AM-bidrag</strong> (Arbejdsmarkedsbidrag) is a labour market contribution that funds various social programs including unemployment benefits, sickness benefits, and vocational training.
          </p>

          <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-[#2ecc71] mb-4">2026 AM-Bidrag Rate</h3>
            <ul className="space-y-2 text-[#2ecc71]/70">
              <li>• <strong>Rate:</strong> 8% of gross income</li>
              <li>• <strong>No upper limit:</strong> Applied to all income</li>
              <li>• <strong>Deducted before tax:</strong> Reduces your taxable income</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">What AM-Bidrag Funds</h3>
          <ul className="space-y-2 text-[#2ecc71]/70 ml-4">
            <li>• <strong>Unemployment benefits (dagpenge):</strong> Support when between jobs</li>
            <li>• <strong>Sickness benefits (sygedagpenge):</strong> Income during illness</li>
            <li>• <strong>Maternity benefits (svangerskabsdagpenge):</strong> Support during pregnancy</li>
            <li>• <strong>Vocational training:</strong> Education and retraining programs</li>
          </ul>

          <div className="bg-[#2ecc71]/5 border-l-4 border-[#2ecc71] p-4 rounded-r-lg mt-6">
            <p className="text-[#2ecc71]/90 text-sm">
              <strong>Important:</strong> AM-bidrag is deducted from your gross salary before calculating income tax. This means it effectively reduces both your taxable income and your total tax burden.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Church Tax */}
      <section id="church-tax" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Church Tax (Kirkeskat)
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Church tax (kirkeskat) is a voluntary tax paid by members of the Danish National Church (Folkekirken). If you're baptized and confirmed in the Church, you're automatically a member and will be charged church tax unless you formally resign.
          </p>

          <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-[#2ecc71] mb-4">2026 Church Tax Rates</h3>
            <ul className="space-y-2 text-[#2ecc71]/70">
              <li>• <strong>Average rate:</strong> Approximately 0.64%</li>
              <li>• <strong>Varies by parish:</strong> Typically 0.4% - 1% depending on municipality</li>
              <li>• <strong>Membership:</strong> Approximately 74% of Danes are members</li>
              <li>• <strong>Optional:</strong> You can resign from the Church at any time</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">How to Opt Out</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed mb-4">
            If you don't wish to pay church tax, you can resign from the Danish National Church:
          </p>
          <ul className="space-y-2 text-[#2ecc71]/70 ml-4">
            <li>• <strong>Online:</strong> Through the Danish Church's website (folkekirken.dk)</li>
            <li>• <strong>In person:</strong> At your local parish office</li>
            <li>• <strong>Written notice:</strong> Send a letter to your parish</li>
          </ul>

          <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4 mt-6">
            <p className="text-[#2ecc71]/80">
              <strong>Note:</strong> Resigning from the Church means you won't receive certain services like baptism, confirmation, wedding ceremonies, and funeral services from the Church. However, you can rejoin at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-12 pt-8 border-t border-[#2ecc71]/20">
        <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#2ecc71] mb-4">
            Calculate Your Danish Take-Home Pay
          </h2>
          <p className="text-[#2ecc71]/70 mb-6 max-w-2xl mx-auto">
            Now you understand how Danish income tax works, use our calculator to see exactly how much you'll take home based on your salary and municipality.
          </p>
          <a
            href="/calculator/denmark"
            className="inline-block px-8 py-4 bg-[#f1c40f] text-[#020806] text-lg font-bold rounded-lg hover:bg-[#f39c12] active:scale-95 active:bg-[#e67e22] transition-all duration-300 shadow-lg"
          >
            Try the Danish Tax Calculator
          </a>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="text-sm text-[#2ecc71]/50 pt-8 border-t border-[#2ecc71]/10">
        <p>
          The information on this page is for general guidance only. Tax rules can change, and individual circumstances vary. For personalized tax advice, please consult a qualified tax professional or visit the <a href="https://skat.dk/en-us/individuals/taxation-in-denmark/types-of-tax" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">official SKAT website</a>.
        </p>
      </section>
    </article>
  );
}
