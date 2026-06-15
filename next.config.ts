import path from "node:path";

import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://*.cdninstagram.com https://*.fbcdn.net https://cdn.simpleicons.org data:",
  "font-src 'self' https://fonts.gstatic.com",
  `connect-src 'self' https://graph.instagram.com https://cdn.simpleicons.org${isDev ? " ws: wss:" : ""}`,
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  // ── Dev server: allow requests tunnelled through ngrok ──────────────────────
  // Next.js 15+ blocks requests from unrecognised external origins by default.
  // Without this, the dev server returns 403 for all JS/CSS chunks and API
  // calls coming via the ngrok tunnel, breaking hydration and interactivity.
  ...(isDev && {
    allowedDevOrigins: [
      "moodiness-skeletal-anchovy.ngrok-free.dev",
    ],
  }),
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;

