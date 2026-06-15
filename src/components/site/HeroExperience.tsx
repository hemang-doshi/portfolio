"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMailtoHref } from "@/lib/site-config";
import type { InstagramProfile, InstagramPost } from "@/lib/instagram";
import { InstagramPhone } from "@/components/site/InstagramPhone";
import { TypingAnimation } from "@/components/ui/typing-animation";

interface HeroExperienceProps {
  profile?: InstagramProfile | null;
  posts?: InstagramPost[];
  isActive?: boolean;
  onInstagramReady?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroExperience({
  profile = null,
  posts = [],
  isActive = true,
  onInstagramReady,
}: HeroExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive) return;

    const scope = containerRef.current;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate left column contents
    tl.from(".hero-anim-item", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12
    });

    // Animate the Instagram phone mockup on the right
    tl.from(".instagram-phone-anim", {
      y: 50,
      opacity: 0,
      duration: 1,
      scale: 0.95
    }, "-=0.4");

    // Animate individual posts inside the grid with a stagger
    tl.from(".ig-post-anim", {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.05
    }, "-=0.5");

    // Animate annotations
    const annotations = scope?.querySelectorAll(".hero-annotation-anim") ?? [];
    if (annotations.length > 0) {
      tl.from(annotations, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.15
      }, "-=0.3");
    }

  }, { scope: containerRef, dependencies: [isActive] });
  return (
    <section
      id="hero"
      ref={containerRef}
      data-hero-active={isActive}
      className="bg-transparent relative overflow-hidden min-h-[calc(100vh-72px)] flex items-center pt-12 pb-24 sm:py-16 lg:py-20"
    >
      <div className="section-shell relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          {/* Left Column: Heading and Description */}
          <div className="relative z-10 text-center flex flex-col items-center lg:text-left lg:items-start">
            <Eyebrow className="mb-5 hero-anim-item">builder • creator • chasing useful ideas</Eyebrow>
            <h1 className="display-heading text-[length:clamp(2.4rem,7vw,var(--text-display))] leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-aubergine hero-anim-item">
              i{" "}
              <TypingAnimation
                words={["build 🛠️", "ship 🚀", "write 📑"]}
                loop
                className="text-fuchsia-signal inline-block min-w-[5.5ch] text-left whitespace-nowrap"
              />{" "}
              things.
            </h1>
            <p className="mt-6 max-w-xl text-[length:var(--text-body)] sm:text-[length:var(--text-subheading)] leading-[1.6] tracking-[var(--tracking-subheading)] text-aubergine hero-anim-item">
              i&apos;m hemang. i like turning messy ideas, everyday annoyances, and random observations into software, content, and tiny systems that feel useful.
              <br /><br />
              some of it is code. some of it is creator work. some of it is just me going outside, noticing stuff, and coming back with another idea i probably shouldn&apos;t start... but will.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center justify-center lg:justify-start w-full max-w-sm lg:max-w-none hero-anim-item">
              <Button
                href="#work"
                withArrow
                className="w-full sm:w-auto"
              >
                see what i&apos;m building
              </Button>
              <Button
                href={buildMailtoHref("say hi")}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                say hi
              </Button>
            </div>
          </div>

          {/* Right Column: Instagram Phone Mockup */}
          <div className="relative flex justify-center items-center z-10">
            <InstagramPhone
              profile={profile}
              posts={posts}
              onReady={onInstagramReady}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
