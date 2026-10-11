"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";

import { Container } from "@/components/Container";
import { TextLink } from "@/components/TextLink";
import { buttonClass } from "@/components/ui/Button";
import { hero, heroStats, landingSections, site } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

/** Parent orchestrates the one-time stagger; each block fades up 12px. */
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const block: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section aria-label="Introduction" className="hero-surface relative overflow-hidden border-b border-border">
      <Container className="relative pt-10 pb-10 sm:pt-14 lg:pt-16 lg:pb-12">
        <motion.div variants={stagger} initial={reduce ? false : "hidden"} animate="visible">
          <div className="grid gap-y-8 lg:grid-cols-12 lg:items-center lg:gap-x-16">
            <div className="lg:col-span-7">
              <motion.p variants={block} className="mono-label flex flex-wrap gap-x-3 gap-y-1 text-primary">
                {hero.eyebrow.map((item, index) => (
                  <span key={item} className="whitespace-nowrap">
                    {index > 0 ? (
                      <span aria-hidden="true" className="mr-3 text-muted-foreground">
                        ·
                      </span>
                    ) : null}
                    {item}
                  </span>
                ))}
              </motion.p>

              <motion.h1
                variants={block}
                className="mt-5 font-serif text-[3.5rem] font-medium leading-[0.95] tracking-[-0.03em] text-foreground sm:text-[4.5rem] lg:text-[5rem]"
              >
                {site.name}
              </motion.h1>

              <motion.p variants={block} className="mt-4 max-w-[34ch] text-body font-medium text-primary sm:text-lede">
                {site.title}
              </motion.p>

              <motion.p
                variants={block}
                className="mt-6 max-w-[34ch] font-serif text-[1.5rem] leading-[1.3] text-foreground sm:text-[1.75rem] lg:text-[1.875rem]"
              >
                {hero.statement}
              </motion.p>

              <motion.p variants={block} className="mt-4 max-w-[55ch] text-body text-muted-foreground">
                {hero.summary}
              </motion.p>

              <motion.div variants={block} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  className={buttonClass("primary")}
                  href={landingSections.work.href}
                >
                  Explore selected work <span aria-hidden="true">↗</span>
                </a>
                <a className={buttonClass("outline")} href={site.resumeUrl} download={site.resumeFilename}>
                  Résumé (PDF)
                </a>
                <TextLink href="/contact">Let’s talk</TextLink>
              </motion.div>
            </div>

            <motion.figure variants={block} className="relative mx-auto w-full max-w-[23rem] lg:col-span-5">
              <div className="hero-portrait relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted sm:aspect-[4/5]">
                <Image
                  src="/images/mitchel-carson-headshot.jpg"
                  alt="Portrait of Mitchel Carson"
                  fill
                  priority
                  sizes="(min-width:640px) 23rem, calc(100vw - 40px)"
                  className="object-cover object-[50%_35%]"
                />
              </div>
              <figcaption className="mono-label mt-4 flex justify-between gap-4 text-muted-foreground">
                <span>{hero.portraitCaption}</span>
                <span>{site.timezone}</span>
              </figcaption>
            </motion.figure>
          </div>

          <motion.dl
            variants={block}
            className="mt-10 grid grid-cols-2 border-t border-input lg:mt-12 lg:grid-cols-4"
          >
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "border-border py-5",
                  index % 2 === 0 ? "border-r pr-4" : "pl-4 sm:pl-6",
                  index < 2 && "border-b",
                  "lg:border-b-0 lg:px-6",
                  index === 0 && "lg:pl-0",
                  index < heroStats.length - 1 ? "lg:border-r" : "lg:border-r-0",
                )}
              >
                <dt className="mono-label text-muted-foreground">{stat.label}</dt>
                <dd className="mt-2 font-serif text-[2rem] leading-none font-medium tracking-[-0.02em] text-foreground sm:text-[2.5rem]">
                  {stat.value}
                </dd>
                <dd className="mt-2 text-footnote text-muted-foreground">{stat.detail}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </Container>
    </section>
  );
}
