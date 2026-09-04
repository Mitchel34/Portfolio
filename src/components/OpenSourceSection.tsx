import { Fragment } from "react";

import { Reveal } from "@/components/Reveal";
import { SectionFrame } from "@/components/SectionFrame";
import { TextLink } from "@/components/TextLink";
import {
  landingSections,
  openSource,
  type OpenSourceEntry,
  openSourceGroupOrder,
  sectionCopy,
  site,
} from "@/lib/content";

const repoLinkClass =
  "link-text break-words font-mono text-[0.8125rem] leading-snug text-foreground hover:text-primary hover:decoration-primary after:absolute after:inset-0";

/** One table row. The repo name is the link; its pseudo-element expands the hit area to the row. */
function RepoRow({ entry }: { entry: OpenSourceEntry }) {
  const upstream = entry.kind === "contribution" ? entry.upstream : undefined;
  const href = upstream?.prUrl ?? entry.url;
  const name = upstream?.repo ?? entry.name;

  return (
    <li className="relative border-t border-border py-4 transition-colors hover:bg-muted/60 lg:grid lg:grid-cols-10 lg:gap-x-8">
      {/* Cell A: repository */}
      <div className="lg:col-span-3">
        <div className="flex items-baseline justify-between gap-x-4 lg:block">
          <span className="min-w-0">
            {upstream ? <span className="mono-label mr-2 text-muted-foreground">PR</span> : null}
            <a href={href} target="_blank" rel="noopener noreferrer" className={repoLinkClass}>
              {name}
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only"> (GitHub)</span>
            </a>
          </span>
          <span className="mono-label shrink-0 text-muted-foreground xl:hidden">
            {entry.language}
            {upstream ? ` · ${upstream.mergedLabel}` : null}
          </span>
        </div>
        {entry.note ? <p className="mono-label mt-1 text-muted-foreground">{entry.note}</p> : null}
      </div>

      {/* Cell B: what it does */}
      <p className="mt-1 text-body-sm text-foreground lg:col-span-7 lg:mt-0 xl:col-span-3">
        {upstream ? upstream.prTitle : entry.what}
      </p>

      {/* Cell C: why it is here */}
      <p className="mt-1 text-body-sm text-muted-foreground lg:col-span-7 lg:col-start-4 xl:col-span-3 xl:col-start-auto xl:mt-0">
        {entry.why}
      </p>

      {/* Cell D: language (xl only) */}
      <div className="hidden text-right xl:col-span-1 xl:block">
        <p className="mono-label text-muted-foreground">{entry.language}</p>
        {upstream ? <p className="mono-label mt-1 text-muted-foreground">{upstream.mergedLabel}</p> : null}
      </div>
    </li>
  );
}

export function OpenSourceSection() {
  const groups = openSourceGroupOrder
    .map((group) => ({ group, entries: openSource.filter((entry) => entry.group === group) }))
    .filter(({ entries }) => entries.length > 0);

  return (
    <SectionFrame
      id={landingSections.openSource.id}
      number={landingSections.openSource.number}
      label={landingSections.openSource.label}
      title={sectionCopy.openSource.title}
      lede={sectionCopy.openSource.lede}
    >
      <Reveal>
        <div className="mono-label hidden border-b border-foreground pb-2 text-muted-foreground lg:grid lg:grid-cols-10 lg:gap-x-8">
          <span className="lg:col-span-3">Repository</span>
          <span className="lg:col-span-7 xl:col-span-3">
            What it does<span className="xl:hidden"> · why it is here</span>
          </span>
          <span className="hidden xl:col-span-3 xl:block">Why it is here</span>
          <span className="hidden text-right xl:col-span-1 xl:block">Lang</span>
        </div>

        <div className="lg:mt-4">
          {groups.map(({ group, entries }) => (
            <Fragment key={group}>
              <p className="mono-label pt-8 pb-2 text-muted-foreground first:pt-0">{group}</p>
              <ul className="border-b border-border">
                {entries.map((entry) => (
                  <RepoRow key={entry.url} entry={entry} />
                ))}
              </ul>
            </Fragment>
          ))}
        </div>

        <TextLink className="mt-6" href={site.github}>
          All repositories on GitHub
        </TextLink>
      </Reveal>
    </SectionFrame>
  );
}
