import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Container } from "@/components/Container";
import { SchemaScript } from "@/components/SchemaScript";
import { SectionHeader } from "@/components/SectionHeader";
import { getProjectBySlug, projects, site } from "@/lib/content";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

type ProjectCaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

function getProjectSchema(slug: string) {
  const project = getProjectBySlug(slug);
  if (!project) return null;

  const canonical = absoluteUrl(`/projects/${project.slug}`);
  const repository = project.links?.find(
    (link) => link.href.startsWith("http://") || link.href.startsWith("https://")
  )?.href;

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

function CaseStudySection({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-border/80 bg-card p-6">
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-primary">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default async function ProjectCaseStudyPage({ params }: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const schema = getProjectSchema(slug);

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

      <section className="bg-background pb-16 pt-14 text-foreground">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow={`${project.status} Case Study`}
            title={project.title}
            description={project.subtitle}
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-border/80 bg-card p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">Problem</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">Impact</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.impact}</p>
            </article>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <CaseStudySection title="Technical Approach" items={project.approach} />
            <CaseStudySection title="Architecture Decisions" items={project.caseStudy.architecture} />
            <CaseStudySection title="Reliability and Evaluation" items={project.caseStudy.reliability} />
            <CaseStudySection title="Delivery and Operations" items={project.caseStudy.delivery} />
            <CaseStudySection title="Results" items={project.results} />
            <CaseStudySection title="What I Learned" items={project.learnings} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition hover:border-primary/40"
            >
              Back to Projects
            </Link>
            {project.links?.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
