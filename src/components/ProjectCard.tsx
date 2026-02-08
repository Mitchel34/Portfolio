import type { ReactNode } from "react";
import Link from "next/link";

import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
};

function ProjectSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isWip = project.status === "Active Development";

  return (
    <article
      className={`rounded-2xl border bg-card p-6 shadow-[0_18px_48px_-42px_rgba(18,36,58,0.65)] ${
        isWip ? "border-dashed border-amber-400/60" : "border-border/80"
      }`}
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          {isWip && (
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-amber-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Active Development
            </span>
          )}
          <h3 className="font-serif text-2xl font-medium tracking-tight text-foreground">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition hover:border-primary/40 hover:text-primary"
          >
            Case Study
          </Link>
          {project.links?.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProjectSection label="Problem">{project.problem}</ProjectSection>
        <ProjectSection label="Why it matters">{project.impact}</ProjectSection>

        <ProjectSection label="Approach">
          <ul className="list-disc space-y-1 pl-5 marker:text-primary">
            {project.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ProjectSection>

        <ProjectSection label="Stack">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border/80 bg-surface/70 px-2.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </ProjectSection>

        <ProjectSection label={isWip ? "Current Scope" : "Results"}>
          <ul className="list-disc space-y-1 pl-5 marker:text-accent">
            {project.results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ProjectSection>

        <ProjectSection label={isWip ? "Design Principles" : "What I learned"}>
          <ul className="list-disc space-y-1 pl-5 marker:text-secondary">
            {project.learnings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ProjectSection>
      </div>
    </article>
  );
}
