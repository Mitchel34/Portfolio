import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type NoteItem = { id: string; text: ReactNode };

/** Footnote list. Each item gets element id `note-{id}` so NoteRef can link to it. */
export function Notes({ items, className }: { items: NoteItem[]; className?: string }) {
  return (
    <ol
      aria-label="Notes"
      className={cn("mt-10 space-y-1 border-t border-border pt-4 text-footnote text-muted-foreground", className)}
    >
      {items.map((item) => (
        <li key={item.id} id={`note-${item.id}`} className="flex gap-2">
          <span className="mono-label shrink-0 text-primary">[{item.id}]</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ol>
  );
}

/** Inline footnote marker: <sup>[n]</sup> linking to the note. */
export function NoteRef({ id, className }: { id: string; className?: string }) {
  return (
    <sup className={cn("ml-0.5 text-[0.75rem] leading-none", className)}>
      <a
        href={`#note-${id}`}
        aria-label={`Note ${id}`}
        className="font-mono text-primary no-underline hover:underline"
      >
        [{id}]
      </a>
    </sup>
  );
}
