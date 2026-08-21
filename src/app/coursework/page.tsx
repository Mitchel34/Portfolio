import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Container } from "@/components/Container";
import { CourseworkCards } from "@/components/CourseworkSection";
import { SectionHeader } from "@/components/SectionHeader";
import { coursework } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Coursework",
  description:
    "Completed and planned graduate artificial intelligence coursework for Mitchel Carson's UT Austin M.S. AI program.",
  pathname: "/coursework",
  keywords: [
    "UT Austin M.S. AI",
    "machine learning coursework",
    "deep learning coursework",
    "reinforcement learning coursework",
    "natural language processing coursework",
  ],
});

export default function CourseworkPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Coursework", href: "/coursework" },
        ]}
      />

      <section className="bg-background pb-16 pt-14 text-foreground">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow="Coursework"
            title="Graduate study across machine learning and AI."
            description={`${coursework.program}, in progress · Current GPA ${coursework.currentGpa} · Expected graduation ${coursework.expectedGraduation}`}
          />

          <div className="mt-10 rounded-2xl border border-primary/25 bg-primary/5 p-6">
            <p className="text-sm leading-relaxed text-foreground">
              Completed courses represent finished graduate study. Fall 2026 courses are listed as planned and
              will move to the completed section only after the semester is finished.
            </p>
          </div>

          <section className="mt-12">
            <p className="mb-5 text-xs font-mono uppercase tracking-[0.18em] text-primary">
              Completed coursework
            </p>
            <CourseworkCards items={coursework.completed} />
          </section>

          <section className="mt-12">
            <p className="mb-5 text-xs font-mono uppercase tracking-[0.18em] text-secondary">
              Planned for Fall 2026
            </p>
            <CourseworkCards items={coursework.upcoming} planned />
          </section>
        </Container>
      </section>
    </>
  );
}
