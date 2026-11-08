/**
 * Instagram data for the hero phone, kept fresh without redeploys.
 *
 * On Cloudflare Workers the long-lived Instagram token and a snapshot of the
 * profile + posts live in the INSTAGRAM KV namespace:
 *
 *   token     { token, refreshedAt, expiresAt }   rotated weekly by the cron
 *   snapshot  { profile, posts, fetchedAt }       rebuilt hourly by the cron
 *
 * Instagram's long-lived tokens last 60 days and can be refreshed any time
 * after they are 24 hours old, so a weekly refresh means the token never
 * expires. The INSTAGRAM_ACCESS_TOKEN secret only seeds the first token.
 *
 * Anywhere without Cloudflare bindings (next dev without them, tests, the old
 * Vercel deployment) this falls back to fetching live with the env token.
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";

import {
  getInstagramMedia,
  getInstagramProfile,
  type InstagramPost,
  type InstagramProfile,
} from "./instagram";

export interface InstagramSnapshot {
  profile: InstagramProfile | null;
  posts: InstagramPost[];
  fetchedAt: number;
}

interface StoredToken {
  token: string;
  refreshedAt: number;
  expiresAt: number;
}

export interface InstagramEnv {
  INSTAGRAM?: KVNamespace;
  INSTAGRAM_ACCESS_TOKEN?: string;
}

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
/** Serve a snapshot this old without rebuilding it on the request path. */
const SNAPSHOT_MAX_AGE = 2 * HOUR;
/** Rotate the token once it is this old. */
const TOKEN_REFRESH_AFTER = 7 * DAY;
const NO_STORE: RequestInit = { cache: "no-store" };

async function cloudflareEnv(): Promise<InstagramEnv | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env as unknown as InstagramEnv;
  } catch {
    return null;
  }
}

async function readToken(env: InstagramEnv): Promise<string | null> {
  const stored = await env.INSTAGRAM?.get<StoredToken>("token", "json");
  return stored?.token || env.INSTAGRAM_ACCESS_TOKEN || process.env.INSTAGRAM_ACCESS_TOKEN || null;
}

/** Fetches profile and posts with the current token and stores them. Returns null if Instagram said no. */
export async function rebuildSnapshot(env: InstagramEnv): Promise<InstagramSnapshot | null> {
  const token = await readToken(env);
  if (!token) return null;
  const [profile, posts] = await Promise.all([
    getInstagramProfile(token, NO_STORE),
    getInstagramMedia(undefined, token, NO_STORE),
  ]);
  if (!profile) return null;
  const snapshot: InstagramSnapshot = { profile, posts, fetchedAt: Date.now() };
  await env.INSTAGRAM?.put("snapshot", JSON.stringify(snapshot));
  return snapshot;
}

/**
 * Exchanges the token for a fresh 60-day one when it is a week old.
 * Returns what happened, for the cron's log. Never logs the token.
 */
export async function refreshTokenIfDue(env: InstagramEnv, now = Date.now()): Promise<string> {
  if (!env.INSTAGRAM) return "no KV binding";
  const stored = await env.INSTAGRAM.get<StoredToken>("token", "json");
  if (stored && now - stored.refreshedAt < TOKEN_REFRESH_AFTER) return "token fresh";
  const current = await readToken(env);
  if (!current) return "no token";
  const params = new URLSearchParams({ grant_type: "ig_refresh_token", access_token: current });
  const res = await fetch(`https://graph.instagram.com/refresh_access_token?${params}`, NO_STORE);
  if (!res.ok) {
    // Meta's error names the problem, never echoes the token.
    return `refresh failed: ${res.status} ${(await res.text()).slice(0, 200)}`;
  }
  const { access_token, expires_in } = (await res.json()) as { access_token: string; expires_in: number };
  const next: StoredToken = { token: access_token, refreshedAt: now, expiresAt: now + expires_in * 1000 };
  await env.INSTAGRAM.put("token", JSON.stringify(next));
  return `token refreshed, valid ${Math.floor(expires_in / 86400)} days`;
}

/** What the hero phone shows. Cheap on the request path: one KV read. */
export async function getInstagramSnapshot(): Promise<Omit<InstagramSnapshot, "fetchedAt">> {
  const env = await cloudflareEnv();
  if (!env?.INSTAGRAM) {
    const [profile, posts] = await Promise.all([getInstagramProfile(), getInstagramMedia()]);
    return { profile, posts };
  }
  const cached = await env.INSTAGRAM.get<InstagramSnapshot>("snapshot", "json");
  if (cached && Date.now() - cached.fetchedAt < SNAPSHOT_MAX_AGE) return cached;
  const fresh = await rebuildSnapshot(env).catch(() => null);
  return fresh ?? cached ?? { profile: null, posts: [] };
}
