import type { NextConfig } from "next";

const resumeFilename = "mitchelcarson_resume.pdf";
const resumePath = `/${resumeFilename}`;

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
  },
  async headers() {
    return [
      {
        source: resumePath,
        headers: [
          {
            key: "Content-Disposition",
            value: `inline; filename="${resumeFilename}"`,
          },
          {
            key: "Content-Type",
            value: "application/pdf",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/resume.pdf",
        destination: resumePath,
        permanent: true,
      },
      {
        source: "/projects/harmony-trading",
        destination: "/projects/harmony",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
