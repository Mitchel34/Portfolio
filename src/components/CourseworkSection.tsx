import { Reveal } from "@/components/Reveal";
import { SectionFrame } from "@/components/SectionFrame";
import { StatusLabel } from "@/components/StatusLabel";
import { TextLink } from "@/components/TextLink";
import { courseEvidenceStatus, coursework, type CourseworkItem, landingSections, sectionCopy } from "@/lib/content";

/** Hairline course list; the status word is visible in every row. Also used by /coursework. */
export function CourseworkList({ items }: { items: CourseworkItem[] }) {
  return (
    <ul className="mt-3 border-b border-border">
      {items.map((course) => (
        <li key={course.title} className="border-t border-border py-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-body font-medium text-foreground">{course.title}</h3>
            <StatusLabel
              status={courseEvidenceStatus(course.status)}
              suffix={course.status === "Fall 2026" ? "Fall 2026" : undefined}
            />
          </div>
          <p className="mt-1 text-body-sm text-muted-foreground">{course.description}</p>
        </li>
      ))}
    </ul>
  );
}

export function CourseworkSection() {
  return (
    <SectionFrame
      id={landingSections.coursework.id}
      number="06"
      label="Graduate Study"
      title={sectionCopy.coursework.title}
      lede={sectionCopy.coursework.lede}
      meta={
        <span className="mono-label text-muted-foreground">
          {coursework.institution} · {coursework.program} · GPA {coursework.currentGpa} · expected{" "}
          {coursework.expectedGraduation}
        </span>
      }
    >
      <Reveal>
        <div className="lg:grid lg:grid-cols-10 lg:gap-x-8">
          <div className="lg:col-span-5">
            <p className="mono-label text-muted-foreground">Completed</p>
            <CourseworkList items={coursework.completed} />
          </div>
          <div className="mt-10 lg:col-span-5 lg:mt-0">
            <p className="mono-label text-muted-foreground">Fall 2026</p>
            <CourseworkList items={coursework.upcoming} />
          </div>
        </div>

        <TextLink className="mt-6" href="/coursework">
          Coursework details
        </TextLink>
      </Reveal>
    </SectionFrame>
  );
}
