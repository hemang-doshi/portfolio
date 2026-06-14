import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Dev server: allow requests tunnelled through ngrok ──────────────────────
  // Next.js 15+ blocks requests from unrecognised external origins by default.
  // Without this, the dev server returns 403 for all JS/CSS chunks and API
  // calls coming via the ngrok tunnel, breaking hydration and interactivity.
  allowedDevOrigins: [
    "moodiness-skeletal-anchovy.ngrok-free.dev",
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
  ],
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        // Instagram profile pictures and post thumbnails
        // Omit `search` so any query string is allowed — Instagram CDN URLs
        // always include signed query params like ?stp=...&_nc_cat=...
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        // Meta's fallback CDN (scontent*.fbcdn.net etc.)
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
      {
        // Instagram video CDN (e.g. instagram.fblr1-9.fna.fbcdn.net)
        protocol: "https",
        hostname: "instagram.*.fna.fbcdn.net",
      },
    ],
  },
};

export default nextConfig;

