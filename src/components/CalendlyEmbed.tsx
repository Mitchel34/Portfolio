"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

import { site } from "@/lib/content";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export function CalendlyEmbed() {
  const calendlyUrl = site.calendlyUrl;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Load Calendly script once
  useEffect(() => {
    if (!calendlyUrl) return;
    if (document.querySelector('script[src*="calendly"]')) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }, [calendlyUrl]);

  // Reinitialize widget when theme changes
  useEffect(() => {
    if (!mounted || !resolvedTheme || !calendlyUrl || !containerRef.current) return;

    const isDark = resolvedTheme === "dark";
    const colors = {
      primary: isDark ? "4d8bff" : "0b5fff",
      background: isDark ? "0d111c" : "f5f3ee",
      text: isDark ? "e8e4dc" : "12243a",
    };

    const url = `${calendlyUrl}?hide_gdpr_banner=1&primary_color=${colors.primary}&background_color=${colors.background}&text_color=${colors.text}`;

    // Clear previous widget content
    containerRef.current.innerHTML = "";

    // Wait for Calendly to be available, then init
    const initWidget = () => {
      if (window.Calendly && containerRef.current) {
        window.Calendly.initInlineWidget({
          url,
          parentElement: containerRef.current,
        });
      }
    };

    if (window.Calendly) {
      initWidget();
    } else {
      // Poll until Calendly is loaded
      const interval = setInterval(() => {
        if (window.Calendly) {
          clearInterval(interval);
          initWidget();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [mounted, resolvedTheme, calendlyUrl]);

  if (!calendlyUrl || !mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div
      ref={containerRef}
      className={`calendly-container w-full overflow-hidden rounded-2xl border border-border/80 ${isDark ? "calendly-dark" : "calendly-light"}`}
      style={{
        minWidth: 320,
        height: 700,
        backgroundColor: isDark ? "#0d111c" : "#f5f3ee",
      }}
    />
  );
}
