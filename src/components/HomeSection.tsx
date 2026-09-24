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

/**
 * Home-page section: stacked eyebrow, serif title and lede over a full-width body.
 * Secondary pages keep the margin-column SectionFrame; the home page reads top to bottom.
 */
export function HomeSection({ section, title, lede, children, className, aside }: HomeSectionProps) {
  const headingId = `${section.id}-heading`;

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-14 border-t border-border py-20 lg:py-28", className)}
    >
      <Container>
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <header className="max-w-3xl">
            <p className="mono-label text-primary">
              {section.number} · {section.label}
            </p>
            <h2
              id={headingId}
              className="mt-3 font-serif text-heading text-balance text-foreground lg:text-[3rem]"
            >
              {title}
            </h2>
            {lede ? <p className="mt-4 max-w-[62ch] text-lede text-muted-foreground">{lede}</p> : null}
          </header>
          {aside ? <div className="mt-6 shrink-0 lg:mt-0">{aside}</div> : null}
        </div>
        <div className="mt-12 lg:mt-16">{children}</div>
      </Container>
    </section>
  );
}
