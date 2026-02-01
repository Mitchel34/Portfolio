"use client";

import { Container } from "@/components/Container";
import { site } from "@/lib/content";
import { Github, Linkedin, Mail } from "lucide-react";

export function ContactSection() {
    return (
        <section className="border-t border-white/5 py-24 text-center" id="contact">
            <Container>
                <div className="mx-auto max-w-2xl space-y-8">
                    <h2 className="font-serif text-4xl font-medium text-foreground sm:text-5xl">
                        Let&apos;s build something reliable.
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Always open to discussing time-series forecasting, production ML systems, or new opportunities.
                    </p>

                    <div className="pt-8">
                        <a
                            href={`mailto:${site.email}`}
                            className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 shadow-lg shadow-blue-500/20"
                        >
                            Start a Conversation
                        </a>
                    </div>

                    <div className="mt-16 flex justify-center gap-8">
                        <a
                            href={`mailto:${site.email}`}
                            className="text-muted-foreground transition hover:text-foreground"
                            aria-label="Email"
                        >
                            <Mail className="h-6 w-6" />
                        </a>
                        <a
                            href={site.linkedin}
                            className="text-muted-foreground transition hover:text-foreground"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-6 w-6" />
                        </a>
                        <a
                            href={site.github}
                            className="text-muted-foreground transition hover:text-foreground"
                            aria-label="GitHub"
                        >
                            <Github className="h-6 w-6" />
                        </a>
                    </div>
                    <p className="mt-12 text-xs text-muted-foreground/50">
                        © {new Date().getFullYear()} Mitchel Carson. Built with Next.js & Tailwind.
                    </p>
                </div>
            </Container>
        </section>
    );
}
