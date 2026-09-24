import { ShieldCheck } from "lucide-react";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { landingSections, service } from "@/lib/content";

/**
 * The Air Force chapter, given its own full-bleed navy band so it reads as the
 * foundation of the story rather than a line at the bottom of a résumé.
 */
export function ServiceSection() {
  const section = landingSections.service;

  return (
    <section
      id={section.id}
      aria-labelledby="service-heading"
      className="scroll-mt-14 bg-navy text-navy-foreground"
    >
      <Container className="py-20 lg:py-28">
        <p className="mono-label text-navy-accent">
          {section.number} · {section.label}
        </p>

        <div className="mt-4 grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <p className="mono-label text-navy-muted">{service.kicker}</p>
            <h2
              id="service-heading"
              className="mt-3 font-serif text-[2.25rem] leading-[1.08] font-medium tracking-[-0.02em] text-balance sm:text-[2.75rem] lg:text-[3.25rem]"
            >
              {service.title}
            </h2>
            <div className="mt-8 space-y-5">
              {service.intro.map((paragraph) => (
                <p key={paragraph} className="max-w-[60ch] text-lede text-navy-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5 lg:pt-10" aria-label="Service record">
            <div className="rounded-[4px] border border-navy-border bg-navy-raised p-6 sm:p-8">
              <p className="mono-label text-navy-accent">Service record</p>
              <dl className="mt-4 divide-y divide-navy-border">
                {service.record.map((row) => (
                  <div key={row.term} className="grid grid-cols-[6.5rem_1fr] gap-x-4 py-3">
                    <dt className="mono-label self-center text-navy-muted">{row.term}</dt>
                    <dd className="text-body text-navy-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>

        <Reveal className="mt-16 lg:mt-20">
          <h3 className="mono-label text-navy-muted">The job</h3>
          <ul className="mt-5 grid gap-px overflow-hidden rounded-[4px] border border-navy-border bg-navy-border md:grid-cols-3">
            {service.duties.map((duty) => (
              <li key={duty.title} className="bg-navy p-6">
                <p className="font-serif text-title text-navy-foreground">{duty.title}</p>
                <p className="mt-3 text-body-sm text-navy-muted">{duty.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16 border-t border-navy-border pt-12 lg:mt-20 lg:pt-16">
          <h3 className="font-serif text-heading text-balance text-navy-foreground lg:text-[2.5rem]">
            {service.lessonsTitle}
          </h3>
          <ol className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-12">
            {service.lessons.map((lesson, index) => (
              <li key={lesson.title}>
                <p className="mono-label text-navy-accent">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-3 font-serif text-title text-navy-foreground">{lesson.title}</p>
                <p className="mt-3 text-body text-navy-muted">{lesson.body}</p>
              </li>
            ))}
          </ol>

          <p className="mt-14 flex max-w-3xl items-start gap-4 rounded-[4px] border border-navy-border px-5 py-4 text-body text-navy-foreground">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-navy-accent" aria-hidden="true" />
            <span>{service.clearanceNote}</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
