import type { Metadata } from "next";

import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { CourseworkSection } from "@/components/CourseworkSection";
import { CredibilityBand } from "@/components/CredibilityBand";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "AI / Machine Learning Engineer Portfolio",
    description:
      "Mitchel Carson is an early-career AI/ML engineer and UT Austin M.S. AI student building forecasting research, production software, and reliable machine-learning systems.",
    pathname: "/",
    keywords: [
      "AI portfolio",
      "ML portfolio",
      "forecasting engineer",
      "hydrology machine learning",
    ],
  }),
  title: {
    absolute: "Mitchel Carson | AI / Machine Learning Engineer",
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <CredibilityBand />
      <AboutSection />
      <CourseworkSection />
      <FeaturedProject />
      <ProjectGrid />
      <ContactSection />
    </main>
  );
}
