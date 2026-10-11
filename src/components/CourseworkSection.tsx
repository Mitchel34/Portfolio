import { StatusLabel } from "@/components/StatusLabel";
import { courseEvidenceStatus, type CourseworkItem } from "@/lib/content";

/** Course cards keep the semester and completion status visible. Used by /coursework. */
export function CourseworkList({ items }: { items: CourseworkItem[] }) {
  return (
    <ul className="mt-3 grid gap-3">
      {items.map((course, index) => (
        <li key={course.title} className="grid grid-cols-[auto_1fr] gap-4 rounded-lg border border-border bg-card p-5 sm:gap-6">
          <span aria-hidden="true" className="pt-1 mono-label text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h3 className="text-body font-medium text-foreground">{course.title}</h3>
              <StatusLabel
                status={courseEvidenceStatus(course.status)}
                suffix={course.status === "Fall 2026" ? "Fall 2026" : undefined}
              />
            </div>
            <p className="mt-2 max-w-[65ch] text-body-sm text-muted-foreground">{course.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
