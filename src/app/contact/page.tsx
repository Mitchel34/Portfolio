import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { contact } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Mitchel Carson for AI engineering roles, ML forecasting collaborations, and production software opportunities.",
  pathname: "/contact",
  keywords: ["contact AI engineer", "ML engineer contact", "hire forecasting engineer"],
});

export default function ContactPage() {
  return (
    <section className="bg-background pb-16 pt-14 text-foreground">
      <Container>
        <SectionHeader
          eyebrow="Contact"
          title="Let's build reliable forecasting systems"
          description="Open to AI engineering roles, forecasting work, and infrastructure-aware ML projects."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">Email</p>
            <a href={`mailto:${contact.email}`} className="mt-3 block text-sm font-semibold text-foreground">
              {contact.email}
            </a>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">LinkedIn</p>
            <a href={contact.linkedin} className="mt-3 block text-sm font-semibold text-foreground">
              {contact.linkedin}
            </a>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">GitHub</p>
            <a href={contact.github} className="mt-3 block text-sm font-semibold text-foreground">
              {contact.github}
            </a>
          </article>
        </div>

        <div className="mt-8 rounded-2xl border border-border/80 bg-card p-6 text-sm text-muted-foreground">
          <p>
            For role outreach, include context on product scope, deployment constraints, and expected model ownership.
          </p>
          <p className="mt-2">I prioritize teams shipping measurable impact.</p>
        </div>
      </Container>
    </section>
  );
}
