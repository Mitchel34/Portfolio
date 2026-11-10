import { KeywordLine } from "@/components/KeywordLine";
import { StatusLabel } from "@/components/StatusLabel";
import { TextLink } from "@/components/TextLink";
import { getProjectRepositoryUrl, type Project, projectEvidenceStatus } from "@/lib/content";

/** One row of the /projects index: what it is and where it stands. The case study carries the rest. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const repository = getProjectRepositoryUrl(project);

  return (
    <article className="group relative border-t border-foreground py-8 transition-colors lg:grid lg:grid-cols-12 lg:gap-x-8 lg:py-10">
      <p aria-hidden="true" className="font-serif text-[2.5rem] leading-none text-muted-foreground transition-colors group-hover:text-primary lg:col-span-2 lg:text-[3.5rem]">
        {String(index + 1).padStart(2, "0")}
      </p>

      <div className="mt-4 lg:col-span-7 lg:mt-0">
        <h2 className="font-serif text-heading text-balance text-foreground">{project.title}</h2>
        <p className="mt-1 text-body-sm font-medium text-foreground">{project.subtitle}</p>
        <p className="mt-4 max-w-[60ch] text-body text-muted-foreground">{project.summary}</p>
        <KeywordLine label="Stack" items={project.stack} className="mt-5 text-footnote" />
      </div>

      <div className="mt-6 flex flex-col items-start gap-y-3 lg:col-span-3 lg:mt-1 lg:items-end">
        <StatusLabel status={projectEvidenceStatus(project.status)} />
        <TextLink href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
          Case study
          <span className="sr-only">: {project.title}</span>
        </TextLink>
        {repository ? (
          <TextLink href={repository} className="relative z-10">
            Code on GitHub
          </TextLink>
        ) : null}
      </div>
    </article>
  );
}
