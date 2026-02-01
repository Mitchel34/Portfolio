import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { research, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Research | ${site.name}`,
  description: "Thesis work focused on leakage-safe forecasting and residual correction.",
};

export default function ResearchPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="border-b border-white/5 py-12">
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
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface hover:text-foreground/80"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeader
            eyebrow="Architecture"
            title="Hybrid Transformer + RNN residual correction"
            description="Text-based diagram of the modeling pipeline."
          />
          <ul className="mt-6 list-disc space-y-3 pl-5 text-base text-muted-foreground marker:text-blue-500">
            {research.architecture.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-white/5 bg-surface/30 py-12">
        <Container>
          <SectionHeader
            eyebrow="Evaluation"
            title="Metrics and validation strategy"
            description="Emphasis on leakage-safe splits and operational realism."
          />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-green-400">
                Metrics
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-green-500/50">
                {research.evaluation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-purple-400">
                Reproducibility
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-purple-500/50">
                {research.reproducibility.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeader
            eyebrow="Constraints"
            title="Real-world considerations"
            description="Operational limitations that shaped model design and evaluation."
          />
          <ul className="mt-6 list-disc space-y-3 pl-5 text-base text-muted-foreground">
            {research.constraints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
