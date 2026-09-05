import type { ReactNode } from "react";

import { Entry } from "@/components/Entry";
import { NoteRef } from "@/components/Notes";
import { StatusLabel } from "@/components/StatusLabel";
import { TextLink } from "@/components/TextLink";
import { type Project, projectEvidenceStatus } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
  /** compact = an Entry row in the home 04 list; full = a ruled article on /projects. */
  variant: "compact" | "full";
  /** Footnote id appended to the title. */
  noteId?: string;
};

const numberedListClass =
  "mt-2 list-decimal space-y-2 pl-5 text-body-sm text-foreground marker:font-mono marker:text-muted-foreground";

function LabeledBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mono-label text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className={numberedListClass}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

function CompactCard({ project, noteId }: { project: Project; noteId?: string }) {
  return (
    <Entry
      meta={
        <>
          <StatusLabel status={projectEvidenceStatus(project.status)} />
          <p className="mt-3 mono-label leading-relaxed text-muted-foreground">
            {project.stack.slice(0, 5).join(" · ")}
          </p>
        </>
      }
    >
      <h3 className="font-serif text-title text-foreground">
        {project.title}
        {noteId ? <NoteRef id={noteId} /> : null}
      </h3>
      <p className="mt-1 text-body-sm text-muted-foreground">{project.subtitle}</p>

      <div className="mt-5 space-y-5">
        <LabeledBlock label="Problem">
          <p className="mt-2 max-w-[65ch] text-body-sm text-foreground">{project.problem}</p>
        </LabeledBlock>
        <LabeledBlock label="Why it matters">
          <p className="mt-2 max-w-[65ch] text-body-sm text-foreground">{project.impact}</p>
        </LabeledBlock>
      </div>

      <TextLink className="mt-3" href={`/projects/${project.slug}`}>
        Read case study
      </TextLink>
    </Entry>
  );
}

function FullCard({ project, noteId }: { project: Project; noteId?: string }) {
  const isActiveDevelopment = project.status === "Active Development";

  return (
    <article className="border-t border-foreground pt-8 pb-12 lg:grid lg:grid-cols-10 lg:gap-x-8">
      <div className="lg:col-span-3">
        <StatusLabel status={projectEvidenceStatus(project.status)} />
        <p className="mt-3 mono-label leading-relaxed text-muted-foreground">{project.stack.join(" · ")}</p>
        <div className="mt-4 flex flex-col items-start gap-y-1">
          <TextLink href={`/projects/${project.slug}`}>Case study</TextLink>
          {project.links?.map((link) => (
            <TextLink key={link.href} href={link.href}>
              {link.label}
            </TextLink>
          ))}
        </div>
      </div>

      <div className="mt-8 lg:col-span-7 lg:mt-0">
        <h2 className="font-serif text-heading text-balance text-foreground">
          {project.title}
          {noteId ? <NoteRef id={noteId} /> : null}
        </h2>
        <p className="mt-1 text-body-sm text-muted-foreground">{project.subtitle}</p>

        <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <LabeledBlock label="Problem">
            <p className="mt-2 max-w-[65ch] text-body-sm text-foreground">{project.problem}</p>
          </LabeledBlock>
          <LabeledBlock label="Why it matters">
            <p className="mt-2 max-w-[65ch] text-body-sm text-foreground">{project.impact}</p>
          </LabeledBlock>
          <LabeledBlock label="Approach">
            <NumberedList items={project.approach} />
          </LabeledBlock>
          <LabeledBlock label={isActiveDevelopment ? "Current Scope" : "Results"}>
            <NumberedList items={project.results} />
          </LabeledBlock>
          <LabeledBlock label={isActiveDevelopment ? "Design Principles" : "What I learned"}>
            <NumberedList items={project.learnings} />
          </LabeledBlock>
        </div>
      </div>
    </article>
  );
}

export function ProjectCard({ project, variant, noteId }: ProjectCardProps) {
  if (variant === "compact") {
    return <CompactCard project={project} noteId={noteId} />;
  }

  return <FullCard project={project} noteId={noteId} />;
}
