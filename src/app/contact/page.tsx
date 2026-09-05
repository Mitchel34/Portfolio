import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ContactForm } from "@/components/ContactForm";
import { FigureWell } from "@/components/FigureWell";
import { OfficeHours } from "@/components/OfficeHours";
import { PageHeader } from "@/components/PageHeader";
import { SectionFrame } from "@/components/SectionFrame";
import { buttonClass } from "@/components/ui/Button";
import { discussions, sectionCopy, site } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Mitchel Carson about applied AI research, forecasting and evaluation, research engineering, and production ML. Book 30 minutes or send a message.",
  pathname: "/contact",
  keywords: ["contact AI engineer", "ML engineer contact", "hire forecasting engineer"],
});

const linkClass = "link-text text-body-sm text-foreground hover:text-primary hover:decoration-primary";
const externalProps = { target: "_blank", rel: "noopener noreferrer" } as const;

type ReachRow = { term: string; href: string; label: string; external?: boolean };

const reachRows: ReachRow[] = [
  { term: "Email", href: `mailto:${site.email}`, label: site.email },
  { term: "Schedule", href: site.calendlyUrl, label: "30-minute conversation", external: true },
  { term: "GitHub", href: site.github, label: "github.com/Mitchel34", external: true },
  { term: "LinkedIn", href: site.linkedin, label: "linkedin.com/in/mitchelcarson", external: true },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <div className="pb-20">
        <PageHeader
          label="Contact"
          title={sectionCopy.contact.title}
          lede="Research engineer, applied scientist, and ML engineering conversations; collaboration on forecasting and evaluation; or questions about the AGU26 workshop. Fastest path is a 30-minute call."
        />

        <SectionFrame rule="none" label="Reach me" title="Email, scheduling, profiles">
          <dl className="max-w-2xl divide-y divide-border border-y border-border">
            {reachRows.map((row) => (
              <div key={row.term} className="grid grid-cols-[7rem_1fr] gap-x-4 py-3">
                <dt className="mono-label self-center text-muted-foreground">{row.term}</dt>
                <dd>
                  <a href={row.href} className={linkClass} {...(row.external ? externalProps : {})}>
                    {row.label}
                    {row.external ? (
                      <span aria-hidden="true" className="ml-1 font-mono">
                        ↗
                      </span>
                    ) : null}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <a href={site.calendlyUrl} className={buttonClass("primary")} {...externalProps}>
              Schedule a conversation
            </a>
          </div>
          <p className="mt-4 mono-label text-muted-foreground">
            {site.location} · {site.timezone} · {site.clearance}
          </p>
        </SectionFrame>

        <SectionFrame label="Message" title="Send a message">
          <ContactForm />
        </SectionFrame>

        <SectionFrame label="Discussions" title={discussions.title} lede={discussions.intro}>
          <OfficeHours showHeader={false} />
        </SectionFrame>

        <SectionFrame label="Schedule" title="Book a 30-minute conversation">
          <FigureWell padded={false} caption="Pick a time; a Zoom link is generated automatically.">
            <CalendlyEmbed />
          </FigureWell>
        </SectionFrame>
      </div>
    </>
  );
}
