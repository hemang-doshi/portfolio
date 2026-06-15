"use client";

import { useCallback, useEffect, useState } from "react";

import type { InstagramPost, InstagramProfile } from "@/lib/instagram";
import { cn } from "@/lib/utils";

import { ContactBand } from "./ContactBand";
import { FooterTerminal } from "./FooterTerminal";
import { HeroExperience } from "./HeroExperience";
import { SiteNav } from "./SiteNav";
import { WorkSystem } from "./WorkSystem";
import { SpinningRope } from "../ui/SpinningRope";

interface HomeExperienceShellProps {
  profile: InstagramProfile | null;
  posts: InstagramPost[];
}

interface HomeExperienceShellFrameProps extends HomeExperienceShellProps {
  isReady: boolean;
  onInstagramReady?: () => void;
}

const STARTUP_ASSET_TIMEOUT_MS = 5000;

async function waitForPageAssets() {
  if (document.readyState === "loading") {
    await new Promise<void>((resolve) => {
      document.addEventListener("DOMContentLoaded", () => resolve(), { once: true });
    });
  }

  const imagePromises = Array.from(document.images).map((image) => {
    if (image.complete) return Promise.resolve();

    return new Promise<void>((resolve) => {
      image.addEventListener("load", () => resolve(), { once: true });
      image.addEventListener("error", () => resolve(), { once: true });
    });
  });

  const fontPromise =
    "fonts" in document ? document.fonts.ready.then(() => undefined) : Promise.resolve();

  await Promise.race([
    Promise.all([...imagePromises, fontPromise]).then(() => undefined),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, STARTUP_ASSET_TIMEOUT_MS);
    }),
  ]);
}

function GoofyLoader() {
  return (
    <div className="loader-goof flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="loader-goof__icon relative mb-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-aubergine/15 bg-white/70 shadow-[0_18px_50px_rgba(36,0,41,0.12)] backdrop-blur-sm">
        <div className="loader-goof__orbit absolute inset-2 rounded-full border-4 border-dashed border-aubergine/35" />
        <div className="loader-goof__face relative flex h-16 w-16 items-center justify-center rounded-full bg-aubergine text-white shadow-[inset_0_-8px_0_rgba(0,0,0,0.15)]">
          <span className="absolute left-4 top-5 h-2.5 w-2.5 rounded-full bg-glowstick" />
          <span className="absolute right-4 top-5 h-2.5 w-2.5 rounded-full bg-glowstick" />
          <span className="absolute bottom-4 h-3 w-6 rounded-b-full rounded-t-[999px] border-2 border-white border-t-0" />
        </div>
      </div>
      <p className="font-[var(--font-kaio)] text-[length:clamp(1.8rem,4vw,2.6rem)] tracking-[-0.03em] text-aubergine">
        Booting the goofy internet machine
      </p>
      <p className="mt-3 max-w-md text-[length:var(--text-body)] text-aubergine/70">
        Waiting for the Instagram feed, images, and first-load polish before the hero drops in.
      </p>
    </div>
  );
}

export function HomeExperienceShellFrame({
  isReady,
  profile,
  posts,
  onInstagramReady,
}: HomeExperienceShellFrameProps) {
  return (
    <>
      {!isReady ? (
        <div className="fixed inset-0 z-50">
          <GoofyLoader />
        </div>
      ) : null}
      <div
        data-site-shell="true"
        aria-hidden={!isReady}
        className={cn(
          "transition-opacity duration-500",
          isReady ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div id="top">
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SiteNav />
          <SpinningRope />
          <main id="main-content" className="relative">
            <HeroExperience
              profile={profile}
              posts={posts}
              isActive={isReady}
              onInstagramReady={onInstagramReady}
            />
            <WorkSystem />
            <ContactBand />
          </main>
          <FooterTerminal />
        </div>
      </div>
    </>
  );
}

export function HomeExperienceShell({
  profile,
  posts,
}: HomeExperienceShellProps) {
  const [pageAssetsReady, setPageAssetsReady] = useState(false);
  const [instagramReady, setInstagramReady] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const handleInstagramReady = useCallback(() => {
    setInstagramReady(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    waitForPageAssets().then(() => {
      if (cancelled) return;
      setPageAssetsReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!pageAssetsReady || !instagramReady) return;

    const frame = window.requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [instagramReady, pageAssetsReady]);

  useEffect(() => {
    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = isReady ? previousOverflow : "hidden";

    return () => {
      style.overflow = previousOverflow;
    };
  }, [isReady]);

  return (
    <HomeExperienceShellFrame
      isReady={isReady}
      profile={profile}
      posts={posts}
      onInstagramReady={handleInstagramReady}
    />
  );
}
