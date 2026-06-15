import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import { isRateLimited } from "@/lib/rate-limit";

/**
 * GET /api/instagram/connect
 *
 * Redirects the browser to Meta's OAuth authorization screen.
 * Visit this route once to kick off the Instagram login flow.
 *
 * Restricted to local development only.
 *
 * Required env vars:
 *   INSTAGRAM_APP_ID
 *   INSTAGRAM_REDIRECT_URI
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

  const appId = process.env.INSTAGRAM_APP_ID;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;

  if (!appId || !redirectUri) {
    return new Response(
      "Missing INSTAGRAM_APP_ID or INSTAGRAM_REDIRECT_URI env vars.",
      { status: 500 }
    );
  }

  // Generate cryptographically secure random state for CSRF protection
  const state = randomBytes(32).toString("hex");

  // Save the state in a secure HttpOnly cookie
  const cookieStore = await cookies();
  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    secure: false, // development only
    sameSite: "lax",
    maxAge: 3600, // 1 hour
    path: "/",
  });

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    scope: "instagram_business_basic",
    response_type: "code",
    state,
  });

  // Correct authorize endpoint for Instagram Login (not www.instagram.com)
  const authUrl = `https://api.instagram.com/oauth/authorize?${params.toString()}`;
  redirect(authUrl);
}
