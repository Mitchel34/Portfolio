"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { about, experience } from "@/lib/content";

export function AboutSection() {
  return (
    <section className="relative py-20" id="about">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.02fr,0.98fr]">
          <div className="space-y-8">
            <SectionHeader
              eyebrow="About"
              title="Engineering rigor, research depth, and practical delivery"
              description="I operate between ML research and software engineering, focused on systems that are useful outside notebooks."
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
                className="rounded-2xl border border-border/80 bg-card px-5 py-4"
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
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
