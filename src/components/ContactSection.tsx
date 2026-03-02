"use client";

import { Github, Linkedin, Mail } from "lucide-react";

import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { Container } from "@/components/Container";
import { site } from "@/lib/content";

export function ContactSection() {
  return (
    <section className="border-t border-border/70 bg-background py-20" id="contact">
      <Container>
        <div className="space-y-6">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
            I&apos;m looking for teams building production systems that matter
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            I&apos;m seeking full-time AI/ML or software engineering roles on teams that value reliability, clarity, and execution. Open to industry or research environments.
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
            <a
              href={site.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition hover:border-primary/40"
            >
              Book a call
            </a>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <a href={`mailto:${site.email}`} className="rounded-lg border border-border bg-card p-2.5 hover:border-primary/40 hover:text-foreground" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
            <a href={site.linkedin} className="rounded-lg border border-border bg-card p-2.5 hover:border-primary/40 hover:text-foreground" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={site.github} className="rounded-lg border border-border bg-card p-2.5 hover:border-primary/40 hover:text-foreground" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Schedule a call</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick a time and a Zoom link will be generated automatically.
          </p>
          <div className="mt-4">
            <CalendlyEmbed />
          </div>
        </div>

        <p className="mt-14 text-center text-xs text-muted-foreground">
          {new Date().getFullYear()} {site.name}.
        </p>
      </Container>
    </section>
  );
}
