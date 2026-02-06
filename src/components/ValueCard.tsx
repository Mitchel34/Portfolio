type ValueCardProps = {
  title: string;
  description: string;
};

export function ValueCard({ title, description }: ValueCardProps) {
  return (
    <article className="rounded-2xl border border-border/80 bg-card p-6 shadow-[0_16px_40px_-35px_rgba(18,36,58,0.6)]">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </article>
  );
}
