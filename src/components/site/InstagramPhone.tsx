import Image from "next/image";
import {
  BatteryFull,
  Bell,
  Clapperboard,
  Grid3X3,
  Heart,
  Menu,
  MessageCircle,
  PlusSquare,
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
}

const MOCK_PROFILE = {
  username: "hemang.codes",
  biography: "Building developer tools, creator tools, and responsible local AI loops.",
  followers_count: 1500,
  follows_count: 342,
  media_count: 12,
  profile_picture_url: null as string | null,
};

const MOCK_POSTS = [
  {
    accent: "from-[#f9d7e8] via-[#fff2c8] to-[#f3c8ff]",
    shape: "rounded-[28px] bg-[radial-gradient(circle_at_28%_28%,rgba(255,255,255,0.88),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.18),transparent_60%)]",
  },
  {
    accent: "from-[#d8ecff] via-[#eef5ff] to-[#dbeafe]",
    shape: "rounded-[999px] bg-[linear-gradient(135deg,rgba(255,255,255,0.78),transparent_55%),radial-gradient(circle_at_70%_72%,rgba(15,23,42,0.18),transparent_34%)]",
  },
  {
    accent: "from-[#fde68a] via-[#fff7d6] to-[#fbcfe8]",
    shape: "rounded-[18px] bg-[linear-gradient(180deg,rgba(17,24,39,0.12),transparent_58%),radial-gradient(circle_at_42%_38%,rgba(255,255,255,0.88),transparent_30%)]",
  },
  {
    accent: "from-[#e2e8f0] via-[#f8fafc] to-[#cbd5e1]",
    shape: "rounded-[26px] bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.92),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.12),transparent_62%)]",
  },
  {
    accent: "from-[#fbcfe8] via-[#fdf2f8] to-[#fecdd3]",
    shape: "rounded-[22px] bg-[linear-gradient(135deg,rgba(255,255,255,0.78),transparent_52%),radial-gradient(circle_at_34%_70%,rgba(17,24,39,0.18),transparent_32%)]",
  },
  {
    accent: "from-[#dbeafe] via-[#eff6ff] to-[#bfdbfe]",
    shape: "rounded-[999px] bg-[radial-gradient(circle_at_30%_32%,rgba(255,255,255,0.95),transparent_26%),linear-gradient(150deg,rgba(15,23,42,0.14),transparent_62%)]",
  },
  {
    accent: "from-[#fff1bd] via-[#fef9c3] to-[#fde68a]",
    shape: "rounded-[18px] bg-[linear-gradient(180deg,rgba(15,23,42,0.14),transparent_58%),radial-gradient(circle_at_72%_38%,rgba(255,255,255,0.88),transparent_30%)]",
  },
  {
    accent: "from-[#ede9fe] via-[#f5f3ff] to-[#ddd6fe]",
    shape: "rounded-[24px] bg-[radial-gradient(circle_at_48%_34%,rgba(255,255,255,0.95),transparent_28%),linear-gradient(135deg,rgba(30,41,59,0.16),transparent_58%)]",
  },
  {
    accent: "from-[#fee2e2] via-[#fff7ed] to-[#fde68a]",
    shape: "rounded-[30px] bg-[linear-gradient(135deg,rgba(255,255,255,0.78),transparent_56%),radial-gradient(circle_at_68%_72%,rgba(17,24,39,0.14),transparent_30%)]",
  },
];

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export function InstagramPhone({
  profile = null,
  posts = [],
}: InstagramPhoneProps) {
  const displayUsername = profile?.username ?? MOCK_PROFILE.username;
  const displayBio = profile?.biography ?? MOCK_PROFILE.biography;
  const displayFollowers = profile?.followers_count ?? MOCK_PROFILE.followers_count;
  const displayFollowing = profile?.follows_count ?? MOCK_PROFILE.follows_count;
  const displayPosts = profile?.media_count ?? MOCK_PROFILE.media_count;
  const profilePicUrl = profile?.profile_picture_url ?? null;
  const hasRealPosts = posts.length > 0;

  return (
    <div className="instagram-phone-anim relative w-[292px] h-[635px] sm:w-[310px] sm:h-[674px]">
      <div className="pointer-events-none absolute -left-[3px] top-[118px] h-14 w-[3px] rounded-l-full bg-black/80 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]" />
      <div className="pointer-events-none absolute -left-[3px] top-[184px] h-24 w-[3px] rounded-l-full bg-black/80 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]" />
      <div className="pointer-events-none absolute -right-[3px] top-[170px] h-20 w-[3px] rounded-r-full bg-black/80 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]" />

      <div className="relative h-full w-full rounded-[42px] bg-[#080808] p-[7px] shadow-[0_24px_70px_rgba(15,23,42,0.28),0_10px_24px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="absolute inset-[2px] rounded-[40px] border border-white/[0.08]" />

        <div className="relative h-full w-full overflow-hidden rounded-[35px] bg-white dark:bg-[#101826]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.72),transparent)] dark:bg-[linear-gradient(180deg,rgba(16,24,38,0.94),rgba(16,24,38,0.74),transparent)]" />
          <div className="pointer-events-none absolute left-1/2 top-2.5 z-40 h-7 w-[116px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]" />

          <div className="relative z-20 flex h-full flex-col overflow-hidden rounded-[35px] border border-black/5 bg-white/92 dark:border-white/6 dark:bg-[#101826]/96">
            <div className="flex items-center justify-between px-5 pt-4 text-[10px] font-semibold text-[#111827] dark:text-[#f8fafc]">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <SignalHigh className="size-4" aria-label="Cellular signal" />
                <Wifi className="size-4" aria-label="Wi-Fi signal" />
                <BatteryFull className="size-[18px]" aria-label="Battery level" />
              </div>
            </div>

            <div className="flex items-center justify-between px-4 pt-4 pb-3 text-[#111827] dark:text-[#f8fafc]">
              <span className="font-sans text-[13px] font-semibold tracking-[-0.02em]">
                {displayUsername}
              </span>
              <div className="flex items-center gap-3">
                <Bell className="size-[18px]" aria-label="Notifications" />
                <PlusSquare className="size-[18px]" aria-label="Create post" />
                <Menu className="size-[18px]" aria-label="Open menu" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 no-scrollbar">
              <div className="flex items-center gap-4">
                <div className="relative size-[74px] shrink-0 rounded-full bg-[linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)] p-[2px] shadow-[0_10px_22px_rgba(238,42,123,0.18)]">
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
                    <div className="flex size-full items-center justify-center rounded-full bg-white text-[15px] font-semibold text-[#111827] dark:bg-[#101826] dark:text-[#f8fafc]">
                      HD
                    </div>
                  )}
                </div>

                <div className="grid flex-1 grid-cols-3 text-center text-[#111827] dark:text-[#f8fafc]">
                  <div>
                    <div className="text-[13px] font-semibold">{formatCount(displayPosts)}</div>
                    <div className="text-[10px] text-[#6b7280] dark:text-[#94a3b8]">posts</div>
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold">{formatCount(displayFollowers)}</div>
                    <div className="text-[10px] text-[#6b7280] dark:text-[#94a3b8]">followers</div>
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold">{formatCount(displayFollowing)}</div>
                    <div className="text-[10px] text-[#6b7280] dark:text-[#94a3b8]">following</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-[11px] leading-relaxed text-[#111827] dark:text-[#f8fafc]">
                <div className="font-semibold">{profile?.name ?? "Hemang Doshi"}</div>
                <div className="font-medium text-[#6b7280] dark:text-[#94a3b8]">Digital creator</div>
                <div className="mt-1" data-floating-player-anchor="true">
                  <ProfileMusicPlayer
                    src="/audio/night-drive.mp3"
                    title="Night Drive"
                    artist="The_Mountain"
                  />
                </div>
                <p className="mt-1">{displayBio}</p>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <a
                  href={`https://instagram.com/${displayUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 items-center justify-center rounded-[11px] bg-[#0095f6] px-3 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Follow
                </a>
                <button
                  type="button"
                  className="h-9 rounded-[11px] border border-black/10 bg-black/[0.03] px-3 text-[12px] font-semibold text-[#111827] transition-colors hover:bg-black/[0.05] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#f8fafc] dark:hover:bg-white/[0.08]"
                >
                  Message
                </button>
              </div>

              <div className="mt-4 grid grid-cols-3 border-y border-black/8 py-2 text-[#6b7280] dark:border-white/8 dark:text-[#94a3b8]">
                <div className="flex items-center justify-center">
                  <Grid3X3 className="size-[18px] text-[#111827] dark:text-[#f8fafc]" aria-label="Posts tab" />
                </div>
                <div className="flex items-center justify-center">
                  <Clapperboard className="size-[18px]" aria-label="Reels tab" />
                </div>
                <div className="flex items-center justify-center">
                  <UserRound className="size-[18px]" aria-label="Tagged tab" />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-1">
                {hasRealPosts
                  ? posts.map((post) => {
                      const thumb = getPostThumbnail(post);
                      return (
                        <a
                          key={post.id}
                          href={post.permalink}
                          target="_blank"
                          rel="noreferrer"
                          className="ig-post-anim group relative aspect-square overflow-hidden rounded-[8px] border border-black/6 bg-[#f8fafc] dark:border-white/8 dark:bg-[#172133]"
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
                          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#0f172a]/74 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
                        className={`ig-post-anim group relative aspect-square overflow-hidden rounded-[8px] border border-black/6 bg-gradient-to-br ${tile.accent} dark:border-white/8 dark:from-[#172133] dark:via-[#1e293b] dark:to-[#334155]`}
                      >
                        <div className={`absolute inset-[13%] ${tile.shape}`} />
                        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#0f172a]/74 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
          </div>
        </div>
      </div>
    </div>
  );
}
