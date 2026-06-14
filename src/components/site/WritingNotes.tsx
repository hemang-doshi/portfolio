"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
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
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current || "#skills",
          start: "top 85%",
          end: "top 55%",
          scrub: 1,
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section
      id="skills"
      ref={containerRef}
      className="section-anchor bg-transparent py-32 sm:py-44"
    >
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center wn-list-trigger">
          {/* Left Column: Tech Description & Heading */}
          <div className="flex flex-col gap-6 text-left lg:pr-16 lg:max-w-[480px]">
            <div className="wn-header-anim">
              <SectionHeader
                eyebrow="SKILLS & STACK"
                title="Tools shaped for execution."
                description="A modern collection of languages, frameworks, and deployment engines."
                align="left"
              />
            </div>
            <h3 className="text-[length:var(--text-heading-sm)] leading-[var(--leading-heading-sm)] font-bold text-aubergine mt-8 wn-content-anim">
              Systems built for scale and clarity.
            </h3>
            <p className="text-[length:var(--text-body)] leading-[1.75] text-heather wn-content-anim">
              I engineer developer infrastructure, autonomous agent loops, and high-performance cloud architectures. My focus is on reducing cognitive overhead, implementing end-to-end type safety, and building clean, observable products.
            </p>
            <p className="text-[length:var(--text-body)] leading-[1.75] text-heather wn-content-anim">
              My stack centers around TypeScript, React, and Next.js for client interfaces, paired with Python and FastAPI for machine learning orchestration and agent runtimes. I rely on PostgreSQL, Supabase, and Docker to deploy secure, reproducible developer environments.
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
