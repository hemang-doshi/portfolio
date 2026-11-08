/**
 * Instagram Graph API v25.0 — typed fetcher
 *
 * Fetches real profile + media from Meta's Graph API using a long-lived
 * Instagram User Access Token stored in INSTAGRAM_ACCESS_TOKEN env var.
 *
 * Falls back to null when the token is missing so the hero component can
 * gracefully render its built-in mock data during local dev.
 */

const GRAPH_BASE = "https://graph.instagram.com/v25.0";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InstagramProfile {
  id: string;
  username: string;
  name: string;
  biography: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
  profile_picture_url: string;
}

export interface InstagramPost {
  id: string;
  /** IMAGE, VIDEO, or CAROUSEL_ALBUM */
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  /** FEED, REELS or STORY */
  media_product_type?: "FEED" | "REELS" | "STORY" | "AD";
  caption?: string;
  /** Lifetime views, when the token can read insights. */
  views?: number;
  /** Direct URL to the image/video. May be absent on copyright-flagged content. */
  media_url?: string;
  /** Only present on VIDEO posts */
  thumbnail_url?: string;
  permalink: string;
  /** null if the owner has hidden like counts */
  like_count: number | null;
  comments_count: number;
  timestamp: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getToken(): string | null {
  return process.env.INSTAGRAM_ACCESS_TOKEN || null;
}

/** Returns the best thumbnail URL for a post regardless of media type */
export function getPostThumbnail(post: InstagramPost): string | undefined {
  // VIDEO: prefer thumbnail_url, fall back to media_url
  // IMAGE / CAROUSEL_ALBUM: use media_url
  return post.thumbnail_url ?? post.media_url;
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

/**
 * Fetch the authenticated user's Instagram profile.
 * Cached for 1 hour (ISR-style via Next.js fetch cache).
 * Returns null if INSTAGRAM_ACCESS_TOKEN is not set.
 */
export async function getInstagramProfile(
  token: string | null = getToken(),
  init: RequestInit = { next: { revalidate: 3600 } },
): Promise<InstagramProfile | null> {
  if (!token) return null;

  try {
    const fields = [
      "id",
      "username",
      "name",
      "biography",
      "followers_count",
      "follows_count",
      "media_count",
      "profile_picture_url",
    ].join(",");

    const url = `${GRAPH_BASE}/me?fields=${fields}&access_token=${token}`;
    const res = await fetch(url, init);

    if (!res.ok) {
      console.error("[instagram] profile fetch failed:", res.status, await res.text());
      return null;
    }

    return (await res.json()) as InstagramProfile;
  } catch (err) {
    console.error("[instagram] profile fetch error:", err);
    return null;
  }
}

interface InstagramMediaResponse {
  data?: InstagramPost[];
  paging?: {
    next?: string;
  };
}

/**
 * Fetch the authenticated user's posts, paging until exhaustion unless an
 * optional `limit` is provided.
 * Cached for 1 hour. Returns empty array on any error.
 */
export async function getInstagramMedia(
  limit?: number,
  token: string | null = getToken(),
  init: RequestInit = { next: { revalidate: 3600 } },
): Promise<InstagramPost[]> {
  if (!token) return [];

  try {
    const fields = [
      "id",
      "media_type",
      "media_product_type",
      "caption",
      "media_url",
      "thumbnail_url",
      "permalink",
      "like_count",
      "comments_count",
      "timestamp",
    ].join(",");

    const pageSize = limit ? Math.min(limit, 100) : 100;
    let nextUrl =
      `${GRAPH_BASE}/me/media?fields=${fields}&limit=${pageSize}&access_token=${token}`;
    const posts: InstagramPost[] = [];

    while (nextUrl && (limit === undefined || posts.length < limit)) {
      const res = await fetch(nextUrl, init);

      if (!res.ok) {
        console.error("[instagram] media fetch failed:", res.status, await res.text());
        return [];
      }

      const json = (await res.json()) as InstagramMediaResponse;
      const batch = json.data ?? [];

      if (limit !== undefined && posts.length + batch.length > limit) {
        posts.push(...batch.slice(0, limit - posts.length));
        break;
      }

      posts.push(...batch);
      nextUrl = json.paging?.next ?? "";
    }

    return posts;
  } catch (err) {
    console.error("[instagram] media fetch error:", err);
    return [];
  }
}

// ─── Insights (needs instagram_business_manage_insights) ─────────────────────

/** Total views across the account over the last `days` days (max 30), or null if unavailable. */
export async function getAccountViews(
  days: number,
  token: string | null = getToken(),
  init: RequestInit = { next: { revalidate: 3600 } },
): Promise<number | null> {
  if (!token) return null;
  const until = Math.floor(Date.now() / 1000);
  const since = until - Math.min(days, 30) * 86400;
  const params = new URLSearchParams({
    metric: "views",
    period: "day",
    metric_type: "total_value",
    since: String(since),
    until: String(until),
    access_token: token,
  });
  try {
    const res = await fetch(`${GRAPH_BASE}/me/insights?${params}`, init);
    if (!res.ok) {
      console.error("[instagram] account insights failed:", res.status, (await res.text()).slice(0, 200));
      return null;
    }
    const json = (await res.json()) as { data?: Array<{ name: string; total_value?: { value?: number } }> };
    const value = json.data?.find((m) => m.name === "views")?.total_value?.value;
    return typeof value === "number" ? value : null;
  } catch (err) {
    console.error("[instagram] account insights error:", err);
    return null;
  }
}

/** Lifetime views for each media id. Ids Instagram won't answer for are left out. */
export async function getMediaViews(
  ids: string[],
  token: string | null = getToken(),
  init: RequestInit = { next: { revalidate: 3600 } },
): Promise<Record<string, number>> {
  if (!token || ids.length === 0) return {};
  const entries = await Promise.all(
    ids.map(async (id): Promise<[string, number] | null> => {
      try {
        const res = await fetch(`${GRAPH_BASE}/${id}/insights?metric=views&access_token=${token}`, init);
        if (!res.ok) return null;
        const json = (await res.json()) as {
          data?: Array<{ name: string; values?: Array<{ value?: number }>; total_value?: { value?: number } }>;
        };
        const m = json.data?.find((d) => d.name === "views");
        const value = m?.values?.[0]?.value ?? m?.total_value?.value;
        return typeof value === "number" ? [id, value] : null;
      } catch {
        return null;
      }
    }),
  );
  return Object.fromEntries(entries.filter((e): e is [string, number] => e !== null));
}
