"use client";

import { motion } from "framer-motion";
import { MessageSquare, Layers, FileText, GitMerge } from "lucide-react";

import { Container } from "@/components/Container";

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

export function HowIWork() {
  return (
    <section className="py-20" id="how-i-work">
      <Container>
        <div className="mb-12 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
            Working Style
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            How I work
          </h2>
        </div>

        <div className="mx-auto grid max-w-3xl gap-4">
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
                <p className="text-sm leading-relaxed text-foreground sm:text-base">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
