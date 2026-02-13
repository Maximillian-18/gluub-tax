import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between w-full px-3 md:px-12 py-3 md:py-5 bg-[#05100a]/90 backdrop-blur-sm fixed top-0 left-0 right-0 z-[100]">
      <Link href="/" className="text-lg md:text-2xl font-bold text-[#2ecc71] tracking-tight ml-2 md:ml-12">
        Gluub
      </Link>

      <div className="flex items-center gap-2 md:gap-8 mr-2 md:mr-12">
        <span className="text-[#2ecc71] text-xs md:text-base font-medium tracking-wide">
          About
        </span>
        <span className="text-[#2ecc71] text-xs md:text-base font-medium tracking-wide">
          Info
        </span>
        <span className="text-[#2ecc71] text-xs md:text-base font-medium tracking-wide">
          FAQ
        </span>
      </div>
    </nav>
  );
}
