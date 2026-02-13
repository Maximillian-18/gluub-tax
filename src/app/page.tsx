import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 leading-tight">
            ONE BUSINESS
          </h1>
          
          {/* Gradient Subheadline */}
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-12 leading-tight bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            UNTOLD POSSIBILITIES
          </h2>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-16 max-w-3xl mx-auto font-light">
            MACHNET is a business that can fulfil all your manufacturing needs. 50+ years of manufacturing experience, we delivery on a global scale using the most modern manufacturing processes.
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4">
            <Link 
              href="/signup" 
              className="px-12 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-bold rounded-lg uppercase tracking-wide hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-1"
            >
              START MANUFACTURING
            </Link>
            
            <Link 
              href="#" 
              className="text-gray-400 hover:text-white text-sm font-medium uppercase tracking-wide transition-colors"
            >
              HOW IT WORKS
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
