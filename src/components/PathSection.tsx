import { HomeSection } from "@/components/HomeSection";
import { Reveal } from "@/components/Reveal";
import { TextLink } from "@/components/TextLink";
import { landingSections, sectionCopy, story } from "@/lib/content";
import { cn } from "@/lib/utils";

/** The chronology as a route: four stops on one line. Detail lives behind each stop's link. */
export function PathSection() {
  return (
    <HomeSection section={landingSections.path} title={sectionCopy.path.title}>
      <Reveal as="ol" className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
        {story.map((chapter, index) => (
          <li key={chapter.title} className="relative pt-12 lg:pr-8">
            {/* Rail and marker */}
            <span aria-hidden="true" className="absolute top-[1.125rem] right-0 left-0 border-t border-foreground" />
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-0 left-0 grid h-9 min-w-9 place-items-center rounded-full border px-2 font-mono text-[0.75rem] font-medium",
                index === 0
                  ? "border-navy bg-navy text-navy-foreground"
                  : "border-foreground bg-background text-foreground",
              )}
            >
              {chapter.marker}
            </span>

            <p className="mono-label text-muted-foreground">{chapter.period}</p>
            <h3 className="mt-2 font-serif text-title text-balance text-foreground">{chapter.title}</h3>
            <p className="mt-1 text-body-sm font-medium text-foreground">{chapter.role}</p>
            {chapter.body ? <p className="mt-3 text-body-sm text-muted-foreground">{chapter.body}</p> : null}
            <TextLink className="mt-4" href={chapter.link.href}>
              {chapter.link.label}
            </TextLink>
          </li>
        ))}
      </Reveal>
    </HomeSection>
  );
}
