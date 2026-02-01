import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google"; // [NEW]

import "./globals.css";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({ // [NEW]
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mitchelcarson.com"),
  title: `${site.name} | ${site.title}`,
  description:
    "AI engineer focused on forecasting systems, applied ML, and production software.",
  openGraph: {
    title: `${site.name} | ${site.title}`,
    description: "AI engineer focused on forecasting systems, applied ML, and production software.",
    url: "https://mitchelcarson.com",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetBrainsMono.variable} min-h-screen bg-background text-foreground antialiased selection:bg-blue-500/30`}
      >
        <Nav />
        <main className="pb-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
