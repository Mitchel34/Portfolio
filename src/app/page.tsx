import type { Metadata } from "next";

import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { PathSection } from "@/components/PathSection";
import { ResearchSection } from "@/components/ResearchSection";
import { ServiceSection } from "@/components/ServiceSection";
import { SkillsSection } from "@/components/SkillsSection";
import { WorkSection } from "@/components/WorkSection";
import { site } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: site.title,
    description: site.metaDescription,
    pathname: "/",
    keywords: [
      "Air Force veteran software engineer",
      "TS/SCI software engineer",
      "applied AI engineer",
      "scientific computing",
      "89th Airlift Wing",
      "Air Force Two",
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
      <ServiceSection />
      <PathSection />
      <WorkSection />
      <ResearchSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
