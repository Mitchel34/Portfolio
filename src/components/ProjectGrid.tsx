"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/content";
import { Container } from "@/components/Container";

// Skip the first project as it's featured
const secondaryProjects = projects.slice(1);

export function ProjectGrid() {
    if (secondaryProjects.length === 0) return null;

    return (
        <section className="py-12 md:pb-32">
            <Container>
                <div className="grid gap-8">
                    {secondaryProjects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
