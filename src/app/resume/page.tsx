import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Entry, EntryList } from "@/components/Entry";
import { FigureWell } from "@/components/FigureWell";
import { PageHeader } from "@/components/PageHeader";
import { SectionFrame } from "@/components/SectionFrame";
import { buttonClass } from "@/components/ui/Button";
import { KeywordLine } from "@/components/KeywordLine";
import { StatusLabel } from "@/components/StatusLabel";
import { education, experience, projectEvidenceStatus, projects, site, skills } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Resume",
  description:
    "Resume for Mitchel Carson: machine learning engineer and applied AI researcher, UT Austin M.S. AI (expected May 2027), USAA, U.S. Air Force, active TS/SCI.",
  pathname: "/resume",
  keywords: ["AI engineer resume", "machine learning resume", "software engineer resume"],
});

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
          lede="Machine learning research, production software, mission operations, and graduate AI study."
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
            caption={`Résumé (PDF), one page, generated from this site's content. Updated ${site.resumePdfUpdated}.`}
          >
            <iframe
              src={`${site.resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              title="Resume PDF"
              className="h-[520px] w-full border-0 md:h-[840px]"
            />
          </FigureWell>
        </SectionFrame>

        <SectionFrame label="Research" title="Research and selected projects">
          <EntryList>
            {projects
              .filter((project) => project.slug === "hydra-temporal" || project.slug === "harmony")
              .map((project) => (
                <Entry
                  key={project.slug}
                  meta={
                    <>
                      <StatusLabel status={projectEvidenceStatus(project.status)} />
                      <p className="mt-3 mono-label leading-relaxed text-muted-foreground">
                        {project.stack.slice(0, 5).join(" · ")}
                      </p>
                    </>
                  }
                >
                  <h3 className="font-serif text-title text-foreground">{project.title}</h3>
                  <p className="mt-1 text-body-sm text-muted-foreground">{project.subtitle}</p>
                  <DetailList items={project.approach.slice(0, 3)} />
                </Entry>
              ))}
          </EntryList>
        </SectionFrame>

        <SectionFrame label="Skills" title="Tools and platforms">
          <div className="space-y-3">
            {skills.map((group) => (
              <KeywordLine key={group.label} label={group.label} items={group.items} />
            ))}
          </div>
        </SectionFrame>

        <SectionFrame label="Experience" title="Industry and service">
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
      </div>
    </>
  );
}
