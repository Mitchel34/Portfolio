import { HomeSection } from "@/components/HomeSection";
import { Reveal } from "@/components/Reveal";
import { StatusLabel } from "@/components/StatusLabel";
import { TextLink } from "@/components/TextLink";
import { landingSections, sectionCopy, talks, type TalkItem } from "@/lib/content";

/** "December 6, 2026" → { month: "Dec", day: "06", year: "2026" }. */
function dateParts(label: string) {
  const match = /^([A-Za-z]{3})[a-z]* (\d{1,2}), (\d{4})$/.exec(label);
  return match ? { month: match[1], day: match[2].padStart(2, "0"), year: match[3] } : null;
}

/** An accepted, dated presentation, drawn as a ticket: date stub on the left, details on the right. */
function Ticket({ item }: { item: TalkItem }) {
  const date = dateParts(item.whenLabel);
  const link = item.links?.[0];

  return (
    <li className="sheet sheet-lift group relative grid grid-cols-[5.25rem_minmax(0,1fr)] rounded-[4px] border border-border bg-card sm:grid-cols-[6.5rem_minmax(0,1fr)]">
      <div className="flex flex-col items-center justify-center border-r border-dashed border-input px-2 py-6 text-center">
        {date ? (
          <>
            <span className="mono-label text-primary">{date.month}</span>
            <span className="font-serif text-[2.75rem] leading-none font-medium tracking-[-0.02em] text-foreground sm:text-[3.25rem]">
              {date.day}
            </span>
            <span className="mono-label mt-1 text-muted-foreground">{date.year}</span>
          </>
        ) : (
          <span className="mono-label text-muted-foreground">{item.whenLabel}</span>
        )}
      </div>
      <div className="flex flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <p className="mono-label text-muted-foreground">{item.kind}</p>
          <StatusLabel status={item.status} suffix="Upcoming" />
        </div>
        <h3 className="mt-3 font-serif text-[1.375rem] leading-snug text-balance text-foreground">{item.title}</h3>
        <p className="mt-2 text-footnote text-muted-foreground">
          {item.venue}
          {item.role ? ` · ${item.role}` : ""}
        </p>
        {link ? (
          <div className="mt-auto pt-4">
            <TextLink href={link.href} className="after:absolute after:inset-0">
              AGU26 program
              <span className="sr-only">: {item.title}</span>
            </TextLink>
          </div>
        ) : null}
      </div>
    </li>
  );
}

/**
 * Upcoming presentations as tickets, then writing as a dated list. Every item keeps its
 * status word: accepted and upcoming, in progress, planned, or completed. /research has the detail.
 */
export function ResearchSection() {
  const items = [...talks].sort((a, b) => a.order - b.order);
  const upcoming = items.filter((item) => item.id.startsWith("agu26-"));
  const writing = items.filter((item) => !item.id.startsWith("agu26-"));

  return (
    <HomeSection
      section={landingSections.research}
      title={sectionCopy.research.title}
      lede={sectionCopy.research.lede}
      aside={<TextLink href="/research">Research page</TextLink>}
    >
      <Reveal as="ul" className="grid gap-8 lg:grid-cols-2">
        {upcoming.map((item) => (
          <Ticket key={item.id} item={item} />
        ))}
      </Reveal>

      <Reveal as="ul" className="mt-12 border-t border-foreground">
        {writing.map((item) => {
          const link = item.links?.[0];

          return (
            <li
              key={item.id}
              className="grid gap-x-8 gap-y-2 border-b border-border py-5 md:grid-cols-[11rem_1fr] lg:grid-cols-[11rem_1fr_auto]"
            >
              <div>
                <p className="mono-label text-foreground">{item.whenLabel}</p>
                <p className="mono-label mt-1 text-muted-foreground">{item.kind}</p>
              </div>
              <div>
                <h3 className="font-serif text-title text-balance text-foreground">{item.title}</h3>
                <p className="mt-1 text-body-sm text-muted-foreground">{item.venue}</p>
                {link ? (
                  <TextLink className="mt-3" href={link.href}>
                    {link.label}
                  </TextLink>
                ) : null}
              </div>
              <div className="md:col-start-2 lg:col-start-auto lg:text-right">
                <StatusLabel status={item.status} />
              </div>
            </li>
          );
        })}
      </Reveal>
    </HomeSection>
  );
}
