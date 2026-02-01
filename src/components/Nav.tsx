import Link from "next/link";

import { site } from "@/lib/content";
import { Container } from "./Container";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#research", label: "Research" },
  { href: "/#contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
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
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground sm:text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
