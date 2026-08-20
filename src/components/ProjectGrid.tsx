"use client";

import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/lib/content";

const secondaryProjects = projects.slice(1);

export function ProjectGrid() {
  if (secondaryProjects.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Additional Projects"
          title="Software built for real-world use"
          description="From production APIs to modular research software, I focus on clear interfaces, careful testing, safe behavior, and maintainable code."
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
