"use client";

import { useScrollSpy } from "../components/useScrollSpy";
import InfoLayoutWrapper from "../components/InfoLayoutWrapper";

const sectionIds = [
  "basics",
  "tax-brackets",
  "personal-allowance",
  "national-insurance",
  "student-loan",
  "tax-codes",
  "payslip",
  "scotland",
];

export default function UKTaxGuide() {
  const activeSection = useScrollSpy(sectionIds, 0.6);

  return (
    <InfoLayoutWrapper scrollSpyActiveId={activeSection}>
      <UKTaxContent />
    </InfoLayoutWrapper>
  );
}

function UKTaxContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2ecc71] mb-4">
          UK Income Tax Guide
        </h1>
        <p className="text-[#2ecc71]/70 text-lg">
          Everything you need to know about income tax in the United Kingdom
        </p>
      </header>

      {/* Section 1: Tax Basics */}
      <section id="basics" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Income Tax Basics
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Income tax in the UK is money you pay to HM Revenue and Customs (HMRC) based on how much you earn. It helps fund essential public services including the NHS, schools, roads, and the welfare system. Most people pay income tax automatically through the PAYE (Pay As You Earn) system, which means it's deducted from your salary before you receive it.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Who Needs to Pay Income Tax?</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed mb-4">
            You pay income tax if you earn more than your <strong>Personal Allowance</strong> — the amount you can earn tax-free each year. For the 2025-2026 tax year, this is £12,570.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">The UK Tax Year</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed">
            The UK tax year runs from <strong>6 April to 5 April</strong> the following year. This is different from the calendar year. The 2025-2026 tax year, for example, runs from 6 April 2025 to 5 April 2026. This affects when new tax rates come into effect and when you need to file tax returns.
          </p>
        </div>
      </section>

      {/* Section 2: Tax Brackets */}
      <section id="tax-brackets" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          2025-2026 Tax Brackets & Rates
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            The UK uses a progressive tax system with different rates for different portions of your income. Here are the current tax brackets for England, Wales, and Northern Ireland:
          </p>

          {/* Tax Brackets Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#2ecc71]/30">
              <thead>
                <tr className="bg-[#2ecc71]/10">
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Tax Band</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Taxable Income</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Tax Rate</th>
                </tr>
              </thead>
              <tbody className="text-[#2ecc71]/80">
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Personal Allowance</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Up to £12,570</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">0%</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Basic Rate</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">£12,571 to £50,270</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">20%</td>
                </tr>
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Higher Rate</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">£50,271 to £125,140</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">40%</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Additional Rate</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Over £125,140</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">45%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Real Examples */}
          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Real-World Examples</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">£25,000 Salary</h4>
              <ul className="text-sm text-[#2ecc71]/70 space-y-1">
                <li>Tax-free: £12,570</li>
                <li>Taxed at 20%: £12,430</li>
                <li className="font-semibold text-[#2ecc71]">Income Tax: £2,486</li>
              </ul>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">£50,000 Salary</h4>
              <ul className="text-sm text-[#2ecc71]/70 space-y-1">
                <li>Tax-free: £12,570</li>
                <li>Taxed at 20%: £37,430</li>
                <li className="font-semibold text-[#2ecc71]">Income Tax: £7,486</li>
              </ul>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">£80,000 Salary</h4>
              <ul className="text-sm text-[#2ecc71]/70 space-y-1">
                <li>Tax-free: £12,570</li>
                <li>At 20%: £7,540</li>
                <li>At 40%: £11,892</li>
                <li className="font-semibold text-[#2ecc71]">Income Tax: £19,432</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#2ecc71]/5 border-l-4 border-[#2ecc71] p-4 rounded-r-lg mt-6">
            <p className="text-[#2ecc71]/90 text-sm">
              <strong>Important:</strong> These calculations don't include National Insurance contributions, which are calculated separately. Use our <a href="/calculator/uk" className="underline hover:no-underline">UK Tax Calculator</a> to see your complete take-home pay.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Personal Allowance */}
      <section id="personal-allowance" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Personal Allowance Explained
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            The <strong>Personal Allowance</strong> is the tax-free income you can make every year. It's essentially an amount that the government lets you earn without paying any income tax on it. This allowance applies to most people who are resident in the UK.
          </p>

          <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#2ecc71] mb-4">2025-2026 Personal Allowance</h3>
            <p className="text-4xl font-bold text-[#2ecc71] mb-2">£12,570</p>
            <p className="text-[#2ecc71]/70">This is the amount you can earn tax-free</p>
          </div>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">What Happens if You Earn More Than £100,000?</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed mb-4">
            If your income exceeds £100,000, your Personal Allowance is gradually reduced. For every £2 you earn over £100,000, you lose £1 of your Personal Allowance. This means:
          </p>

          <div className="bg-[#e74c3c]/5 border-l-4 border-[#e74c3c] p-4 rounded-r-lg mb-4">
            <p className="text-[#2ecc71]/90">
              <strong>At £125,140 or above:</strong> Your Personal Allowance is completely reduced to £0. You pay tax on your entire income.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Marriage Allowance</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed">
            If you're married or in a civil partnership and one of you earns less than the Personal Allowance, you can transfer up to £1,260 of your unused allowance to your partner. This can reduce their tax bill by up to £252 per year. To qualify, the higher earner must be a Basic Rate taxpayer (earning between £12,571 and £50,270).
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Blind Person's Allowance</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed">
            If you're registered blind (or severely sight impaired), you can claim an additional allowance of £3,070 on top of your standard Personal Allowance. This means you can earn £15,640 before paying any income tax.
          </p>
        </div>
      </section>

      {/* Section 4: National Insurance */}
      <section id="national-insurance" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          National Insurance Explained
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            <strong>National Insurance (NI)</strong> is separate from income tax but also deducted from your salary. It funds state benefits including the State Pension, unemployment benefits, and the NHS. You pay National Insurance if you're employed and earn more than the Primary Threshold.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">How Much National Insurance Do You Pay?</h3>

          <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-6 mb-6">
            <p className="text-[#2ecc71]/80 mb-4">For most employees (Class 1 National Insurance):</p>
            <ul className="space-y-2 text-[#2ecc71]/70">
              <li>• <strong>0%</strong> on earnings up to £12,570 (Primary Threshold)</li>
              <li>• <strong>8%</strong> on earnings between £12,571 and £50,270</li>
              <li>• <strong>2%</strong> on earnings above £50,270</li>
            </ul>
          </div>

          <p className="text-[#2ecc71]/80 leading-relaxed">
            Unlike income tax, which is calculated on your annual income, National Insurance is usually calculated on your earnings in each pay period (weekly or monthly). This means if you have a high-earning month, you might pay more NI that month, even if your annual income stays the same.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Why Do You Pay National Insurance?</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Your National Insurance contributions build up your entitlement to:
          </p>
          <ul className="space-y-2 text-[#2ecc71]/70 ml-4">
            <li>• <strong>State Pension:</strong> You need 35 qualifying years for the full new State Pension</li>
            <li>• <strong>Jobseeker's Allowance:</strong> If you lose your job</li>
            <li>• <strong>Employment and Support Allowance:</strong> If you're unable to work due to illness</li>
            <li>• <strong>Maternity Allowance:</strong> Support when having a baby</li>
            <li>• <strong>Bereavement Support:</strong> Help when a partner dies</li>
          </ul>
        </div>
      </section>

      {/* Section 5: Student Loans */}
      <section id="student-loan" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Student Loan Repayment
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            If you took out a student loan to pay for university tuition fees or living costs, you'll repay it through your salary once you start working and earn above a certain threshold. The amount you repay is based on your income, not the size of your loan.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">How Student Loan Repayment Works</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed mb-4">
            Your employer will automatically deduct student loan repayments from your salary if you earn above the threshold for your loan plan. The repayment amount is:
          </p>
          <ul className="space-y-2 text-[#2ecc71]/70 ml-4">
            <li>• <strong>9%</strong> of your income above the threshold for undergraduate loans (Plan 1, 2, 4, 5)</li>
            <li>• <strong>6%</strong> of your income above the threshold for postgraduate loans (Plan 3)</li>
          </ul>
          <p className="text-[#2ecc71]/80 leading-relaxed mt-4">
            Repayments are automatically deducted along with your income tax and National Insurance.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">2025-2026 Student Loan Plans</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#2ecc71]/30">
              <thead>
                <tr className="bg-[#2ecc71]/10">
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Plan</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Who it's for</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Threshold</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Rate</th>
                </tr>
              </thead>
              <tbody className="text-[#2ecc71]/80">
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Plan 1</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">England/Wales pre-2012, Northern Ireland</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">£25,000/year</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">9%</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Plan 2</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">England 2012-2023</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">£27,295/year</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">9%</td>
                </tr>
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Plan 3</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Postgraduate (Master's/Doctoral)</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">£21,000/year</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">6%</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Plan 4</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Scotland</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">£31,395/year</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">9%</td>
                </tr>
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Plan 5</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">England post-Aug 2023</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">£25,000/year</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">9%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">When Are Loans Written Off?</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed mb-4">
            Student loans aren't lifelong debts - they're written off after a set number of years:
          </p>
          <ul className="space-y-2 text-[#2ecc71]/70 ml-4">
            <li>• <strong>Plan 1:</strong> 25 years after leaving course</li>
            <li>• <strong>Plan 2:</strong> 30 years after leaving course</li>
            <li>• <strong>Plan 3:</strong> 30 years after leaving course</li>
            <li>• <strong>Plan 4:</strong> 30 years after leaving course</li>
            <li>• <strong>Plan 5:</strong> 40 years after leaving course</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Which Plan Am I On?</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Your plan depends on <strong>when</strong> you started your course and <strong>where</strong> you lived when you took out the loan. You can find out which plan you're on by checking your <a href="https://www.gov.uk/student-finance" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Student Finance account</a> or your annual tax summary.
          </p>
        </div>
      </section>

      {/* Section 6: Tax Codes */}
      <section id="tax-codes" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Understanding Tax Codes
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Your <strong>tax code</strong> tells your employer how much tax-free income you're entitled to and how much tax to deduct from your salary. It's usually shown on your payslip, P45, or P60.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">The Most Common Tax Code: 1257L</h3>

          <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-6">
            <p className="text-[#2ecc71]/80 mb-4">Breaking down <strong className="text-[#2ecc71] text-xl">1257L</strong>:</p>
            <ul className="space-y-2 text-[#2ecc71]/70">
              <li>• <strong>1257</strong> = Your tax-free allowance divided by 10 (£12,570 ÷ 10)</li>
              <li>• <strong>L</strong> = You're entitled to the standard tax-free Personal Allowance</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Other Common Tax Codes</h3>

          <div className="space-y-4">
            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">BR (Basic Rate)</h4>
              <p className="text-sm text-[#2ecc71]/70">All income taxed at Basic Rate (20%). Common for second jobs or if your Personal Allowance is used elsewhere.</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">0T (Zero Tax-free)</h4>
              <p className="text-sm text-[#2ecc71]/70">No Personal Allowance. All income taxed from the first pound. Used when your employer doesn't have enough information about your circumstances.</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">S1257L</h4>
              <p className="text-sm text-[#2ecc71]/70">Same as 1257L but for Scottish taxpayers (uses Scottish tax rates).</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">C1257L</h4>
              <p className="text-sm text-[#2ecc71]/70">For Welsh taxpayers (uses same rates as England but tax goes to Welsh Government).</p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#2ecc71] mb-2">K (K-codes)</h4>
              <p className="text-sm text-[#2ecc71]/70">Used when you have untaxed income that exceeds your Personal Allowance (e.g., company benefits). The number after K is added to your taxable income.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">Emergency Tax Codes</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed">
            If you start a new job and your employer doesn't have your P45, they might use an emergency tax code (like 1257L W1/M1 or 1257L X). This means you're getting the standard Personal Allowance, but it's not spread across the year properly. You might pay too much tax initially, but HMRC will usually adjust this automatically and refund you.
          </p>

          <h3 className="text-xl font-semibold text-[#2ecc71] mt-8 mb-4">How to Check and Change Your Tax Code</h3>
          <p className="text-[#2ecc71]/80 leading-relaxed mb-4">
            You can check your tax code on:
          </p>
          <ul className="space-y-2 text-[#2ecc71]/70 ml-4">
            <li>• Your payslip (usually near the top)</li>
            <li>• Your P45 (when you leave a job)</li>
            <li>• Your P60 (annual tax summary)</li>
            <li>• Your <a href="https://www.gov.uk/personal-tax-account" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Personal Tax Account</a> online</li>
            <li>• The HMRC app</li>
          </ul>

          <div className="bg-[#2ecc71]/5 border-l-4 border-[#2ecc71] p-4 rounded-r-lg mt-6">
            <p className="text-[#2ecc71]/90 text-sm">
              <strong>Wrong tax code?</strong> If you think your tax code is wrong, contact HMRC. They can correct it and refund any overpaid tax. If you've underpaid, they may adjust your tax code for the next year to collect the amount owed.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Payslip */}
      <section id="payslip" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Reading Your Payslip
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            Understanding your payslip helps you verify you're being paid correctly and shows exactly where your money goes. Here's what to look for:
          </p>

          <div className="space-y-4">
            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-3">Gross Pay</h3>
              <p className="text-[#2ecc71]/80">
                This is your total earnings before any deductions. It includes your basic salary plus any bonuses, overtime, or commissions for that pay period.
              </p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-3">Deductions Section</h3>
              <p className="text-[#2ecc71]/80 mb-3">Common deductions you'll see:</p>
              <ul className="space-y-2 text-[#2ecc71]/70">
                <li>• <strong>Income Tax (PAYE):</strong> The tax deducted based on your tax code</li>
                <li>• <strong>National Insurance:</strong> Your NI contributions</li>
                <li>• <strong>Pension:</strong> If you're enrolled in a workplace pension scheme</li>
                <li>• <strong>Student Loan:</strong> If you're repaying a student loan</li>
                <li>• <strong>Other:</strong> Any salary sacrifice schemes (cycle to work, childcare vouchers, etc.)</li>
              </ul>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-3">Net Pay</h3>
              <p className="text-[#2ecc71]/80">
                This is your <strong>take-home pay</strong> — what actually goes into your bank account after all deductions.
              </p>
            </div>

            <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-[#2ecc71] mb-3">Tax Month/Week Number</h3>
              <p className="text-[#2ecc71]/80">
                The tax year runs from 6 April to 5 April and is divided into 12 months. April = Month 1, May = Month 2, etc. This helps track your cumulative tax position throughout the year.
              </p>
            </div>
          </div>

          <div className="bg-[#2ecc71]/5 border-l-4 border-[#2ecc71] p-4 rounded-r-lg mt-6">
            <p className="text-[#2ecc71]/90 text-sm">
              <strong>Tip:</strong> Always check your payslip for errors. If the tax deducted seems wrong, or if your tax code has changed unexpectedly, contact your HR department or HMRC to clarify.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Scotland */}
      <section id="scotland" className="mb-16 scroll-mt-28">
        <h2 className="text-2xl font-bold text-[#2ecc71] mb-6 pb-2 border-b border-[#2ecc71]/20">
          Scotland: Different Tax Rates
        </h2>
        
        <div className="space-y-6">
          <p className="text-[#2ecc71]/80 leading-relaxed">
            If you live in Scotland, you pay the Scottish Rate of Income Tax (SRIT) to the Scottish Government. Scotland has more tax bands than the rest of the UK, with the aim of making the tax system more progressive.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#2ecc71]/30">
              <thead>
                <tr className="bg-[#2ecc71]/10">
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Tax Band</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Taxable Income</th>
                  <th className="border border-[#2ecc71]/30 px-4 py-3 text-left text-[#2ecc71] font-semibold">Tax Rate</th>
                </tr>
              </thead>
              <tbody className="text-[#2ecc71]/80">
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Personal Allowance</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Up to £12,570</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">0%</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Starter Rate</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">£12,571 to £15,397</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">19%</td>
                </tr>
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Basic Rate</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">£15,398 to £28,868</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">20%</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Intermediate Rate</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">£28,869 to £50,270</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">21%</td>
                </tr>
                <tr>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Higher Rate</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">£50,271 to £125,140</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">42%</td>
                </tr>
                <tr className="bg-[#2ecc71]/5">
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Top Rate</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">Over £125,140</td>
                  <td className="border border-[#2ecc71]/30 px-4 py-3">47%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[#2ecc71]/80 leading-relaxed">
            The key difference is that Scotland has a 19% Starter Rate and a 21% Intermediate Rate, and slightly higher rates for higher earners (42% and 47% instead of 40% and 45%). If you live in Scotland, your tax code will start with an 'S' (e.g., S1257L).
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-12 pt-8 border-t border-[#2ecc71]/20">
        <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#2ecc71] mb-4">
            Calculate Your UK Take-Home Pay
          </h2>
          <p className="text-[#2ecc71]/70 mb-6 max-w-2xl mx-auto">
            Now you understand how UK income tax works, use our calculator to see exactly how much you'll take home based on your salary and circumstances.
          </p>
          <a
            href="/calculator/uk"
            className="inline-block px-8 py-4 bg-[#f1c40f] text-[#020806] text-lg font-bold rounded-lg hover:bg-[#f39c12] active:scale-95 active:bg-[#e67e22] transition-all duration-300 shadow-lg"
          >
            Try the UK Tax Calculator
          </a>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="text-sm text-[#2ecc71]/50 pt-8 border-t border-[#2ecc71]/10">
        <p>
          The information on this page is for general guidance only. Tax rules can change, and individual circumstances vary. For personalized tax advice, please consult a qualified tax professional or visit the <a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">official HMRC website</a>.
        </p>
      </section>
    </article>
  );
}
