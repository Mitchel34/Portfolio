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
    <div className="bg-background text-foreground">
      <section className="border-b border-white/5 pt-12 pb-12">
        <Container>
          <SectionHeader
            eyebrow="About"
            title="Engineering-first AI with research credibility"
            description="I work at the intersection of forecasting research and production software, aiming for models that are reliable, interpretable, and deployable."
          />
          <div className="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
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

      <section className="border-t border-white/5 bg-surface/30 py-12">
        <Container>
          <SectionHeader
            eyebrow="Focus Areas"
            title="Applied AI and systems engineering"
            description="Areas where I have hands-on experience and active interest."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-white/5 bg-surface px-4 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-white/10 hover:text-foreground"
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
