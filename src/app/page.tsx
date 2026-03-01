import type { Metadata } from "next";

import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "AI Engineer Portfolio",
    description:
      "Mitchel Carson builds production-grade ML systems with engineering discipline, from forecasting to financial risk infrastructure.",
    pathname: "/",
    keywords: [
      "AI portfolio",
      "ML portfolio",
      "forecasting engineer",
      "hydrology machine learning",
    ],
  }),
  title: {
    absolute: "Mitchel Carson | AI Engineer Portfolio",
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <AboutSection />
      <FeaturedProject />
      <ProjectGrid />
      <ContactSection />
    </main>
  );
}
