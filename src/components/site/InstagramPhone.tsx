"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  AtSign,
  BatteryFull,
  ChevronDown,
  Clapperboard,
  Eye,
  Grid3X3,
  Heart,
  Home,
  Link as LinkIcon,
  Menu,
  MessageCircle,
  Plus,
  Search,
  Send,
  SignalHigh,
  UserRound,
  Wifi,
} from "lucide-react";

import type { InstagramProfile, InstagramPost } from "@/lib/instagram";
import { getPostThumbnail } from "@/lib/instagram";

import { ProfileMusicPlayer } from "./ProfileMusicPlayer";

export interface InstagramPhoneProps {
  profile?: InstagramProfile | null;
  posts?: InstagramPost[];
  onReady?: () => void;
}

const MOCK_PROFILE = {
  username: "hemang._26",
  biography: "Just a guy in his 20s figuring it out",
  followers_count: 843,
  follows_count: 852,
  media_count: 17,
  profile_picture_url: null as string | null,
};

const MOCK_POSTS = [
  {
    accent: "from-[#f9d7e8] via-[#fff2c8] to-[#f3c8ff]",
    shape: "rounded-[28px] bg-[radial-gradient(circle_at_28%_28%,rgba(255,255,255,0.88),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.18),transparent_60%)]",
    views: "1,974",
    type: "video" as const,
  },
  {
    accent: "from-[#d8ecff] via-[#eef5ff] to-[#dbeafe]",
    shape: "rounded-[999px] bg-[linear-gradient(135deg,rgba(255,255,255,0.78),transparent_55%),radial-gradient(circle_at_70%_72%,rgba(15,23,42,0.18),transparent_34%)]",
    views: "2,881",
    type: "carousel" as const,
  },
  {
    accent: "from-[#fde68a] via-[#fff7d6] to-[#fbcfe8]",
    shape: "rounded-[18px] bg-[linear-gradient(180deg,rgba(17,24,39,0.12),transparent_58%),radial-gradient(circle_at_42%_38%,rgba(255,255,255,0.88),transparent_30%)]",
    views: "4,894",
    type: "carousel" as const,
  },
  {
    accent: "from-[#e2e8f0] via-[#f8fafc] to-[#cbd5e1]",
    shape: "rounded-[26px] bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.92),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.12),transparent_62%)]",
    views: "1,240",
    type: "video" as const,
  },
  {
    accent: "from-[#fbcfe8] via-[#fdf2f8] to-[#fecdd3]",
    shape: "rounded-[22px] bg-[linear-gradient(135deg,rgba(255,255,255,0.78),transparent_52%),radial-gradient(circle_at_34%_70%,rgba(17,24,39,0.18),transparent_32%)]",
    views: "982",
    type: "image" as const,
  },
  {
    accent: "from-[#dbeafe] via-[#eff6ff] to-[#bfdbfe]",
    shape: "rounded-[999px] bg-[radial-gradient(circle_at_30%_32%,rgba(255,255,255,0.95),transparent_26%),linear-gradient(150deg,rgba(15,23,42,0.14),transparent_62%)]",
    views: "3,310",
    type: "carousel" as const,
  },
  {
    accent: "from-[#fff1bd] via-[#fef9c3] to-[#fde68a]",
    shape: "rounded-[18px] bg-[linear-gradient(180deg,rgba(15,23,42,0.14),transparent_58%),radial-gradient(circle_at_72%_38%,rgba(255,255,255,0.88),transparent_30%)]",
    views: "2,204",
    type: "video" as const,
  },
  {
    accent: "from-[#ede9fe] via-[#f5f3ff] to-[#ddd6fe]",
    shape: "rounded-[24px] bg-[radial-gradient(circle_at_48%_34%,rgba(255,255,255,0.95),transparent_28%),linear-gradient(135deg,rgba(30,41,59,0.16),transparent_58%)]",
    views: "4,192",
    type: "carousel" as const,
  },
  {
    accent: "from-[#fee2e2] via-[#fff7ed] to-[#fde68a]",
    shape: "rounded-[30px] bg-[linear-gradient(135deg,rgba(255,255,255,0.78),transparent_56%),radial-gradient(circle_at_68%_72%,rgba(17,24,39,0.14),transparent_30%)]",
    views: "1,550",
    type: "image" as const,
  },
];

const INSTAGRAM_ASSET_TIMEOUT_MS = 5000;

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export function InstagramPhone({
  profile = null,
  posts = [],
  onReady,
}: InstagramPhoneProps) {
  const displayUsername = profile?.username ?? MOCK_PROFILE.username;
  const displayBio = profile?.biography ?? MOCK_PROFILE.biography;
  const displayFollowers = profile?.followers_count ?? MOCK_PROFILE.followers_count;
  const displayFollowing = profile?.follows_count ?? MOCK_PROFILE.follows_count;
  const displayPosts = profile?.media_count ?? MOCK_PROFILE.media_count;
  const profilePicUrl = profile?.profile_picture_url ?? null;
  const hasRealPosts = posts.length > 0;

  useEffect(() => {
    const mediaUrls = [
      profilePicUrl,
      ...posts.map((post) => getPostThumbnail(post) ?? null),
    ].filter((url): url is string => Boolean(url));

    if (mediaUrls.length === 0) {
      onReady?.();
      return;
    }

    let cancelled = false;
    let completed = 0;
    let finished = false;
    const uniqueUrls = [...new Set(mediaUrls)];

    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      onReady?.();
    };

    const settle = () => {
      completed += 1;
      if (completed >= uniqueUrls.length) {
        finish();
      }
    };

    const pendingImages = uniqueUrls.map((url) => {
      const img = new window.Image();
      let isSettled = false;
      const finish = () => {
        if (isSettled) return;
        isSettled = true;
        settle();
      };

      img.onload = finish;
      img.onerror = finish;
      img.src = url;

      if (img.complete) {
        queueMicrotask(finish);
      }

      return img;
    });

    const timeoutId = window.setTimeout(finish, INSTAGRAM_ASSET_TIMEOUT_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      pendingImages.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [onReady, posts, profilePicUrl]);

  return (
    <div className="instagram-phone-anim relative w-[292px] h-[635px] sm:w-[310px] sm:h-[674px]">
      <div className="pointer-events-none absolute -left-[3px] top-[118px] h-14 w-[3px] rounded-l-full bg-black/80 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]" />
      <div className="pointer-events-none absolute -left-[3px] top-[184px] h-24 w-[3px] rounded-l-full bg-black/80 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]" />
      <div className="pointer-events-none absolute -right-[3px] top-[170px] h-20 w-[3px] rounded-r-full bg-black/80 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]" />

      <div className="relative h-full w-full rounded-[42px] bg-[#080808] p-[7px] shadow-[0_12px_36px_rgba(15,23,42,0.12)] sm:shadow-[0_24px_70px_rgba(15,23,42,0.28),0_10px_24px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="absolute inset-[2px] rounded-[40px] border border-white/[0.08]" />

        <div className="relative h-full w-full overflow-hidden rounded-[35px] bg-white dark:bg-black">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.72),transparent)] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0.94),rgba(0,0,0,0.74),transparent)]" />
          <div className="pointer-events-none absolute left-1/2 top-2.5 z-40 h-7 w-[116px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]" />

          <div className="relative z-20 flex h-full flex-col overflow-hidden rounded-[35px] border border-black/5 bg-white/92 dark:border-white/6 dark:bg-black/96">
            
            {/* Top Status Bar (Perfectly aligned with dynamic island notch, battery closer to right) */}
            <div className="relative z-30 flex h-7 items-center justify-between pl-5 pr-3.5 mt-2.5 text-[10px] font-semibold text-[#111827] dark:text-[#f8fafc]">
              <span>11:15</span>
              <div className="flex items-center gap-1.5">
                <SignalHigh className="size-3.5" aria-label="Cellular signal" />
                <Wifi className="size-3.5" aria-label="Wi-Fi signal" />
                <div className="flex items-center gap-0.5" aria-label="Battery level">
                  <span className="text-[9px]">67</span>
                  <BatteryFull className="size-[18px]" />
                </div>
              </div>
            </div>

            {/* Profile Header Row (threads @ icon moved to the top right next to hamburger) */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2 text-[#111827] dark:text-[#f8fafc]">
              <Plus className="size-5 cursor-pointer" aria-label="Create post" />
              
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="font-sans text-[14px] font-bold tracking-[-0.01em]">
                  {displayUsername}
                </span>
                <ChevronDown className="size-3.5" />
                <span className="size-1.5 rounded-full bg-[#ff3040]" />
              </div>
              
              <div className="flex items-center gap-3">
                <AtSign className="size-5 cursor-pointer text-[#111827] dark:text-white" aria-label="Threads" />
                <Menu className="size-5 cursor-pointer" aria-label="Open menu" />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto px-4 pb-20 no-scrollbar">
              
              {/* Profile Avatar and Stats (Centered spacing & clean alignment, no notes bubble) */}
              <div className="flex items-center justify-between mt-5 px-1">
                <div className="relative size-[74px] shrink-0">
                  <div className="relative size-full rounded-full border border-black/10 p-[1px] dark:border-white/10">
                    {profilePicUrl ? (
                      <Image
                        src={profilePicUrl}
                        alt={`${displayUsername}'s Instagram profile picture`}
                        width={74}
                        height={74}
                        className="size-full rounded-full object-cover"
                        unoptimized={false}
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center rounded-full bg-[#efefef] dark:bg-[#262626] text-[15px] font-semibold text-[#111827] dark:text-[#f8fafc]">
                        HD
                      </div>
                    )}
                    
                    {/* Add to note blue plus badge */}
                    <div className="absolute bottom-0 right-0 flex size-5 items-center justify-center rounded-full border-2 border-white bg-[#0095f6] dark:border-black">
                      <Plus className="size-3 text-white stroke-[3.5]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-around flex-1 pl-4 text-center text-[#111827] dark:text-[#f8fafc] self-center">
                  <div>
                    <div className="text-[13px] font-bold">{formatCount(displayPosts)}</div>
                    <div className="text-[10px] text-[#6b7280] dark:text-[#a8a8a8]">posts</div>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold">{formatCount(displayFollowers)}</div>
                    <div className="text-[10px] text-[#6b7280] dark:text-[#a8a8a8]">followers</div>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold">{formatCount(displayFollowing)}</div>
                    <div className="text-[10px] text-[#6b7280] dark:text-[#a8a8a8]">following</div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="mt-4 text-[11px] leading-relaxed text-[#111827] dark:text-white">
                <div className="font-bold text-[12px]">{profile?.name ?? "Hemang"}</div>
                <div className="font-medium text-[#6b7280] dark:text-[#a8a8a8]">Digital creator</div>
                <p className="mt-0.5">{displayBio}</p>
                
                {/* Link */}
                <div className="mt-1 flex items-center gap-1">
                  <LinkIcon className="size-3 text-[#0095f6] shrink-0" />
                  <a
                    href="https://hemang-portfolio-zeta.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#0095f6] hover:underline"
                  >
                    hemang-portfolio-zeta.vercel.app
                  </a>
                </div>

                {/* Music Player Row (Tiny song pill, add button removed) */}
                <div className="mt-2.5 flex items-center" data-floating-player-anchor="true">
                  <ProfileMusicPlayer
                    src="/audio/night-drive.mp3"
                    title="made for this shit"
                    artist="Gunna"
                  />
                </div>
              </div>

              {/* Professional Dashboard Card */}
              <div className="mt-4 rounded-[10px] bg-[#f2f2f7] p-2.5 border border-black/5 dark:border-white/5 dark:bg-[#1c1c1e] text-[11px]">
                <div className="font-bold text-[#111827] dark:text-white">Professional dashboard</div>
                <div className="mt-0.5 flex items-center gap-1 text-[#6b7280] dark:text-[#a8a8a8]">
                  <span className="text-emerald-500 font-bold">↗</span>
                  <span>3.3K views in the last 30 days.</span>
                </div>
              </div>

              {/* Action Buttons: Follow / Message (Even vertical spacing on top and bottom) */}
              <div className="mt-3 mb-2 grid grid-cols-2 gap-2">
                <a
                  href={`https://instagram.com/${encodeURIComponent(displayUsername)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-[32px] items-center justify-center rounded-[8px] bg-[#0095f6] text-[12px] font-bold text-white transition-opacity hover:opacity-90"
                >
                  Follow
                </a>
                <button
                  type="button"
                  className="flex h-[32px] items-center justify-center rounded-[8px] bg-[#efefef] dark:bg-[#262626] text-[12px] font-bold text-[#111827] dark:text-white hover:bg-[#dbdbdb] dark:hover:bg-[#363636] border border-black/5 dark:border-white/5 transition-colors"
                >
                  Message
                </button>
              </div>

              {/* Tabs Grid Header (Reduced top gap to border line) */}
              <div className="mt-2 grid grid-cols-4 border-t border-black/10 pt-2 text-[#6b7280] dark:border-white/10 dark:text-[#a8a8a8]">
                <div className="flex flex-col items-center justify-center pb-2 border-b-2 border-black dark:border-white -mb-[10px] z-10">
                  <Grid3X3 className="size-[19px] text-[#111827] dark:text-white" aria-label="Posts tab" />
                </div>
                <div className="flex items-center justify-center pb-2">
                  <Clapperboard className="size-[19px]" aria-label="Reels tab" />
                </div>
                <div className="flex items-center justify-center pb-2">
                  {/* Standard Repost/Retweet Icon */}
                  <svg className="size-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-label="Reposts tab">
                    <path d="M17 1l4 4-4 4" />
                    <path d="M3 10V9a4 4 0 014-4h14" />
                    <path d="M7 23l-4-4 4-4" />
                    <path d="M21 14v1a4 4 0 01-4 4H3" />
                  </svg>
                </div>
                <div className="flex items-center justify-center pb-2">
                  <UserRound className="size-[19px]" aria-label="Tagged tab" />
                </div>
              </div>

              {/* Posts Grid Container */}
              <div className="mt-3 grid grid-cols-3 gap-[2px]">
                {hasRealPosts
                  ? posts.map((post) => {
                      const thumb = getPostThumbnail(post);
                      return (
                        <a
                          key={post.id}
                          href={post.permalink}
                          target="_blank"
                          rel="noreferrer"
                          className="ig-post-anim group relative aspect-square overflow-hidden bg-[#f8fafc] dark:bg-[#172133]"
                        >
                          {thumb ? (
                            <Image
                              src={thumb}
                              alt="Instagram post"
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-[linear-gradient(145deg,#f6d4e3,#fff1bd_45%,#e2e8f0)] dark:bg-[linear-gradient(145deg,#1f2937,#334155_45%,#0f172a)]">
                              <div className="absolute inset-[14%] rounded-[20px] bg-[radial-gradient(circle_at_35%_32%,rgba(255,255,255,0.88),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.18),transparent_58%)]" />
                            </div>
                          )}
                          
                          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#0f172a]/74 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-20">
                            <span className="flex items-center gap-1 text-[9px] font-semibold text-white">
                              <Heart className="size-3.5" aria-hidden="true" />
                              {post.like_count ?? "—"}
                            </span>
                            <span className="flex items-center gap-1 text-[9px] font-semibold text-white">
                              <MessageCircle className="size-3.5" aria-hidden="true" />
                              {post.comments_count}
                            </span>
                          </div>
                        </a>
                      );
                    })
                  : MOCK_POSTS.map((tile, index) => (
                      <div
                        key={index}
                        className={`ig-post-anim group relative aspect-square overflow-hidden bg-gradient-to-br ${tile.accent} dark:from-[#172133] dark:via-[#1e293b] dark:to-[#334155]`}
                      >
                        <div className={`absolute inset-[13%] ${tile.shape}`} />
                        
                        {/* Permanent Badges for Mock Posts (Matching Screenshot) */}
                        {tile.type === "video" && (
                          <Clapperboard className="absolute top-1.5 right-1.5 size-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] z-10 fill-none" />
                        )}
                        {tile.type === "carousel" && (
                          <svg className="absolute top-1.5 right-1.5 size-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] z-10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg>
                        )}
                        
                        {/* Permanent Views Count */}
                        <div className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 z-10 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                          <Eye className="size-3 text-white fill-none stroke-white" />
                          <span className="text-[9px] font-semibold tracking-wide">{tile.views}</span>
                        </div>

                        {/* Interactive hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#0f172a]/74 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-20">
                          <span className="flex items-center gap-1 text-[9px] font-semibold text-white">
                            <Heart className="size-3.5" aria-hidden="true" />
                            {42 + index}
                          </span>
                          <span className="flex items-center gap-1 text-[9px] font-semibold text-white">
                            <MessageCircle className="size-3.5" aria-hidden="true" />
                            {(index % 5) + 2}
                          </span>
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            {/* Floating Navigation Dock */}
            <div className="absolute bottom-3 inset-x-3 z-30 flex h-[46px] items-center justify-between rounded-full border border-black/10 bg-white/70 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-[#121212]/80">
              <button type="button" className="text-[#111827] dark:text-white cursor-pointer" aria-label="Home">
                <Home className="size-[20px] stroke-[2]" />
              </button>
              <button type="button" className="text-[#6b7280] dark:text-[#a8a8a8] cursor-pointer" aria-label="Reels">
                <Clapperboard className="size-[20px]" />
              </button>
              
              {/* Paper Plane message icon with red notification dot */}
              <button type="button" className="relative text-[#6b7280] dark:text-[#a8a8a8] cursor-pointer" aria-label="Messages">
                <Send className="size-[20px] text-[#111827] dark:text-white -rotate-12 translate-y-[-1px] translate-x-[1px]" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-[#ff3040] border border-white dark:border-black" />
              </button>
              
              <button type="button" className="text-[#6b7280] dark:text-[#a8a8a8] cursor-pointer" aria-label="Search">
                <Search className="size-[20px]" />
              </button>
              
              {/* Profile Avatar with red notification dot */}
              <button type="button" className="relative flex size-[20px] items-center justify-center rounded-full border border-black/10 dark:border-white/10 cursor-pointer" aria-label="Profile">
                {profilePicUrl ? (
                  <Image
                    src={profilePicUrl}
                    alt="profile"
                    width={20}
                    height={20}
                    className="size-full rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center rounded-full bg-[#efefef] dark:bg-[#262626] text-[8px] font-bold text-[#111827] dark:text-white">
                    HD
                  </div>
                )}
                <span className="absolute -bottom-[1px] -right-[1px] size-1.5 rounded-full bg-[#ff3040] border border-white dark:border-black" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
