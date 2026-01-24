import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { ValueCard } from "@/components/ValueCard";
import { about, focusAreas, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `About | ${site.name}`,
  description: "Professional narrative and values behind the work.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-slate-200/70 bg-white py-12">
        <Container>
          <SectionHeader
            eyebrow="About"
            title="Engineering-first AI with research credibility"
            description="I work at the intersection of forecasting research and production software, aiming for models that are reliable, interpretable, and deployable."
          />
          <div className="mt-8 max-w-3xl space-y-4 text-base text-slate-600">
            {about.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeader
            eyebrow="Focus"
            title="What I care about"
            description="These principles shape how I design models, experiments, and systems."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {about.values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200/70 bg-white py-12">
        <Container>
          <SectionHeader
            eyebrow="Focus Areas"
            title="Applied AI and systems engineering"
            description="Areas where I have hands-on experience and active interest."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {area}
              </span>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
