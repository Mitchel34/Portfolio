"use client";

import { ArrowUpRight, Github, Linkedin, Orbit } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import { ModelGraphMenu } from "@/components/ModelGraphMenu";
import { landingNavItems, site } from "@/lib/content";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Mitchel Carson home" className="flex items-center gap-3" onClick={closeMenu}>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(11,95,255,0.8)]">
            MC
          </span>
          <span className="hidden sm:block text-sm font-semibold tracking-tight text-foreground">
            {site.name}
          </span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6">
          <div className="hidden items-center gap-5 lg:flex">
            {landingNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex h-11 items-center text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/resume"
            data-cursor-label="Resume"
            className="hidden h-11 items-center gap-1 rounded-full border border-border bg-card px-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition hover:border-primary/40 hover:text-primary lg:inline-flex"
          >
            Resume
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <div className="hidden items-center gap-2 text-muted-foreground lg:flex">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg transition hover:bg-surface hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg transition hover:bg-surface hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <ThemeToggle />
          </div>

          <button
            ref={menuTriggerRef}
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition hover:border-primary/45 hover:text-primary"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Open portfolio graph navigation"
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            aria-controls="model-graph-menu"
            data-cursor-label="Explore"
          >
            <Orbit className="h-4 w-4" />
            <span className="hidden sm:inline">Explore</span>
          </button>
        </nav>
      </Container>

      <ModelGraphMenu isOpen={isOpen} onClose={closeMenu} triggerRef={menuTriggerRef} />
    </header>
  );
}
