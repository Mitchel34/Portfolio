"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Database, Layers } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { projects, site } from "@/lib/content";

const project = projects[0];

const statCards = [
  {
    icon: Database,
    title: "Data Inputs",
    detail: "NOAA NWM, ERA5, USGS observations",
  },
  {
    icon: Layers,
    title: "Model Core",
    detail: "Transformer encoder with GRU residual head",
  },
  {
    icon: BarChart3,
    title: "Outcome",
    detail: "Up to 35% RMSE reduction on held-out basins",
  },
];

export function FeaturedProject() {
  return (
    <section className="py-20" id="projects">
      <Container>
        <SectionHeaderBlock />

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
                Thesis Project
              </span>
              <div>
                <h3 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-base text-muted-foreground">{project.subtitle}</p>
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

              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
                >
                  Read case study
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={project.links?.[0]?.href ?? site.github}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:opacity-80"
                >
                  View source
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="space-y-4"
            >
              {statCards.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-border/80 bg-surface/65 px-5 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">
                        {item.title}
                      </p>
                    </div>
                    <p className="mt-3 text-sm font-medium text-foreground">{item.detail}</p>
                  </article>
                );
              })}

              <article className="rounded-2xl border border-border/80 bg-gradient-to-r from-primary/10 via-transparent to-secondary/20 px-5 py-4">
                <p className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">
                  Architecture Snapshot
                </p>
                <div className="mt-4 grid grid-cols-[1fr,auto,1fr,auto,1fr] items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground">
                  <span className="rounded-md bg-card px-2 py-1 text-center">Inputs</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="rounded-md bg-card px-2 py-1 text-center">Temporal Encoder</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="rounded-md bg-card px-2 py-1 text-center">Residual Head</span>
                </div>
              </article>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SectionHeaderBlock() {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-4 py-1.5">
        <span className="h-2 w-2 rounded-full bg-secondary" />
        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
          Featured Project
        </p>
      </div>
      <h2 className="max-w-3xl font-serif text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
        Hydrologic forecasting designed for operational reliability
      </h2>
    </div>
  );
}
