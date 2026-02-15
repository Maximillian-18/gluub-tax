"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomSelect } from "@/components/CustomSelect";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("united-kingdom");
  const router = useRouter();

  const handleCalculate = () => {
    if (selectedCountry === "united-kingdom") {
      router.push("/calculator/uk");
    } else if (selectedCountry === "germany") {
      router.push("/calculator/germany");
    } else if (selectedCountry === "denmark") {
      alert("Denmark calculator coming soon!");
    }
  };

  return (
    <div className="min-h-screen bg-[#05100a] text-[#2ecc71] flex flex-col">
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
            <CustomSelect
              value={selectedCountry}
              onValueChange={setSelectedCountry}
              options={[
                { value: "united-kingdom", label: "United Kingdom" },
                { value: "germany", label: "Germany" },
                { value: "denmark", label: "Denmark" },
              ]}
              placeholder="Select country"
              className="w-[220px]"
            />

            {/* Calculate Button */}
            <Button 
              onClick={handleCalculate}
              className="px-4 py-2 bg-[#f1c40f] text-[#05100a] text-lg font-bold rounded-lg hover:bg-[#f39c12] transition-all duration-300 shadow-lg"
            >
              Calculate
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
