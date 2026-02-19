import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Information | Gluub",
  description: "Comprehensive guides to income tax, tax brackets, and deductions for UK, Germany, and Denmark.",
};

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#020806]">
      {children}
    </div>
  );
}
