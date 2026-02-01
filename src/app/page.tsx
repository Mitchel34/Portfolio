import Link from "next/link";

import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { about, focusAreas, projects, research, site } from "@/lib/content";

const featuredProjects = projects.slice(0, 2);

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/5 pt-20 pb-20 md:pt-32 md:pb-32">
        <Container>
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-blue-400">
                {site.title}
              </p>
              <h1 className="font-serif text-5xl font-medium tracking-tight text-foreground sm:text-7xl lg:text-8xl">
                {site.headline}
              </h1>
            </div>
            <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
              {site.summary}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/projects"
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                View Projects
              </Link>
              <a
                href={site.resumeUrl}
                className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm font-medium text-foreground transition hover:bg-surface"
              >
                Download Resume
              </a>
            </div>

            <div className="flex flex-wrap gap-2 pt-8">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-white/10 hover:text-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Overview Section */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.5fr,1fr]">
            <div className="space-y-8">
              <SectionHeader
                eyebrow="Overview"
                title="Applied AI with engineering discipline"
                description="Research depth with a production mindset. I focus on forecasting systems that are reliable, interpretable, and deployable."
              />
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                {about.summary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="pt-4">
                  <Link
                    href="/about"
                    className="group inline-flex items-center text-sm font-semibold text-foreground"
                  >
                    More about me
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-border bg-surface/50 p-8 shadow-sm">
                <p className="mb-6 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  Core Values
                </p>
                <ul className="space-y-6">
                  {about.values.map((value) => (
                    <li key={value.title} className="group">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                          {value.title}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Projects Section */}
      <section className="border-t border-white/5 bg-surface/30 py-20 md:py-32">
        <Container>
          <SectionHeader
            eyebrow="Projects"
            title="Systems with measurable impact"
            description="Selected work balancing model innovation with delivery."
          />
          <div className="mt-16 grid gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 text-sm font-medium text-foreground transition hover:bg-surface"
            >
              View all projects
            </Link>
          </div>
        </Container>
      </section>

      {/* Research Section */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            eyebrow="Research"
            title={research.title}
            description={research.summary}
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-8">
              <p className="mb-6 text-xs font-mono uppercase tracking-[0.2em] text-blue-400">
                Architecture
              </p>
              <ul className="space-y-3">
                {research.architecture.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-8">
              <p className="mb-6 text-xs font-mono uppercase tracking-[0.2em] text-green-400">
                Key Metrics
              </p>
              <ul className="space-y-3">
                {research.evaluation.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/research"
              className="group inline-flex items-center text-sm font-semibold text-foreground"
            >
              Read full thesis overview
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="border-t border-white/5 py-24 text-center">
        <Container>
          <h2 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">
            Let's build something reliable.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {site.email}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              Email Me
            </a>
            <a
              href={site.linkedin}
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition hover:bg-surface"
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition hover:bg-surface"
            >
              GitHub
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
