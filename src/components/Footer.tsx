import Link from "next/link";

import { site } from "@/lib/content";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <Container className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">{site.name}</p>
          <p className="text-sm text-muted-foreground">{site.title}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <Link href="/projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="/research" className="hover:text-foreground transition-colors">
            Research
          </Link>
          <a href={site.github} className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href={site.linkedin} className="hover:text-foreground transition-colors">
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
