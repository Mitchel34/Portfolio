"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";

import { SiteIndex } from "@/components/SiteIndex";
import { site, sitePages } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

const navigationOrder = ["/projects", "/research", "/about", "/resume", "/contact"];
const navigationItems = navigationOrder.flatMap((href) => {
  const page = sitePages.find((item) => item.href === href);
  return page ? [{ ...page, label: href === "/projects" ? "Work" : page.label }] : [];
});

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const indexTriggerRef = useRef<HTMLButtonElement>(null);
  const closeIndex = useCallback(() => setIsOpen(false), []);

  return (
    <header className="sticky top-0 z-50 h-18 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <Container className="flex h-full items-center justify-between gap-2 sm:gap-4">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          aria-current={pathname === "/" ? "page" : undefined}
          className="inline-flex min-h-11 shrink-0 items-center gap-2.5 font-serif text-lg font-medium text-foreground sm:text-xl"
          onClick={closeIndex}
        >
          <span className="hidden h-2 w-2 rounded-full bg-primary sm:block" aria-hidden="true" />
          {site.name}
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/resume"
            aria-current={pathname === "/resume" ? "page" : undefined}
            className="hidden min-h-11 items-center rounded-md border border-border px-3 text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-muted sm:inline-flex lg:hidden"
          >
            Résumé
          </Link>

          <ThemeToggle />

          <button
            ref={indexTriggerRef}
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            aria-controls="site-index"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
            <span>Menu</span>
          </button>
        </nav>
      </Container>

      <SiteIndex isOpen={isOpen} onClose={closeIndex} triggerRef={indexTriggerRef} />
    </header>
  );
}
