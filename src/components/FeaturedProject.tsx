import Image from "next/image";
import type { ReactNode } from "react";

import { FigureWell } from "@/components/FigureWell";
import { KeywordLine } from "@/components/KeywordLine";
import { ModelEvidenceExplorer } from "@/components/ModelEvidenceExplorer";
import { NoteRef } from "@/components/Notes";
import { Reveal } from "@/components/Reveal";
import { SectionFrame } from "@/components/SectionFrame";
import { StatusLabel } from "@/components/StatusLabel";
import { TextLink } from "@/components/TextLink";
import { getProjectRepositoryUrl, landingSections, projects, research, sectionCopy } from "@/lib/content";

const project = projects[0];
const repositoryUrl = getProjectRepositoryUrl(project);

/** The impact statement with the preliminary-result footnote marker after its first sentence. */
function ImpactWithNote({ impact, noteId }: { impact: string; noteId: string }) {
  const breakIndex = impact.indexOf(". ");
  if (breakIndex === -1) {
    return (
      <>
        {impact}
        <NoteRef id={noteId} />
      </>
    );
  }

  return (
    <>
      {impact.slice(0, breakIndex + 1)}
      <NoteRef id={noteId} />
      {impact.slice(breakIndex + 1)}
    </>
  );
}

function ProseBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-8 first:mt-0">
      <p className="mono-label text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

const numberedListClass =
  "mt-2 list-decimal space-y-2 pl-5 text-body-sm text-foreground marker:font-mono marker:text-muted-foreground";

export function FeaturedProject() {
  return (
    <SectionFrame
      id={landingSections.research.id}
      number="01"
      label="Research"
      title={sectionCopy.research.title}
      lede={sectionCopy.research.lede}
      meta={<StatusLabel status="preliminary" prefix="Ongoing research" />}
      notes={[{ id: "1", text: research.preliminaryNote }]}
    >
      <Reveal>
        <FigureWell number={1} padded={false} caption={research.figures.architecture}>
          <a
            href="/images/projects/hydra-architecture-full.jpg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the full-resolution conceptual HYDRA research architecture diagram in a new tab"
            title="Open full-resolution diagram"
            className="block"
          >
            <Image
              src="/images/projects/hydra-architecture-full.jpg"
              alt="Conceptual HYDRA research architecture diagram"
              width={2816}
              height={1536}
              sizes="(min-width: 1024px) 60rem, calc(100vw - 2.5rem)"
              quality={95}
              className="h-auto w-full"
            />
          </a>
        </FigureWell>

        <div className="mt-10 xl:grid xl:grid-cols-10 xl:gap-x-8">
          <div className="xl:col-span-5">
            <ProseBlock label="Abstract">
              <p className="mt-2 max-w-[65ch] text-body text-foreground">
                {project.problem} <ImpactWithNote impact={project.impact} noteId="1" />
              </p>
            </ProseBlock>

            <ProseBlock label="Method">
              <ol className={numberedListClass}>
                {research.architecture.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </ProseBlock>

            <ProseBlock label="Evaluation">
              <ol className={numberedListClass}>
                {research.evaluation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </ProseBlock>
          </div>

          <div className="mt-10 xl:col-span-5 xl:mt-0">
            <FigureWell number={2} caption={research.figures.explorer}>
              <ModelEvidenceExplorer />
            </FigureWell>
          </div>
        </div>

        <KeywordLine items={project.stack} className="mt-10" />

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <TextLink href="/research">Full research page</TextLink>
          <TextLink href={`/projects/${project.slug}`}>Case study</TextLink>
          {repositoryUrl ? <TextLink href={repositoryUrl}>Code</TextLink> : null}
        </div>
      </Reveal>
    </SectionFrame>
  );
}
