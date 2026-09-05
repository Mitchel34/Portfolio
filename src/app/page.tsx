import type { Metadata } from "next";

import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { CourseworkSection } from "@/components/CourseworkSection";
import { CredibilityBand } from "@/components/CredibilityBand";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Hero } from "@/components/Hero";
import { OpenSourceSection } from "@/components/OpenSourceSection";
import { ProjectGrid } from "@/components/ProjectGrid";
import { TalksSection } from "@/components/TalksSection";
import { site } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: site.title,
    description: site.metaDescription,
    pathname: "/",
    keywords: [
      "AI portfolio",
      "ML portfolio",
      "research engineer portfolio",
      "open source research code",
      "hydrology machine learning",
    ],
  }),
  title: {
    absolute: `${site.name} | ${site.title}`,
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <CredibilityBand />
      <FeaturedProject />
      <OpenSourceSection />
      <TalksSection />
      <ProjectGrid />
      <AboutSection />
      <CourseworkSection />
      <ContactSection />
    </div>
  );
}
