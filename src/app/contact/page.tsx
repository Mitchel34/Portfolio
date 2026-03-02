import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { contact, site } from "@/lib/content";
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
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <section className="bg-background pb-16 pt-14 text-foreground">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow="Contact"
            title="Let's build something that works in the real world"
            description="I'm open to collaborating with teams working on forecasting, infrastructure-aware ML, and production systems—whether in industry or research. If you care about reliability, clarity, and shipping useful systems, I'd enjoy connecting."
          />

          <a
            href={site.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 block rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 transition hover:border-primary/50"
          >
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary">Fastest way to connect</p>
            <p className="mt-3 text-lg font-semibold text-foreground">Schedule a 30-minute call</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Available {site.availability} · {site.timezone} timezone
            </p>
          </a>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">Email</p>
              <a href={`mailto:${contact.email}`} className="mt-3 block text-sm font-semibold text-foreground">
                {contact.email}
              </a>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">LinkedIn</p>
              <a href={contact.linkedin} className="mt-3 block text-sm font-semibold text-foreground">
                {contact.linkedin.replace("https://www.", "")}
              </a>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">GitHub</p>
              <a href={contact.github} className="mt-3 block text-sm font-semibold text-foreground">
                {contact.github.replace("https://", "")}
              </a>
            </article>
          </div>

          <div className="mt-8 rounded-2xl border border-border/80 bg-card p-6 text-sm text-muted-foreground">
            <p>
              Happy to discuss any AI/ML or software engineering opportunity. I&apos;m especially interested in teams shipping production systems with real-world impact.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
