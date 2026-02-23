import { absoluteUrl } from "@/lib/seo";
import { SchemaScript } from "@/components/SchemaScript";

type BreadcrumbItem = {
  name: string;
  href: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

function toAbsoluteHref(href: string) {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }

  return absoluteUrl(href);
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteHref(item.href),
    })),
  };

  return <SchemaScript data={data} />;
}
