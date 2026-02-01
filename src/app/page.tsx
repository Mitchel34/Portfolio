import { Hero } from "@/components/Hero";
// Import other sections as we build them
import { AboutSection } from "@/components/AboutSection";
import { CoreValues } from "@/components/CoreValues";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ResearchSection } from "@/components/ResearchSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />


      <AboutSection />
      <CoreValues />
      <FeaturedProject />
      <ProjectGrid />
      <ResearchSection />
      <ContactSection />



    </main>
  );
}
