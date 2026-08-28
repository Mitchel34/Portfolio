"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, Github, Linkedin, X } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, RefObject } from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { ThemeToggle } from "@/components/ThemeToggle";
import { landingNavItems, site } from "@/lib/content";
import { useIsClient } from "@/lib/useIsClient";

type ModelGraphMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const menuMetadata: Record<string, string> = {
  "About Me": "Experience and engineering approach",
  Coursework: "Graduate AI study at UT Austin",
  Research: "HYDRA and scientific communication",
  Projects: "Applied AI and production systems",
  Contact: "Start a conversation",
  Resume: "Downloadable career overview",
};

const graphPositions = [
  { x: 16, y: 18 },
  { x: 50, y: 12 },
  { x: 84, y: 18 },
  { x: 84, y: 76 },
  { x: 50, y: 86 },
  { x: 16, y: 76 },
];

const graphItems = [
  ...landingNavItems,
  { href: "/resume", label: "Resume", id: "resume" },
].map((item, index) => ({
  ...item,
  meta: menuMetadata[item.label],
  position: graphPositions[index],
}));

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

export function ModelGraphMenu({ isOpen, onClose, triggerRef }: ModelGraphMenuProps) {
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
          id="model-graph-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Explore portfolio"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.24 }}
          className="fixed inset-0 z-[70] min-h-[100dvh] overflow-y-auto bg-background/98 text-foreground backdrop-blur-2xl"
        >
          <div aria-hidden="true" className="model-graph-grid pointer-events-none absolute inset-0 opacity-75" />
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

          <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                  Portfolio Router
                </p>
                <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                  Explore the system
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  Follow a node from applied research to production engineering, graduate study, and collaboration.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/45 hover:text-primary"
                aria-label="Close portfolio navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Model graph navigation" className="relative mt-9 flex-1 md:min-h-[35rem]">
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                focusable="false"
              >
                {graphItems.map((item, index) => (
                  <motion.line
                    key={item.href}
                    x1="50"
                    y1="50"
                    x2={item.position.x}
                    y2={item.position.y}
                    vectorEffect="non-scaling-stroke"
                    className="stroke-primary/25"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                    initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay: index * 0.06 }}
                  />
                ))}
              </svg>

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-card/90 text-primary shadow-[0_0_60px_-18px_rgba(11,95,255,0.8)] md:flex"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 26, ease: "linear", repeat: Infinity }}
              >
                <div className="absolute inset-2 rounded-full border border-dashed border-accent/45" />
                <BrainCircuit className="h-7 w-7" />
              </motion.div>

              <div className="relative z-10 grid gap-3 md:block md:h-full">
                {graphItems.map((item, index) => {
                  const nodeStyle = {
                    "--graph-x": `${item.position.x}%`,
                    "--graph-y": `${item.position.y}%`,
                  } as CSSProperties;

                  return (
                    <motion.div
                      key={item.href}
                      style={nodeStyle}
                      className="md:absolute md:left-[var(--graph-x)] md:top-[var(--graph-y)] md:w-[13rem] md:-translate-x-1/2 md:-translate-y-1/2 [perspective:900px]"
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: index * 0.055 }}
                    >
                      <motion.div
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : { y: -7, rotateX: index % 2 === 0 ? 4 : -4, rotateY: index % 2 === 0 ? -5 : 5 }
                        }
                        transition={{ type: "spring", stiffness: 280, damping: 22 }}
                        className="[transform-style:preserve-3d]"
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          data-cursor-label={item.label}
                          className="group block rounded-2xl border border-border/80 bg-card/95 p-4 shadow-[0_20px_55px_-38px_rgba(18,36,58,0.75)] transition hover:border-primary/50 focus-visible:border-primary"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                              Node {String(index + 1).padStart(2, "0")}
                            </span>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                          </div>
                          <span className="mt-4 block font-serif text-xl font-medium tracking-tight">
                            {item.label}
                          </span>
                          <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">
                            {item.meta}
                          </span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Keyboard: Tab to navigate · Esc to close
              </p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card transition hover:border-primary/40 hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card transition hover:border-primary/40 hover:text-foreground"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
