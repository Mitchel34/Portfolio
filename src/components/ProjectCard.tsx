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
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <div className="text-sm text-slate-700">{children}</div>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{project.subtitle}</p>
        </div>
        {project.links && project.links.length > 0 ? (
          <div className="flex flex-wrap gap-3 text-sm">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-6 grid gap-5">
        <ProjectSection label="Problem">{project.problem}</ProjectSection>
        <ProjectSection label="Why it matters">{project.impact}</ProjectSection>
        <ProjectSection label="Approach">
          <ul className="list-disc space-y-1 pl-5">
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
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </ProjectSection>
        <ProjectSection label="Results">
          <ul className="list-disc space-y-1 pl-5">
            {project.results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ProjectSection>
        <ProjectSection label="What I learned">
          <ul className="list-disc space-y-1 pl-5">
            {project.learnings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ProjectSection>
      </div>
    </article>
  );
}
