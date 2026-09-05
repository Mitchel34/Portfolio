"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { TextLink } from "@/components/TextLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { landingSectionList, site, sitePages } from "@/lib/content";
import { useIsClient } from "@/lib/useIsClient";

type SiteIndexProps = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const rowLinkClass = "grid grid-cols-[3rem_1fr] gap-x-4 py-4 transition-colors hover:text-primary";

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

export function SiteIndex({ isOpen, onClose, triggerRef }: SiteIndexProps) {
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
    const backgroundElements = Array.from(
      document.querySelectorAll<HTMLElement>("header, main, footer"),
    );
    const backgroundState = backgroundElements.map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute("aria-hidden"),
    }));

    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    const focusFrame = requestAnimationFrame(() => {
      getFocusableElements(panel)[0]?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements(panel);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
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
  }, [isOpen, onClose, triggerRef]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          ref={panelRef}
          id="site-index"
          role="dialog"
          aria-modal="true"
          aria-label="Site index"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          className="fixed inset-0 z-[70] min-h-[100dvh] overflow-y-auto bg-background text-foreground"
        >
          <div className="mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="mono-label text-muted-foreground">Index</p>
                <h2 className="mt-1 font-serif text-heading">Contents</h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-[2px] border border-input text-foreground transition-colors hover:bg-muted"
                aria-label="Close site index"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <nav aria-label="On this page">
                <p className="mono-label mb-2 text-muted-foreground">On this page</p>
                <ul className="border-b border-border">
                  {landingSectionList.map((section) => (
                    <li key={section.id} className="border-t border-border">
                      <Link href={section.href} onClick={onClose} className={rowLinkClass}>
                        <span className="mono-label text-primary">{section.number}</span>
                        <span>
                          <span className="block font-serif text-title">{section.label}</span>
                          <span className="mt-0.5 block text-body-sm text-muted-foreground">
                            {section.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div>
                <nav aria-label="Pages">
                  <p className="mono-label mb-2 text-muted-foreground">Pages</p>
                  <ul className="border-b border-border">
                    {sitePages.map((page) => (
                      <li key={page.href} className="border-t border-border">
                        <Link href={page.href} onClick={onClose} className={rowLinkClass}>
                          <span aria-hidden="true" className="mono-label text-primary">
                            →
                          </span>
                          <span>
                            <span className="block font-serif text-title">{page.label}</span>
                            <span className="mt-0.5 block text-body-sm text-muted-foreground">
                              {page.description}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-8">
                  <p className="mono-label mb-2 text-muted-foreground">Elsewhere</p>
                  <ul className="space-y-2">
                    <li>
                      <TextLink href={site.github}>GitHub</TextLink>
                    </li>
                    <li>
                      <TextLink href={site.linkedin}>LinkedIn</TextLink>
                    </li>
                    <li>
                      <TextLink href={`mailto:${site.email}`}>Email</TextLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-border pt-6">
              <p className="mono-label text-muted-foreground">Tab to navigate · Esc to close</p>
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
