"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { ModelEvidenceExplorer } from "@/components/ModelEvidenceExplorer";
import { SectionHeader } from "@/components/SectionHeader";
import { landingSections, projects } from "@/lib/content";

const project = projects[0];

export function FeaturedProject() {
  const section = landingSections.research;

  return (
    <section className="scroll-mt-24 py-20" id={section.id}>
      <Container>
        <SectionHeader
          eyebrow={section.label}
          title="Testing AI methods for better streamflow forecasts."
          description="HYDRA tests whether Transformer and GRU corrections can improve National Water Model forecasts. Results remain preliminary while the final analysis and manuscript are in progress."
        />

        <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-border/80 bg-card p-7 shadow-[0_26px_80px_-56px_rgba(18,36,58,0.55)] sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/20 blur-[65px]" />

          <div className="grid gap-9 lg:grid-cols-[1fr,0.92fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Ongoing Research · Preliminary Results
              </span>
              <div>
                <h3 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-base text-muted-foreground">{project.subtitle}</p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border/80">
                <a
                  href="/images/projects/hydra-architecture-full.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the full-resolution conceptual HYDRA research architecture diagram in a new tab"
                  title="Open full-resolution diagram"
                  data-cursor-label="Inspect"
                  className="block cursor-zoom-in"
                >
                  <Image
                    src="/images/projects/hydra-architecture-full.jpg"
                    alt="Conceptual HYDRA research architecture diagram"
                    width={2816}
                    height={1536}
                    sizes="(max-width: 1024px) calc(100vw - 3.5rem), 50vw"
                    quality={95}
                    className="h-auto w-full"
                  />
                </a>
                <p className="border-t border-border/80 bg-muted/30 px-4 py-3 text-center text-xs leading-relaxed text-muted-foreground">
                  Conceptual research architecture; the implementation will continue to evolve with the ongoing analysis.
                </p>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {project.problem} {project.impact}
              </p>

              <ul className="space-y-2.5">
                {project.results.map((result) => (
                  <li
                    key={result}
                    className="rounded-xl border border-border/70 bg-surface/55 px-4 py-2.5 text-sm text-foreground"
                  >
                    {result}
                  </li>
                ))}
              </ul>

              <motion.div
                className="flex flex-wrap gap-2"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {project.stack.slice(0, 6).map((tech) => (
                  <motion.span
                    key={tech}
                    variants={{
                      hidden: { opacity: 0, scale: 0.85, y: 8 },
                      visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
                    }}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/projects/${project.slug}`}
                  data-cursor-label="Open"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
                >
                  Read case study
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/research"
                  data-cursor-label="Research"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:opacity-80"
                >
                  Explore HYDRA research
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="self-start lg:sticky lg:top-24"
            >
              <ModelEvidenceExplorer />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
