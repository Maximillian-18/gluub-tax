import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/next";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gluub - Free Tax Calculators for UK, Denmark & Germany",
    template: "%s | Gluub Tax Calculator",
  },
  description: "Calculate your take home pay with our free, accurate tax calculators for UK, Denmark, and Germany. Updated for 2025-2026 tax years.",
  keywords: ["tax calculator", "take home pay", "salary calculator", "UK tax", "Denmark tax", "Germany tax", "net salary"],
  authors: [{ name: "Gluub" }],
  creator: "Gluub",
  publisher: "Gluub",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://gluub.com",
    siteName: "Gluub",
    title: "Gluub - Free Tax Calculators for UK, Denmark & Germany",
    description: "Calculate your take home pay with our free, accurate tax calculators for UK, Denmark, and Germany.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gluub Tax Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gluub - Free Tax Calculators",
    description: "Calculate your take home pay with our free tax calculators.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://gluub.com",
    languages: {
      "en-GB": "https://gluub.com/calculator/uk",
      "da-DK": "https://gluub.com/calculator/denmark",
      "de-DE": "https://gluub.com/calculator/germany",
      "x-default": "https://gluub.com",
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#020806",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        style={{ fontFamily: 'var(--font-noto-sans)' }}
        className={`${notoSans.variable} font-sans antialiased`}
      >
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
