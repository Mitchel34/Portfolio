import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/Container";
import { talks } from "@/lib/content";

/** Public program links, shared with the detailed research listing. */
export function AguSpotlight() {
  const events = talks.filter((talk) => talk.id.startsWith("agu26-"));

  return (
    <section aria-labelledby="agu-heading" className="border-b border-border bg-surface/70">
      <Container className="py-8 sm:py-10">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="agu-heading" className="mono-label text-primary">Next up · AGU26</h2>
          <p className="text-footnote text-muted-foreground">San Francisco · December 2026</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => {
            const link = event.links?.[0];
            if (!link) return null;

            return (
              <a
                key={event.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary sm:p-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="mono-label text-muted-foreground">Accepted {event.kind.toLowerCase()} · {event.whenLabel}</p>
                  <h3 className="mt-3 font-serif text-[1.4rem] leading-snug text-foreground transition-colors group-hover:text-primary">
                    {event.title}
                  </h3>
                  <p className="mt-4 text-footnote font-medium text-primary">View {event.kind.toLowerCase()} in the AGU program</p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
