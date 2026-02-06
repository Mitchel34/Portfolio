import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Sora } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/lib/content";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
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
        className={`${sora.variable} ${fraunces.variable} ${ibmPlexMono.variable} min-h-screen bg-background text-foreground antialiased selection:bg-primary/25`}
      >
        <Nav />
        <main className="pb-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
