import type { ReactNode } from "react";

type ProjectLink = {
  label: string;
  href: string;
};

type Project = {
  title: string;
  subtitle: string;
  problem: string;
  impact: string;
  approach: string[];
  stack: string[];
  results: string[];
  learnings: string[];
  links?: ProjectLink[];
};

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
  return (
    <article className="rounded-2xl border border-border/80 bg-card p-6 shadow-[0_18px_48px_-42px_rgba(18,36,58,0.65)]">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-medium tracking-tight text-foreground">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>
        </div>

        {project.links && project.links.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
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

        <ProjectSection label="Results">
          <ul className="list-disc space-y-1 pl-5 marker:text-accent">
            {project.results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ProjectSection>

        <ProjectSection label="What I learned">
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
