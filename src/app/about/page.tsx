import type { Metadata } from "next";
import Image from "next/image";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Entry, EntryList } from "@/components/Entry";
import { KeywordLine } from "@/components/KeywordLine";
import { PageHeader } from "@/components/PageHeader";
import { SectionFrame } from "@/components/SectionFrame";
import { TextLink } from "@/components/TextLink";
import { about, focusAreas, proofItems } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Mitchel Carson: UT Austin M.S. AI student and Air Force veteran researching streamflow forecast correction; former USAA software engineering intern.",
  pathname: "/about",
  keywords: ["about Mitchel Carson", "AI engineer background", "machine learning researcher"],
});

const aboutProof = proofItems.filter((item) => item.showOnAbout);

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
      <div className="pb-20">
        <PageHeader
          label="About"
          title="Operations, production software, research."
          lede={about.summary[0]}
          ledeStyle="italic"
          aside={
            <div className="relative mt-4 aspect-[4/5] w-full max-w-[14rem] overflow-hidden rounded-[4px] border border-border">
              <Image
                src="/images/mitchel-carson-headshot.jpg"
                alt="Portrait of Mitchel Carson"
                fill
                sizes="14rem"
                className="object-cover object-[50%_35%]"
              />
            </div>
          }
        />

        <SectionFrame rule="none" label="Background" title="Background">
          <div className="max-w-[65ch] space-y-5 text-body text-foreground">
            {about.summary.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </SectionFrame>

        <SectionFrame label="Experience" title="Selected experience">
          <EntryList>
            {aboutProof.map((item) => (
              <Entry
                key={item.title}
                meta={<p className="mono-label leading-relaxed text-muted-foreground">{item.role}</p>}
              >
                <h3 className="font-serif text-title text-foreground">{item.title}</h3>
                <p className="mt-2 text-body-sm text-foreground">{item.description}</p>
                <p className="mt-2 text-footnote text-muted-foreground">Ask me about: {item.askAbout}</p>
                <TextLink className="mt-3" href={item.href}>
                  {item.linkLabel}
                </TextLink>
              </Entry>
            ))}
          </EntryList>
        </SectionFrame>

        <SectionFrame label="Values" title="What I care about">
          <EntryList>
            {about.values.map((value) => (
              <Entry key={value.title} meta={<h3 className="font-serif text-title text-foreground">{value.title}</h3>}>
                <p className="text-body-sm text-foreground">{value.description}</p>
              </Entry>
            ))}
          </EntryList>
        </SectionFrame>

        <SectionFrame label="Focus" title="Focus areas">
          <KeywordLine label="Areas" items={focusAreas} />
        </SectionFrame>
      </div>
    </>
  );
}
