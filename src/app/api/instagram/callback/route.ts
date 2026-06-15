import fs from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

import { isRateLimited } from "@/lib/rate-limit";

/**
 * GET /api/instagram/callback
 *
 * Meta redirects here after the user authorises your app.
 * This handler:
 *   1. Validates the CSRF `state` parameter against the cookie.
 *   2. Exchanges the short-lived `code` for a short-lived access token.
 *   3. Upgrades it to a long-lived token valid for 60 days.
 *   4. Automatically writes the token to `.env.local` to avoid exposing secrets.
 *
 * Restricted to local development only.
 *
 * Required env vars:
 *   INSTAGRAM_APP_ID, INSTAGRAM_APP_SECRET, INSTAGRAM_REDIRECT_URI
 */
export async function GET(req: NextRequest) {
  // Rate limiting: 10 requests per minute
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  if (isRateLimited(ip, 10, 60 * 1000)) {
    return new Response("Too many requests. Please try again later.", { status: 429 });
  }

  // Restrict to development mode only
  if (process.env.NODE_ENV !== "development") {
    return new Response("Forbidden. This route is restricted to local development.", { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return new Response(
      `OAuth error: ${error ?? "no code returned"}\n${searchParams.get("error_description") ?? ""}`,
      { status: 400 }
    );
  }

  // Verify the CSRF state parameter
  const cookieStore = await cookies();
  const cookieState = cookieStore.get("oauth_state")?.value;
  const queryState = searchParams.get("state");
  if (!cookieState || cookieState !== queryState) {
    return new Response("Invalid state parameter. Possible CSRF attack.", { status: 403 });
  }

  const appId = process.env.INSTAGRAM_APP_ID;
  const appSecret = process.env.INSTAGRAM_APP_SECRET;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;

  if (!appId || !appSecret || !redirectUri) {
    return new Response("Server configuration error: missing environment variables.", { status: 500 });
  }

  // ── Step 1: Exchange code → short-lived token ──────────────────────────────
  const tokenRes = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: appId,
      client_secret: appSecret,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code,
    }),
    cache: "no-store",
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    console.error("[instagram/callback] short-lived token exchange failed:", text);
    return new Response("Token exchange failed. Check server logs.", { status: 500 });
  }

  const { access_token: shortToken, user_id } = (await tokenRes.json()) as {
    access_token: string;
    user_id: string;
  };

  // ── Step 2: Upgrade → long-lived token (60 days) ──────────────────────────
  const longTokenParams = new URLSearchParams({
    grant_type: "ig_exchange_token",
    client_secret: appSecret,
    access_token: shortToken,
  });

  const longTokenRes = await fetch(
    `https://graph.instagram.com/access_token?${longTokenParams.toString()}`,
    { cache: "no-store" }
  );

  if (!longTokenRes.ok) {
    const text = await longTokenRes.text();
    console.error("[instagram/callback] long-lived token exchange failed:", text);
    return new Response("Long-lived token exchange failed. Check server logs.", { status: 500 });
  }

  const { access_token: longToken, expires_in } = (await longTokenRes.json()) as {
    access_token: string;
    token_type: string;
    expires_in: number;
  };

  const expiresInDays = Math.floor(expires_in / 86400);

  // ── Step 3: Automatically write/update .env.local ──────────────────────────
  let envUpdated = false;
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      let content = fs.readFileSync(envPath, "utf-8");

      // Replace or append INSTAGRAM_ACCESS_TOKEN
      if (content.match(/^INSTAGRAM_ACCESS_TOKEN=.*/m)) {
        content = content.replace(/^INSTAGRAM_ACCESS_TOKEN=.*/m, `INSTAGRAM_ACCESS_TOKEN=${longToken}`);
      } else {
        content += `\nINSTAGRAM_ACCESS_TOKEN=${longToken}`;
      }

      // Replace or append INSTAGRAM_USER_ID
      if (content.match(/^INSTAGRAM_USER_ID=.*/m)) {
        content = content.replace(/^INSTAGRAM_USER_ID=.*/m, `INSTAGRAM_USER_ID=${user_id}`);
      } else {
        content += `\nINSTAGRAM_USER_ID=${user_id}`;
      }

      fs.writeFileSync(envPath, content, "utf-8");
      envUpdated = true;
    }
  } catch (err) {
    console.error("[instagram/callback] Failed to update .env.local:", err);
  }

  // Mask the token for logging
  const maskedToken = longToken.substring(0, 10) + "..." + longToken.substring(longToken.length - 8);

  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║           Instagram long-lived token obtained! ✅            ║");
  console.log("╠══════════════════════════════════════════════════════════════╣");
  console.log(`║  INSTAGRAM_ACCESS_TOKEN=${envUpdated ? "(Written to .env.local)" : maskedToken}`);
  console.log(`║  INSTAGRAM_USER_ID=${user_id}`);
  console.log(`║  Expires in: ${expiresInDays} days`);
  console.log("╚══════════════════════════════════════════════════════════════╝\n");

  const responseBody = envUpdated
    ? [
        "✅ Instagram connected successfully!",
        "The new token and user ID have been written to your `.env.local` file.",
        "Please restart your development server to apply the changes.",
      ].join("\n")
    : [
        "✅ Instagram connected successfully!",
        "Please update your `.env.local` manually with these values:",
        `INSTAGRAM_ACCESS_TOKEN=${longToken}`,
        `INSTAGRAM_USER_ID=${user_id}`,
        "Then restart your development server.",
      ].join("\n");

  return new Response(responseBody, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
