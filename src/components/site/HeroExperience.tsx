"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMailtoHref } from "@/lib/site-config";
import type { InstagramProfile, InstagramPost } from "@/lib/instagram";
import { InstagramPhone } from "@/components/site/InstagramPhone";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HeroExperienceProps {
  profile?: InstagramProfile | null;
  posts?: InstagramPost[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroExperience({ profile = null, posts = [] }: HeroExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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
    tl.from(".hero-annotation-anim", {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.15
    }, "-=0.3");

  }, { scope: containerRef });
  return (
    <section
      id="hero"
      ref={containerRef}
      className="bg-transparent relative overflow-hidden min-h-[calc(100vh-72px)] flex items-center py-12 sm:py-16 lg:py-20"
    >
      <div className="section-shell relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          {/* Left Column: Heading and Description */}
          <div className="relative z-10 text-left flex flex-col items-start">
            <Eyebrow className="mb-5 hero-anim-item">AI-NATIVE ENGINEER • SYSTEMS BUILDER</Eyebrow>
            <h1 className="display-heading text-[length:clamp(2.4rem,7vw,var(--text-display))] leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-aubergine hero-anim-item">
              Building systems people can actually use.
            </h1>
            <p className="mt-6 max-w-xl text-[length:var(--text-body)] sm:text-[length:var(--text-subheading)] leading-[1.6] tracking-[var(--tracking-subheading)] text-aubergine hero-anim-item">
              I&apos;m Hemang Doshi, a developer who likes turning vague ideas, messy
              workflows, and technical complexity into clean products people can
              actually use. This site is where I document the work, thinking, and
              taste behind that.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center w-full hero-anim-item">
              <Button
                href={buildMailtoHref("Start a conversation")}
                withArrow
                className="w-full sm:w-auto"
              >
                Start a conversation
              </Button>
              <Button
                href="#work"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Explore selected work
              </Button>
            </div>
          </div>

          {/* Right Column: Instagram Phone Mockup */}
          <div className="relative flex justify-center items-center z-10">
            <InstagramPhone profile={profile} posts={posts} />
          </div>

        </div>
      </div>
    </section>
  );
}
