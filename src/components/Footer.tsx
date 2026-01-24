import Link from "next/link";

import { site } from "@/lib/content";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">{site.name}</p>
          <p className="text-sm text-slate-500">{site.title}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <Link href="/projects" className="hover:text-slate-900">
            Projects
          </Link>
          <Link href="/research" className="hover:text-slate-900">
            Research
          </Link>
          <a href={site.github} className="hover:text-slate-900">
            GitHub
          </a>
          <a href={site.linkedin} className="hover:text-slate-900">
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
