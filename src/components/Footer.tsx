import Link from "next/link";

import { EvidenceLegend } from "@/components/StatusLabel";
import { TextLink } from "@/components/TextLink";
import { landingSectionList, site } from "@/lib/content";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="rule-double bg-background py-12">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <p className="font-serif text-title">{site.name}</p>
            <p className="mt-1 text-body-sm text-muted-foreground">{site.title}</p>
            <p className="mono-label mt-3 text-muted-foreground">
              {site.location} · {site.timezone} · {site.clearance}
            </p>
            <EvidenceLegend className="mt-4 max-w-[40ch]" />
          </div>

          <nav aria-label="Contents" className="mt-8 lg:col-span-3 lg:col-start-6 lg:mt-0">
            <p className="mono-label text-muted-foreground">Contents</p>
            <ul className="mt-2 space-y-1.5">
              {landingSectionList.map((section) => (
                <li key={section.id}>
                  <Link
                    href={section.href}
                    className="text-body-sm text-foreground transition-colors hover:text-primary"
                  >
                    <span className="mono-label mr-3 text-muted-foreground">{section.number}</span>
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere" className="mt-8 lg:col-span-3 lg:col-start-10 lg:mt-0">
            <p className="mono-label text-muted-foreground">Elsewhere</p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <TextLink href={site.github}>GitHub</TextLink>
              </li>
              <li>
                <TextLink href={site.linkedin}>LinkedIn</TextLink>
              </li>
              <li>
                <TextLink href={`mailto:${site.email}`}>Email</TextLink>
              </li>
              <li>
                <TextLink href={site.resumeUrl} external>
                  Résumé (PDF)
                </TextLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mono-label mt-10 flex flex-wrap justify-between gap-2 border-t border-border pt-4 text-muted-foreground">
          <p>
            © {site.updatedYear} {site.name}
          </p>
          <p>
            <a
              href={site.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-text transition-colors hover:text-foreground"
            >
              Source on GitHub <span aria-hidden="true">↗</span>
            </a>
            {" · "}Updated {site.updated}
          </p>
        </div>
      </Container>
    </footer>
  );
}
