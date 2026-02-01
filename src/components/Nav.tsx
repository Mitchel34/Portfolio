import Link from "next/link";

import { site } from "@/lib/content";
import { Container } from "./Container";

import { Github, Linkedin } from "lucide-react";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#research", label: "Research" },
  { href: "/#contact", label: "Contact" },
  { href: "/resume", label: "Resume", external: true },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold text-foreground transition hover:text-foreground/80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-xs font-bold text-background">
            MC
          </span>
          <span className="hidden sm:inline-block">{site.name}</span>
        </Link>
        <nav className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-foreground"
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile simplified nav */}
          <div className="flex sm:hidden items-center gap-4 text-xs font-medium text-muted-foreground">
            {navItems.filter(i => i.label === "Resume" || i.label === "Contact").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-foreground"
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden h-4 w-px bg-white/10 sm:block" />
          <div className="flex items-center gap-3 text-muted-foreground">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}
