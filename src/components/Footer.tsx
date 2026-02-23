import Link from "next/link";

import { site } from "@/lib/content";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/70 backdrop-blur">
      <Container className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <p className="text-lg font-serif font-medium tracking-tight text-foreground">
            {site.name}
          </p>
          <p className="text-sm text-muted-foreground">{site.title}</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-muted-foreground">
          <Link href="/projects" className="transition hover:text-foreground">
            Projects
          </Link>
          <Link href="/research" className="transition hover:text-foreground">
            Research
          </Link>
          <a href={site.github} className="transition hover:text-foreground">
            GitHub
          </a>
          <a href={site.linkedin} className="transition hover:text-foreground">
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
