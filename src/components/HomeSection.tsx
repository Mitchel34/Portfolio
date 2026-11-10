import type { ReactNode } from "react";

import { Container } from "@/components/Container";
import type { LandingSection } from "@/lib/content";
import { cn } from "@/lib/utils";

type HomeSectionProps = {
  section: LandingSection;
  title: string;
  lede?: string;
  children: ReactNode;
  className?: string;
  /** Optional element rendered to the right of the heading at lg (e.g. a text link). */
  aside?: ReactNode;
};

/** The numbered eyebrow every home section opens with. */
export function SectionMark({ section, className }: { section: LandingSection; className?: string }) {
  return (
    <p className={cn("mono-label flex items-center gap-3", className)}>
      <span>{section.number}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      <span>{section.label}</span>
    </p>
  );
}

/**
 * Home-page section: a ruled scale, a numbered eyebrow, serif title and lede over a full-width body.
 * Secondary pages keep the margin-column SectionFrame; the home page reads top to bottom.
 */
export function HomeSection({ section, title, lede, children, className, aside }: HomeSectionProps) {
  const headingId = `${section.id}-heading`;

  return (
    <section id={section.id} aria-labelledby={headingId} className={cn("scroll-mt-20 pb-16 lg:pb-24", className)}>
      <Container>
        <div aria-hidden="true" className="tick-rule" />
        <div className="pt-10 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:pt-14">
          <header className="max-w-3xl">
            <SectionMark section={section} className="text-primary" />
            <h2 id={headingId} className="mt-4 font-serif text-heading text-balance text-foreground lg:text-[3rem]">
              {title}
            </h2>
            {lede ? <p className="mt-4 max-w-[58ch] text-lede text-muted-foreground">{lede}</p> : null}
          </header>
          {aside ? <div className="mt-6 shrink-0 lg:mt-0 lg:pb-2">{aside}</div> : null}
        </div>
        <div className="mt-10 lg:mt-12">{children}</div>
      </Container>
    </section>
  );
}
