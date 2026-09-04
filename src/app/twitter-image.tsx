import { ImageResponse } from "next/og";

import { site } from "@/lib/content";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const PAPER = "#f7f4ed";
const INK = "#171a21";
const MUTED = "#565c6b";
const RED = "#a8271f";

export default function TwitterImage() {
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
            borderBottom: `1px solid #d6d0c4`,
            fontFamily: "ui-monospace, Menlo, monospace",
            fontSize: 20,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <span>{site.runningHead}</span>
          <span>{site.location}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
            {site.name}
          </div>
          <div style={{ marginTop: 26, fontSize: 34, lineHeight: 1.3, fontStyle: "italic", maxWidth: 980 }}>
            {site.tagline}
          </div>
          <div
            style={{
              marginTop: 24,
              fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: 22,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: RED,
            }}
          >
            {site.title}
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
            <span>{site.focusLine}</span>
            <span>mitchelcarson.com</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
