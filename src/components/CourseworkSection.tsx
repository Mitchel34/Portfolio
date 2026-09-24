import { StatusLabel } from "@/components/StatusLabel";
import { courseEvidenceStatus, type CourseworkItem } from "@/lib/content";

/** Hairline course list; the status word is visible in every row. Used by /coursework. */
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
