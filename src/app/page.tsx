"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");

  return (
    <div className="min-h-screen bg-[#0d2818] text-[#2ecc71] flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-12 leading-tight text-[#2ecc71]">
            Calculate Take Home Pay
          </h1>

          {/* Country Selector and Calculate Button */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* Country Dropdown */}
            <button className="flex items-center gap-2 text-[#2ecc71] hover:text-white text-lg font-medium transition-colors">
              <span>{selectedCountry}</span>
              <ChevronDown className="w-5 h-5" />
            </button>

            {/* Calculate Button */}
            <button className="px-6 py-3 bg-[#f1c40f] text-[#0d2818] text-lg font-bold rounded-lg hover:bg-[#f39c12] transition-all duration-300 shadow-lg">
              Calculate
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full h-24 bg-[#1a4d2e]"></footer>
    </div>
  );
}
