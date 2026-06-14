import { type NextRequest } from "next/server";

/**
 * GET /api/instagram/refresh
 *
 * Refreshes the long-lived Instagram access token.
 * Call this every ~50 days before the 60-day window expires.
 *
 * Protect this route with a secret header in production:
 *   Authorization: Bearer <CRON_SECRET>
 *
 * The refreshed token is printed to the console — paste it into .env.local.
 *
 * Required env vars:
 *   INSTAGRAM_ACCESS_TOKEN
 * Optional:
 *   CRON_SECRET (if set, enforces bearer auth)
 */
export async function GET(req: NextRequest) {
  // Optional auth guard
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return new Response("Unauthorized", { status: 401 });
    }
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
    return new Response(`Refresh failed: ${text}`, { status: 500 });
  }

  const { access_token: newToken, expires_in } = (await res.json()) as {
    access_token: string;
    token_type: string;
    expires_in: number;
  };

  const expiresInDays = Math.floor(expires_in / 86400);

  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║           Instagram token refreshed! ✅                      ║");
  console.log("╠══════════════════════════════════════════════════════════════╣");
  console.log(`║  INSTAGRAM_ACCESS_TOKEN=${newToken}`);
  console.log(`║  Expires in: ${expiresInDays} days`);
  console.log("╠══════════════════════════════════════════════════════════════╣");
  console.log("║  Update INSTAGRAM_ACCESS_TOKEN in .env.local                ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");

  return new Response(
    [
      "✅ Token refreshed!\n",
      `New INSTAGRAM_ACCESS_TOKEN=${newToken}`,
      `\nExpires in ${expiresInDays} days.`,
    ].join("\n"),
    {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    }
  );
}
