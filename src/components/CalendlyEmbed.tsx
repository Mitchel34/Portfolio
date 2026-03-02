"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { site } from "@/lib/content";

export function CalendlyEmbed({ minHeight }: { minHeight?: string }) {
  const calendlyUrl = site.calendlyUrl;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const height = minHeight || "700px";

  useEffect(() => {
    setMounted(true);
    // Dynamically load the Calendly widget script
    const existing = document.getElementById("calendly-widget-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  if (!calendlyUrl || !mounted) return null;

  const isDark = resolvedTheme === "dark";
  const colors = {
    // Note: Calendly expects hex without hashes
    primary: isDark ? "4d8bff" : "0b5fff",
    background: isDark ? "0d111c" : "f5f3ee",
    text: isDark ? "e8e4dc" : "12243a",
  };

  // The magic happens in these URL parameters:
  const urlWithParams = `${calendlyUrl}?hide_gdpr_banner=1&background_color=${colors.background}&text_color=${colors.text}&primary_color=${colors.primary}`;

  return (
    <div className="flex justify-center w-full">
      <div
        className="calendly-inline-widget min-w-[320px] max-w-[1060px] rounded-2xl border border-border/80 overflow-hidden"
        data-url={urlWithParams}
        style={{ width: "100%", height }}
      />
    </div>
  );
}
