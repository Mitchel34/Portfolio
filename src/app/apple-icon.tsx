import { ImageResponse } from "next/og";

import { site } from "@/lib/content";

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
          background: "#171a21",
          color: "#f7f4ed",
          fontSize: 108,
          fontWeight: 500,
          fontFamily: 'Georgia, "Times New Roman", serif',
          letterSpacing: "-0.02em",
        }}
      >
        {site.name.charAt(0)}
      </div>
    ),
    {
      ...size,
    },
  );
}
