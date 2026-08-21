"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { landingSections, proofItems } from "@/lib/content";

const cardLinkClass =
  "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:opacity-80";

export function AboutSection() {
  const section = landingSections.about;

  return (
    <section className="relative scroll-mt-24 py-20" id={section.id}>
      <Container>
        <SectionHeader
          eyebrow={section.label}
          title="I build software, data, and AI systems that make complex work simpler."
          description="My work spans enterprise APIs, hydrologic forecasting, research tooling, and small-business software. I focus on clear problems, useful systems, and results people can verify."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {proofItems.map((item, index) => {
            const isExternal = item.href.startsWith("http");

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/35"
              >
                <p className="text-[11px] font-mono uppercase tracking-[0.17em] text-primary">
                  {item.role}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-medium tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-5 border-l-2 border-secondary/60 pl-3 text-sm leading-relaxed text-foreground">
                  <span className="font-semibold">Ask me about:</span> {item.askAbout}
                </p>

                {isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardLinkClass}
                  >
                    {item.linkLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link href={item.href} className={cardLinkClass}>
                    {item.linkLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
