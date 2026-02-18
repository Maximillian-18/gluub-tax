import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Denmark Tax Calculator 2026 - Calculate Take Home Pay",
  description: "Calculate your Denmark take home pay with our free tax calculator. Includes ATP, pension contributions, municipal tax. Updated for 2025-2026 tax year.",
  keywords: ["Denmark tax calculator", "Danish salary calculator", "Denmark net pay", "ATP pension", "Kommuneskat calculator"],
  alternates: {
    canonical: "https://gluub.com/calculator/denmark",
    languages: {
      da: "https://gluub.com/calculator/denmark",
    },
  },
};

export default function DenmarkCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
