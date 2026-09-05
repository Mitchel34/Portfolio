import type { ReactNode } from "react";

import { StatusLabel } from "@/components/StatusLabel";
import type { EvidenceStatus } from "@/lib/content";
import { cn } from "@/lib/utils";

type ReadoutProps = {
  value: string;
  unit: string;
  status: EvidenceStatus;
  footnote?: ReactNode;
  className?: string;
};

/** Typographic readout for a single headline number; never implies a measured distribution. */
export function Readout({ value, unit, status, footnote, className }: ReadoutProps) {
  return (
    <div className={cn("rounded-[4px] border border-border bg-card p-5", className)}>
      <p className="font-serif text-heading tabular-nums text-foreground lg:text-[2.5rem]">{value}</p>
      <p className="mt-2 text-body-sm text-foreground">{unit}</p>
      <div className="mt-3">
        <StatusLabel status={status} />
      </div>
      {footnote ? <p className="mt-3 text-footnote text-muted-foreground">{footnote}</p> : null}
    </div>
  );
}
