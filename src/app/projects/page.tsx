import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Notes } from "@/components/Notes";
import { OpenSourceTable } from "@/components/OpenSourceTable";
import { ProjectCard } from "@/components/ProjectCard";
import { SchemaScript } from "@/components/SchemaScript";
import { SectionFrame } from "@/components/SectionFrame";
import { harmonyBoundaryNote, projects } from "@/lib/content";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "Completed public ML and platform labs, NextGen research software, HYDRA forecasting research, and production APIs, with reproducible evidence and explicit limits.",
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

      <div className="pb-20">
        <PageHeader
          label="Projects"
          title="Engineering case studies."
          lede="Completed ML and platform labs, research software, and production APIs. Each case study connects the problem and approach to published evidence, current limits, and lessons."
        />
        <Container>
          <div className="mt-10 [&>article:first-child]:border-t-0 [&>article:first-child]:pt-0">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="full"
                noteId={project.slug === "harmony" ? "2" : undefined}
              />
            ))}
          </div>
          <Notes items={[{ id: "2", text: harmonyBoundaryNote }]} />
        </Container>

        <div className="mt-20">
          <SectionFrame
            label="Open source"
            title="The code behind the claims."
            lede="Research code and tooling published so results can be inspected and reproduced."
          >
            <OpenSourceTable />
          </SectionFrame>
        </div>
      </div>
    </>
  );
}
