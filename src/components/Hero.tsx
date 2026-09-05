"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";

import { Container } from "@/components/Container";
import { EvidenceLegend, StatusLabel } from "@/components/StatusLabel";
import { TextLink } from "@/components/TextLink";
import { buttonClass } from "@/components/ui/Button";
import { site, talks } from "@/lib/content";

const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

/** Parent orchestrates the one-time stagger; each block fades up 12px. */
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const block: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

/** The "Now" line is derived from `talks`, so status has exactly one source of truth. */
const nowItems = talks.filter((talk) => talk.heroLabel).sort((a, b) => a.order - b.order);

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="pt-10 pb-10 sm:pt-14 lg:pt-20">
      <Container>
        <motion.div variants={stagger} initial={reduce ? false : "hidden"} animate="visible">
          <motion.div
            variants={block}
            className="mono-label flex items-center justify-between border-b border-border pb-3 text-muted-foreground"
          >
            <span>{site.runningHead}</span>
            <span>Updated {site.updated}</span>
          </motion.div>

          <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
            <motion.div variants={block} className="lg:col-span-2">
              <div className="relative h-[72px] w-[72px] overflow-hidden rounded-[4px] border border-border lg:h-28 lg:w-28">
                <Image
                  src="/images/mitchel-carson-headshot.jpg"
                  alt="Portrait of Mitchel Carson"
                  fill
                  priority
                  sizes="(min-width:1024px) 7rem, 4.5rem"
                  className="object-cover object-[50%_40%]"
                />
              </div>
              <p className="mono-label mt-3 text-muted-foreground">
                {site.location} · {site.timezone}
              </p>
            </motion.div>

            <div className="mt-8 lg:col-span-10 lg:mt-0">
              <motion.div variants={block}>
                <h1 className="font-serif text-display text-balance text-foreground sm:text-[3.75rem] lg:text-[4.5rem]">
                  {site.name}
                </h1>
                <p className="mt-5 max-w-[44ch] font-serif text-lede italic text-foreground lg:text-[1.25rem]">
                  {site.tagline}
                </p>
                <p className="mt-3 max-w-[60ch] text-body text-muted-foreground">{site.role}</p>
              </motion.div>

              <motion.div variants={block} className="mt-6">
                <p className="mono-label text-muted-foreground">Now · updated {site.updated}</p>
                <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                  {nowItems.map((talk) => (
                    <li key={talk.id}>
                      <StatusLabel status={talk.status} prefix={talk.heroLabel} />
                    </li>
                  ))}
                </ul>
                <EvidenceLegend className="mt-3" />
              </motion.div>

              <motion.div
                variants={block}
                className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
              >
                <a
                  className={buttonClass("primary")}
                  href={site.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule a conversation
                </a>
                <TextLink href="/#research">Read the research</TextLink>
                <TextLink href={site.github}>Code on GitHub</TextLink>
                <TextLink href={site.resumeUrl} external>
                  Résumé (PDF)
                </TextLink>
              </motion.div>
            </div>
          </div>

          <div className="rule-double mt-10" aria-hidden="true" />
        </motion.div>
      </Container>
    </section>
  );
}
