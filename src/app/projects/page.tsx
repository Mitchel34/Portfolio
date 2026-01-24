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
    <section className="py-12">
      <Container>
        <SectionHeader
          eyebrow="Projects"
          title="Forecasting and software systems"
          description="Each project includes the problem context, technical approach, outcomes, and lessons learned."
        />
        <div className="mt-8 grid gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
