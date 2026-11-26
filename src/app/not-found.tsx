import type { Metadata } from "next";
import Link from "next/link";

import { AsciiDrift } from "@/components/AsciiDrift";
import { Container } from "@/components/Container";
import { buttonClass } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading" className="relative isolate overflow-hidden border-b border-border">
      <AsciiDrift className="-z-10" />
      <Container className="flex min-h-[70vh] flex-col justify-center py-20">
        {/* The panel keeps the copy readable over the moving characters. */}
        <div className="max-w-xl rounded-[4px] border border-border bg-background/90 p-6 backdrop-blur-sm sm:p-10">
          <p className="mono-label text-primary">Error 404</p>
          <h1
            id="not-found-heading"
            className="mt-3 font-serif text-[2.5rem] leading-[1.02] font-medium tracking-[-0.03em] text-balance text-foreground sm:text-[3.5rem]"
          >
            This page drifted downstream.
          </h1>
          <p className="mt-4 max-w-[44ch] text-body text-muted-foreground">
            The address may be mistyped, or the page may have moved. The rest of the site is where you left it.
          </p>
          <p className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className={buttonClass("primary")}>
              Back to home
            </Link>
            <Link href="/projects" className={buttonClass("outline")}>
              See projects
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
