"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function CalendlyEmbed() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!calendlyUrl) return;
    if (document.querySelector('script[src*="calendly"]')) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }, [calendlyUrl]);

  if (!calendlyUrl || !mounted) return null;

  const isDark = resolvedTheme === "dark";
  const colors = {
    primary: isDark ? "4d8bff" : "0b5fff",
    background: isDark ? "0d111c" : "f5f3ee",
    text: isDark ? "e8e4dc" : "12243a",
  };

  return (
    <div
      key={resolvedTheme}
      className="calendly-inline-widget w-full overflow-hidden rounded-2xl border border-border/80"
      data-url={`${calendlyUrl}?hide_gdpr_banner=1&primary_color=${colors.primary}&background_color=${colors.background}&text_color=${colors.text}`}
      style={{ minWidth: 320, height: 700 }}
    />
  );
}
