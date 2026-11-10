import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Entry, EntryList } from "@/components/Entry";
import { FigureWell } from "@/components/FigureWell";
import { PageHeader } from "@/components/PageHeader";
import { SectionFrame } from "@/components/SectionFrame";
import { buttonClass } from "@/components/ui/Button";
import { KeywordLine } from "@/components/KeywordLine";
import { TextLink } from "@/components/TextLink";
import { education, experience, site, toolkit } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Resume",
  description:
    "Resume for Mitchel Carson: software engineer in applied AI and scientific computing, U.S. Air Force veteran (Air Force Two, 89th Airlift Wing, 50+ executive missions), UT Austin M.S. AI (expected May 2027), USAA, active TS/SCI.",
  pathname: "/resume",
  keywords: ["software engineer resume", "applied AI resume", "Air Force veteran resume"],
});

/** Research, talks, and case studies have their own pages; the résumé links to them. */
const moreLinks = [
  { label: "Research, talks, and manuscripts", href: "/research" },
  { label: "Project case studies", href: "/projects" },
  { label: "Graduate coursework", href: "/coursework" },
];

function EntryMeta({ period, org }: { period: string; org: string }) {
  return (
    <>
      <p className="mono-label tabular-nums text-foreground">{period}</p>
      <p className="mt-1 text-body-sm text-muted-foreground">{org}</p>
    </>
  );
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-body-sm text-foreground marker:text-border">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
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
      <div className="pb-20">
        <PageHeader
          label="Résumé"
          title="Experience and education."
          lede="The one-page PDF, with the same experience, education, and skills as text below it."
          meta={<span className="mono-label text-muted-foreground">PDF updated {site.resumePdfUpdated}</span>}
          actions={
            <a href={site.resumeUrl} download={site.resumeFilename} className={buttonClass("primary")}>
              Download PDF
            </a>
          }
        />

        <SectionFrame rule="none" label="PDF" title="Résumé (PDF)">
          <FigureWell
            padded={false}
            caption={`Résumé (PDF), one page. Updated ${site.resumePdfUpdated}.`}
          >
            <iframe
              src={`${site.resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              title="Resume PDF"
              className="h-[520px] w-full border-0 md:h-[840px]"
            />
          </FigureWell>
        </SectionFrame>

        <SectionFrame label="Experience" title="Professional experience">
          <EntryList>
            {experience.map((item) => (
              <Entry key={item.role} meta={<EntryMeta period={item.period} org={item.org} />}>
                <h3 className="font-serif text-title text-foreground">{item.role}</h3>
                <DetailList items={item.highlights} />
                {item.bridgingSentence ? (
                  <p className="mt-3 font-serif text-body-sm italic text-muted-foreground">{item.bridgingSentence}</p>
                ) : null}
              </Entry>
            ))}
          </EntryList>
        </SectionFrame>

        <SectionFrame label="Education" title="Academic foundation">
          <EntryList>
            {education.map((item) => (
              <Entry key={item.degree} meta={<EntryMeta period={item.period} org={item.org} />}>
                <h3 className="font-serif text-title text-foreground">{item.degree}</h3>
                <DetailList items={item.details} />
              </Entry>
            ))}
          </EntryList>
        </SectionFrame>

        <SectionFrame label="Skills" title="Technical skills">
          <div className="space-y-3">
            {toolkit.map((group) => (
              <KeywordLine key={group.label} label={group.label} items={group.items} />
            ))}
          </div>
        </SectionFrame>

        <SectionFrame label="More" title="Research, projects, and courses">
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            {moreLinks.map((link) => (
              <TextLink key={link.href} href={link.href}>
                {link.label}
              </TextLink>
            ))}
          </p>
        </SectionFrame>
      </div>
    </>
  );
}
