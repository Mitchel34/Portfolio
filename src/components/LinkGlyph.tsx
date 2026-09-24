import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Trailing link arrow as an SVG: the Latin font subsets carry no arrow glyphs, so a
 * text "→" falls back to a mismatched system font. External links get ↗, internal →.
 */
export function LinkGlyph({ external = false, className }: { external?: boolean; className?: string }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      strokeWidth={2}
      className={cn("inline-block h-[0.9em] w-[0.9em] shrink-0 self-center", className)}
    />
  );
}
