import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between w-full px-12 py-5 bg-black/90 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50">
      <div className="flex-1 flex justify-start">
        <Link href="/" className="text-2xl font-bold text-white tracking-tight ml-12">
          M<span className="text-purple-500">A</span>CHNET
        </Link>
      </div>
      
      <div className="flex items-center gap-8">
        <Link href="#" className="text-gray-300 hover:text-white text-sm font-medium tracking-wide uppercase transition-colors">
          Capabilities
        </Link>
        <Link href="#" className="text-gray-300 hover:text-white text-sm font-medium tracking-wide uppercase transition-colors">
          Sectors
        </Link>
        <Link href="/contact" className="text-gray-300 hover:text-white text-sm font-medium tracking-wide uppercase transition-colors">
          Contact
        </Link>
        <Link href="#" className="text-gray-300 hover:text-white text-sm font-medium tracking-wide uppercase transition-colors">
          Account
        </Link>
      </div>

      <div className="flex-1 flex justify-end items-center gap-6">
        <Link href="/login" className="text-gray-300 hover:text-white text-sm font-medium uppercase transition-colors">
          Login
        </Link>
        <Link 
          href="/signup" 
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-bold rounded-lg uppercase tracking-wide hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/25"
        >
          Start Manufacturing
        </Link>
      </div>
    </nav>
  );
}
