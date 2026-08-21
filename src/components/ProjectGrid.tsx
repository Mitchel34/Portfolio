"use client";

import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { landingSections, projects } from "@/lib/content";

const secondaryProjects = projects.slice(1);

export function ProjectGrid() {
  if (secondaryProjects.length === 0) return null;
  const section = landingSections.projects;

  return (
    <section className="scroll-mt-24 py-20" id={section.id}>
      <Container>
        <SectionHeader
          eyebrow={section.label}
          title="Software built for real use."
          description="Enterprise APIs and modular AI software, each tied to a clear problem, implementation, and outcome."
        />

        <div className="mt-10 grid gap-7">
          {secondaryProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
