import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CourseworkList } from "@/components/CourseworkSection";
import { PageHeader } from "@/components/PageHeader";
import { SectionFrame } from "@/components/SectionFrame";
import { coursework } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Coursework",
  description:
    "Completed and current graduate artificial intelligence coursework for Mitchel Carson's UT Austin M.S. AI program.",
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
      <div className="pb-20">
        <PageHeader
          label="Coursework"
          title="Graduate coursework"
          lede="The foundations behind my work in applied AI: learning algorithms, language models, optimization, and responsible deployment."
          meta={
            <span className="mono-label text-muted-foreground">
              {coursework.institution} · {coursework.program} · GPA {coursework.currentGpa} · expected{" "}
              {coursework.expectedGraduation}
            </span>
          }
        />

        <SectionFrame rule="none" label="Fall 2026" title="What I’m studying now">
          <CourseworkList items={coursework.current} />
        </SectionFrame>

        <SectionFrame label="Completed" title="The foundations">
          <CourseworkList items={coursework.completed} />
        </SectionFrame>
      </div>
    </>
  );
}
