"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { site } from "@/lib/content";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-20 sm:pt-24 lg:pb-24 lg:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-14 top-8 h-60 w-60 rounded-full bg-primary/20 blur-[90px]" />
        <div className="absolute right-0 top-6 h-48 w-48 rounded-full bg-secondary/25 blur-[80px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-[90px]" />
      </div>

      <Container className="relative z-10 grid gap-14 lg:grid-cols-[1.08fr,0.92fr] lg:items-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
            M.S. Artificial Intelligence · UT Austin
          </div>

          <div className="space-y-6">
            <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[1.03] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {site.headline}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {site.summary}
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground/80">
              I enjoy working with teams that care about getting the details right and shipping systems that matter.
            </p>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
              Available Now · Full-Time or Summer 2026 Internship
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={site.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              <Calendar className="h-4 w-4" />
              Schedule a Call
            </a>
            <Link
              href="/projects"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition hover:border-primary/40"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={site.resumeUrl}
              className="inline-flex h-12 items-center rounded-full border border-border/80 px-6 text-sm font-semibold text-foreground transition hover:border-primary/40"
            >
              Resume
            </a>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <a
              href={`mailto:${site.email}`}
              className="rounded-xl border border-border bg-card p-2.5 transition hover:border-primary/40 hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={site.github}
              className="rounded-xl border border-border bg-card p-2.5 transition hover:border-primary/40 hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={site.linkedin}
              className="rounded-xl border border-border bg-card p-2.5 transition hover:border-primary/40 hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_-45px_rgba(18,36,58,0.35)] sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Thesis Work
              </p>
              <span className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
                Active
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/80 bg-surface/55">
              <Image
                src="/architecture_diagram.png"
                alt="HYDRA system architecture diagram"
                width={840}
                height={520}
                className="h-auto w-full"
                priority
              />
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              HYDRA: Hybrid deep-learning for streamflow forecasting
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
