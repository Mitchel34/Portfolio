import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { Nav } from "@/components/Nav";
import { StructuredData } from "@/components/StructuredData";
import { ThemeProvider } from "@/components/ThemeProvider";
import { rootMetadata } from "@/lib/seo";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/25`}
      >
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
