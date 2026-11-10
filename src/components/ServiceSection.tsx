import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/Container";
import { SectionMark } from "@/components/HomeSection";
import { Reveal } from "@/components/Reveal";
import { landingSections, service } from "@/lib/content";

/** Decorative route arcs behind the heading. Not a map of real flights. */
function RouteArcs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 600 300"
      preserveAspectRatio="xMaxYMax meet"
      className="pointer-events-none absolute right-0 bottom-0 hidden h-[22rem] text-navy-border opacity-70 lg:block"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 7" strokeLinecap="round">
        <path d="M250 300 C 330 170, 470 130, 600 190" />
        <path d="M330 300 C 400 220, 500 200, 600 250" />
        <path d="M150 300 C 280 90, 480 60, 600 120" />
      </g>
      <g fill="currentColor">
        <circle cx="250" cy="298" r="3" />
        <circle cx="330" cy="298" r="3" />
        <circle cx="150" cy="298" r="3" />
      </g>
    </svg>
  );
}

/**
 * The Air Force chapter, in its own navy band. This is the one place the service
 * numbers and clearance are stated; the rest of the site links here.
 */
export function ServiceSection() {
  const section = landingSections.service;

  return (
    <section
      id={section.id}
      aria-labelledby="service-heading"
      className="relative scroll-mt-20 overflow-hidden bg-navy text-navy-foreground"
    >
      <RouteArcs />
      <Container className="relative py-16 lg:py-24">
        <SectionMark section={section} className="text-navy-accent" />

        <div className="mt-5 grid gap-12 lg:grid-cols-12 lg:gap-x-12">
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
                <p key={paragraph} className="max-w-[58ch] text-body text-navy-muted sm:text-lede">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <Reveal className="lg:col-span-5 lg:pt-10">
            <dl className="rounded-[4px] border border-navy-border bg-navy-raised px-6 py-2 sm:px-8">
              {service.record.map((row) => (
                <div key={row.term} className="grid grid-cols-[6rem_1fr] gap-x-4 border-b border-navy-border py-3.5 last:border-b-0">
                  <dt className="mono-label self-center text-navy-muted">{row.term}</dt>
                  <dd className="text-body text-navy-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-body-sm text-navy-muted">{service.clearanceNote}</p>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <dl className="grid border-y border-navy-border sm:grid-cols-3">
            {service.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse border-b border-navy-border py-6 last:border-b-0 sm:border-r sm:border-b-0 sm:px-8 sm:first:pl-0 sm:last:border-r-0"
              >
                <dt className="mono-label mt-3 text-navy-muted">{stat.label}</dt>
                <dd className="font-serif text-[3.5rem] leading-none font-medium tracking-[-0.03em] text-navy-foreground lg:text-[4.5rem]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href={service.aboutLink.href}
            className="mt-8 inline-flex items-center gap-2 text-body-sm font-medium text-navy-foreground underline decoration-navy-muted underline-offset-4 transition-colors hover:text-navy-accent hover:decoration-navy-accent"
          >
            {service.aboutLink.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
