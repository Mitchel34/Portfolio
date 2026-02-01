"use client";

import { motion } from "framer-motion";
import { research } from "@/lib/content";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { BrainCircuit, GitBranch, Microscope, Scale } from "lucide-react";
import Link from "next/link";

export function ResearchSection() {
    return (
        <section className="relative overflow-hidden border-t border-white/5 bg-surface/30 py-24 md:py-32" id="research">
            <Container>
                <SectionHeader
                    eyebrow="Research"
                    title={research.title}
                    description={research.summary}
                />

                <div className="mt-16 grid gap-12 lg:grid-cols-2">
                    {/* Left Col: Architecture & Constraints */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3 text-blue-400">
                                <BrainCircuit className="h-6 w-6" />
                                <h3 className="text-xl font-semibold text-foreground">Architecture Design</h3>
                            </div>
                            <ul className="space-y-4 border-l-2 border-white/5 pl-6">
                                {research.architecture.map((item, i) => (
                                    <li key={i} className="text-muted-foreground">{item}</li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3 text-cyan-400">
                                <Scale className="h-6 w-6" />
                                <h3 className="text-xl font-semibold text-foreground">Constraints & Evaluation</h3>
                            </div>
                            <ul className="space-y-4 border-l-2 border-white/5 pl-6">
                                {research.evaluation.map((item, i) => (
                                    <li key={i} className="text-muted-foreground">{item}</li>
                                ))}
                                {research.constraints.map((item, i) => (
                                    <li key={`c-${i}`} className="text-muted-foreground italic">{item}</li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Right Col: Reproducibility & Link */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="rounded-3xl border border-white/5 bg-background p-8 shadow-xl"
                        >
                            <div className="flex items-center gap-3 text-green-400 mb-6">
                                <Microscope className="h-6 w-6" />
                                <h3 className="text-xl font-semibold text-foreground">Reproducibility First</h3>
                            </div>
                            <p className="mb-6 text-muted-foreground">
                                Research meant to be built upon. Every experiment is tracked and versioned.
                            </p>
                            <div className="grid gap-4">
                                {research.reproducibility.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 rounded-lg bg-surface p-3 text-sm text-foreground/80">
                                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="flex justify-center lg:justify-start">
                            <Link
                                href="https://github.com/Mitchel34"
                                className="group inline-flex items-center text-sm font-semibold text-foreground hover:text-primary transition-colors"
                            >
                                Read full thesis overview
                                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
