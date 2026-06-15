"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  Activity,
  AudioWaveform,
  HeartPulse,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

export interface ProfileMusicPlayerProps {
  src: string;
  title: string;
  artist: string;
}

export function formatAudioTime(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function ProfileMusicPlayer({
  src,
  title,
}: ProfileMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const progressId = useId();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const syncMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setHasError(false);
    };

    const syncTime = () => {
      setCurrentTime(Number.isFinite(audio.currentTime) ? audio.currentTime : 0);
    };

    const syncPlay = () => setIsPlaying(true);
    const syncPause = () => setIsPlaying(false);
    const syncVolume = () => setIsMuted(audio.muted);
    const handleEnded = () => {
      audio.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    };
    const handleError = () => {
      setHasError(true);
      setOverlayVisible(true);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    };

    syncMetadata();
    syncTime();
    syncVolume();

    audio.addEventListener("loadedmetadata", syncMetadata);
    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("play", syncPlay);
    audio.addEventListener("pause", syncPause);
    audio.addEventListener("volumechange", syncVolume);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", syncMetadata);
      audio.removeEventListener("timeupdate", syncTime);
      audio.removeEventListener("play", syncPlay);
      audio.removeEventListener("pause", syncPause);
      audio.removeEventListener("volumechange", syncVolume);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  async function playAudio() {
    const audio = audioRef.current;
    if (!audio || hasError) {
      return;
    }

    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  }

  async function handleExpandAndPlay() {
    setOverlayVisible(true);
    await playAudio();
  }

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio || hasError) {
      return;
    }

    if (audio.paused) {
      await playAudio();
      return;
    }

    audio.pause();
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }

  function handleSeek(value: string) {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const nextTime = Number.parseFloat(value);
    if (!Number.isFinite(nextTime)) {
      return;
    }

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  const durationLabel = formatAudioTime(duration);
  const elapsedLabel = formatAudioTime(currentTime);

  return (
    <>
      <button
        type="button"
        onClick={handleExpandAndPlay}
        className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-black/8 bg-black/[0.035] px-2 py-[3px] text-left align-middle transition-colors hover:bg-black/[0.055] dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
        aria-label={overlayVisible ? "Resume Night Drive player" : "Expand Night Drive player"}
        data-player-pill="true"
      >
        <span className="truncate text-[10px] font-medium text-[#111827] dark:text-[#f8fafc]">
          {title}
        </span>
        <span
          className="flex items-center gap-0.5 text-[#6b7280] dark:text-[#94a3b8]"
          aria-label="Profile music waveform"
        >
          <AudioWaveform className="size-3" aria-hidden="true" />
          <HeartPulse className="size-[11px]" aria-hidden="true" />
        </span>
      </button>

      <div
        data-floating-player="true"
        className={`fixed right-4 bottom-4 z-[120] w-[176px] rounded-[22px] border border-black/10 bg-white/95 p-2.5 shadow-[0_22px_44px_rgba(15,23,42,0.24)] backdrop-blur-md transition-all sm:right-6 sm:bottom-6 dark:border-white/10 dark:bg-[#0f1726]/95 ${
          overlayVisible || hasError
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        {hasError ? (
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold text-[#111827] dark:text-[#f8fafc]">
                  {title}
                </p>
                <p className="text-[8px] uppercase tracking-[0.2em] text-[#6b7280] dark:text-[#94a3b8]">
                  Music
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOverlayVisible(false)}
                className="flex size-6 items-center justify-center rounded-full text-[#6b7280] hover:bg-black/[0.05] dark:text-[#94a3b8] dark:hover:bg-white/[0.06]"
                aria-label="Close floating player"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            </div>
            <p className="text-[10px] font-medium text-[#b91c1c] dark:text-[#fca5a5]">
              Audio unavailable
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-2.5">
              <div
                className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-[linear-gradient(145deg,#f6d4e3,#fff1bd_48%,#dbeafe)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:bg-[linear-gradient(145deg,#1f2937,#334155_48%,#0f172a)]"
                aria-label="Floating player artwork"
              >
                <div className="absolute inset-[18%] rounded-[10px] bg-[radial-gradient(circle_at_35%_32%,rgba(255,255,255,0.92),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.16),transparent_58%)]" />
                <Activity className="relative z-10 size-4 text-[#0f172a]/70 dark:text-white/70" aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-semibold text-[#111827] dark:text-[#f8fafc]">
                      {title}
                    </p>
                    <div className="mt-0.5 flex items-center gap-1 text-[8px] uppercase tracking-[0.18em] text-[#6b7280] dark:text-[#94a3b8]">
                      <span>Music</span>
                      <span className="flex items-center gap-0.5" aria-label="Profile music waveform">
                        <AudioWaveform className="size-3" aria-hidden="true" />
                        <HeartPulse className="size-[10px]" aria-hidden="true" />
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOverlayVisible(false)}
                    className="flex size-6 items-center justify-center rounded-full text-[#6b7280] hover:bg-black/[0.05] dark:text-[#94a3b8] dark:hover:bg-white/[0.06]"
                    aria-label="Close floating player"
                  >
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-2 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={togglePlayback}
                    className="flex size-7 items-center justify-center rounded-full bg-[#0095f6] text-white transition-opacity hover:opacity-90"
                    aria-label={isPlaying ? "Pause audio" : "Play audio"}
                  >
                    {isPlaying ? (
                      <Pause className="size-3.5 fill-current" aria-hidden="true" />
                    ) : (
                      <Play className="ml-0.5 size-3.5 fill-current" aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex size-7 items-center justify-center rounded-full border border-black/8 text-[#475569] transition-colors hover:bg-black/[0.04] dark:border-white/10 dark:text-[#cbd5e1] dark:hover:bg-white/[0.05]"
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? (
                      <VolumeX className="size-3.5" aria-hidden="true" />
                    ) : (
                      <Volume2 className="size-3.5" aria-hidden="true" />
                    )}
                  </button>
                  <span className="ml-auto text-[8px] font-medium text-[#6b7280] dark:text-[#94a3b8]">
                    {elapsedLabel} / {durationLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2.5">
              <label htmlFor={progressId} className="sr-only">
                Seek through track
              </label>
              <input
                id={progressId}
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(currentTime, duration || 0)}
                onChange={(event) => handleSeek(event.target.value)}
                className="h-1 w-full cursor-pointer accent-[#0095f6]"
                aria-label="Seek through track"
              />
            </div>
          </>
        )}
      </div>

      <audio ref={audioRef} preload="metadata" src={src} />
    </>
  );
}
