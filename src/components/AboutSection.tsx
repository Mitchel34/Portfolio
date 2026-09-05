import { Entry, EntryList } from "@/components/Entry";
import { Reveal } from "@/components/Reveal";
import { SectionFrame } from "@/components/SectionFrame";
import { TextLink } from "@/components/TextLink";
import { about, landingSections, proofItems, sectionCopy } from "@/lib/content";

const homeProofItems = proofItems.filter((item) => item.showOnHome);

export function AboutSection() {
  return (
    <SectionFrame
      id={landingSections.about.id}
      number="05"
      label="About"
      title={sectionCopy.about.title}
      lede={sectionCopy.about.lede}
      ledeStyle="plain"
    >
      <Reveal>
        <div className="max-w-[65ch] space-y-5 text-body text-foreground">
          {about.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <p className="mono-label mt-10 text-muted-foreground">Selected experience</p>
        <EntryList>
          {homeProofItems.map((item) => (
            <Entry
              key={item.title}
              meta={<p className="mono-label leading-relaxed text-muted-foreground">{item.role}</p>}
            >
              <h3 className="font-serif text-title">{item.title}</h3>
              <p className="mt-2 text-body-sm text-foreground">{item.description}</p>
              <p className="mt-2 text-footnote text-muted-foreground">Ask me about: {item.askAbout}</p>
              <TextLink className="mt-3" href={item.href}>
                {item.linkLabel}
              </TextLink>
            </Entry>
          ))}
        </EntryList>

        <TextLink className="mt-6" href="/about">
          More about me
        </TextLink>
      </Reveal>
    </SectionFrame>
  );
}
