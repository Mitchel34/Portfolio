"use client";

import { motion } from "framer-motion";
import { BrainCircuit, GitBranch, Microscope, Scale } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { research } from "@/lib/content";

export function ResearchSection() {
  return (
    <section className="border-t border-border/70 bg-surface/35 py-20" id="research">
      <Container>
        <SectionHeader
          eyebrow="Research"
          title={research.title}
          description={research.summary}
        />

        <div className="mt-10 grid gap-7 lg:grid-cols-[1.05fr,0.95fr]">
          <article className="rounded-2xl border border-border/80 bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <BrainCircuit className="h-5 w-5" />
              <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-foreground">
                Architecture
              </h3>
            </div>
            <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              {research.architecture.map((item) => (
                <li key={item} className="rounded-lg border border-border/70 bg-surface/55 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <div className="space-y-7">
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border/80 bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-2 text-accent">
                <Scale className="h-5 w-5" />
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-foreground">
                  Evaluation & Constraints
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {research.evaluation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
                {research.constraints.map((item) => (
                  <li key={item} className="italic">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="rounded-2xl border border-border/80 bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-2 text-secondary">
                <Microscope className="h-5 w-5" />
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-foreground">
                  Reproducibility
                </h3>
              </div>
              <div className="space-y-2.5">
                {research.reproducibility.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-border/70 bg-surface/55 px-3 py-2 text-sm text-muted-foreground"
                  >
                    <GitBranch className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.article>

            <Link
              href="/research"
              className="inline-flex items-center text-sm font-semibold text-primary transition hover:opacity-80"
            >
              Read full thesis overview
              <span className="ml-2">{">"}</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
