import { ImageResponse } from "next/og";

import { site } from "@/lib/content";

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
          background: "#171a21",
          color: "#f7f4ed",
          fontSize: 300,
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
