import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/Container";
import { LinkGlyph } from "@/components/LinkGlyph";
import { Reveal } from "@/components/Reveal";
import { buttonClass } from "@/components/ui/Button";
import { landingSections, sectionCopy, site } from "@/lib/content";

const rowLinkClass = "link-text text-body text-foreground hover:text-primary hover:decoration-primary";

/** "https://www.linkedin.com/in/x" → "linkedin.com/in/x" for display. */
function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

function ContactRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-x-4 py-4">
      <dt className="mono-label self-center text-muted-foreground">{term}</dt>
      <dd className="min-w-0 break-words">{children}</dd>
    </div>
  );
}

function ExternalRowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={rowLinkClass}>
      {children}
      <LinkGlyph external className="ml-1 align-[-0.1em]" />
    </a>
  );
}

export function ContactSection() {
  const section = landingSections.contact;

  return (
    <section
      id={section.id}
      aria-labelledby="contact-heading"
      className="scroll-mt-14 border-t-2 border-foreground py-20 lg:py-28"
    >
      <Container>
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-6">
            <p className="mono-label text-primary">
              {section.number} · {section.label}
            </p>
            <h2
              id="contact-heading"
              className="mt-3 font-serif text-[3rem] leading-none font-medium tracking-[-0.02em] text-foreground sm:text-[4rem] lg:text-[4.5rem]"
            >
              {sectionCopy.contact.title}
            </h2>
            <p className="mt-6 max-w-[52ch] text-lede text-muted-foreground">{sectionCopy.contact.lede}</p>
            <a
              href={`mailto:${site.email}`}
              className="link-text mt-8 inline-block font-serif text-[1.5rem] break-all text-foreground hover:text-primary hover:decoration-primary sm:text-[1.875rem]"
            >
              {site.email}
            </a>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                className={buttonClass("primary", "sm:flex-1")}
                href={site.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule a conversation
              </a>
              <a
                className={buttonClass("outline", "sm:flex-1")}
                href={site.resumeUrl}
                download={site.resumeFilename}
              >
                Résumé (PDF)
              </a>
            </div>

            <dl className="mt-8 divide-y divide-border border-y border-border">
              <ContactRow term="LinkedIn">
                <ExternalRowLink href={site.linkedin}>{displayUrl(site.linkedin)}</ExternalRowLink>
              </ContactRow>
              <ContactRow term="GitHub">
                <ExternalRowLink href={site.github}>{displayUrl(site.github)}</ExternalRowLink>
              </ContactRow>
              <ContactRow term="Based in">
                <span className="text-body text-foreground">
                  {site.location} · {site.timezone}
                </span>
              </ContactRow>
              <ContactRow term="Clearance">
                <span className="text-body text-foreground">{site.clearance}</span>
              </ContactRow>
            </dl>

            <p className="mt-6 text-body-sm text-muted-foreground">
              Prefer a form or an embedded calendar?{" "}
              <Link href="/contact" className="link-text text-foreground hover:text-primary hover:decoration-primary">
                Use the contact page
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
