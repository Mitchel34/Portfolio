import { ImageResponse } from "next/og";

import { site } from "@/lib/content";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b5fff 0%, #0a3a8f 100%)",
          color: "#ffffff",
          fontSize: 90,
          fontWeight: 700,
          fontFamily: "Sora, Arial, sans-serif",
          letterSpacing: "-0.04em",
        }}
      >
        {site.name.charAt(0)}
      </div>
    ),
    {
      ...size,
    }
  );
}
