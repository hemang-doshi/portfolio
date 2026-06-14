import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

/**
 * GET /api/instagram/connect
 *
 * Redirects the browser to Meta's OAuth authorization screen.
 * Visit this route once to kick off the Instagram login flow.
 *
 * Required env vars:
 *   META_APP_ID
 *   META_REDIRECT_URI
 */
export async function GET(_req: NextRequest) {
  const appId = process.env.META_APP_ID;
  const redirectUri = process.env.META_REDIRECT_URI;

  if (!appId || !redirectUri) {
    return new Response(
      "Missing META_APP_ID or META_REDIRECT_URI env vars.",
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    scope: "instagram_basic,pages_show_list",
    response_type: "code",
  });

  const authUrl = `https://www.instagram.com/oauth/authorize?${params.toString()}`;
  redirect(authUrl);
}
