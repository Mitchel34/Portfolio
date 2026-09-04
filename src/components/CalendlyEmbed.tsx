"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

import { site } from "@/lib/content";

type CalendlyApi = {
  initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
};

type CalendlyWindow = Window & {
  Calendly?: CalendlyApi;
};

export function CalendlyEmbed({ minHeight }: { minHeight?: string }) {
  const calendlyUrl = site.calendlyUrl;
  const { resolvedTheme } = useTheme();
  const height = minHeight || "700px";
  const boundaryRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const isDark = resolvedTheme === "dark";
  const colors = {
    primary: isDark ? "f28b79" : "a8271f",
    background: isDark ? "101114" : "f7f4ed",
    text: isDark ? "e7e2d8" : "171a21",
  };
  const urlWithParams = `${calendlyUrl}?hide_gdpr_banner=1&background_color=${colors.background}&text_color=${colors.text}&primary_color=${colors.primary}`;

  useEffect(() => {
    if (shouldLoad) return;

    const boundary = boundaryRef.current;
    if (!boundary || !("IntersectionObserver" in window)) {
      const fallbackFrame = requestAnimationFrame(() => setShouldLoad(true));
      return () => cancelAnimationFrame(fallbackFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(boundary);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || !calendlyUrl) return;

    let cancelled = false;
    const target = widgetRef.current;
    const scriptId = "calendly-widget-script";

    const initialize = () => {
      if (cancelled || !target) return;

      const calendly = (window as CalendlyWindow).Calendly;
      if (!calendly) return;

      target.replaceChildren();
      calendly.initInlineWidget({ url: urlWithParams, parentElement: target });
    };

    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    let script = existing;

    if (existing) {
      if ((window as CalendlyWindow).Calendly) {
        initialize();
      } else {
        existing.addEventListener("load", initialize, { once: true });
      }
    } else {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.addEventListener("load", initialize, { once: true });
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", initialize);
    };
  }, [calendlyUrl, shouldLoad, urlWithParams]);

  if (!calendlyUrl) return null;

  return (
    <div ref={boundaryRef} className="flex w-full min-w-0 justify-center">
      <div className="calendly-container relative w-full min-w-0" style={{ height }}>
        {!shouldLoad ? (
          <div className="absolute inset-0 grid place-items-center px-6 text-center">
            <p className="mono-label text-muted-foreground">
              Scheduling interface loads as you approach
            </p>
          </div>
        ) : null}
        <div
          ref={widgetRef}
          aria-label="Schedule a meeting with Mitchel Carson"
          className="h-full w-full min-w-0"
        />
      </div>
    </div>
  );
}
