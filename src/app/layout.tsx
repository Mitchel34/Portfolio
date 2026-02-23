import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Sora } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { StructuredData } from "@/components/StructuredData";
import { rootMetadata } from "@/lib/seo";

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

export const metadata: Metadata = rootMetadata;

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
        <StructuredData />
        <Nav />
        <main className="pb-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
