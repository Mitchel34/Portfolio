import type { Metadata } from "next";

import { site } from "@/lib/content";

export const SITE_URL = site.url || "https://mitchelcarson.com";

export const DEFAULT_KEYWORDS = [
  "Mitchel Carson",
  "AI Engineer",
  "ML Engineer",
  "Software Engineer",
  "time-series forecasting",
  "Transformers",
  "streamflow forecasting",
  "production machine learning",
];

export function absoluteUrl(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, SITE_URL).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  pathname?: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  pathname = "/",
  keywords = [],
  type = "website",
}: PageMetadataInput): Metadata {
  const canonicalUrl = absoluteUrl(pathname);
  const mergedKeywords = [...new Set([...DEFAULT_KEYWORDS, ...keywords])];
  const openGraphImageUrl = absoluteUrl("/opengraph-image");
  const twitterImageUrl = absoluteUrl("/twitter-image");

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: mergedKeywords,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: site.name,
      locale: "en_US",
      type,
      images: [
        {
          url: openGraphImageUrl,
          width: 1200,
          height: 630,
          alt: `${site.name} portfolio preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImageUrl],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description: site.summary,
  alternates: {
    canonical: SITE_URL,
  },
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  keywords: DEFAULT_KEYWORDS,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
    shortcut: ["/icon"],
  },
  openGraph: {
    title: `${site.name} | ${site.title}`,
    description: site.summary,
    url: SITE_URL,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${site.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.title}`,
    description: site.summary,
    images: [absoluteUrl("/twitter-image")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
