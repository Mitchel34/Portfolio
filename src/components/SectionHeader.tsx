import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SectionHeaderProps = {
  /** "01" on the home page; omitted on secondary pages. */
  number?: string;
  /** Short mono label rendered in the margin column, e.g. "Research". */
  label?: string;
  /** @deprecated transitional alias for `label`; removed after the refresh lands. */
  eyebrow?: string;
  /** @deprecated transitional alias for `lede`; removed after the refresh lands. */
  description?: string;
  title: string;
  lede?: string;
  /** italic = one-sentence serif abstract; plain = sans description. */
  ledeStyle?: "italic" | "plain";
  /** Row of mono labels / StatusLabels under the lede. */
  meta?: ReactNode;
  /** Rendered in the margin column under the label (e.g. a portrait on /about). */
  aside?: ReactNode;
  as?: "h1" | "h2";
};

/**
 * Heading block for the editorial grid. Renders TWO grid children (margin column + body column),
 * so it must be placed directly inside an `lg:grid lg:grid-cols-12` element. SectionFrame and
 * PageHeader do this for you.
 */
export function SectionHeader({
  number,
  label: labelProp,
  eyebrow,
  title,
  lede: ledeProp,
  description,
  ledeStyle = "plain",
  meta,
  aside,
  as = "h2",
}: SectionHeaderProps) {
  const HeadingTag = as;
  const isPage = as === "h1";
  const label = labelProp ?? eyebrow ?? "";
  const lede = ledeProp ?? description;

  return (
    <>
      <div className="lg:col-span-2 lg:row-span-2 lg:sticky lg:top-20 lg:self-start">
        <p className="mono-label text-muted-foreground">
          {number ? <span className="text-primary">{number}</span> : null}
          <span className={cn(number && "lg:mt-1 lg:block")}>
            {number ? <span className="lg:hidden"> · </span> : null}
            {label}
          </span>
        </p>
        {aside}
      </div>

      <div className="mt-4 lg:col-span-10 lg:mt-0">
        <HeadingTag
          className={cn(
            "max-w-[22ch] font-serif text-balance text-foreground",
            isPage ? "text-display lg:text-[3.5rem]" : "text-heading lg:text-[2.5rem]",
          )}
        >
          {title}
        </HeadingTag>
        {lede ? (
          <p
            className={cn(
              "mt-4 max-w-[65ch]",
              ledeStyle === "italic"
                ? "font-serif text-lede italic text-foreground lg:text-[1.25rem]"
                : "text-lede text-muted-foreground",
            )}
          >
            {lede}
          </p>
        ) : null}
        {meta ? <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">{meta}</div> : null}
      </div>
    </>
  );
}
