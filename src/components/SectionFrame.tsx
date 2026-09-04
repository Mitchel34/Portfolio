import type { ReactNode } from "react";

import { Container } from "@/components/Container";
import { type NoteItem, Notes } from "@/components/Notes";
import { SectionHeader, type SectionHeaderProps } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

type SectionFrameProps = SectionHeaderProps & {
  id?: string;
  /** "ink" opens the section with a 1px foreground rule; "none" for the first block under a PageHeader. */
  rule?: "ink" | "none";
  /** Rendered in the body column below the header. */
  children: ReactNode;
  /** Optional Notes list rendered after the children. */
  notes?: NoteItem[];
  className?: string;
  bodyClassName?: string;
  /** Accessible label for the section when it has no visible heading relationship (rarely needed). */
  ariaLabel?: string;
};

/**
 * Numbered editorial section: ink rule + Container + 12-column grid + SectionHeader + body column.
 */
export function SectionFrame({
  id,
  rule = "ink",
  children,
  notes,
  className,
  bodyClassName,
  ariaLabel,
  ...header
}: SectionFrameProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "scroll-mt-20 pb-20 lg:pb-28",
        rule === "ink" ? "border-t border-foreground pt-6 lg:pt-8" : "pt-2 lg:pt-4",
        className,
      )}
    >
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <SectionHeader {...header} />
          <div className={cn("mt-10 lg:col-span-10 lg:col-start-3 lg:mt-14", bodyClassName)}>
            {children}
            {notes && notes.length > 0 ? <Notes items={notes} /> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
