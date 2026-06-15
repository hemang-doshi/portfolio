import fs from "node:fs";
import path from "node:path";
import { type NextRequest } from "next/server";

import { isRateLimited } from "@/lib/rate-limit";

/**
 * GET /api/instagram/refresh
 *
 * Refreshes the long-lived Instagram access token.
 * Call this every ~50 days before the 60-day window expires.
 *
 * Protect this route with a secret header in production:
 *   Authorization: Bearer <CRON_SECRET>
 *
 * The refreshed token is automatically written to .env.local in development.
 *
 * Required env vars:
 *   INSTAGRAM_ACCESS_TOKEN
 *   CRON_SECRET (mandatory bearer authentication)
 */
export async function GET(req: NextRequest) {
  // Rate limiting: 10 requests per minute
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  if (isRateLimited(ip, 10, 60 * 1000)) {
    return new Response("Too many requests. Please try again later.", { status: 429 });
  }

  // Enforce CRON_SECRET authentication
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("[instagram/refresh] CRON_SECRET env var is not set.");
    return new Response("Server configuration error: CRON_SECRET is not set.", { status: 500 });
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!currentToken) {
    return new Response("INSTAGRAM_ACCESS_TOKEN is not set.", { status: 400 });
  }

  const params = new URLSearchParams({
    grant_type: "ig_refresh_token",
    access_token: currentToken,
  });

  const res = await fetch(
    `https://graph.instagram.com/refresh_access_token?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("[instagram/refresh] token refresh failed:", text);
    return new Response("Refresh failed. Check server logs.", { status: 500 });
  }

  const { access_token: newToken, expires_in } = (await res.json()) as {
    access_token: string;
    token_type: string;
    expires_in: number;
  };

  const expiresInDays = Math.floor(expires_in / 86400);

  // Automatically update .env.local in development mode
  let envUpdated = false;
  if (process.env.NODE_ENV === "development") {
    try {
      const envPath = path.join(process.cwd(), ".env.local");
      if (fs.existsSync(envPath)) {
        let content = fs.readFileSync(envPath, "utf-8");
        if (content.match(/^INSTAGRAM_ACCESS_TOKEN=.*/m)) {
          content = content.replace(/^INSTAGRAM_ACCESS_TOKEN=.*/m, `INSTAGRAM_ACCESS_TOKEN=${newToken}`);
          fs.writeFileSync(envPath, content, "utf-8");
          envUpdated = true;
        }
      }
    } catch (err) {
      console.error("[instagram/refresh] Failed to write to .env.local:", err);
    }
  }

  // Mask the token for logging
  const maskedToken = newToken.substring(0, 10) + "..." + newToken.substring(newToken.length - 8);

  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║           Instagram token refreshed! ✅                      ║");
  console.log("╠══════════════════════════════════════════════════════════════╣");
  console.log(`║  INSTAGRAM_ACCESS_TOKEN=${envUpdated ? "(Written to .env.local)" : maskedToken}`);
  console.log(`║  Expires in: ${expiresInDays} days`);
  console.log("╚══════════════════════════════════════════════════════════════╝\n");

  return new Response(
    JSON.stringify({
      success: true,
      expires_in_days: expiresInDays,
      access_token: newToken,
      env_updated: envUpdated,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}
