"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import { SectionHeader } from "@/components/ui/SectionHeader";
import dynamic from "next/dynamic";

const IconCloud = dynamic(
  () => import("@/components/ui/IconCloud").then((mod) => mod.IconCloud),
  { ssr: false }
);

export function WritingNotes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header & Content reveal on scroll
    gsap.fromTo(".wn-header-anim, .wn-content-anim", 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current || "#skills",
          start: "top 90%",
          end: "top 10%",
          scrub: 1.5,
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section
      id="skills"
      ref={containerRef}
      className="section-anchor bg-transparent pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 lg:pb-10"
    >
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center wn-list-trigger">
          {/* Left Column: Tech Description & Heading */}
          <div className="flex flex-col gap-6 text-center items-center lg:text-left lg:items-start lg:pr-16 lg:max-w-[480px]">
            <div className="wn-header-anim">
              <SectionHeader
                eyebrow="toolkit"
                title="the tools change. the pattern doesn&apos;t."
                description="i use whatever helps turn a blurry idea into something real — code, design, ai workflows, content systems, notes, scripts, experiments, whatever gets the loop moving."
                align="left"
              />
            </div>
            <h3 className="text-[length:var(--text-heading-sm)] leading-[var(--leading-heading-sm)] font-bold text-aubergine mt-8 wn-content-anim">
              mostly building, sometimes filming, always connecting dots.
            </h3>
            <p className="text-[length:var(--text-body)] leading-[1.75] text-heather wn-content-anim">
              on the software side, i usually work around full-stack products, ai systems, devtools, cloud workflows, and automation. typescript, react, next.js, python, fastapi, postgres, docker, and agent/rag-style workflows show up a lot.
            </p>
            <p className="text-[length:var(--text-body)] leading-[1.75] text-heather wn-content-anim">
              on the creator side, i care about ideas, hooks, storytelling, taste, short-form content, and documenting the process. i don&apos;t really see tech and content as separate worlds — both are just ways to make something in your head visible to other people.
            </p>
          </div>

          {/* Right Column: 3D Icon Cloud */}
          <div className="wn-content-anim flex justify-center items-center h-[460px] w-full bg-transparent">
            <IconCloud />
          </div>
        </div>
      </div>
    </section>
  );
}
