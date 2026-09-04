import type { Metadata } from "next";
import Image from "next/image";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FigureWell } from "@/components/FigureWell";
import { NoteRef } from "@/components/Notes";
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
    "HYDRA: leakage-aware Transformer and GRU residual correction for National Water Model streamflow forecasts. Preliminary results; manuscript in progress.",
  pathname: "/research",
  keywords: [
    "AI research",
    "time-series forecasting research",
    "streamflow forecasting",
    "NOAA NWM residual correction",
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
          meta={<StatusLabel status="preliminary" prefix="Ongoing research" />}
        />

        <SectionFrame
          rule="none"
          label="Result"
          title="Preliminary result"
          notes={[{ id: "1", text: research.preliminaryNote }]}
        >
          <Readout
            className="max-w-md"
            value="26–54%"
            unit="lower RMSE than the LSTM baselines tested"
            status="preliminary"
            footnote={
              <>
                Relative to the LSTM baselines tested. Final analysis and manuscript in progress.
                <NoteRef id="1" />
              </>
            }
          />

          <FigureWell number={1} padded={false} caption={research.figures.architecture} className="mt-8">
            <Image
              src="/images/projects/hydra-architecture-full.jpg"
              alt="Conceptual HYDRA research architecture diagram"
              width={2816}
              height={1536}
              sizes="(min-width: 1024px) 60rem, calc(100vw - 2.5rem)"
              className="h-auto w-full"
              priority
            />
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
