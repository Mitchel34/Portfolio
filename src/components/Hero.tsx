import Image from "next/image";
import type { CSSProperties } from "react";

import { Container } from "@/components/Container";
import { PortfolioChat } from "@/components/PortfolioChat";
import { TextLink } from "@/components/TextLink";
import { buttonClass } from "@/components/ui/Button";
import { hero, landingSections, site } from "@/lib/content";

/** Order in the one-time entrance stagger; see `.rise` in globals.css. */
function rise(order: number) {
  return { "--rise-order": order } as CSSProperties;
}

/**
 * Who Mitchel is in one line, beside the AI guide. The guide is a client island;
 * everything else is server-rendered and reads the same with scripts disabled.
 */
export function Hero() {
  return (
    <section aria-label="Introduction" className="hero-surface relative border-b border-border">
      <Container className="relative pt-5 pb-8 sm:py-12 lg:py-16">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-9">
          <div className="lg:col-span-5 lg:pt-2">
            <p className="rise mono-label text-primary" style={rise(0)}>
              {hero.eyebrow}
            </p>

            <div className="rise mt-3 flex items-center gap-4 sm:mt-4 sm:gap-5 lg:mt-7" style={rise(1)}>
              <div className="sheet relative h-16 w-16 shrink-0 overflow-hidden rounded-[4px] border border-border bg-muted sm:h-24 sm:w-20 lg:h-[7.5rem] lg:w-24">
                <Image
                  src="/images/mitchel-carson-headshot.jpg"
                  alt="Portrait of Mitchel Carson"
                  fill
                  priority
                  sizes="(min-width: 640px) 6rem, 4rem"
                  className="object-cover object-[50%_30%]"
                />
              </div>
              <h1 className="font-serif text-[2.5rem] leading-[0.95] font-medium tracking-[-0.03em] text-foreground sm:text-[3.5rem] lg:max-w-[6ch] lg:text-[4.25rem]">
                {site.name}
              </h1>
            </div>

            <p
              className="rise mt-4 max-w-[30ch] font-serif text-[1.375rem] leading-[1.25] text-balance text-foreground sm:text-[1.75rem] lg:mt-8"
              style={rise(2)}
            >
              {hero.statement}
            </p>
            <p className="rise mt-2 max-w-[44ch] text-body-sm text-muted-foreground sm:mt-3 sm:text-body" style={rise(3)}>
              {hero.background}
            </p>
          </div>

          <div className="rise lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1" style={rise(2)}>
            <PortfolioChat />
          </div>

          <div
            className="rise flex flex-wrap items-center gap-x-6 gap-y-4 lg:col-span-5 lg:row-start-2 lg:self-start"
            style={rise(4)}
          >
            <a className={buttonClass("primary")} href={landingSections.work.href}>
              See the work
            </a>
            <a className={buttonClass("outline")} href={site.resumeUrl} download={site.resumeFilename}>
              Résumé (PDF)
            </a>
            <TextLink href={landingSections.contact.href}>Contact</TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
