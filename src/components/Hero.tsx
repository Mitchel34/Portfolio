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
    <section className="relative isolate overflow-hidden pb-20 pt-20 sm:pt-24 lg:pb-24 lg:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-14 top-8 h-60 w-60 rounded-full bg-primary/16 blur-[90px]" />
        <div className="absolute right-0 top-6 h-48 w-48 rounded-full bg-secondary/18 blur-[80px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/16 blur-[90px]" />
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 top-24 hidden px-10 lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/75">
          <span>Signal 01 · Forecasting</span>
          <span>Signal 02 · Reliable Systems</span>
        </div>
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-3xl space-y-8 text-center"
        >
          <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-center text-[11px] font-mono uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
            UT Austin M.S. Artificial Intelligence · 4.0 GPA · Austin, Texas
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-4xl font-medium leading-[1.03] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {site.headline}
            </h1>
            <p className="text-xs font-mono uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
              {site.focusLine} · {site.clearance}
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-44 overflow-hidden rounded-[2rem] border border-border/80 bg-card shadow-[0_24px_70px_-48px_rgba(18,36,58,0.6)] sm:w-52">
            <Image
              src="/images/mitchel-carson-headshot.jpg"
              alt="Professional portrait of Mitchel Carson"
              fill
              priority
              sizes="(max-width: 639px) 11rem, 13rem"
              className="object-cover object-[50%_45%]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={site.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="Connect"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              <Calendar className="h-4 w-4" />
              Schedule a Call
            </a>
            <Link
              href="/projects"
              data-cursor-label="Explore"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition hover:border-primary/40"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={site.resumeUrl}
              data-cursor-label="Resume"
              className="inline-flex h-12 items-center rounded-full border border-border/80 px-6 text-sm font-semibold text-foreground transition hover:border-primary/40"
            >
              Resume
            </a>
          </div>

          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <a
              href={`mailto:${site.email}`}
              data-cursor-label="Email"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition hover:border-primary/40 hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition hover:border-primary/40 hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition hover:border-primary/40 hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
