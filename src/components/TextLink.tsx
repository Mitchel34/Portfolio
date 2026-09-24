import Link from "next/link";
import type { ReactNode } from "react";

import { LinkGlyph } from "@/components/LinkGlyph";
import { cn } from "@/lib/utils";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  /** Opens in a new tab with a ↗ glyph. Auto-detected for http(s) hrefs when omitted. */
  external?: boolean;
  className?: string;
  download?: string | boolean;
};

export const textLinkClass =
  "link-text inline-flex items-baseline gap-1.5 text-body-sm font-medium text-foreground hover:text-primary hover:decoration-primary";

/** Inline text link with a trailing glyph: → for internal, ↗ for external. */
export function TextLink({ href, children, external, className, download }: TextLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const isMailOrFile = href.startsWith("mailto:") || Boolean(download);

  if (isExternal || isMailOrFile) {
    return (
      <a
        href={href}
        className={cn(textLinkClass, className)}
        download={download}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span>{children}</span>
        <LinkGlyph external={isExternal} />
      </a>
    );
  }

  return (
    <Link href={href} className={cn(textLinkClass, className)}>
      <span>{children}</span>
      <LinkGlyph />
    </Link>
  );
}
