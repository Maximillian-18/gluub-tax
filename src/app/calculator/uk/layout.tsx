import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UK Tax Calculator 2026 - Calculate Take Home Pay",
  description: "Calculate your UK take home pay with our free tax calculator. Includes income tax, national insurance, pension contributions. Updated for 2025-2026 tax year.",
  keywords: ["UK tax calculator", "UK take home pay calculator", "British salary calculator", "UK net salary", "income tax UK", "national insurance calculator"],
  alternates: {
    canonical: "https://gluub.com/calculator/uk",
    languages: {
      en: "https://gluub.com/calculator/uk",
    },
  },
};

export default function UKCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
