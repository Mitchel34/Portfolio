import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { coursework, landingSections, type CourseworkItem } from "@/lib/content";

export function CourseworkCards({
  items,
  planned = false,
}: {
  items: CourseworkItem[];
  planned?: boolean;
}) {
  const Icon = planned ? BookOpen : CheckCircle2;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((course) => (
        <article key={course.title} className="rounded-2xl border border-border/80 bg-card p-5">
          <div className="flex items-start gap-3">
            <div
              className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                planned ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
              }`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                {course.status}
              </p>
              <h3 className="mt-1 text-sm font-semibold text-foreground">{course.title}</h3>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{course.description}</p>
        </article>
      ))}
    </div>
  );
}

export function CourseworkSection() {
  const section = landingSections.coursework;

  return (
    <section className="scroll-mt-24 py-20" id={section.id}>
      <Container>
        <SectionHeader
          eyebrow={section.label}
          title="Graduate study across machine learning and AI."
          description={`UT Austin M.S. Artificial Intelligence · Current GPA ${coursework.currentGpa} · Expected graduation: ${coursework.expectedGraduation}`}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.18em] text-primary">
              Completed
            </p>
            <CourseworkCards items={coursework.completed} />
          </div>
          <div>
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.18em] text-secondary">
              Fall 2026
            </p>
            <CourseworkCards items={coursework.upcoming} planned />
          </div>
        </div>

        <Link
          href="/coursework"
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
        >
          View coursework details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Container>
    </section>
  );
}
