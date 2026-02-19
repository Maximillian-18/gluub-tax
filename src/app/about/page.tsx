import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-[#020806] text-[#2ecc71] flex flex-col">
      <main className="flex-1 px-4 md:px-8 py-12 pt-24 md:pt-28 max-w-4xl mx-auto w-full">
        
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2ecc71] mb-6 text-center">
            About Gluub
          </h1>
          <div className="bg-[#0a1f15] rounded-xl p-6 md:p-8 border border-[#2ecc71]/20 text-left">
            <p className="text-lg text-[#2ecc71]/90 leading-relaxed mb-4">
              Hi, I'm Max. I created Gluub as a fun project to help people better understand their take-home pay and income tax.
            </p>
            <p className="text-lg text-[#2ecc71]/90 leading-relaxed mb-4">
              Like many people, I'm always curious about where my money goes and how much I actually receive. Whether I'm negotiating a pay rise, starting a new job, or calculating a bonus, understanding my real income helps me plan my life with more confidence.
            </p>
            <p className="text-lg text-[#2ecc71]/90 leading-relaxed">
              That's why I built Gluub — a clean, straightforward platform that brings multiple tax calculators together in one place. If you need access to different calculators, you won't have to jump between multiple sites.
            </p>
          </div>
        </section>

        {/* Why Gluub Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2ecc71] mb-6 text-center">
            Why Gluub?
          </h2>
          <div className="bg-[#0a1f15] rounded-xl p-6 md:p-8 border border-[#2ecc71]/20">
            <p className="text-lg text-[#2ecc71]/90 leading-relaxed">
              Data is pulled from government sites to ensure the formulas are as accurate as possible. While there may still be some inaccuracies, I'm continually researching and working with tax professionals to make the calculators as reliable as they can be.
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2ecc71] mb-6 text-center">
            How it works
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

        {/* Privacy & Security Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2ecc71] mb-6 text-center">
            Your Privacy Matters
          </h2>
          <div className="bg-[#0a1f15] rounded-xl p-6 md:p-8 border border-[#2ecc71]/20">
            <h3 className="font-bold text-lg mb-4">We Don't Store Your Data</h3>
            <p className="text-[#2ecc71]/80 mb-6">
              Unlike many websites, we don't collect or store your salary information. When you use our calculator:
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

        {/* Disclaimer Section */}
        <section className="mb-16">
          <div className="bg-[#e74c3c]/5 border-l-4 border-[#e74c3c] rounded-r-xl p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#2ecc71] mb-4">
              Important Note
            </h2>
            <p className="text-[#2ecc71]/90 leading-relaxed mb-4">
              While Gluub provides reliable estimates, individual tax situations vary. For complex tax matters or personalized advice, we always recommend consulting with a qualified tax professional.
            </p>
            <p className="text-[#2ecc71]/70 text-sm">
              <strong>Disclaimer:</strong> Gluub's calculators provide estimates for informational purposes only. They should not be considered financial or tax advice. Always consult a qualified tax professional for your specific situation.
            </p>
          </div>
        </section>

      </main>

    </div>
  );
}
