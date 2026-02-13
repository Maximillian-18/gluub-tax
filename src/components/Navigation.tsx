import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between w-full px-12 py-5 bg-[#0d2818]/90 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <Link href="/" className="text-2xl font-bold text-[#2ecc71] tracking-tight ml-12">
        Gluub
      </Link>

      <div className="flex items-center gap-8 mr-12">
        <span className="text-[#2ecc71] text-base font-medium tracking-wide">
          About & Info
        </span>
        <span className="text-[#2ecc71] text-base font-medium tracking-wide">
          FAQ
        </span>
      </div>
    </nav>
  );
}
