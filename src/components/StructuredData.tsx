import { site } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: absoluteUrl("/opengraph-image"),
  jobTitle: site.title,
  email: site.email,
  sameAs: [site.github, site.linkedin],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Texas at Austin",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Appalachian State University",
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.summary,
  inLanguage: "en-US",
};

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  );
}
