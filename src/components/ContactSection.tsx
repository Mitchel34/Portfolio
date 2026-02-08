"use client";

import { Github, Linkedin, Mail } from "lucide-react";

import { Container } from "@/components/Container";
import { site } from "@/lib/content";

export function ContactSection() {
  return (
    <section className="border-t border-border/70 py-20" id="contact">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
            <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
              Let&apos;s build something that works in the real world
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              I&apos;m open to collaborating with teams working on forecasting, infrastructure-aware ML, and production systems—whether in industry or research. If you care about reliability, clarity, and shipping useful systems, I&apos;d enjoy connecting.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              >
                Start a conversation
              </a>
              <a
                href={site.resumeUrl}
                className="inline-flex h-12 items-center rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition hover:border-primary/40"
              >
                Download resume
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card p-6">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Reach me</p>
            <div className="mt-4 space-y-4 text-sm text-foreground">
              <a href={`mailto:${site.email}`} className="block rounded-xl border border-border bg-surface/70 px-4 py-3 hover:border-primary/35">
                {site.email}
              </a>
              <a href={site.linkedin} className="block rounded-xl border border-border bg-surface/70 px-4 py-3 hover:border-primary/35">
                {site.linkedin.replace("https://", "")}
              </a>
              <a href={site.github} className="block rounded-xl border border-border bg-surface/70 px-4 py-3 hover:border-primary/35">
                {site.github.replace("https://", "")}
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2 text-muted-foreground">
              <a href={`mailto:${site.email}`} className="rounded-lg border border-border bg-surface p-2.5 hover:text-foreground" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
              <a href={site.linkedin} className="rounded-lg border border-border bg-surface p-2.5 hover:text-foreground" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={site.github} className="rounded-lg border border-border bg-surface p-2.5 hover:text-foreground" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-14 text-center text-xs text-muted-foreground">
          {new Date().getFullYear()} {site.name}.
        </p>
      </Container>
    </section>
  );
}
