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
      "Mitchel Carson builds production software, applied AI research, and reliable data systems while pursuing an M.S. in Artificial Intelligence at UT Austin.",
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
    <div className="flex min-h-screen flex-col">
      <Hero />
      <CredibilityBand />
      <AboutSection />
      <CourseworkSection />
      <FeaturedProject />
      <ProjectGrid />
      <ContactSection />
    </div>
  );
}
