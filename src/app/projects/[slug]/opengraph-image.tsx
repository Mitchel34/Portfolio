import { ImageResponse } from "next/og";

import { getProjectBySlug, site } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

const PAPER = "#f7f4ed";
const INK = "#171a21";
const MUTED = "#565c6b";
const RED = "#a8271f";
const HAIRLINE = "#d6d0c4";

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title ?? site.name;
  const description = project ? `${project.problem} ${project.impact}`.slice(0, 150) : site.tagline;
  const keywords = project?.stack.slice(0, 5) ?? site.focusLine.split(" · ");
  const eyebrow = project ? `${project.status} · Case study` : site.title;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
          padding: "56px 72px",
          background: PAPER,
          color: INK,
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 18,
            borderBottom: `1px solid ${HAIRLINE}`,
            fontFamily: "ui-monospace, Menlo, monospace",
            fontSize: 20,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <span>{site.runningHead}</span>
          <span style={{ color: RED }}>{eyebrow}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: project ? 76 : 92, fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            {title}
          </div>
          <div style={{ marginTop: 24, fontSize: 28, lineHeight: 1.4, color: MUTED, maxWidth: 1000 }}>
            {description}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 1, background: INK }} />
          <div style={{ height: 3, background: PAPER }} />
          <div style={{ height: 1, background: INK }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 16,
              fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: 20,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            <span>{keywords.join(" · ")}</span>
            <span>mitchelcarson.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
