"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, ShieldCheck, Wrench } from "lucide-react";

import { Container } from "@/components/Container";

const highlights = [
  {
    icon: Award,
    label: "Thesis Impact",
    value: "26-54% RMSE reduction",
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
  {
    icon: ShieldCheck,
    label: "Clearance",
    value: "TS/SCI active",
  },
];

export function CredibilityBand() {
  return (
    <section className="py-8">
      <Container>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="rounded-2xl border border-border/80 bg-card px-4 py-3"
              >
                <div className="flex items-center gap-2 text-primary">
                  <Icon className="h-4 w-4" />
                  <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                    {item.label}
                  </p>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">{item.value}</p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
