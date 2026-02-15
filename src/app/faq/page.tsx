
export default function FAQ() {
  const faqs = [
    {
      q: "Is this calculator free?",
      a: "Yes! Completely free to use, no sign-up required. We show ads on the site to help support the costs of keeping this service free for everyone."
    },
    {
      q: "Does Ad-block affect my experience?",
      a: "Nope! Feel free to use an ad-blocker. But if you can disable it to help support the site, we'd really appreciate it!"
    },
    {
      q: "How accurate is it?",
      a: "We use official government tax rates for each country. However, individual circumstances may vary, so always check with a tax professional for complex situations."
    },
    {
      q: "Do you store my salary information?",
      a: "No! We don't store any of your data. All calculations happen in your browser and disappear when you close the page."
    },
    {
      q: "Can I calculate my tax for previous years?",
      a: "Currently we only support 2025-2026, but we're working on adding historical tax years."
    },
    {
      q: "What countries do you support?",
      a: "We currently support the UK, Germany, and Denmark, with more countries coming soon!"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020806] text-[#2ecc71] flex flex-col">
      <main className="flex-1 px-4 md:px-8 py-12 pt-24 md:pt-28 max-w-4xl mx-auto w-full">
        
        {/* FAQ Section */}
        <section className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2ecc71] mb-8 text-center">
            Frequently Asked Questions
          </h1>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#0a1f15] rounded-xl p-6 border border-[#2ecc71]/20">
                <h2 className="font-bold text-lg mb-2">Q: {faq.q}</h2>
                <p className="text-[#2ecc71]/80">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

    </div>
  );
}
