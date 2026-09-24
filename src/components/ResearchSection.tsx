import { HomeSection } from "@/components/HomeSection";
import { Reveal } from "@/components/Reveal";
import { StatusLabel } from "@/components/StatusLabel";
import { TextLink } from "@/components/TextLink";
import { landingSections, sectionCopy, talks } from "@/lib/content";

/** Talks, workshops and writing as a compact dated list; /research carries the full view. */
export function ResearchSection() {
  const items = [...talks].sort((a, b) => a.order - b.order);

  return (
    <HomeSection
      section={landingSections.research}
      title={sectionCopy.research.title}
      lede={sectionCopy.research.lede}
      aside={<TextLink href="/research">Full research page</TextLink>}
    >
      <Reveal as="ul" className="border-t-2 border-foreground">
        {items.map((item) => (
          <li
            key={item.id}
            className="grid gap-x-8 gap-y-2 border-b border-border py-6 md:grid-cols-[12rem_1fr] lg:grid-cols-[14rem_1fr_12rem]"
          >
            <div>
              <p className="mono-label text-foreground">{item.whenLabel}</p>
              <p className="mono-label mt-1 text-muted-foreground">{item.kind}</p>
            </div>
            <div>
              <h3 className="font-serif text-title text-balance text-foreground">{item.title}</h3>
              <p className="mt-1 text-body-sm text-muted-foreground">
                {item.venue}
                {item.role ? ` · ${item.role}` : ""}
              </p>
            </div>
            <div className="md:col-start-2 lg:col-start-auto lg:text-right">
              <StatusLabel status={item.status} />
            </div>
          </li>
        ))}
      </Reveal>
    </HomeSection>
  );
}
