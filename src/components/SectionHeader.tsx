type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-card px-4 py-1.5">
        <span className="h-2 w-2 rounded-full bg-secondary" />
        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrow}
        </p>
      </div>
      <h2 className="max-w-3xl font-serif text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
