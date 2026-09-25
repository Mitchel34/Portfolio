import { Fragment } from "react";

import { Entry, EntryList } from "@/components/Entry";
import { StatusLabel } from "@/components/StatusLabel";
import { TextLink } from "@/components/TextLink";
import type { TalkItem } from "@/lib/content";

function TalkRow({ item }: { item: TalkItem }) {
  return (
    <Entry
      cols={6}
      meta={
        <>
          <p className="mono-label tabular-nums text-foreground">{item.whenLabel}</p>
          <div className="mt-2">
            <StatusLabel status={item.status} />
          </div>
        </>
      }
    >
      <p className="mono-label text-muted-foreground">{item.kind}</p>
      <h3 className="mt-1 font-serif text-title text-balance text-foreground">{item.title}</h3>
      <p className="mt-1 text-body-sm text-foreground">{item.venue}</p>
      {item.role ? <p className="mt-1 text-body-sm text-muted-foreground">Role: {item.role}</p> : null}
      <p className="mt-2 max-w-[65ch] text-body-sm text-muted-foreground">{item.description}</p>
      {item.links && item.links.length > 0 ? (
        <p className="mt-3 flex flex-wrap gap-x-4">
          {item.links.map((link) => (
            <TextLink key={link.href} href={link.href}>
              {link.label}
            </TextLink>
          ))}
        </p>
      ) : null}
    </Entry>
  );
}

/**
 * Hairline list of talks, workshops and writing, ordered by the explicit `order` field.
 * Splits into Upcoming / Past only once the list is long enough (>= 6) and something is past.
 * Rendered by /research; the home page shows a compact version of the same `talks` data.
 */
export function TalksList({ items }: { items: TalkItem[] }) {
  if (items.length === 0) {
    return <p className="text-body-sm text-muted-foreground">Nothing scheduled yet.</p>;
  }

  const sorted = [...items].sort((a, b) => a.order - b.order);
  const split = sorted.length >= 6 && sorted.some((item) => item.past === true);

  if (!split) {
    return (
      <EntryList>
        {sorted.map((item) => (
          <TalkRow key={item.id} item={item} />
        ))}
      </EntryList>
    );
  }

  const groups = [
    { label: "Upcoming", items: sorted.filter((item) => item.past !== true) },
    { label: "Past", items: sorted.filter((item) => item.past === true) },
  ].filter((group) => group.items.length > 0);

  return (
    <div>
      {groups.map((group) => (
        <Fragment key={group.label}>
          <p className="mono-label pt-8 pb-2 text-muted-foreground first:pt-0">{group.label}</p>
          <EntryList>
            {group.items.map((item) => (
              <TalkRow key={item.id} item={item} />
            ))}
          </EntryList>
        </Fragment>
      ))}
    </div>
  );
}
