import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // added images trusted domains to allow the avatar image to be loaded
  images: {
    // used remotePatterns instead of domains since it's deprecated
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;
