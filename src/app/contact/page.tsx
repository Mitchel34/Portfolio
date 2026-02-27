import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ContactForm } from "@/components/ContactForm";
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

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">Email</p>
              <a href={`mailto:${contact.email}`} className="mt-3 block text-sm font-semibold text-foreground">
                {contact.email}
              </a>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">LinkedIn</p>
              <a href={contact.linkedin} className="mt-3 block text-sm font-semibold text-foreground truncate">
                {contact.linkedin}
              </a>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">GitHub</p>
              <a href={contact.github} className="mt-3 block text-sm font-semibold text-foreground truncate">
                {contact.github}
              </a>
            </article>
          </div>

          {/* Contact Form */}
          <div className="mt-14">
            <div className="mb-6">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">Send a message</p>
              <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-foreground">
                Get in touch directly
              </h2>
            </div>
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>

          {/* Calendly Embed */}
          <div className="mt-14">
            <div className="mb-6">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">Schedule a call</p>
              <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-foreground">
                Book a Zoom appointment
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick a time that works for you — a Zoom link will be generated automatically.
              </p>
            </div>
            <CalendlyEmbed />
          </div>
        </Container>
      </section>
    </>
  );
}
