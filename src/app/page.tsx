import type { Metadata } from "next";

import { AboutSection } from "@/components/AboutSection";
import { CredibilityBand } from "@/components/CredibilityBand";
import { ContactSection } from "@/components/ContactSection";
import { CoreValues } from "@/components/CoreValues";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ResearchSection } from "@/components/ResearchSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Engineer Portfolio",
  description:
    "Mitchel Carson builds AI forecasting systems with production-grade software engineering discipline.",
  pathname: "/",
  keywords: [
    "AI portfolio",
    "ML portfolio",
    "forecasting engineer",
    "hydrology machine learning",
  ],
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <CredibilityBand />
      <AboutSection />
      <CoreValues />
      <FeaturedProject />
      <ProjectGrid />
      <ResearchSection />
      <ContactSection />
    </main>
  );
}
