"use client";

import { motion } from "framer-motion";
import { about, experience } from "@/lib/content";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export function AboutSection() {
    return (
        <section className="py-24 md:py-32" id="about">
            <Container>
                <div className="grid gap-16 lg:grid-cols-[1fr,1.2fr]">
                    <div className="space-y-8">
                        <SectionHeader
                            eyebrow="About Me"
                            title="Applied AI with engineering discipline"
                            description="Research depth with a production mindset."
                        />
                        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                            {about.summary.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    <div className="relative space-y-8 border-l border-white/10 pl-8">
                        <h3 className="text-xl font-semibold text-foreground">Timeline</h3>
                        {experience.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between gap-4 text-sm">
                                        <span className="font-semibold text-primary">{item.role}</span>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            {item.period}
                                        </span>
                                    </div>
                                    <p className="font-medium text-foreground">{item.org}</p>
                                    <ul className="list-disc pl-4 text-sm text-muted-foreground mt-2 space-y-1">
                                        {item.highlights.map(hl => (
                                            <li key={hl}>{hl}</li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
