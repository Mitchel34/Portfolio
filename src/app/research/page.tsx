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
    <div>
      <section className="border-b border-slate-200/70 bg-white py-12">
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
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
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
          <ul className="mt-6 list-disc space-y-3 pl-5 text-base text-slate-600">
            {research.architecture.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-slate-200/70 bg-white py-12">
        <Container>
          <SectionHeader
            eyebrow="Evaluation"
            title="Metrics and validation strategy"
            description="Emphasis on leakage-safe splits and operational realism."
          />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                Metrics
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {research.evaluation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                Reproducibility
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
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
          <ul className="mt-6 list-disc space-y-3 pl-5 text-base text-slate-600">
            {research.constraints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
