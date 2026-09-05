import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { KeywordLine } from "@/components/KeywordLine";
import { PageHeader } from "@/components/PageHeader";
import { SchemaScript } from "@/components/SchemaScript";
import { SectionFrame } from "@/components/SectionFrame";
import { StatusLabel } from "@/components/StatusLabel";
import { TextLink } from "@/components/TextLink";
import { buttonClass } from "@/components/ui/Button";
import {
  getProjectBySlug,
  getProjectRepositoryUrl,
  projectEvidenceStatus,
  projects,
  research,
  site, evidenceWord } from "@/lib/content";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

type ProjectCaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

const HYDRA_SLUG = "hydra-temporal";

function getProjectSchema(slug: string) {
  const project = getProjectBySlug(slug);
  if (!project) return null;

  const canonical = absoluteUrl(`/projects/${project.slug}`);
  const repository = getProjectRepositoryUrl(project);

  if (repository) {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: project.title,
      description: `${project.problem} ${project.impact}`,
      url: canonical,
      author: {
        "@type": "Person",
        name: site.name,
        url: site.url,
      },
      codeRepository: repository,
      programmingLanguage: project.stack.join(", "),
      keywords: project.stack.join(", "),
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: `${project.problem} ${project.impact}`,
    url: canonical,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    keywords: project.stack.join(", "),
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createPageMetadata({
      title: "Project",
      description: "Project case study",
      pathname: `/projects/${slug}`,
      type: "article",
    });
  }

  return createPageMetadata({
    title: `${project.title} Case Study`,
    description: `${project.problem} ${project.impact}`,
    pathname: `/projects/${project.slug}`,
    keywords: [...project.stack, "project case study", "AI engineering"],
    type: "article",
  });
}

function CaseStudyGroup({ number, title, items }: { number: number; title: string; items: string[] }) {
  return (
    <section className="border-t border-border pt-6">
      <h3 className="flex gap-3 font-serif text-title text-foreground">
        <span className="mono-label pt-2 text-primary">{String(number).padStart(2, "0")}</span>
        {title}
      </h3>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-body-sm text-foreground marker:font-mono marker:text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </section>
  );
}

export default async function ProjectCaseStudyPage({ params }: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const schema = getProjectSchema(slug);
  const isHydra = project.slug === HYDRA_SLUG;
  const isActiveDevelopment = project.status === "Active Development";
  const projectLinks = project.links ?? [];

  const caseStudyGroups: Array<{ title: string; items: string[] }> = [
    { title: isActiveDevelopment ? "Project Goals" : "Technical Approach", items: project.approach },
    { title: "Architecture Decisions", items: project.caseStudy.architecture },
    {
      title: isActiveDevelopment ? "Evaluation Methodology" : "Reliability and Evaluation",
      items: project.caseStudy.reliability,
    },
    { title: "Delivery and Operations", items: project.caseStudy.delivery },
    { title: isActiveDevelopment ? "Current Scope" : "Results", items: project.results },
    { title: isActiveDevelopment ? "Design Principles" : "What I Learned", items: project.learnings },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: project.title, href: `/projects/${project.slug}` },
        ]}
      />
      {schema ? <SchemaScript data={schema} /> : null}

      <div className="pb-20">
        <PageHeader
          label={`${evidenceWord[projectEvidenceStatus(project.status)]} · Case study`}
          title={project.title}
          lede={project.subtitle}
          ledeStyle="italic"
          meta={
            <>
              <StatusLabel status={projectEvidenceStatus(project.status)} />
              <KeywordLine items={project.stack} />
            </>
          }
          actions={
            projectLinks.length > 0
              ? projectLinks.map((link) => (
                  <TextLink key={link.href} href={link.href}>
                    {link.label}
                  </TextLink>
                ))
              : undefined
          }
        />

        <SectionFrame
          rule="none"
          label="Summary"
          title="Problem and impact"
        >
          <div>
            <p className="mono-label text-muted-foreground">Problem</p>
            <p className="mt-2 max-w-[65ch] text-body text-foreground">{project.problem}</p>
          </div>
          <div className="mt-6">
            <p className="mono-label text-muted-foreground">Impact</p>
            <p className="mt-2 max-w-[65ch] text-body text-foreground">
              {project.impact}
            </p>
          </div>

          {isHydra ? (
            <p className="mt-8 max-w-[65ch] text-footnote text-muted-foreground">{research.scopeNote}</p>
          ) : null}
        </SectionFrame>

        <SectionFrame label="Case study" title="Approach, architecture, evaluation, delivery">
          <div className="grid gap-x-8 gap-y-8 lg:grid-cols-2">
            {caseStudyGroups.map((group, index) => (
              <CaseStudyGroup key={group.title} number={index + 1} title={group.title} items={group.items} />
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/projects" className={buttonClass("outline")}>
              Back to projects
            </Link>
            {projectLinks.map((link) => (
              <TextLink key={link.href} href={link.href}>
                {link.label}
              </TextLink>
            ))}
          </div>
        </SectionFrame>
      </div>
    </>
  );
}
