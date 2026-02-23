import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Mitchel Carson",
    description: site.summary,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3ee",
    theme_color: "#0b5fff",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
