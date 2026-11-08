import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: vi.fn(async () => {
    throw new Error("not on Cloudflare");
  }),
}));

import { rebuildSnapshot, refreshTokenIfDue, type InstagramEnv } from "./instagram-store";

function fakeKv(initial: Record<string, unknown> = {}) {
  const data = new Map(Object.entries(initial).map(([k, v]) => [k, JSON.stringify(v)]));
  return {
    data,
    kv: {
      get: vi.fn(async (key: string, type?: string) => {
        const raw = data.get(key);
        if (raw === undefined) return null;
        return type === "json" ? JSON.parse(raw) : raw;
      }),
      put: vi.fn(async (key: string, value: string) => {
        data.set(key, value);
      }),
    } as unknown as KVNamespace,
  };
}

const DAY = 86_400_000;

describe("Instagram token rotation", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("leaves a token refreshed this week alone", async () => {
    const { kv } = fakeKv({ token: { token: "t1", refreshedAt: Date.now() - DAY, expiresAt: 0 } });
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await refreshTokenIfDue({ INSTAGRAM: kv })).toBe("token fresh");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("seeds from the secret and stores the refreshed token, without reporting it", async () => {
    const { kv, data } = fakeKv();
    const fetchMock = vi.fn(async (_url: string) => Response.json({ access_token: "t2-new", expires_in: 60 * 86400 }));
    vi.stubGlobal("fetch", fetchMock);
    const env: InstagramEnv = { INSTAGRAM: kv, INSTAGRAM_ACCESS_TOKEN: "seed-token" };
    const result = await refreshTokenIfDue(env);
    expect(result).toBe("token refreshed, valid 60 days");
    expect(result).not.toContain("t2-new");
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain("grant_type=ig_refresh_token");
    expect(JSON.parse(data.get("token") ?? "{}").token).toBe("t2-new");
  });

  it("keeps the old token when Instagram refuses", async () => {
    const { kv, data } = fakeKv({ token: { token: "old", refreshedAt: Date.now() - 8 * DAY, expiresAt: 0 } });
    vi.stubGlobal("fetch", vi.fn(async () => new Response('{"error":{"message":"bad"}}', { status: 400 })));
    expect(await refreshTokenIfDue({ INSTAGRAM: kv })).toMatch(/^refresh failed: 400/);
    expect(JSON.parse(data.get("token") ?? "{}").token).toBe("old");
  });

  it("stores a snapshot of profile and posts", async () => {
    const { kv, data } = fakeKv({ token: { token: "t", refreshedAt: Date.now(), expiresAt: 0 } });
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) =>
        String(url).includes("/me/media")
          ? Response.json({ data: [{ id: "1", media_type: "IMAGE", permalink: "p", like_count: 1, comments_count: 0, timestamp: "t" }] })
          : Response.json({ id: "9", username: "hemangbuilds" }),
      ),
    );
    const snap = await rebuildSnapshot({ INSTAGRAM: kv });
    expect(snap?.profile?.username).toBe("hemangbuilds");
    expect(snap?.posts).toHaveLength(1);
    expect(JSON.parse(data.get("snapshot") ?? "{}").posts).toHaveLength(1);
  });
});
