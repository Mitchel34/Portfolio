import { site } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { SchemaScript } from "@/components/SchemaScript";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: absoluteUrl("/images/mitchel-carson-headshot.jpg"),
  jobTitle: site.schemaJobTitle,
  description: site.summary,
  email: site.email,
  sameAs: [site.github, site.linkedin],
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "University of Texas at Austin",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Appalachian State University",
  },
  homeLocation: {
    "@type": "Place",
    name: site.location,
  },
  knowsAbout: [
    "Time-series forecasting",
    "Post-processing of operational streamflow forecasts",
    "State-space and attention sequence models",
    "Leakage-aware temporal evaluation",
    "Reproducible machine learning pipelines",
    "Deep learning",
    "Hydrologic forecasting",
    "Production software engineering",
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

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: `${site.name} Portfolio`,
  url: site.url,
  description: site.summary,
  mainEntity: {
    "@type": "Person",
    name: site.name,
    url: site.url,
  },
};

export function StructuredData() {
  return (
    <>
      <SchemaScript data={personJsonLd} />
      <SchemaScript data={websiteJsonLd} />
      <SchemaScript data={profilePageJsonLd} />
    </>
  );
}
