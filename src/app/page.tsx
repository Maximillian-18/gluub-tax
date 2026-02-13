"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
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
            <Select defaultValue="united-kingdom">
              <SelectTrigger className="px-4 py-2 w-[220px] text-[#2ecc71] border-[#2ecc71] bg-transparent hover:bg-[#2ecc71]/10 focus:ring-[#2ecc71] text-lg font-bold">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom" sideOffset={4} className="bg-[#0d2818] border-[#2ecc71]">
                <SelectItem
                  value="united-kingdom"
                  className="text-[#2ecc71] focus:bg-[#2ecc71]/20 focus:text-[#2ecc71] font-bold"
                >
                  United Kingdom
                </SelectItem>
                <SelectItem
                  value="germany"
                  className="text-[#2ecc71] focus:bg-[#2ecc71]/20 focus:text-[#2ecc71] font-bold"
                >
                  Germany
                </SelectItem>
                <SelectItem
                  value="france"
                  className="text-[#2ecc71] focus:bg-[#2ecc71]/20 focus:text-[#2ecc71] font-bold"
                >
                  France
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Calculate Button */}
            <button className="px-4 py-2 bg-[#f1c40f] text-[#0d2818] text-lg font-bold rounded-lg hover:bg-[#f39c12] transition-all duration-300 shadow-lg">
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
