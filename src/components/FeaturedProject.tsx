import type { ReactNode } from "react";

import { FigureWell } from "@/components/FigureWell";
import { KeywordLine } from "@/components/KeywordLine";
import { ModelEvidenceExplorer } from "@/components/ModelEvidenceExplorer";
import { Reveal } from "@/components/Reveal";
import { SectionFrame } from "@/components/SectionFrame";
import { StatusLabel } from "@/components/StatusLabel";
import { TextLink } from "@/components/TextLink";
import { getProjectRepositoryUrl, landingSections, projects, research, sectionCopy } from "@/lib/content";

const project = projects[0];
const repositoryUrl = getProjectRepositoryUrl(project);

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
      meta={<StatusLabel status="in-progress" prefix="Ongoing research" />}
    >
      <Reveal>
        <div className="xl:grid xl:grid-cols-10 xl:gap-x-8">
          <div className="xl:col-span-5">
            <ProseBlock label="Abstract">
              <p className="mt-2 max-w-[65ch] text-body text-foreground">
                {project.problem} {project.impact}
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
            <FigureWell number={1} caption={research.figures.explorer}>
              <ModelEvidenceExplorer />
            </FigureWell>
          </div>
        </div>

        <p className="mt-8 max-w-[65ch] text-footnote text-muted-foreground">{research.scopeNote}</p>

        <KeywordLine items={project.stack} className="mt-6" />

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <TextLink href="/research">Full research page</TextLink>
          <TextLink href={`/projects/${project.slug}`}>Case study</TextLink>
          {repositoryUrl ? <TextLink href={repositoryUrl}>Code</TextLink> : null}
        </div>
      </Reveal>
    </SectionFrame>
  );
}
