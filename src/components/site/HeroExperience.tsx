"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { ShellCard } from "@/components/ui/ShellCard";

export function HeroExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1.04] : [1, 1.88],
  );
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "-2%"] : ["0%", "-14%"],
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.45],
    reduceMotion ? [1, 1, 0.92] : [1, 1, 0],
  );
  const heroY = useTransform(
    scrollYProgress,
    [0, 0.45],
    reduceMotion ? ["0%", "-2%"] : ["0%", "-12%"],
  );
  const panelOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.6],
    reduceMotion ? [1, 1] : [0, 1],
  );
  const panelY = useTransform(
    scrollYProgress,
    [0.35, 0.7],
    reduceMotion ? ["0%", "0%"] : ["10%", "0%"],
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[220vh] bg-deep-space"
      aria-label="Proof-of-work hero"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imageScale, y: imageY }}>
          <Image
            src="/images/hero-mountain-desk.svg"
            alt="Twilight mountain desk scene with a laptop in the foreground"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,33,0.12),rgba(23,23,33,0.38)_55%,rgba(23,23,33,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(237,237,243,0.08),transparent_40%)]" />

        <div className="relative z-10 flex h-full items-center justify-center px-4 pt-20 sm:px-6">
          <div className="mx-auto flex w-full max-w-[var(--page-max-width)] items-center justify-center">
            <motion.div
              className="max-w-4xl text-center"
              style={{ opacity: heroOpacity, y: heroY }}
            >
              <p className="mb-6 text-[length:var(--text-caption)] uppercase tracking-[0.34em] text-silver">
                Proof-of-work system
              </p>
              <h1 className="mx-auto max-w-5xl font-[family:var(--font-arcadiadisplay)] text-[length:clamp(3rem,8vw,var(--text-display))] font-[360] leading-[1.05] tracking-[0.02em] text-starlight">
                Building agent-first tools, cloud-ready systems, and products with
                taste.
              </h1>
              <p className="mx-auto mt-7 max-w-3xl text-[length:clamp(1rem,2vw,var(--text-subheading))] leading-[1.6] text-silver">
                I&apos;m Hemang Doshi — a developer turning projects, experiments, and
                engineering thinking into systems people can actually use.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="#work" variant="primary">
                  Explore work
                </Button>
                <Button href="#case-studies" variant="secondary">
                  Read case studies
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-x-4 bottom-[14vh] mx-auto max-w-3xl sm:inset-x-6"
              style={{ opacity: panelOpacity, y: panelY }}
            >
              <ShellCard className="overflow-hidden border-lead/20 bg-midnight-slate/78">
                <div className="border-b border-lead/15 px-5 py-3 sm:px-6">
                  <div className="flex items-center gap-3 text-[length:var(--text-caption)] uppercase tracking-[0.2em] text-silver">
                    <span>[HD]</span>
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-mercury-blue" aria-hidden="true" />
                      System online
                    </span>
                  </div>
                </div>

                <div className="grid gap-6 px-5 py-6 sm:grid-cols-[1.4fr_0.9fr] sm:px-6 sm:py-8">
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <h2 className="font-[family:var(--font-arcadiadisplay)] text-[length:clamp(2rem,4vw,var(--text-heading-lg))] font-[360] leading-[1.05] tracking-[0.02em] text-starlight">
                        Hemang Doshi
                      </h2>
                      <p className="text-[length:var(--text-body-sm)] uppercase tracking-[0.24em] text-silver">
                        Developer • Systems Builder • Proof-of-work
                      </p>
                    </div>
                    <p className="max-w-2xl text-[length:var(--text-subheading)] leading-[1.55] text-silver">
                      Building agent-first tools, cloud-ready systems, and
                      products with taste.
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-[var(--radius-md)] border border-lead/10 bg-black/10 px-4 py-4">
                      <p className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-silver">
                        Base
                      </p>
                      <p className="mt-2 text-[length:var(--text-body)] font-[420] text-starlight">
                        India
                      </p>
                    </div>
                    <div className="rounded-[var(--radius-md)] border border-lead/10 bg-black/10 px-4 py-4">
                      <p className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-silver">
                        Availability
                      </p>
                      <p className="mt-2 text-[length:var(--text-body)] font-[420] text-starlight">
                        Select projects
                      </p>
                    </div>
                  </div>
                </div>
              </ShellCard>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,transparent,rgba(23,23,33,0.92)_70%,rgba(23,23,33,1))]" />
      </div>
    </section>
  );
}
