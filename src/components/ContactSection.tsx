"use client";

import { Github, Linkedin, Mail } from "lucide-react";

import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { landingSections, site } from "@/lib/content";

export function ContactSection() {
  const section = landingSections.contact;

  return (
    <section className="scroll-mt-24 border-t border-border/70 bg-background py-20" id={section.id}>
      <Container>
        <div className="space-y-6">
          <SectionHeader
            eyebrow={section.label}
            title="Let’s build AI systems with measurable impact."
            description="I bring software engineering, applied research, and disciplined delivery to modernize critical workflows, launch new AI capabilities, and carry ambitious systems from prototype to large-scale implementation."
          />

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              data-cursor-label="Connect"
              className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Start a Conversation
            </a>
            <a
              href={site.resumeUrl}
              download={site.resumeFilename}
              data-cursor-label="Resume"
              className="inline-flex h-12 items-center rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition hover:border-primary/40"
            >
              Download Resume
            </a>
            <a
              href={site.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="Schedule"
              className="inline-flex h-12 items-center rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition hover:border-primary/40"
            >
              Schedule a Call
            </a>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <a href={`mailto:${site.email}`} data-cursor-label="Email" className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card hover:border-primary/40 hover:text-foreground" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" data-cursor-label="LinkedIn" className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card hover:border-primary/40 hover:text-foreground" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" data-cursor-label="GitHub" className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card hover:border-primary/40 hover:text-foreground" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Schedule a Call</p>
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
