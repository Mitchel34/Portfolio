import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CalendlyPopupButton } from "@/components/CalendlyPopupButton";
import { ContactForm } from "@/components/ContactForm";
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
            description="I work with teams on forecasting, infrastructure-aware ML, and production systems in industry or research. If you value reliability, clarity, and execution, let's connect."
          />

          <CalendlyPopupButton className="mt-10 block w-full text-left rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 transition hover:border-primary/50">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary">Fastest way to connect</p>
            <p className="mt-3 text-lg font-semibold text-foreground">Schedule a 30-minute call</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Available {site.availability} · {site.timezone} timezone
            </p>
          </CalendlyPopupButton>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">Email</p>
              <a href={`mailto:${contact.email}`} className="mt-3 block text-sm font-semibold text-foreground">
                {contact.email}
              </a>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">LinkedIn</p>
              <a href={contact.linkedin} className="mt-3 block text-sm font-semibold text-foreground truncate">
                {contact.linkedin.replace("https://www.", "")}
              </a>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">GitHub</p>
              <a href={contact.github} className="mt-3 block text-sm font-semibold text-foreground truncate">
                {contact.github.replace("https://", "")}
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
        </Container>
      </section>
    </>
  );
}
