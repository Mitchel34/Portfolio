"use client";

import { motion } from "framer-motion";

import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { Container } from "@/components/Container";

export function BookingSection() {
  return (
    <section className="border-t border-border/70 py-20" id="booking">
      <Container>
        <div className="mb-10 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
            Schedule a Call
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Book a Zoom meeting
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Pick a time that works for you — a Zoom link will be sent automatically.
          </p>
        </div>

        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <CalendlyEmbed />
        </motion.div>
      </Container>
    </section>
  );
}
