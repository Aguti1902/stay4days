import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "stay4days.com" },
      { protocol: "https", hostname: "**.ownerrez.com" },
      { protocol: "https", hostname: "**.orez.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "uc.orez.io" },
      { protocol: "https", hostname: "cdn.ownerrez.com" },
      { protocol: "https", hostname: "**.tiqets.com" },
    ],
  },
};

export default nextConfig;
