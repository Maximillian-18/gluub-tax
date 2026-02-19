"use client";

import InfoLayoutWrapper from "../components/InfoLayoutWrapper";

export default function GermanyTaxGuide() {
  return (
    <InfoLayoutWrapper>
      <GermanyContent />
    </InfoLayoutWrapper>
  );
}

function GermanyContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2ecc71] mb-4">
          Germany Tax Guide
        </h1>
        <p className="text-[#2ecc71]/70 text-lg">
          Coming Soon
        </p>
      </header>

      <section className="mb-12">
        <div className="bg-[#020806] border border-[#2ecc71]/30 rounded-lg p-8 text-center">
          <p className="text-lg text-[#2ecc71]/80">
            We're currently working on a comprehensive guide to German income tax, including Lohnsteuer (wage tax), social security contributions, and tax classes.
          </p>
        </div>
      </section>
    </article>
  );
}
