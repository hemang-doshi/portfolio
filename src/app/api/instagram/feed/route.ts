import { getInstagramSnapshot } from "@/lib/instagram-store";

/**
 * GET /api/instagram/feed
 *
 * The profile and posts the hero phone renders. Public data only (what anyone
 * sees on the Instagram profile), never the token.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const { profile, posts } = await getInstagramSnapshot();
  return Response.json(
    { profile, posts },
    { headers: { "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=3600" } },
  );
}
