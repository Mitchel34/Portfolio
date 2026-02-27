import { ImageResponse } from "next/og";

import { getProjectBySlug, site } from "@/lib/content";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title ?? site.name;
  const description = project
    ? `${project.problem} ${project.impact}`.slice(0, 130)
    : "AI Engineer building production-grade ML systems";
  const tags = project?.stack.slice(0, 4) ?? ["Time-series ML", "Deep Learning", "Production Software"];
  const eyebrow = project ? "Case Study" : "AI Engineer Portfolio";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(120deg, #f5f3ee 0%, #e7eefb 55%, #dce9e4 100%)",
          color: "#12243a",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background accent circle */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 50,
            width: 260,
            height: 260,
            borderRadius: 999,
            background: "rgba(11, 95, 255, 0.12)",
          }}
        />

        {/* Bottom-right branding */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 60,
            fontSize: 18,
            color: "#546174",
            letterSpacing: "0.06em",
          }}
        >
          mitchelcarson.com
        </div>

        {/* Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            border: "2px solid rgba(18, 36, 58, 0.12)",
            borderRadius: 28,
            padding: "48px 56px",
            background: "rgba(255, 253, 248, 0.76)",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
              fontSize: 22,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#546174",
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#0b5fff",
              }}
            />
            {eyebrow}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: project ? 58 : 72,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#12243a",
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              marginTop: 20,
              fontSize: 26,
              lineHeight: 1.4,
              color: "#203550",
              maxWidth: "85%",
            }}
          >
            {description}
          </div>

          {/* Stack tags */}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1.5px solid rgba(18, 36, 58, 0.16)",
                  background: "rgba(11, 95, 255, 0.08)",
                  fontSize: 18,
                  color: "#0b5fff",
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
