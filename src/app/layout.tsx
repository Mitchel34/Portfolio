import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Sora } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { Nav } from "@/components/Nav";
import { SemanticCursor } from "@/components/SemanticCursor";
import { StructuredData } from "@/components/StructuredData";
import { ThemeProvider } from "@/components/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${fraunces.variable} ${ibmPlexMono.variable} min-h-screen bg-background text-foreground antialiased selection:bg-primary/25`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <a
              href="#main-content"
              className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition focus:translate-y-0"
            >
              Skip to content
            </a>
            <StructuredData />
            <Nav />
            <main id="main-content" tabIndex={-1} className="pb-20">{children}</main>
            <Footer />
            <SemanticCursor />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
