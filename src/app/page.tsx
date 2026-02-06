import { AboutSection } from "@/components/AboutSection";
import { CredibilityBand } from "@/components/CredibilityBand";
import { ContactSection } from "@/components/ContactSection";
import { CoreValues } from "@/components/CoreValues";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ResearchSection } from "@/components/ResearchSection";

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
