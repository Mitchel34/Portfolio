import { ImageResponse } from "next/og";

import { site } from "@/lib/content";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          position: "relative",
          width: "100%",
          fontFamily: "Sora, Arial, sans-serif",
        }}
      >
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
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
              fontSize: 26,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#546174",
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#0b5fff",
              }}
            />
            AI Engineer Portfolio
          </div>

          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            {site.name}
          </div>

          <div
            style={{
              marginTop: 24,
              fontSize: 34,
              lineHeight: 1.3,
              color: "#203550",
            }}
          >
            Forecasting systems that bridge research and production.
          </div>

          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 18,
              fontSize: 22,
              color: "#546174",
            }}
          >
            <span>Time-series ML</span>
            <span>•</span>
            <span>Deep Learning</span>
            <span>•</span>
            <span>Production Software</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
