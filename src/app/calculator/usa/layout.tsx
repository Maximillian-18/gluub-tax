import { Metadata } from "next";

export const metadata: Metadata = {
  title: "USA Tax Calculator 2026 - Calculate Take Home Pay",
  description: "Calculate your USA take home pay with our free tax calculator. Includes federal income tax, FICA, state tax. Updated for 2025-2026 tax years.",
  keywords: ["USA tax calculator", "US income tax calculator", "American salary calculator", "US net salary", "federal tax calculator", "FICA calculator"],
  alternates: {
    canonical: "https://gluub.com/calculator/usa",
    languages: {
      en: "https://gluub.com/calculator/usa",
    },
  },
};

export default function USACalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
