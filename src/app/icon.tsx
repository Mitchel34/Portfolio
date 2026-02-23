import { ImageResponse } from "next/og";

import { site } from "@/lib/content";

export const runtime = "edge";
export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 30% 20%, #e7eefb 0%, #0b5fff 60%, #0a3a8f 100%)",
          color: "#f8fbff",
          fontSize: 228,
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
