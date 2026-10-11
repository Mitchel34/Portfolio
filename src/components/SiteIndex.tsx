"use client";

import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { LinkGlyph } from "@/components/LinkGlyph";
import { TextLink } from "@/components/TextLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { landingSectionList, site, sitePages } from "@/lib/content";
import { useIsClient } from "@/lib/useIsClient";
import { cn } from "@/lib/utils";

type SiteIndexProps = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const navigationOrder = ["/projects", "/research", "/about", "/resume", "/contact", "/coursework"];
const navigationItems = navigationOrder.flatMap((href) => {
  const page = sitePages.find((item) => item.href === href);
  return page ? [{ ...page, label: href === "/projects" ? "Work" : page.label }] : [];
});

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.getClientRects().length > 0 && !element.closest("[inert]"));
}

export function SiteIndex({ isOpen, onClose, triggerRef }: SiteIndexProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const mounted = useIsClient();

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    if (!panel) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const trigger = triggerRef.current;
    const backgroundElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement &&
        element !== panel &&
        !element.contains(panel) &&
        !["SCRIPT", "STYLE", "LINK"].includes(element.tagName),
    );
    const backgroundState = backgroundElements.map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute("aria-hidden"),
    }));

    // Move focus before hiding the page from assistive technology.
    getFocusableElements(panel)[0]?.focus();
    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements(panel);
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!panel.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      backgroundState.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      });

      const restoreTarget = trigger ?? previouslyFocused;
      requestAnimationFrame(() => restoreTarget?.focus());
    };
  }, [isOpen, mounted, onClose, triggerRef]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <motion.div
      ref={panelRef}
      id="site-index"
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-index-title"
      tabIndex={-1}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.2, 0.7, 0.2, 1] }}
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-background text-foreground"
    >
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="mono-label text-primary">Explore</p>
            <h2 id="site-index-title" className="mt-1 font-serif text-heading">{site.name}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-border text-foreground transition-colors hover:bg-muted"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="my-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <nav aria-label="Pages">
            <p className="mono-label mb-3 text-muted-foreground">Portfolio</p>
            <ul className="border-b border-border">
              <li className="border-t border-border">
                <Link href="/" onClick={onClose} aria-current={pathname === "/" ? "page" : undefined} className="flex min-h-14 items-center justify-between py-3 text-body font-medium transition-colors hover:text-primary">
                  Home <LinkGlyph className="text-primary" />
                </Link>
              </li>
              {navigationItems.map((page) => {
                const isActive = pathname === page.href || pathname.startsWith(`${page.href}/`);
                return (
                  <li key={page.href} className="border-t border-border">
                    <Link
                      href={page.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={cn("flex min-h-14 items-center justify-between gap-4 py-3 transition-colors hover:text-primary", isActive && "text-primary")}
                    >
                      <span>
                        <span className="block font-serif text-title">{page.label}</span>
                        <span className="block text-footnote text-muted-foreground">{page.description}</span>
                      </span>
                      <LinkGlyph className="shrink-0 text-primary" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div>
            <nav aria-label="Home page sections">
              <p className="mono-label mb-3 text-muted-foreground">Jump into the story</p>
              <ul>
                {landingSectionList.map((section) => (
                  <li key={section.id}>
                    <Link href={section.href} onClick={onClose} className="flex min-h-11 items-center gap-4 py-2 text-body-sm transition-colors hover:text-primary">
                      <span className="mono-label text-primary">{section.number}</span>
                      {section.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8">
              <p className="mono-label mb-2 text-muted-foreground">Elsewhere</p>
              <ul>
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
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-4">
          <p className="text-footnote text-muted-foreground">Tab to navigate · Esc to close</p>
          <ThemeToggle />
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}
