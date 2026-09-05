import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FigureWell } from "@/components/FigureWell";
import { ModelEvidenceExplorer } from "@/components/ModelEvidenceExplorer";
import { OfficeHours } from "@/components/OfficeHours";
import { PageHeader } from "@/components/PageHeader";
import { Readout } from "@/components/Readout";
import { SectionFrame } from "@/components/SectionFrame";
import { StatusLabel } from "@/components/StatusLabel";
import { TalksList } from "@/components/TalksSection";
import { TextLink } from "@/components/TextLink";
import { research, talks } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Research",
  description:
    "HYDRA: reforecast generation software and deep-learning post-processing for NOAA NextGen streamflow forecasts at 1–18 hour lead times. Two manuscripts in preparation.",
  pathname: "/research",
  keywords: [
    "AI research",
    "time-series forecasting research",
    "streamflow forecasting",
    "NextGen streamflow forecast post-processing",
    "LSTM Transformer Mamba comparison",
  ],
});

const methodGroups: { label: string; items: string[] }[] = [
  { label: "Architecture", items: research.architecture },
  { label: "Evaluation", items: research.evaluation },
  { label: "Constraints", items: research.constraints },
  { label: "Reproducibility", items: research.reproducibility },
];

export default function ResearchPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Research", href: "/research" },
        ]}
      />
      <div className="pb-20">
        <PageHeader
          label="Research"
          title={research.title}
          lede={research.summary}
          ledeStyle="italic"
          meta={<StatusLabel status="in-progress" prefix="Ongoing research" />}
        />

        <SectionFrame rule="none" label="Scope" title="What is being built and tested">
          <div className="lg:grid lg:grid-cols-10 lg:gap-x-8 lg:items-start">
            <div className="lg:col-span-4">
              <Readout
                value="1–18 h"
                unit="forecast lead times targeted by the post-processing model"
                status="in-progress"
                footnote={research.scopeNote}
              />
            </div>
            <div className="mt-6 max-w-[65ch] space-y-4 text-body text-foreground lg:col-span-6 lg:mt-0">
              <p>
                Reforecast generation software drives NOAA’s NextGen framework to produce the retrospective forecasts the
                model learns from, with initialization, lead-time, and version metadata preserved so every training
                example is traceable.
              </p>
              <p>
                LSTM, vanilla Transformer, and Mamba-style state-space models are trained as post-processors on identical
                inputs and splits and compared against the raw reforecasts at every lead time from 1 to 18 hours.
              </p>
            </div>
          </div>

          <FigureWell number={1} caption={research.figures.explorer} className="mt-10">
            <ModelEvidenceExplorer />
          </FigureWell>
        </SectionFrame>

        <SectionFrame label="Method" title="Architecture, evaluation, constraints, reproducibility">
          <div className="grid gap-x-8 gap-y-8 lg:grid-cols-2">
            {methodGroups.map((group) => (
              <div key={group.label}>
                <h3 className="mono-label text-muted-foreground">{group.label}</h3>
                <ol className="mt-2 list-decimal space-y-2 pl-5 text-body-sm text-foreground marker:font-mono marker:text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </SectionFrame>

        <SectionFrame
          id="communication"
          label="Communication"
          title="Scientific communication, labeled by status."
          lede="Outputs are listed with their current status and updated as milestones are confirmed."
        >
          <TalksList items={talks} />
          <OfficeHours className="mt-12" />
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            <TextLink href="/projects/hydra-temporal">Case study</TextLink>
            <TextLink href="https://github.com/Mitchel34/hydra-nwm-streamflow-correction">Code</TextLink>
          </div>
        </SectionFrame>
      </div>
    </>
  );
}
