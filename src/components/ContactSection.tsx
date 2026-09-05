import type { ReactNode } from "react";

import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { FigureWell } from "@/components/FigureWell";
import { Reveal } from "@/components/Reveal";
import { SectionFrame } from "@/components/SectionFrame";
import { buttonClass } from "@/components/ui/Button";
import { landingSections, sectionCopy, site } from "@/lib/content";

const rowLinkClass = "link-text text-body-sm text-foreground hover:text-primary hover:decoration-primary";

/** "https://www.linkedin.com/in/x" → "linkedin.com/in/x" for display. */
function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

function ContactRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-x-4 py-3">
      <dt className="mono-label self-center text-muted-foreground">{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function ExternalRowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={rowLinkClass}>
      {children}
      <span aria-hidden="true" className="ml-1 font-mono">
        ↗
      </span>
    </a>
  );
}

export function ContactSection() {
  return (
    <SectionFrame
      id={landingSections.contact.id}
      number="07"
      label="Contact"
      title={sectionCopy.contact.title}
      lede={sectionCopy.contact.lede}
    >
      <Reveal>
        <div className="lg:grid lg:grid-cols-10 lg:items-start lg:gap-x-8">
          <dl className="divide-y divide-border border-y border-border lg:col-span-6">
            <ContactRow term="Email">
              <a href={`mailto:${site.email}`} className={rowLinkClass}>
                {site.email}
              </a>
            </ContactRow>
            <ContactRow term="Schedule">
              <ExternalRowLink href={site.calendlyUrl}>30-minute conversation</ExternalRowLink>
            </ContactRow>
            <ContactRow term="GitHub">
              <ExternalRowLink href={site.github}>{displayUrl(site.github)}</ExternalRowLink>
            </ContactRow>
            <ContactRow term="LinkedIn">
              <ExternalRowLink href={site.linkedin}>{displayUrl(site.linkedin)}</ExternalRowLink>
            </ContactRow>
          </dl>

          <div className="mt-8 lg:col-span-4 lg:mt-0">
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                className={buttonClass("primary")}
                href={site.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule a conversation
              </a>
              <a className={buttonClass("outline")} href={site.resumeUrl} download={site.resumeFilename}>
                Résumé (PDF)
              </a>
            </div>
            <p className="mono-label mt-4 text-muted-foreground">
              {site.location} · {site.timezone} · {site.clearance}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <FigureWell padded={false} caption="Pick a time; a Zoom link is generated automatically.">
            <CalendlyEmbed />
          </FigureWell>
        </div>
      </Reveal>
    </SectionFrame>
  );
}
