import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { Nav } from "@/components/Nav";
import { StructuredData } from "@/components/StructuredData";
import { ThemeProvider } from "@/components/ThemeProvider";
import { rootMetadata } from "@/lib/seo";

const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader-latin-normal.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/newsreader-latin-italic.woff2", weight: "200 800", style: "italic" },
  ],
  adjustFontFallback: "Times New Roman",
  variable: "--font-newsreader",
  display: "swap",
});

const plexSans = localFont({
  src: [{ path: "./fonts/ibm-plex-sans-latin-normal.woff2", weight: "400 600", style: "normal" }],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables live on <html> so the @theme tokens (declared on :root) can resolve them.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/25">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <a
              href="#main-content"
              className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-[2px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition focus:translate-y-0"
            >
              Skip to content
            </a>
            <StructuredData />
            <Nav />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
