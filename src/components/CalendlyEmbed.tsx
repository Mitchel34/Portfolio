"use client";

import { useEffect } from "react";

export function CalendlyEmbed() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  useEffect(() => {
    if (!calendlyUrl) return;
    if (document.querySelector('script[src*="calendly"]')) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }, [calendlyUrl]);

  if (!calendlyUrl) return null;

  return (
    <div
      className="calendly-inline-widget w-full overflow-hidden rounded-2xl border border-border/80"
      data-url={`${calendlyUrl}?hide_gdpr_banner=1&primary_color=0b5fff`}
      style={{ minWidth: 320, height: 700 }}
    />
  );
}
