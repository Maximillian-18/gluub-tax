import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Germany Tax Calculator 2026 - Calculate Take Home Pay",
  description: "Calculate your Germany take home pay with our free tax calculator. Includes income tax, social security, pension contributions. Updated for 2025-2026 tax year.",
  keywords: ["Germany tax calculator", "German salary calculator", "Germany net pay", "Lohnsteuer calculator", "German income tax"],
  alternates: {
    canonical: "https://gluub.com/calculator/germany",
    languages: {
      de: "https://gluub.com/calculator/germany",
    },
  },
};

export default function GermanyCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
