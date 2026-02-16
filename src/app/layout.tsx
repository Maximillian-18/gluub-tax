import type { Metadata } from "next";
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
  title: "Gluub - Calculate Take Home Pay",
  description: "Calculate your take home pay with our easy-to-use tax calculator.",
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
