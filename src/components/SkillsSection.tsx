import { HomeSection } from "@/components/HomeSection";
import { Reveal } from "@/components/Reveal";
import { landingSections, sectionCopy, toolkit } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Skill groups, each grounded in where it was used. The operations group echoes the service band. */
export function SkillsSection() {
  return (
    <HomeSection section={landingSections.skills} title={sectionCopy.skills.title} lede={sectionCopy.skills.lede}>
      <Reveal as="ul" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {toolkit.map((group) => {
          const isService = group.label === "Operations and leadership";

          return (
            <li
              key={group.label}
              className={cn(
                "flex flex-col rounded-[4px] border p-6 sm:p-8",
                isService
                  ? "border-navy bg-navy text-navy-foreground md:col-span-2"
                  : "border-border bg-card",
              )}
            >
              <h3 className={cn("font-serif text-title", isService ? "text-navy-foreground" : "text-foreground")}>
                {group.label}
              </h3>
              <ul className={cn("mt-4 grid gap-y-2", isService && "sm:grid-cols-2 sm:gap-x-8")}>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      "flex gap-3 text-body-sm",
                      isService ? "text-navy-foreground" : "text-foreground",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full",
                        isService ? "bg-navy-accent" : "bg-primary",
                      )}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p
                className={cn(
                  "mt-auto border-t pt-4 text-footnote",
                  isService ? "border-navy-border text-navy-muted" : "border-border text-muted-foreground",
                )}
              >
                <span className="mono-label mr-2">Used in</span>
                {group.usedIn}
              </p>
            </li>
          );
        })}
      </Reveal>
    </HomeSection>
  );
}
