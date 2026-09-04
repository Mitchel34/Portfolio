import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Notes } from "@/components/Notes";
import { ProjectCard } from "@/components/ProjectCard";
import { SchemaScript } from "@/components/SchemaScript";
import { harmonyBoundaryNote, projects } from "@/lib/content";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "Case studies in applied AI and production software: HYDRA post-processing for NextGen streamflow reforecasts, USAA GraphQL services, and Harmony's fail-closed research system.",
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
          lede="Problem, approach, current evidence, limits, and lessons, for the HYDRA pipeline, USAA production APIs, and the Harmony forecasting system."
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
        <Notes
            items={[{ id: "2", text: harmonyBoundaryNote }]}
          />
        </Container>
      </div>
    </>
  );
}
