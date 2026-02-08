import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { SchemaScript } from "@/components/SchemaScript";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/lib/content";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

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
  const projectCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mitchel Carson Project Case Studies",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: absoluteUrl(`/projects/${project.slug}`),
    })),
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ]}
      />
      <SchemaScript data={projectCollectionSchema} />

      <section className="bg-background pb-16 pt-14 text-foreground">
        <Container>
          <SectionHeader
            as="h1"
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
    </>
  );
}
