import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { AsciiStreamflow } from "@/components/AsciiStreamflow";
import { HomeSection } from "@/components/HomeSection";
import { KeywordLine } from "@/components/KeywordLine";
import { LinkGlyph } from "@/components/LinkGlyph";
import { Reveal } from "@/components/Reveal";
import { StatusGlyph, StatusLabel } from "@/components/StatusLabel";
import { TextLink } from "@/components/TextLink";
import { evidenceTone, evidenceWord, landingSections, openSource, sectionCopy, work } from "@/lib/content";
import { cn } from "@/lib/utils";

const riverLinkClass =
  "inline-flex items-center gap-1.5 text-body-sm font-medium text-river-foreground underline decoration-river-muted underline-offset-4 transition-colors hover:text-river-accent hover:decoration-river-accent";

/** HYDRA: the river at night. The only dark card in the section, and the only one with motion. */
function HydraFeature() {
  const { hydra } = work;

  return (
    <article className="overflow-hidden rounded-[4px] border border-river-border bg-river text-river-foreground">
      <div className="grid lg:grid-cols-12">
        <div className="flex flex-col p-6 sm:p-10 lg:col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="mono-label text-river-accent">{hydra.kicker}</p>
            <p className="mono-label inline-flex items-center gap-2 text-river-muted">
              <StatusGlyph tone={evidenceTone[hydra.status]} />
              {evidenceWord[hydra.status]}
            </p>
          </div>
          <h3 className="mt-6 font-serif text-[3.25rem] leading-none font-medium tracking-[-0.02em] sm:text-[4.5rem]">
            {hydra.title}
          </h3>
          <p className="mt-3 font-serif text-title text-river-foreground">{hydra.subtitle}</p>
          <p className="mt-5 max-w-[46ch] text-body text-river-muted">{hydra.summary}</p>

          <p className="mt-auto flex flex-wrap gap-x-7 gap-y-3 pt-9">
            <Link href={hydra.href} className={riverLinkClass}>
              {hydra.linkLabel}
              <span className="sr-only">: {hydra.title}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a href={hydra.codeHref} target="_blank" rel="noopener noreferrer" className={riverLinkClass}>
              Code on GitHub
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </p>
        </div>

        <div className="min-w-0 border-t border-river-border lg:col-span-6 lg:border-t-0 lg:border-l">
          <AsciiStreamflow embedded className="h-full" note={hydra.sceneNote} />
        </div>
      </div>
    </article>
  );
}

/** USAA: a ledger entry. One number, set large, with the sentence that explains it. */
function UsaaCard() {
  const { usaa } = work;

  return (
    <article className="sheet sheet-lift group relative flex flex-col rounded-[4px] border border-border bg-card p-6 sm:p-8 lg:col-span-7">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="mono-label text-muted-foreground">{usaa.kicker}</p>
        <StatusLabel status={usaa.status} />
      </div>

      <p className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-2 border-b border-border pb-7">
        <span className="font-serif text-[5.5rem] leading-[0.8] font-medium tracking-[-0.04em] text-primary sm:text-[8rem]">
          {usaa.metric.value}
        </span>
        <span className="max-w-[11ch] pb-1 font-serif text-title text-foreground sm:pb-2 sm:text-[1.75rem] sm:leading-[1.15]">
          {usaa.metric.label}
        </span>
      </p>

      <div className="my-auto grid gap-x-10 gap-y-3 py-7 sm:grid-cols-[auto_1fr]">
        <div>
          <h3 className="font-serif text-[2rem] leading-tight font-medium text-foreground">{usaa.title}</h3>
          <p className="mt-1 text-body-sm font-medium text-foreground">{usaa.subtitle}</p>
        </div>
        <p className="max-w-[46ch] text-body-sm text-muted-foreground sm:pt-1.5">{usaa.summary}</p>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <KeywordLine label="Stack" items={usaa.tags} className="text-footnote" />
        <TextLink href={usaa.href} className="after:absolute after:inset-0">
          {usaa.linkLabel}
          <span className="sr-only">: {usaa.title}</span>
        </TextLink>
      </div>
    </article>
  );
}

/** Harmony: the design is the point, so the card draws it. The dashed step advises; it cannot act. */
function HarmonyCard() {
  const { harmony } = work;

  return (
    <article className="sheet sheet-lift group relative flex flex-col rounded-[4px] border border-border bg-card p-6 sm:p-8 lg:col-span-5">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="mono-label text-muted-foreground">{harmony.kicker}</p>
        <StatusLabel status={harmony.status} />
      </div>
      <h3 className="mt-5 font-serif text-[2rem] leading-tight font-medium text-foreground">{harmony.title}</h3>
      <p className="mt-1 text-body-sm font-medium text-foreground">{harmony.subtitle}</p>
      <p className="mt-3 text-body-sm text-muted-foreground">{harmony.summary}</p>

      <figure className="mt-6 rounded-[4px] border border-border bg-surface px-4 pt-3 pb-3">
        <ol aria-label="The path a decision takes">
          {harmony.steps.map((step, index) => {
            const advisory = "advisory" in step && step.advisory;
            const last = index === harmony.steps.length - 1;

            return (
              <li key={step.label} className="relative grid grid-cols-[0.875rem_1fr_auto] items-center gap-x-3 py-2">
                {!last ? (
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="absolute top-1/2 left-[0.375rem] h-full w-0.5 overflow-visible text-input"
                  >
                    <line x1="1" y1="9" x2="1" y2="100%" stroke="currentColor" strokeWidth="1.5" className="flow-line" />
                  </svg>
                ) : null}
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative z-10 h-3.5 w-3.5 rounded-full border-2 bg-surface",
                    advisory ? "border-dashed border-accent" : "border-foreground",
                    last && "bg-foreground",
                  )}
                />
                <span className="text-body-sm font-medium text-foreground">{step.label}</span>
                <span className={cn("mono-label", advisory ? "text-accent" : "text-muted-foreground")}>{step.note}</span>
              </li>
            );
          })}
        </ol>
        <figcaption className="mt-2 border-t border-border pt-2 text-footnote text-muted-foreground">
          {harmony.logNote}. Schematic.
        </figcaption>
      </figure>

      <div className="mt-auto pt-6">
        <TextLink href={harmony.href} className="after:absolute after:inset-0">
          {harmony.linkLabel}
          <span className="sr-only">: {harmony.title}</span>
        </TextLink>
      </div>
    </article>
  );
}

/** GreenSpace: client work that is live, so the card is its address bar. */
function GreenSpaceStrip() {
  const { greenspace } = work;

  return (
    <article className="sheet-lift group relative flex flex-col gap-x-8 gap-y-4 rounded-[4px] border border-border bg-card p-6 sm:px-8 lg:col-span-12 lg:flex-row lg:items-center">
      <div className="lg:w-72 lg:shrink-0">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="mono-label text-muted-foreground">{greenspace.kicker}</p>
          <StatusLabel status={greenspace.status} />
        </div>
        <h3 className="mt-2 font-serif text-title text-foreground">{greenspace.title}</h3>
      </div>
      <p className="flex-1 text-body-sm text-muted-foreground">{greenspace.summary}</p>
      <a
        href={greenspace.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 items-center gap-3 self-start rounded-full border border-input bg-background pr-4 pl-3.5 font-mono text-[0.8125rem] text-foreground transition-colors after:absolute after:inset-0 group-hover:border-foreground lg:self-center"
      >
        <span aria-hidden="true" className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        {greenspace.displayUrl}
        <span className="sr-only"> (opens the live site)</span>
        <LinkGlyph external className="text-primary" />
      </a>
    </article>
  );
}

export function WorkSection() {
  const repos = openSource.filter((entry) => entry.group !== "Coursework & explorations");

  return (
    <HomeSection
      section={landingSections.work}
      title={sectionCopy.work.title}
      lede={sectionCopy.work.lede}
      aside={<TextLink href="/projects">All projects</TextLink>}
    >
      <Reveal>
        <HydraFeature />
      </Reveal>

      <Reveal className="mt-8 grid gap-8 lg:grid-cols-12">
        <UsaaCard />
        <HarmonyCard />
        <GreenSpaceStrip />
      </Reveal>

      <Reveal className="mt-12 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-border pt-5">
        <h3 className="mono-label text-muted-foreground">Open source</h3>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {repos.map((repo) => (
            <li key={repo.url}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-text font-mono text-[0.875rem] text-foreground hover:text-primary hover:decoration-primary"
              >
                {repo.name}
                <LinkGlyph external className="ml-1 align-[-0.1em]" />
              </a>
            </li>
          ))}
        </ul>
        <TextLink href="/projects#open-source" className="ml-auto">
          What each one does
        </TextLink>
      </Reveal>
    </HomeSection>
  );
}
