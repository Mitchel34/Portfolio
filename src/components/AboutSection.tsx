"use client";

import { motion } from "framer-motion";
import { FileText, GitMerge, Layers, MessageSquare } from "lucide-react";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { about, experience } from "@/lib/content";

const workStyle = [
  {
    icon: MessageSquare,
    text: "I ask a lot of questions early to avoid costly assumptions later",
  },
  {
    icon: Layers,
    text: "I value clear ownership and well-defined interfaces",
  },
  {
    icon: FileText,
    text: "I document decisions so teams can move faster over time",
  },
  {
    icon: GitMerge,
    text: "I'm comfortable bridging research ideas and production constraints",
  },
];

export function AboutSection() {
  return (
    <section className="relative py-20" id="about">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.02fr,0.98fr]">
          <div className="space-y-8">
            <SectionHeader
              eyebrow="About"
              title="Engineering rigor, research depth, and collaborative delivery"
            />

            <div className="space-y-5 rounded-3xl border border-border/80 bg-card p-7 shadow-[0_20px_60px_-50px_rgba(18,36,58,0.45)]">
              {about.summary.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              Career Timeline
            </p>

            {experience.map((item, index) => (
              <motion.article
                key={item.role}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`rounded-2xl border border-border/80 bg-card px-5 ${
                  index === 0 ? "py-5" : "py-4"
                }`}
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
                    {item.role}
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground">{item.period}</span>
                </div>
                <p className="text-sm font-medium text-foreground">{item.org}</p>
                <ul className="mt-3 space-y-1.5 pl-4 text-sm text-muted-foreground list-disc marker:text-secondary">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                {item.bridgingSentence && (
                  <p className="mt-3 border-l-2 border-secondary/50 pl-3 text-sm italic leading-relaxed text-muted-foreground">
                    {item.bridgingSentence}
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <p className="mb-6 text-center text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
            How I Work
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {workStyle.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07, duration: 0.4 }}
                  className="flex items-start gap-4 rounded-2xl border border-border/80 bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-primary/35"
                >
                  <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
