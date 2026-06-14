import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        // Instagram profile pictures and post thumbnails
        protocol: "https",
        hostname: "**.cdninstagram.com",
        port: "",
        search: "",
      },
      {
        // Meta's fallback CDN also used by Instagram
        protocol: "https",
        hostname: "**.fbcdn.net",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
