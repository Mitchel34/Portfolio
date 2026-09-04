import type { ReactNode } from "react";

import { Container } from "@/components/Container";
import { SectionHeader, type SectionHeaderProps } from "@/components/SectionHeader";

type PageHeaderProps = Omit<SectionHeaderProps, "number" | "as"> & {
  /** Buttons / text links rendered under the header in the body column. */
  actions?: ReactNode;
};

/** Secondary-page header: same editorial grid as the home sections, h1, followed by a double rule. */
export function PageHeader({ actions, ...header }: PageHeaderProps) {
  return (
    <header className="pt-10 lg:pt-14">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <SectionHeader as="h1" {...header} />
          {actions ? (
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-10 lg:col-start-3">
              {actions}
            </div>
          ) : null}
        </div>
        <div className="rule-double mt-8" aria-hidden="true" />
      </Container>
    </header>
  );
}
