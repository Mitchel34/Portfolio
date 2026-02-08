type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
};

export function SectionHeader({ eyebrow, title, description, as = "h2" }: SectionHeaderProps) {
  const HeadingTag = as;

  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-card px-4 py-1.5">
        <span className="h-2 w-2 rounded-full bg-secondary" />
        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrow}
        </p>
      </div>
      <HeadingTag className="max-w-3xl font-serif text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </HeadingTag>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
