"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { site } from "@/lib/content";
import { Container } from "./Container";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#research", label: "Research" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(11,95,255,0.8)]">
            MC
          </span>
          <span className="hidden sm:block text-sm font-semibold tracking-tight text-foreground">
            {site.name}
          </span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6">
          <div className="hidden items-center gap-6 sm:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/resume"
            className="hidden h-10 items-center gap-1 rounded-full border border-border bg-card px-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition hover:border-primary/40 hover:text-primary sm:inline-flex"
          >
            Resume
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <div className="hidden items-center gap-2 text-muted-foreground sm:flex">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 transition hover:bg-surface hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 transition hover:bg-surface hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground sm:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-border/70 bg-background sm:hidden"
          >
            <Container className="space-y-2 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-foreground transition hover:border-border hover:bg-card"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-1">
                <Link
                  href="/resume"
                  className="inline-flex h-10 items-center gap-1 rounded-full border border-border bg-card px-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Resume
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="flex items-center gap-2 pt-2 text-muted-foreground">
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border bg-card p-2"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border bg-card p-2"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
