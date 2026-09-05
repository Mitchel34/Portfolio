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
      <div className="pb-20">
        <PageHeader
          label="Coursework"
          title="Graduate coursework"
          lede="Completed courses represent finished graduate study. Fall 2026 courses are listed as planned and move to completed only after the semester ends."
          meta={
            <span className="mono-label text-muted-foreground">
              {coursework.institution} · {coursework.program} · GPA {coursework.currentGpa} · expected{" "}
              {coursework.expectedGraduation}
            </span>
          }
        />

        <SectionFrame rule="none" label="Completed" title="Completed coursework">
          <CourseworkList items={coursework.completed} />
        </SectionFrame>

        <SectionFrame label="Fall 2026" title="Planned for Fall 2026">
          <CourseworkList items={coursework.upcoming} />
        </SectionFrame>
      </div>
    </>
  );
}
