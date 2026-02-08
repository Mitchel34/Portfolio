import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { ValueCard } from "@/components/ValueCard";
import { about, focusAreas } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Professional background, values, and engineering principles behind Mitchel Carson's AI and software systems work.",
  pathname: "/about",
  keywords: [
    "about Mitchel Carson",
    "AI engineer background",
    "machine learning researcher",
  ],
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
      <div className="bg-background pb-16 text-foreground">
        <section className="pt-14">
          <Container>
            <SectionHeader
              as="h1"
              eyebrow="About"
              title="Engineering-first AI with research credibility"
              description="I build at the intersection of forecasting research and production software, with a focus on reliability and deployment readiness."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {about.summary.map((paragraph) => (
                <article key={paragraph} className="rounded-2xl border border-border/80 bg-card p-6">
                  <p className="text-base leading-relaxed text-muted-foreground">{paragraph}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="pt-16">
          <Container>
            <SectionHeader
              eyebrow="Values"
              title="What I care about"
              description="Principles that shape model design, evaluation, and software delivery."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {about.values.map((value) => (
                <ValueCard key={value.title} {...value} />
              ))}
            </div>
          </Container>
        </section>

        <section className="pt-16">
          <Container>
            <SectionHeader
              eyebrow="Focus Areas"
              title="Applied AI and systems engineering"
              description="Domains where I have direct implementation experience."
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
