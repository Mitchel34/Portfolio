"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { site } from "@/lib/content";

export function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 250]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-background"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px] mix-blend-screen animate-pulse delay-1000" />
                <div className="absolute top-[50%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px] mix-blend-screen" />
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 mx-auto max-w-4xl px-6 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <div className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary backdrop-blur-md">
                        {site.title}
                    </div>

                    <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl md:text-8xl">
                        {site.headline}
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                        {site.summary}
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row"
                    >
                        <Link
                            href="/projects"
                            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
                        >
                            <span className="relative z-10">View Projects</span>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-150%] transition-transform duration-700 group-hover:translate-x-[150%]" />
                        </Link>

                        <div className="flex gap-4">
                            <a
                                href={`mailto:${site.email}`}
                                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:bg-white/10 hover:text-white"
                                aria-label="Email"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                            <a
                                href={site.github}
                                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:bg-white/10 hover:text-white"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href={site.linkedin}
                                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:bg-white/10 hover:text-white"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest text-muted-foreground/50">
                        Scroll
                    </span>
                    <ArrowDown className="h-4 w-4 text-muted-foreground/50" />
                </motion.div>
            </motion.div>
        </section>
    );
}
