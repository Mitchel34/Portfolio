import type { Metadata } from "next";

import Image from "next/image";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { evidenceWord, research, talks } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Research",
  description:
    "Ongoing HYDRA research on leakage-aware residual correction for National Water Model streamflow forecasts using Transformer and GRU experiments.",
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
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Research", href: "/research" },
        ]}
      />
      <div className="bg-background pb-16 pt-14 text-foreground">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow="Research"
            title={research.title}
            description={research.summary}
          />

          <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary">
              {research.status}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {research.preliminaryResult}
            </p>
          </div>

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

          <div className="mt-10 mb-10 overflow-hidden rounded-2xl border border-border/80 bg-card">
            <div className="relative aspect-[11/6] w-full border-b border-border/80">
              <Image
                src="/images/projects/hydra-architecture-full.jpg"
                alt="Conceptual HYDRA research architecture diagram"
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>
            <div className="p-4 bg-muted/30">
              <p className="text-center text-sm font-medium text-muted-foreground">
                Conceptual HYDRA research architecture. The implementation and supporting claims will continue to evolve with the ongoing analysis.
              </p>
            </div>
          </div>

          <div className="grid gap-7 lg:grid-cols-2">
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

          <section className="mt-12">
            <SectionHeader
              eyebrow="Scientific Communication"
              title="AGU and manuscript progress"
              description="Research outputs are labeled by their current status and will be updated as milestones are completed."
            />
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {talks.map((item) => (
                <article key={item.id} className="rounded-2xl border border-border/80 bg-card p-6">
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-primary">
                    {evidenceWord[item.status]}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}
