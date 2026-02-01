import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { education, experience, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Resume | ${site.name}`,
  description: "Professional experience and education timeline.",
};

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
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{org}</p>
        </div>
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          {period}
        </span>
      </div>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="bg-background text-foreground">
      <section className="border-b border-white/5 py-12">
        <Container>
          <SectionHeader
            eyebrow="Resume"
            title="Experience and education"
            description="Impact-focused highlights with an emphasis on systems thinking."
          />
          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
              <iframe
                src={`${site.resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="h-[500px] w-full border-none md:h-[800px]"
                title="Resume PDF"
              />
            </div>

            <a
              href={site.resumeUrl}
              download
              className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background transition hover:bg-foreground/90"
            >
              Download PDF
            </a>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeader
            eyebrow="Experience"
            title="Industry and research work"
            description="Roles that shaped how I build and ship ML systems."
          />
          <div className="mt-8 grid gap-6">
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
        </Container>
      </section>

      <section className="border-t border-white/5 bg-surface/30 py-12">
        <Container>
          <SectionHeader
            eyebrow="Education"
            title="Academic foundation"
            description="Graduate-level AI training grounded in computer science fundamentals."
          />
          <div className="mt-8 grid gap-6">
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
        </Container>
      </section>
    </div>
  );
}
