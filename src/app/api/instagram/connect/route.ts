import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

/**
 * GET /api/instagram/connect
 *
 * Redirects the browser to Meta's OAuth authorization screen.
 * Visit this route once to kick off the Instagram login flow.
 *
 * Required env vars:
 *   INSTAGRAM_APP_ID
 *   INSTAGRAM_REDIRECT_URI
 */
export async function GET(_req: NextRequest) {
  const appId = process.env.INSTAGRAM_APP_ID;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;

  if (!appId || !redirectUri) {
    return new Response(
      "Missing INSTAGRAM_APP_ID or INSTAGRAM_REDIRECT_URI env vars.",
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    // instagram_business_basic is the correct scope for Instagram Login.
    // The old scopes (instagram_basic, pages_show_list) were Facebook Login
    // scopes deprecated on Jan 27 2025 — do not use them.
    scope: "instagram_business_basic",
    response_type: "code",
  });

  // Correct authorize endpoint for Instagram Login (not www.instagram.com)
  const authUrl = `https://api.instagram.com/oauth/authorize?${params.toString()}`;
  redirect(authUrl);
}
