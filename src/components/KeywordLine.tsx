import { cn } from "@/lib/utils";

type KeywordLineProps = {
  items: string[];
  label?: string;
  className?: string;
};

/** Replaces tech-stack pills: a mono label followed by items joined with middle dots. */
export function KeywordLine({ items, label = "Keywords", className }: KeywordLineProps) {
  return (
    <p className={cn("text-body-sm text-foreground", className)}>
      <span className="mono-label mr-3 text-muted-foreground">{label}</span>
      {items.join(" · ")}
    </p>
  );
}
