import Link from "next/link";

import { site } from "@/lib/content";
import { Container } from "./Container";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold text-slate-900"
        >
          <span className="rounded-md bg-slate-900 px-2 py-1 text-xs font-mono uppercase tracking-[0.2em] text-white">
            MC
          </span>
          <span>{site.name}</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600 sm:text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
