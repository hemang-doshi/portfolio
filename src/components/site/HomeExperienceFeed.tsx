"use client";

import { useEffect, useState } from "react";

import type { InstagramPost, InstagramProfile } from "@/lib/instagram";

import { GoofyLoader, HomeExperienceShell } from "./HomeExperienceShell";

interface Feed {
  profile: InstagramProfile | null;
  posts: InstagramPost[];
}

const EMPTY: Feed = { profile: null, posts: [] };

/**
 * Loads the Instagram feed from /api/instagram/feed, so the page itself can be
 * static. Shows the same loader the shell uses while it waits; on any failure
 * the hero falls back to its built-in mock data.
 */
export function HomeExperienceFeed() {
  const [feed, setFeed] = useState<Feed | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram/feed")
      .then((res) => (res.ok ? (res.json() as Promise<Feed>) : EMPTY))
      .catch(() => EMPTY)
      .then((data) => {
        if (!cancelled) setFeed({ profile: data.profile ?? null, posts: data.posts ?? [] });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!feed) {
    return (
      <div className="fixed inset-0 z-50">
        <GoofyLoader />
      </div>
    );
  }
  return <HomeExperienceShell profile={feed.profile} posts={feed.posts} />;
}
