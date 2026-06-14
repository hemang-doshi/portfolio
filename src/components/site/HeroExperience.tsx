"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HandDrawnAnnotation } from "@/components/ui/HandDrawnAnnotation";
import { buildMailtoHref } from "@/lib/site-config";

export function HeroExperience() {
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
              I’m Hemang Doshi, a developer who likes turning vague ideas, messy
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

          {/* Right Column: Miniature Instagram Phone Mockup */}
          <div className="relative flex justify-center items-center z-10">
            {/* Phone Wrapper to anchor the annotation relative to the phone */}
            <div className="relative">
              {/* Single annotation pointing to the interactive posts */}
              <HandDrawnAnnotation 
                className="left-[calc(100%+12px)] top-[45%] lg:hidden xl:flex hero-annotation-anim" 
                flip
              >
                click me
              </HandDrawnAnnotation>

              {/* Phone Container */}
              <div className="instagram-phone-anim relative w-[300px] h-[590px] rounded-[42px] border-[8px] border-aubergine bg-canvas shadow-subtle-5 overflow-hidden flex flex-col">
              {/* Phone Speaker & Camera Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-5 bg-aubergine rounded-full flex items-center justify-between px-4 z-30">
                <span className="w-12 h-1 bg-white/20 rounded-full" />
                <span className="size-2 rounded-full bg-white/20" />
              </div>

              {/* Status Bar */}
              <div className="h-10 pt-5 px-6 flex justify-between items-center text-[10px] font-semibold text-aubergine bg-canvas/80 backdrop-blur border-b border-plum-tinted/20 select-none">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <span>📶</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* Instagram App Header */}
              <div className="h-11 px-4 flex justify-between items-center border-b border-plum-tinted/20 bg-canvas">
                <span className="font-mono text-xs font-black tracking-tight">hemang.codes</span>
                <div className="flex gap-3 text-xs">
                  <span>🔔</span>
                  <span>➕</span>
                  <span>≡</span>
                </div>
              </div>

              {/* Profile details */}
              <div className="p-4 flex flex-col gap-3 bg-canvas overflow-y-auto flex-1 no-scrollbar">
                {/* Stats block */}
                <div className="flex items-center gap-4">
                  {/* Glowing Avatar */}
                  <div className="relative size-14 rounded-full p-[2px] bg-gradient-to-tr from-[#ffcc11] via-[#df37a7] to-[#240029] shadow-md">
                    <div className="size-full rounded-full bg-canvas flex items-center justify-center font-bold text-aubergine text-xs">
                      HD
                    </div>
                  </div>
                  {/* Stats list */}
                  <div className="flex-1 flex justify-around text-center text-aubergine select-none">
                    <div>
                      <div className="font-bold text-xs">12</div>
                      <div className="text-[8px] text-heather">Posts</div>
                    </div>
                    <div>
                      <div className="font-bold text-xs">1.5k</div>
                      <div className="text-[8px] text-heather">Followers</div>
                    </div>
                    <div>
                      <div className="font-bold text-xs">342</div>
                      <div className="text-[8px] text-heather">Following</div>
                    </div>
                  </div>
                </div>

                {/* Profile Bio */}
                <div className="text-[10px] leading-relaxed text-aubergine">
                  <div className="font-bold text-xs">Hemang Doshi</div>
                  <div className="text-heather font-medium">AI Engineer & Systems Builder</div>
                  <p className="mt-1">Building developer tools, creator tools, and responsible local AI loops.</p>
                  <a href="https://github.com/hemang-doshi" target="_blank" rel="noreferrer" className="text-fuchsia-signal font-semibold mt-0.5 block">
                    github.com/hemang-doshi
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-1 select-none">
                  <button className="h-7 bg-fuchsia-signal text-canvas font-bold text-[10px] rounded-lg shadow-sm hover:opacity-90 transition-opacity">
                    Follow
                  </button>
                  <button className="h-7 border border-heather text-aubergine font-bold text-[10px] rounded-lg hover:bg-aubergine/[0.03] transition-colors">
                    Message
                  </button>
                </div>

                {/* Highlights circle row */}
                <div className="flex gap-3 py-1 overflow-x-auto no-scrollbar select-none">
                  {[
                    { title: "DevDeck", icon: "💻" },
                    { title: "SceneBook", icon: "🎬" },
                    { title: "AI SQL", icon: "📊" },
                    { title: "SetuAI", icon: "🌐" }
                  ].map(h => (
                    <div key={h.title} className="flex flex-col items-center gap-1 shrink-0">
                      <div className="size-11 rounded-full border border-plum-tinted bg-aubergine/[0.02] flex items-center justify-center text-xs">
                        {h.icon}
                      </div>
                      <span className="text-[7px] text-heather font-semibold">{h.title}</span>
                    </div>
                  ))}
                </div>

                {/* Tabs bar */}
                <div className="border-t border-plum-tinted/20 grid grid-cols-3 py-1 text-center text-xs border-b select-none">
                  <span className="cursor-pointer font-bold text-aubergine border-b-2 border-aubergine pb-1">田</span>
                  <span className="cursor-pointer text-heather">▶</span>
                  <span className="cursor-pointer text-heather">👤</span>
                </div>

                {/* Posts 3x3 Grid */}
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { label: "CLI Tool", color: "from-[#240029] to-[#df37a7]/20" },
                    { label: "NextJS", color: "from-[#df37a7] to-[#ffcc11]/20" },
                    { label: "OCR AI", color: "from-[#240029] to-[#ffcc11]/20" },
                    { label: "Database", color: "from-[#ffcc11] to-[#df37a7]/20" },
                    { label: "Agent UI", color: "from-[#df37a7] to-[#240029]/20" },
                    { label: "Vector DB", color: "from-[#240029] to-[#df37a7]/40" },
                    { label: "Analytics", color: "from-[#ffcc11] to-[#240029]/40" },
                    { label: "Prompt Eng", color: "from-[#df37a7] to-[#ffcc11]/40" },
                    { label: "Workflow", color: "from-[#240029] to-[#ffcc11]/30" }
                  ].map((p, idx) => (
                    <div
                      key={idx}
                      className={`ig-post-anim relative aspect-square rounded bg-gradient-to-br ${p.color} overflow-hidden group cursor-pointer border border-plum-tinted/10`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-canvas uppercase tracking-wider text-center p-1 font-mono">
                        {p.label}
                      </div>
                      {/* Instagram Hover Stats Overlay */}
                      <div className="absolute inset-0 bg-[#240029]/80 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 text-canvas text-[9px] font-bold transition-opacity duration-200">
                        <span>❤️ 42</span>
                        <span>💬 3</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
