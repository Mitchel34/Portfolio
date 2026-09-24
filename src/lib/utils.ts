import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must know the custom type scale in globals.css; otherwise it reads
 * `text-title` as a color and drops it whenever a `text-foreground` class is also present.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "heading", "title", "lede", "body", "body-sm", "footnote", "label"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
