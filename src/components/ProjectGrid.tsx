import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionFrame } from "@/components/SectionFrame";
import { TextLink } from "@/components/TextLink";
import { harmonyBoundaryNote, landingSections, projects, sectionCopy } from "@/lib/content";

const secondaryProjects = projects.filter((project) => project.slug !== "hydra-temporal");

export function ProjectGrid() {
  if (secondaryProjects.length === 0) return null;

  return (
    <SectionFrame
      id={landingSections.projects.id}
      number="04"
      label="Projects"
      title={sectionCopy.projects.title}
      lede={sectionCopy.projects.lede}
      notes={[{ id: "2", text: harmonyBoundaryNote }]}
    >
      <Reveal as="ul" className="border-b border-border">
        {secondaryProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            variant="compact"
            noteId={project.slug === "harmony" ? "2" : undefined}
          />
        ))}
      </Reveal>

      <TextLink href="/projects" className="mt-6">
        All projects
      </TextLink>
    </SectionFrame>
  );
}
