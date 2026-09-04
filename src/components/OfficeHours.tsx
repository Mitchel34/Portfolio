import { TextLink } from "@/components/TextLink";
import { buttonClass } from "@/components/ui/Button";
import { discussions } from "@/lib/content";

type OfficeHoursProps = {
  className?: string;
  /** Set false when the surrounding section already carries the title and intro. */
  showHeader?: boolean;
};

/** Discussion topics and the booking call to action. Used on the home Talks section, /contact and /research. */
export function OfficeHours({ className, showHeader = true }: OfficeHoursProps) {
  return (
    <div className={className}>
      {showHeader ? (
        <>
          <p className="mono-label text-muted-foreground">Discussions · office hours</p>
          <h3 className="mt-1 font-serif text-title text-balance text-foreground">{discussions.title}</h3>
          <p className="mt-2 max-w-[65ch] text-body-sm text-muted-foreground">{discussions.intro}</p>
        </>
      ) : null}

      <ul className={showHeader ? "mt-4 divide-y divide-border border-y border-border" : "divide-y divide-border border-y border-border"}>
        {discussions.topics.map((topic) => (
          <li key={topic.title} className="py-3">
            <p className="text-body-sm font-medium text-foreground">{topic.title}</p>
            <p className="mt-1 text-footnote text-muted-foreground">{topic.prompt}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          className={buttonClass("primary")}
          href={discussions.calendlyCta.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {discussions.calendlyCta.label}
        </a>
        <TextLink href={discussions.emailCta.href}>{discussions.emailCta.label}</TextLink>
      </div>
      <p className="mono-label mt-3 text-muted-foreground">{discussions.supportingLine}</p>
    </div>
  );
}
