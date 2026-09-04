"use client";

import { List } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import { SiteIndex } from "@/components/SiteIndex";
import { landingNavItems, site } from "@/lib/content";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const indexTriggerRef = useRef<HTMLButtonElement>(null);
  const closeIndex = useCallback(() => setIsOpen(false), []);

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-border bg-background">
      <Container className="flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="font-serif text-lg font-medium text-foreground"
          onClick={closeIndex}
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-6 lg:flex">
            {landingNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.navLabel}
              </Link>
            ))}
          </div>

          <Link
            href="/resume"
            className="mono-label hidden h-9 items-center text-foreground transition-colors hover:text-primary lg:ml-3 lg:inline-flex"
          >
            Résumé
          </Link>

          <ThemeToggle />

          <button
            ref={indexTriggerRef}
            type="button"
            className="mono-label inline-flex h-9 items-center gap-2 rounded-[2px] border border-input px-3 text-foreground transition-colors hover:bg-muted"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Open site index"
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            aria-controls="site-index"
          >
            <List className="h-4 w-4" aria-hidden="true" />
            <span>Index</span>
          </button>
        </nav>
      </Container>

      <SiteIndex isOpen={isOpen} onClose={closeIndex} triggerRef={indexTriggerRef} />
    </header>
  );
}
