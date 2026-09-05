import type { EvidenceStatus, EvidenceTone } from "@/lib/content";
import { evidenceLegend, evidenceTone, evidenceWord } from "@/lib/content";
import { cn } from "@/lib/utils";

export const toneClass: Record<EvidenceTone, string> = {
  confirmed: "text-primary",
  provisional: "text-accent",
  pending: "text-muted-foreground",
};

type StatusGlyphProps = {
  tone: EvidenceTone;
  className?: string;
};

/** 10x10 glyph: filled = confirmed, half = provisional, hollow = pending. Always paired with a word. */
export function StatusGlyph({ tone, className }: StatusGlyphProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 10 10"
      width="10"
      height="10"
      className={cn("shrink-0", className)}
    >
      {tone === "confirmed" ? <circle cx="5" cy="5" r="4.5" fill="currentColor" /> : null}
      {tone === "provisional" ? (
        <>
          <circle cx="5" cy="5" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.25" />
          <path d="M5 0.5 A4.5 4.5 0 0 0 5 9.5 Z" fill="currentColor" />
        </>
      ) : null}
      {tone === "pending" ? (
        <circle cx="5" cy="5" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.25" />
      ) : null}
    </svg>
  );
}

type StatusLabelProps = {
  status: EvidenceStatus;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function StatusLabel({ status, prefix, suffix, className }: StatusLabelProps) {
  const tone = evidenceTone[status];

  return (
    <span className={cn("mono-label inline-flex items-center gap-2", toneClass[tone], className)}>
      <StatusGlyph tone={tone} />
      <span>
        {prefix ? `${prefix} · ` : ""}
        {evidenceWord[status]}
        {suffix ? ` · ${suffix}` : ""}
      </span>
    </span>
  );
}

export function EvidenceLegend({ className }: { className?: string }) {
  return (
    <p className={cn("text-footnote text-muted-foreground", className)}>
      <span>How I label evidence: </span>
      {evidenceLegend.map((item, index) => (
        <span key={item.tone}>
          {index > 0 ? " · " : null}
          <span className="whitespace-nowrap">
            <StatusGlyph
              tone={item.tone}
              className={cn("mr-1.5 inline-block align-[-1px]", toneClass[item.tone])}
            />
            {item.label}
          </span>{" "}
          ({item.meaning})
        </span>
      ))}
    </p>
  );
}
