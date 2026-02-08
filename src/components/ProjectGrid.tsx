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
          title="Systems built to operate under real constraints"
          description="From regulated financial services to algorithmic trading, my work focuses on reliability, evaluation, and long-term behavior—not just model accuracy."
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
