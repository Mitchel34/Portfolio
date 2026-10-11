import Link from "next/link";

import { LinkGlyph } from "@/components/LinkGlyph";
import { TextLink } from "@/components/TextLink";
import { site, sitePages } from "@/lib/content";
import { Container } from "./Container";

const navigationOrder = ["/projects", "/research", "/about", "/coursework", "/resume", "/contact"];
const navigationItems = navigationOrder.flatMap((href) => {
  const page = sitePages.find((item) => item.href === href);
  return page ? [{ ...page, label: href === "/projects" ? "Work" : page.label }] : [];
});

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-12 sm:py-16">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex min-h-11 items-center font-serif text-title transition-colors hover:text-primary">{site.name}</Link>
            <p className="mt-1 max-w-sm font-serif text-body italic text-foreground">{site.tagline}</p>
            <p className="mt-2 text-body-sm text-muted-foreground">{site.title}</p>
            <p className="mt-3 text-footnote text-muted-foreground">
              {site.location} · {site.timezone}
            </p>
          </div>

          <nav aria-label="Footer pages" className="mt-8 lg:col-span-3 lg:col-start-6 lg:mt-0">
            <p className="mono-label text-muted-foreground">Explore</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 lg:grid-cols-1">
              {navigationItems.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="inline-flex min-h-11 items-center text-body-sm text-foreground transition-colors hover:text-primary"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social profiles and downloads" className="mt-8 lg:col-span-3 lg:col-start-10 lg:mt-0">
            <p className="mono-label text-muted-foreground">Connect</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 lg:grid-cols-1">
              <li>
                <TextLink href={site.github} className="min-h-11 py-2">GitHub</TextLink>
              </li>
              <li>
                <TextLink href={site.linkedin} className="min-h-11 py-2">LinkedIn</TextLink>
              </li>
              <li>
                <TextLink href={`mailto:${site.email}`} className="min-h-11 py-2">Email</TextLink>
              </li>
              <li>
                <TextLink href={site.resumeUrl} external className="min-h-11 py-2">
                  Résumé (PDF)
                </TextLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-4 text-footnote text-muted-foreground">
          <p>
            © {site.updatedYear} {site.name}
          </p>
          <p>
            <a
              href={site.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-text inline-flex min-h-11 items-center gap-1 transition-colors hover:text-foreground"
            >
              Source on GitHub <LinkGlyph external className="align-[-0.1em]" />
            </a>
            {" · "}Updated {site.updated}
          </p>
        </div>
      </Container>
    </footer>
  );
}
