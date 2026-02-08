import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "Applied AI, forecasting, and software engineering projects including Hydra Temporal and production API systems.",
  pathname: "/projects",
  keywords: [
    "AI projects",
    "forecasting projects",
    "software engineering portfolio projects",
  ],
});

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
