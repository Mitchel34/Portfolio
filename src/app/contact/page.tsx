import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { contact, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Contact | ${site.name}`,
  description: "Get in touch for AI engineering roles or research collaborations.",
};

export default function ContactPage() {
  return (
    <section className="py-12">
      <Container>
        <SectionHeader
          eyebrow="Contact"
          title="Let's build reliable forecasting systems"
          description="Open to AI and ML engineering roles, applied forecasting work, and research collaborations."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
              Email
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-3 block text-sm font-semibold text-slate-900"
            >
              {contact.email}
            </a>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
              LinkedIn
            </p>
            <a
              href={contact.linkedin}
              className="mt-3 block text-sm font-semibold text-slate-900"
            >
              {contact.linkedin}
            </a>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
              GitHub
            </p>
            <a
              href={contact.github}
              className="mt-3 block text-sm font-semibold text-slate-900"
            >
              {contact.github}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
