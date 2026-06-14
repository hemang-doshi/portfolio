import { type NextRequest } from "next/server";

/**
 * GET /api/instagram/callback
 *
 * Meta redirects here after the user authorises your app.
 * This handler:
 *   1. Exchanges the short-lived `code` for a short-lived access token.
 *   2. Upgrades it to a long-lived token valid for 60 days.
 *   3. Prints the token + user_id to the server console so you can
 *      paste them into .env.local as INSTAGRAM_ACCESS_TOKEN / INSTAGRAM_USER_ID.
 *
 * Required env vars:
 *   META_APP_ID, META_APP_SECRET, META_REDIRECT_URI
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return new Response(
      `OAuth error: ${error ?? "no code returned"}\n${searchParams.get("error_description") ?? ""}`,
      { status: 400 }
    );
  }

  const appId = process.env.META_APP_ID!;
  const appSecret = process.env.META_APP_SECRET!;
  const redirectUri = process.env.META_REDIRECT_URI!;

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
    return new Response(`Token exchange failed: ${text}`, { status: 500 });
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
    return new Response(`Long-lived token exchange failed: ${text}`, { status: 500 });
  }

  const { access_token: longToken, expires_in } = (await longTokenRes.json()) as {
    access_token: string;
    token_type: string;
    expires_in: number;
  };

  const expiresInDays = Math.floor(expires_in / 86400);

  // ── Step 3: Print to console for copy-paste ──────────────────────────────
  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║           Instagram long-lived token obtained! ✅            ║");
  console.log("╠══════════════════════════════════════════════════════════════╣");
  console.log(`║  INSTAGRAM_ACCESS_TOKEN=${longToken}`);
  console.log(`║  INSTAGRAM_USER_ID=${user_id}`);
  console.log(`║  Expires in: ${expiresInDays} days`);
  console.log("╠══════════════════════════════════════════════════════════════╣");
  console.log("║  Paste both values into .env.local and restart the server.  ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");

  return new Response(
    [
      "✅ Instagram connected successfully!\n",
      "Copy the values below into your .env.local file, then restart the dev server:\n",
      `INSTAGRAM_ACCESS_TOKEN=${longToken}`,
      `INSTAGRAM_USER_ID=${user_id}`,
      `\nToken expires in ${expiresInDays} days.`,
      "\nYou can also refresh it any time via GET /api/instagram/refresh",
    ].join("\n"),
    {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    }
  );
}
