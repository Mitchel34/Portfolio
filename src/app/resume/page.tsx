import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { education, experience, site } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Resume",
  description:
    "Resume and timeline of Mitchel Carson's AI engineering experience, software development work, and academic training.",
  pathname: "/resume",
  keywords: ["AI engineer resume", "machine learning resume", "software engineer resume"],
});

function TimelineCard({
  title,
  org,
  period,
  items,
}: {
  title: string;
  org: string;
  period: string;
  items: string[];
}) {
  return (
    <article className="rounded-2xl border border-border/80 bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{org}</p>
        </div>
        <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">{period}</span>
      </div>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground marker:text-primary">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default function ResumePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Resume", href: "/resume" },
        ]}
      />
      <div className="bg-background pb-16 pt-14 text-foreground">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow="Resume"
            title="Experience and education"
            description="Impact-focused highlights with systems-level thinking and delivery discipline."
          />

          <div className="mt-6">
            <a
              href={site.resumeUrl}
              download
              className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Download PDF
            </a>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-[0_22px_70px_-48px_rgba(18,36,58,0.75)]">
            <iframe
              src={`${site.resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="h-[520px] w-full border-none md:h-[840px]"
              title="Resume PDF"
            />
          </div>

          <section className="mt-12">
            <SectionHeader
              eyebrow="Experience"
              title="Industry and research work"
              description="Roles that shaped my approach to building reliable ML systems."
            />
            <div className="mt-7 grid gap-5">
              {experience.map((role) => (
                <TimelineCard
                  key={role.role}
                  title={role.role}
                  org={role.org}
                  period={role.period}
                  items={role.highlights}
                />
              ))}
            </div>
          </section>

          <section className="mt-12">
            <SectionHeader
              eyebrow="Education"
              title="Academic foundation"
              description="Graduate AI training grounded in computer science fundamentals."
            />
            <div className="mt-7 grid gap-5">
              {education.map((item) => (
                <TimelineCard
                  key={item.degree}
                  title={item.degree}
                  org={item.org}
                  period={item.period}
                  items={item.details}
                />
              ))}
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}
