"use client";

import { motion } from "framer-motion";
import { Box, Code2, LineChart, ShieldCheck } from "lucide-react";

import { Container } from "@/components/Container";
import { about } from "@/lib/content";

const icons = [LineChart, Code2, ShieldCheck, Box];

export function CoreValues() {
  return (
    <section className="relative overflow-hidden py-20" id="values">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-surface/80 to-transparent" />
      <Container className="relative">
        <div className="mb-12 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
            Core Values
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Principles behind every system I build
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {about.values.map((value, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="group rounded-2xl border border-border/80 bg-card p-6 transition hover:-translate-y-1 hover:border-primary/35"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
