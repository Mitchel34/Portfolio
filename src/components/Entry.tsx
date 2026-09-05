import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type EntryProps = {
  /** Mono labels, dates, StatusLabel. Rendered in the left cell at lg. */
  meta?: ReactNode;
  children: ReactNode;
  /** Grid columns of the parent body: 10 (full body column) or 6 (a half-width column). */
  cols?: 10 | 6;
  className?: string;
};

/** A hairline list row. Use inside EntryList. */
export function Entry({ meta, children, cols = 10, className }: EntryProps) {
  return (
    <li
      className={cn(
        "border-t border-border py-6 lg:grid lg:gap-x-8",
        cols === 10 ? "lg:grid-cols-10" : "lg:grid-cols-6",
        className,
      )}
    >
      {meta ? <div className={cols === 10 ? "lg:col-span-3" : "lg:col-span-2"}>{meta}</div> : null}
      <div
        className={cn(
          "mt-2 lg:mt-0",
          cols === 10 ? "lg:col-span-7" : "lg:col-span-4",
          !meta && (cols === 10 ? "lg:col-start-1 lg:col-span-10" : "lg:col-start-1 lg:col-span-6"),
        )}
      >
        {children}
      </div>
    </li>
  );
}

export function EntryList({ children, className, ...rest }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("border-b border-border", className)} {...rest}>
      {children}
    </ul>
  );
}
