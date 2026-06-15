import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { GET as connectGET } from "./connect/route";
import { GET as callbackGET } from "./callback/route";
import { GET as refreshGET } from "./refresh/route";
import { NextRequest } from "next/server";

// Mock cookies and redirect
const mockSet = vi.fn();
const mockGet = vi.fn();
vi.mock("next/headers", () => {
  return {
    cookies: vi.fn(async () => ({
      set: mockSet,
      get: mockGet,
    })),
  };
});

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`Redirected to: ${url}`);
  }),
}));

describe("Instagram API Routes Security Guards", () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    mockSet.mockClear();
    mockGet.mockClear();
  });

  afterEach(() => {
    vi.stubEnv("NODE_ENV", originalEnv);
    vi.restoreAllMocks();
  });

  it("connect route returns 403 Forbidden in production mode", async () => {
    const req = new NextRequest("http://localhost/api/instagram/connect");
    const res = await connectGET(req);
    expect(res.status).toBe(403);
    const body = await res.text();
    expect(body).toContain("restricted to local development");
  });

  it("callback route returns 403 Forbidden in production mode", async () => {
    const req = new NextRequest("http://localhost/api/instagram/callback");
    const res = await callbackGET(req);
    expect(res.status).toBe(403);
    const body = await res.text();
    expect(body).toContain("restricted to local development");
  });

  it("refresh route returns 500 when CRON_SECRET is not configured", async () => {
    vi.stubEnv("CRON_SECRET", "");
    const req = new NextRequest("http://localhost/api/instagram/refresh");
    const res = await refreshGET(req);
    expect(res.status).toBe(500);
    const body = await res.text();
    expect(body).toContain("CRON_SECRET is not set");
  });

  it("refresh route returns 401 when CRON_SECRET mismatch occurs", async () => {
    vi.stubEnv("CRON_SECRET", "super-secret");
    const req = new NextRequest("http://localhost/api/instagram/refresh", {
      headers: { authorization: "Bearer wrong-secret" },
    });
    const res = await refreshGET(req);
    expect(res.status).toBe(401);
  });
});
