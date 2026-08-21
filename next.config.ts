import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
  },
  async redirects() {
    return [
      {
        source: "/projects/harmony-trading",
        destination: "/projects/harmony",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
