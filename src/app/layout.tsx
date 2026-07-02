import type { Metadata } from "next";
import { Inter, Baloo_2 } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_NAME } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${SITE_NAME} | Plan Your Sri Lanka Journey`,
  description:
    "Pick a themed trail — coastal, cultural, wild, or modern — and get a ready-made Sri Lanka itinerary you can make your own.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${baloo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-brand-cream text-foreground font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
