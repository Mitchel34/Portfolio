"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/content";
import { Container } from "@/components/Container";
import { Box, Code2, LineChart, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = [
    LineChart,
    Code2,
    ShieldCheck,
    Box,
];

export function CoreValues() {
    return (
        <section className="bg-surface/30 py-24 md:py-32" id="values">
            <Container>
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif">Core Values</h2>
                    <p className="mt-4 text-muted-foreground">The principles that guide my work.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {about.values.map((value, index) => {
                        const Icon = icons[index % icons.length];
                        return (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative rounded-2xl border border-white/5 bg-white/5 p-6 transition-colors hover:bg-white/10"
                            >
                                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {value.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
