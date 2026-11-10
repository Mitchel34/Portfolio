import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { OpenSourceTable } from "@/components/OpenSourceTable";
import { ProjectCard } from "@/components/ProjectCard";
import { SchemaScript } from "@/components/SchemaScript";
import { SectionFrame } from "@/components/SectionFrame";
import { projects } from "@/lib/content";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "Case studies in applied AI and production software: HYDRA post-processing for NextGen streamflow reforecasts, USAA GraphQL services, Harmony's decision system with bounded LLM autonomy, and open-source research code.",
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
          title="Case studies."
          lede="Three projects, each with a full write-up: the problem, the approach, where it stands, and what I learned."
        />
        <Container>
          <div className="mt-10 border-b border-foreground [&>article:first-child]:border-t-0 [&>article:first-child]:pt-0">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </Container>

        <div className="mt-20">
          <SectionFrame
            id="open-source"
            rule="none"
            label="Open source"
            title="The code behind the work."
            lede="Research code and tooling, public so the work can be inspected and reproduced."
          >
            <OpenSourceTable />
          </SectionFrame>
        </div>
      </div>
    </>
  );
}
