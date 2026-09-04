import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FigureWellProps = {
  number?: string | number;
  caption: ReactNode;
  children: ReactNode;
  /** When false the child touches the well's edges (images, iframes); the caption gets its own padding. */
  padded?: boolean;
  className?: string;
};

/** Every visual (diagram, explorer, embed, PDF) sits in a well with a "Figure N." caption. */
export function FigureWell({ number, caption, children, padded = true, className }: FigureWellProps) {
  return (
    <figure
      className={cn(
        "rounded-[4px] border border-border bg-surface",
        padded ? "p-4 sm:p-6" : "overflow-hidden",
        className,
      )}
    >
      {children}
      <figcaption
        className={cn("text-footnote text-muted-foreground", padded ? "mt-3" : "px-4 pb-4 pt-3")}
      >
        {number !== undefined ? <b className="font-medium text-foreground">Figure {number}. </b> : null}
        {caption}
      </figcaption>
    </figure>
  );
}
