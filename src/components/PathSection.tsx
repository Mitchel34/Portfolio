import { HomeSection } from "@/components/HomeSection";
import { Reveal } from "@/components/Reveal";
import { TextLink } from "@/components/TextLink";
import { landingSections, sectionCopy, story } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Chronological story: one chapter per stage, joined by a rail. The upcoming stop is dashed. */
export function PathSection() {
  return (
    <HomeSection section={landingSections.path} title={sectionCopy.path.title} lede={sectionCopy.path.lede}>
      <Reveal as="ol" className="relative">
        {story.map((chapter, index) => {
          const isLast = index === story.length - 1;

          return (
            <li
              key={chapter.title}
              className="relative grid grid-cols-[3rem_1fr] gap-x-5 sm:grid-cols-[3.5rem_1fr] lg:grid-cols-[14rem_4rem_1fr] lg:gap-x-8"
            >
              {/* Period (lg: left column) */}
              <div className="hidden pt-3 text-right lg:block">
                <p className="mono-label text-foreground">{chapter.period}</p>
                <p className="mono-label mt-1 text-muted-foreground">{chapter.kicker}</p>
              </div>

              {/* Rail + marker */}
              <div className="relative flex justify-center">
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-12 bottom-0 left-1/2 -translate-x-1/2 border-l-2",
                      story[index + 1]?.upcoming ? "border-dashed border-input" : "border-foreground",
                    )}
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative z-10 grid h-12 w-12 place-items-center rounded-full border-2 font-serif text-[1.0625rem] font-medium",
                    chapter.upcoming
                      ? "border-dashed border-input bg-background text-muted-foreground"
                      : index === 0
                        ? "border-navy bg-navy text-navy-foreground"
                        : "border-foreground bg-background text-foreground",
                  )}
                >
                  {chapter.marker}
                </span>
              </div>

              {/* Chapter body */}
              <div className={cn("pt-2", isLast ? "pb-0" : "pb-14 lg:pb-16")}>
                <p className="mono-label text-muted-foreground lg:hidden">
                  <span className="text-foreground">{chapter.period}</span> · {chapter.kicker}
                </p>
                <h3 className="mt-2 font-serif text-title text-foreground lg:mt-0 lg:text-[1.75rem]">
                  {chapter.title}
                </h3>
                <p className="mt-1 text-body-sm font-medium text-foreground">{chapter.role}</p>
                <p className="mt-3 max-w-[62ch] text-body text-muted-foreground">{chapter.body}</p>
                {chapter.link ? (
                  <TextLink className="mt-4" href={chapter.link.href}>
                    {chapter.link.label}
                  </TextLink>
                ) : null}
              </div>
            </li>
          );
        })}
      </Reveal>
    </HomeSection>
  );
}
