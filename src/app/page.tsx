import Link from "next/link";

import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { about, focusAreas, projects, research, site } from "@/lib/content";

const featuredProjects = projects.slice(0, 2);

export default function Home() {
  return (
    <div>
      <section className="border-b border-slate-200/70 bg-white">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
              {site.title}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {site.headline}
            </h1>
            <p className="text-lg text-slate-600">{site.summary}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View Projects
              </Link>
              <Link
                href="/research"
                className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                View Research
              </Link>
              <a
                href={site.resumeUrl}
                className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Download Resume
              </a>
              <a
                href={site.github}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:text-slate-900"
              >
                GitHub
              </a>
              <a
                href={site.linkedin}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:text-slate-900"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeader
            eyebrow="Overview"
            title="Applied AI with engineering discipline"
            description="Research depth with a production mindset. I focus on forecasting systems that are reliable, interpretable, and deployable."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr,1fr]">
            <div className="space-y-4 text-base text-slate-600">
              {about.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Link
                href="/about"
                className="text-sm font-semibold text-slate-900 transition hover:text-slate-700"
              >
                More about me
              </Link>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                What I care about
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {about.values.map((value) => (
                  <li key={value.title}>
                    <span className="font-semibold text-slate-900">
                      {value.title}:
                    </span>{" "}
                    {value.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200/70 bg-white py-12">
        <Container>
          <SectionHeader
            eyebrow="Projects"
            title="Forecasting systems with measurable outcomes"
            description="Selected work that balances model innovation with engineering delivery."
          />
          <div className="mt-8 grid gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/projects"
              className="text-sm font-semibold text-slate-900 transition hover:text-slate-700"
            >
              View all projects
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeader
            eyebrow="Research"
            title={research.title}
            description={research.summary}
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                Architecture
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {research.architecture.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                Evaluation
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {research.evaluation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/research"
              className="text-sm font-semibold text-slate-900 transition hover:text-slate-700"
            >
              View full research overview
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200/70 bg-white py-12">
        <Container className="text-center">
          <SectionHeader
            eyebrow="Contact"
            title="Open to applied AI and ML engineering roles"
            description="I am interested in forecasting, infrastructure-aware ML, and systems that ship."
          />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Email
            </a>
            <a
              href={site.linkedin}
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              GitHub
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
