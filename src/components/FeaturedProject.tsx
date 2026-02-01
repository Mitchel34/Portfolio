"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/content";
import { Container } from "@/components/Container";
import { ArrowRight, BarChart3, Database, Layers } from "lucide-react";
import Link from "next/link";

const project = projects[0]; // Hydra Temporal

export function FeaturedProject() {
    return (
        <section className="py-24 md:py-32" id="projects">
            <Container>
                <div className="mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif">Featured Project</h2>
                </div>

                <div className="group relative grid gap-8 overflow-hidden rounded-3xl border border-white/10 bg-surface/50 p-8 transition-all hover:bg-surface/80 lg:grid-cols-2 lg:p-12">
                    {/* Background Gradient/Glow */}
                    <div className="absolute -right-20 -top-20 z-0 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px] transition-all group-hover:bg-blue-500/20" />

                    <div className="relative z-10 flex flex-col justify-center space-y-6">
                        <div>
                            <div className="mb-4 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                                Honors Thesis
                            </div>
                            <h3 className="text-3xl font-bold text-foreground sm:text-4xl">{project.title}</h3>
                            <p className="mt-2 text-lg text-muted-foreground">{project.subtitle}</p>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                            {project.problem} {project.impact}
                        </p>

                        <ul className="space-y-3">
                            {project.results.map((result, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                                    {result}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-4">
                            {project.stack.slice(0, 4).map(tech => (
                                <span key={tech} className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Link href="https://github.com/Mitchel34" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                                View Project Sources <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Visual Side */}
                    <div className="relative z-10 flex items-center justify-center rounded-2xl border border-white/5 bg-black/40 p-8 shadow-2xl backdrop-blur-sm">
                        <div className="grid w-full gap-4">
                            {/* Simulated Architecture Diagram */}
                            <div className="flex flex-col items-center space-y-4">
                                <div className="flex w-full justify-between gap-4">
                                    <div className="flex-1 rounded-lg border border-white/10 p-4 text-center">
                                        <Database className="mx-auto mb-2 h-6 w-6 text-blue-400" />
                                        <div className="text-xs text-muted-foreground">NWM Forecasts</div>
                                    </div>
                                    <div className="flex-1 rounded-lg border border-white/10 p-4 text-center">
                                        <Layers className="mx-auto mb-2 h-6 w-6 text-purple-400" />
                                        <div className="text-xs text-muted-foreground">ERA5 Reanalysis</div>
                                    </div>
                                </div>
                                <ArrowRight className="rotate-90 text-muted-foreground/30" />
                                <div className="w-full rounded-lg border border-blue-500/20 bg-blue-500/10 p-6 text-center shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]">
                                    <div className="text-sm font-semibold text-blue-300">Hybrid Transformer Head</div>
                                    <div className="mt-1 text-xs text-blue-400/70">Temporal Attention Mechanism</div>
                                </div>
                                <ArrowRight className="rotate-90 text-muted-foreground/30" />
                                <div className="flex w-full items-center justify-between rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                                    <div className="flex items-center gap-3">
                                        <BarChart3 className="h-6 w-6 text-green-400" />
                                        <div className="text-left">
                                            <div className="text-sm font-semibold text-green-300">RMSE Reduction</div>
                                            <div className="text-xs text-green-400/70">Performance Gain</div>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-green-400">54%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
