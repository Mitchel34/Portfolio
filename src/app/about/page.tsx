import type { Metadata } from "next";
import Image from "next/image";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Entry, EntryList } from "@/components/Entry";
import { KeywordLine } from "@/components/KeywordLine";
import { PageHeader } from "@/components/PageHeader";
import { SectionFrame } from "@/components/SectionFrame";
import { TextLink } from "@/components/TextLink";
import { about, focusAreas, service, site } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Mitchel Carson: software engineer and U.S. Air Force veteran (Air Force Two, 89th Airlift Wing, 50+ executive missions), UT Austin M.S. AI student researching watershed forecasting, and former USAA software engineering intern.",
  pathname: "/about",
  keywords: ["about Mitchel Carson", "AI engineer background", "machine learning researcher"],
});

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
          title={site.tagline}
          lede={about.lede}
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

        <SectionFrame rule="none" label="Background" title="How I got here">
          <div className="max-w-[65ch] space-y-5 text-body text-foreground">
            {about.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {about.links.map((link) => (
              <TextLink key={link.href} href={link.href}>
                {link.label}
              </TextLink>
            ))}
          </p>
        </SectionFrame>

        <SectionFrame id="service" label="Service" title="What the job was">
          <EntryList>
            {service.duties.map((duty) => (
              <Entry key={duty.title} meta={<h3 className="font-serif text-title text-foreground">{duty.title}</h3>}>
                <p className="text-body-sm text-foreground">{duty.body}</p>
              </Entry>
            ))}
          </EntryList>

          <h3 className="mt-14 font-serif text-heading text-balance text-foreground">{service.lessonsTitle}</h3>
          <EntryList className="mt-6">
            {service.lessons.map((lesson, index) => (
              <Entry
                key={lesson.title}
                meta={
                  <p className="mono-label text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                }
              >
                <h4 className="font-serif text-title text-foreground">{lesson.title}</h4>
                <p className="mt-2 text-body-sm text-foreground">{lesson.body}</p>
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
