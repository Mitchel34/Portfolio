import { HomeSection } from "@/components/HomeSection";
import { LinkGlyph } from "@/components/LinkGlyph";
import { Reveal } from "@/components/Reveal";
import { StatusLabel } from "@/components/StatusLabel";
import { TextLink } from "@/components/TextLink";
import {
  featuredWork,
  landingSections,
  openSource,
  otherWork,
  sectionCopy,
  site,
  type WorkCard,
} from "@/lib/content";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function FeaturedHydra() {
  return (
    <article className="overflow-hidden rounded-[4px] border border-border bg-card">
      <div className="grid lg:grid-cols-12">
        <div className="p-6 sm:p-10 lg:col-span-7">
          <p className="mono-label text-primary">{featuredWork.kicker}</p>
          <h3 className="mt-3 font-serif text-[2.75rem] leading-none font-medium tracking-[-0.02em] text-foreground sm:text-[3.5rem]">
            {featuredWork.title}
          </h3>
          <p className="mt-3 font-serif text-title text-foreground">{featuredWork.subtitle}</p>
          <p className="mt-5 max-w-[60ch] text-body text-muted-foreground">{featuredWork.plain}</p>

          <div className="mt-6 flex flex-col gap-1">
            <StatusLabel status={featuredWork.status} />
            <p className="text-footnote text-muted-foreground">{featuredWork.statusNote}</p>
          </div>

          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {featuredWork.links.map((link) => (
              <TextLink key={link.href} href={link.href}>
                {link.label}
              </TextLink>
            ))}
          </p>
        </div>

        <div className="border-t border-border bg-surface p-6 sm:p-10 lg:col-span-5 lg:border-t-0 lg:border-l">
          <p className="mono-label text-muted-foreground">How it works</p>
          <ol className="mt-5">
            {featuredWork.pipeline.map((step, index) => (
              <li key={step.step} className="relative pl-12 pb-8 last:pb-0">
                {index < featuredWork.pipeline.length - 1 ? (
                  <span aria-hidden="true" className="absolute top-9 bottom-1 left-[1.0625rem] border-l border-input" />
                ) : null}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 grid h-9 w-9 place-items-center rounded-full bg-foreground font-mono text-sm text-background"
                >
                  {index + 1}
                </span>
                <p className="mono-label pt-2 text-primary">{step.step}</p>
                <p className="mt-1 font-serif text-title text-foreground">{step.title}</p>
                <p className="mt-2 text-body-sm text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

function WorkCardItem({ card }: { card: WorkCard }) {
  const external = isExternal(card.href);

  return (
    <li className="group relative flex flex-col rounded-[4px] border border-border bg-card p-6 transition-colors hover:border-foreground sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="mono-label text-muted-foreground">{card.kicker}</p>
        <StatusLabel status={card.status} />
      </div>
      <h3 className="mt-4 font-serif text-[1.75rem] leading-tight font-medium text-foreground">{card.title}</h3>
      <p className="mt-1 text-body-sm font-medium text-foreground">{card.subtitle}</p>
      {card.metric ? (
        <p className="mt-5 flex items-baseline gap-3 border-y border-border py-3">
          <span className="font-serif text-[2.25rem] leading-none font-medium tracking-[-0.02em] text-primary">
            {card.metric.value}
          </span>
          <span className="text-body-sm text-foreground">{card.metric.label}</span>
        </p>
      ) : null}
      <p className="mt-4 text-body-sm text-muted-foreground">{card.body}</p>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools">
        {card.tags.map((tag) => (
          <li key={tag} className="rounded-[2px] border border-border px-2 py-1 font-mono text-[0.75rem] text-muted-foreground">
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <TextLink href={card.href} external={external} className="after:absolute after:inset-0">
          {card.linkLabel}
          <span className="sr-only">: {card.title}</span>
        </TextLink>
      </div>
    </li>
  );
}

export function WorkSection() {
  const repos = openSource.filter((entry) => entry.group !== "Coursework & explorations");

  return (
    <HomeSection
      section={landingSections.work}
      title={sectionCopy.work.title}
      lede={sectionCopy.work.lede}
      aside={<TextLink href="/projects">All case studies</TextLink>}
    >
      <Reveal>
        <FeaturedHydra />
      </Reveal>

      <Reveal as="ul" className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {otherWork.map((card) => (
          <WorkCardItem key={card.title} card={card} />
        ))}
      </Reveal>

      <Reveal className="mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-foreground pb-3">
          <h3 className="font-serif text-title text-foreground">Open source</h3>
          <TextLink href={site.github}>Everything on GitHub</TextLink>
        </div>
        <ul className="grid md:grid-cols-2">
          {repos.map((repo) => (
            <li key={repo.url} className="border-b border-border py-4 md:odd:pr-8 md:even:border-l md:even:pl-8">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-text font-mono text-[0.9375rem] text-foreground hover:text-primary hover:decoration-primary"
              >
                {repo.name}
                <LinkGlyph external className="ml-1 align-[-0.1em]" />
              </a>
              <span className="mono-label ml-3 text-muted-foreground">{repo.language}</span>
              <p className="mt-1 text-body-sm text-muted-foreground">{repo.what}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </HomeSection>
  );
}
