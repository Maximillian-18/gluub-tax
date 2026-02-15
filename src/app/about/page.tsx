import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-[#020806] text-[#2ecc71] flex flex-col">
      <main className="flex-1 px-4 md:px-8 py-12 pt-24 md:pt-28 max-w-4xl mx-auto w-full">
        
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2ecc71] mb-6">
            About Gluub
          </h1>
          <div className="bg-[#0a1f15] rounded-xl p-6 md:p-8 border border-[#2ecc71]/20">
            <p className="text-lg text-[#2ecc71]/90 leading-relaxed mb-4">
              Gluub is a simple to use tax calculator that helps you find out what your take home pay is. We use current tax rates gathered from official government sources to accurately calculate your take home pay.
            </p>
            <p className="text-lg text-[#2ecc71]/90 leading-relaxed">
              We currently offer tax calculators for the UK, Germany, and Denmark. We'll keep adding more countries as we see demand and do the research!
            </p>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2ecc71] mb-6 text-center">
            What Can You Calculate?
          </h2>
          <div className="bg-[#0a1f15] rounded-xl p-6 md:p-8 border border-[#2ecc71]/20">
            <ul className="grid md:grid-cols-2 gap-4">
              {[
                "Income Tax (country-specific rates)",
                "National Insurance contributions (UK)",
                "Pension contributions",
                "Health insurance deductions",
                "Detailed tax breakdowns",
                "Social insurance deductions"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-[#2ecc71]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2ecc71] mb-6 text-center">
            Simple as 1-2-3
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Enter Your Income",
                description: "Tell us your gross salary and how often you get paid"
              },
              {
                step: "2", 
                title: "Add Your Details",
                description: "Enter your tax details, insurance info, and any applicable deductions"
              },
              {
                step: "3",
                title: "See Your Results",
                description: "Get a clear breakdown of your take-home pay, weekly, monthly, and yearly"
              }
            ].map((item) => (
              <div key={item.step} className="bg-[#0a1f15] rounded-xl p-6 border border-[#2ecc71]/20 text-center">
                <div className="w-10 h-10 bg-[#2ecc71] text-[#020806] rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[#2ecc71]/70">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Trust Gluub Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2ecc71] mb-6 text-center">
            Accurate & Up-to-Date
          </h2>
          <div className="bg-[#0a1f15] rounded-xl p-6 md:p-8 border border-[#2ecc71]/20 text-center">
            <p className="text-lg text-[#2ecc71]/90 leading-relaxed">
              We pull our tax rates directly from official government sources to ensure you&apos;re getting the most accurate calculation possible. Our calculators are updated for the 2025-2026 tax year.
            </p>
          </div>
        </section>

        {/* Privacy & Security Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2ecc71] mb-6 text-center">
            Your Privacy Matters
          </h2>
          <div className="bg-[#0a1f15] rounded-xl p-6 md:p-8 border border-[#2ecc71]/20">
            <h3 className="font-bold text-lg mb-4">We Don&apos;t Store Your Data</h3>
            <p className="text-[#2ecc71]/80 mb-6">
              Unlike many websites, we don&apos;t collect or store your salary information. When you use our calculator:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-red-400">✕</span>
                <span>No data is saved to our servers</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-red-400">✕</span>
                <span>No cookies tracking your calculations</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-red-400">✕</span>
                <span>No personal information required</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#2ecc71]">✓</span>
                <span>Everything stays on your device</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#2ecc71]">✓</span>
                <span>Completely anonymous</span>
              </div>
            </div>
            <p className="mt-6 text-[#2ecc71]/80">
              Your financial information is private, and we intend to keep it that way.
            </p>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2ecc71] mb-6">
            Ready to Calculate?
          </h2>
          <p className="text-lg text-[#2ecc71]/80 mb-8">
            Find out exactly how much you&apos;ll take home. No sign-up, no fuss, just accurate numbers.
          </p>
          <Link 
            href="/"
            className="inline-block px-8 py-4 bg-[#f1c40f] text-[#020806] text-lg font-bold rounded-lg hover:bg-[#f39c12] transition-all duration-300 shadow-lg"
          >
            Try the Calculator
          </Link>
        </section>

      </main>

    </div>
  );
}
