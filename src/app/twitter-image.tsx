import { ImageResponse } from "next/og";

import { site } from "@/lib/content";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(120deg, #f5f3ee 0%, #e7eefb 55%, #dce9e4 100%)",
          color: "#12243a",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
          fontFamily: "Sora, Arial, sans-serif",
        }}
      >
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
          <div
            style={{
              fontSize: 24,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#546174",
            }}
          >
            {site.title}
          </div>

          <div style={{ marginTop: 20, fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>
            {site.name}
          </div>

          <div style={{ marginTop: 22, fontSize: 32, lineHeight: 1.25, color: "#203550" }}>
            AI systems for forecasting, interpretability, and production impact.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
