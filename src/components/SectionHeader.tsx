type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
