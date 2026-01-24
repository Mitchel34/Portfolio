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
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600">{org}</p>
        </div>
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
          {period}
        </span>
      </div>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div>
      <section className="border-b border-slate-200/70 bg-white py-12">
        <Container>
          <SectionHeader
            eyebrow="Resume"
            title="Experience and education"
            description="Impact-focused highlights with an emphasis on systems thinking."
          />
          <div className="mt-6">
            <a
              href={site.resumeUrl}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
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

      <section className="border-t border-slate-200/70 bg-white py-12">
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
