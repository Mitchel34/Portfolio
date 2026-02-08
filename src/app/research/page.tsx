import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { research } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Research",
  description:
    "Senior honors thesis research on leakage-safe residual correction for NOAA streamflow forecasts using hybrid deep learning models.",
  pathname: "/research",
  keywords: [
    "AI research",
    "time-series forecasting research",
    "streamflow forecasting",
    "NOAA NWM residual correction",
  ],
});

export default function ResearchPage() {
  return (
    <div className="bg-background pb-16 pt-14 text-foreground">
      <Container>
        <SectionHeader
          eyebrow="Research"
          title={research.title}
          description={research.summary}
        />

        <div className="mt-6 flex flex-wrap gap-3">
          {research.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-2">
          <article className="rounded-2xl border border-border/80 bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Architecture</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-primary">
              {research.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">Evaluation</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-secondary">
              {research.evaluation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-accent">Constraints</h4>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-accent">
              {research.constraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <article className="mt-7 rounded-2xl border border-border/80 bg-card p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">Reproducibility</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {research.reproducibility.map((item) => (
              <li key={item} className="rounded-lg border border-border/70 bg-surface/70 px-3 py-2 text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </Container>
    </div>
  );
}
