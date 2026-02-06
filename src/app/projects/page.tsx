import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { projects, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Projects | ${site.name}`,
  description: "AI, ML, and software engineering projects with real-world impact.",
};

export default function ProjectsPage() {
  return (
    <section className="bg-background pb-16 pt-14 text-foreground">
      <Container>
        <SectionHeader
          eyebrow="Projects"
          title="Forecasting and software systems"
          description="Each project includes problem framing, technical approach, measurable outcomes, and implementation lessons."
        />

        <div className="mt-10 grid gap-7">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
