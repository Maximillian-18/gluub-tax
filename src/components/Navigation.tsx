import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between w-full px-3 md:px-12 py-3 md:py-5 bg-[#020806]/90 backdrop-blur-sm fixed top-0 left-0 right-0 z-[100]">
      <Link href="/" className="flex items-start -space-x-3 ml-2 md:ml-12">
        <Image 
          src="/gluub-bull-icon.svg" 
          alt="Gluub Logo" 
          width={64}
          height={64}
          className="h-12 w-auto md:h-16 relative z-10 -mt-2"
          priority
        />
        <span className="text-lg md:text-2xl font-bold text-[#2ecc71] tracking-tight">
          Gluub
        </span>
      </Link>

      <div className="flex items-center gap-2 md:gap-8 mr-2 md:mr-12">
        <Link href="/about" className="text-[#2ecc71] text-xs md:text-base font-medium tracking-wide hover:opacity-80">
          About
        </Link>
        <Link href="/info" className="text-[#2ecc71] text-xs md:text-base font-medium tracking-wide hover:opacity-80">
          Info
        </Link>
        <Link href="/contact" className="text-[#2ecc71] text-xs md:text-base font-medium tracking-wide hover:opacity-80">
          Contact
        </Link>
        <Link href="/faq" className="text-[#2ecc71] text-xs md:text-base font-medium tracking-wide hover:opacity-80">
          FAQ
        </Link>
      </div>
    </nav>
  );
}
