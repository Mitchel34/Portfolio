"use client";

import { motion } from "framer-motion";
import { Award, Clock, GraduationCap, ShieldCheck, Wrench } from "lucide-react";

import { Container } from "@/components/Container";
import { site, thesisImpactStat } from "@/lib/content";

const highlights = [
  {
    icon: ShieldCheck,
    label: "Security Clearance",
    value: "TS/SCI Active",
    featured: true,
  },
  {
    icon: Clock,
    label: "Availability",
    value: `${site.availability} · ${site.timezone}`,
  },
  {
    icon: Award,
    label: "Thesis Impact",
    value: thesisImpactStat,
  },
  {
    icon: Wrench,
    label: "Industry",
    value: "USAA SWE internship",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.S. CS + UT Austin AI",
  },
];

export function CredibilityBand() {
  return (
    <section className="py-8">
      <Container>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            const isFeatured = "featured" in item && item.featured;

            return (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className={`rounded-2xl border px-4 py-3 ${
                  isFeatured
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/80 bg-card"
                }`}
              >
                <div className={`flex items-center gap-2 ${isFeatured ? "text-primary" : "text-primary"}`}>
                  <Icon className="h-4 w-4" />
                  <p className={`text-[11px] font-mono uppercase tracking-[0.16em] ${
                    isFeatured ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {item.label}
                  </p>
                </div>
                <p className={`mt-2 text-sm font-semibold ${
                  isFeatured ? "text-primary" : "text-foreground"
                }`}>{item.value}</p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
