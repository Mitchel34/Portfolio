import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} | ${site.title}`,
  description:
    "AI engineer focused on forecasting systems, applied ML, and production software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} min-h-screen bg-slate-50 text-slate-900 antialiased`}
      >
        <Nav />
        <main className="pb-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
