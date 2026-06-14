"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SpinningRope() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewportHeight, setViewportHeight] = useState(800);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Cache document height and viewport height to prevent layout thrashing (reflow) on scroll
  const docHeightRef = useRef(2000);
  const viewportHeightRef = useRef(800);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    const measure = () => {
      docHeightRef.current = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight
      );
      viewportHeightRef.current = window.innerHeight;
      setViewportHeight(window.innerHeight);
    };

    measure();
    window.addEventListener("resize", measure);
    
    // Setup ResizeObserver to keep docHeightRef fresh as dynamic components mount (e.g. IconCloud, mockups)
    const resizeObserver = new ResizeObserver(() => {
      measure();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("resize", measure);
      resizeObserver.disconnect();
    };
  }, []);

  useGSAP(() => {
    if (reducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configure high-DPI retina rendering
    const dpr = window.devicePixelRatio || 1;
    const width = 200;
    const height = viewportHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Track targets and current values for smooth interpolation
    const state = {
      currentProgress: 0,
      targetProgress: 0,
      currentPhase: 0,
      targetPhase: 0
    };

    // Initialize state from current scroll position
    const docHeight = docHeightRef.current;
    const vHeight = viewportHeightRef.current;
    const maxScroll = docHeight - vHeight;
    const initialProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    
    state.currentProgress = initialProgress;
    state.targetProgress = initialProgress;
    state.currentPhase = initialProgress * Math.PI * 16;
    state.targetPhase = state.currentPhase;

    const drawHelix = (progress: number, phase: number) => {
      if (!ctx) return;

      const docH = docHeightRef.current;
      const vh = viewportHeightRef.current;

      ctx.clearRect(0, 0, width, vh);

      // Interpolate simulated scroll position from progress to avoid layout reflows
      const scrollY = progress * (docH - vh);

      // Grow length of laser based on progress
      const activeLength = progress >= 0.98 ? docH : progress * docH;

      // Restrict drawing boundaries to only visible segments
      const startY = Math.max(0, scrollY);
      const endY = Math.min(activeLength, scrollY + vh);

      if (startY >= endY) return;

      const steps = 120; // High density for smooth curves
      const totalVisibleHeight = endY - startY;
      const stepSize = totalVisibleHeight / steps;

      const amplitude = 32; // Width of helix
      const frequency = 0.0055; // Spaced out twists frequency (reduced from 0.008)
      const centerX = width / 2;

      // Calculate stopRatio for tip fade out
      const tipFadeStart = Math.max(0, totalVisibleHeight - 120);
      const stopRatio = totalVisibleHeight > 0 ? tipFadeStart / totalVisibleHeight : 0.9;

      // GLOW PASS: Draw fuchsia and cyan glows using continuous strokes (no joint artifacts)
      
      // Helix 1 Glow (Fuchsia)
      const fuchsiaGlowGrad = ctx.createLinearGradient(0, startY - scrollY, 0, endY - scrollY);
      fuchsiaGlowGrad.addColorStop(0, "rgba(223, 55, 167, 0.15)");
      fuchsiaGlowGrad.addColorStop(stopRatio, "rgba(223, 55, 167, 0.15)");
      fuchsiaGlowGrad.addColorStop(1, "rgba(223, 55, 167, 0)");

      const fuchsiaMidGlowGrad = ctx.createLinearGradient(0, startY - scrollY, 0, endY - scrollY);
      fuchsiaMidGlowGrad.addColorStop(0, "rgba(223, 55, 167, 0.45)");
      fuchsiaMidGlowGrad.addColorStop(stopRatio, "rgba(223, 55, 167, 0.45)");
      fuchsiaMidGlowGrad.addColorStop(1, "rgba(223, 55, 167, 0)");

      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const yPage = startY + i * stepSize;
        const yScreen = yPage - scrollY;
        const angle = yPage * frequency + phase;
        const x = centerX + amplitude * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, yScreen);
        else ctx.lineTo(x, yScreen);
      }
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 14;
      ctx.strokeStyle = fuchsiaGlowGrad;
      ctx.stroke();

      ctx.lineWidth = 6;
      ctx.strokeStyle = fuchsiaMidGlowGrad;
      ctx.stroke();

      // Helix 2 Glow (Cyan)
      const cyanGlowGrad = ctx.createLinearGradient(0, startY - scrollY, 0, endY - scrollY);
      cyanGlowGrad.addColorStop(0, "rgba(0, 240, 255, 0.15)");
      cyanGlowGrad.addColorStop(stopRatio, "rgba(0, 240, 255, 0.15)");
      cyanGlowGrad.addColorStop(1, "rgba(0, 240, 255, 0)");

      const cyanMidGlowGrad = ctx.createLinearGradient(0, startY - scrollY, 0, endY - scrollY);
      cyanMidGlowGrad.addColorStop(0, "rgba(0, 240, 255, 0.45)");
      cyanMidGlowGrad.addColorStop(stopRatio, "rgba(0, 240, 255, 0.45)");
      cyanMidGlowGrad.addColorStop(1, "rgba(0, 240, 255, 0)");

      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const yPage = startY + i * stepSize;
        const yScreen = yPage - scrollY;
        const angle = yPage * frequency + phase + Math.PI;
        const x = centerX + amplitude * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, yScreen);
        else ctx.lineTo(x, yScreen);
      }
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 14;
      ctx.strokeStyle = cyanGlowGrad;
      ctx.stroke();

      ctx.lineWidth = 6;
      ctx.strokeStyle = cyanMidGlowGrad;
      ctx.stroke();

      // CORE PASS: Draw tapering cores in segments, but using 100% opaque white (no joint artifacts)
      
      // Helix 1 Core
      for (let i = 1; i <= steps; i++) {
        const yPage = startY + i * stepSize;
        const prevYPage = startY + (i - 1) * stepSize;
        const yScreen = yPage - scrollY;
        const prevYScreen = prevYPage - scrollY;

        const angle = yPage * frequency + phase;
        const prevAngle = prevYPage * frequency + phase;

        const x = centerX + amplitude * Math.sin(angle);
        const prevX = centerX + amplitude * Math.sin(prevAngle);

        const z = Math.cos(angle);
        const prevZ = Math.cos(prevAngle);
        const zAvg = (prevZ + z) / 2;

        const distFromStart = yPage - startY;
        const distToTip = activeLength - yPage;
        const taperStart = distFromStart < 120 ? distFromStart / 120 : 1;
        const taperEnd = distToTip < 120 ? distToTip / 120 : 1;
        const taper = Math.min(taperStart, taperEnd);

        ctx.beginPath();
        ctx.moveTo(prevX, prevYScreen);
        ctx.lineTo(x, yScreen);

        ctx.lineWidth = (1.5 + (zAvg + 1) * 0.8) * taper;
        ctx.strokeStyle = `rgba(255, 255, 255, ${taper})`;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Helix 2 Core
      for (let i = 1; i <= steps; i++) {
        const yPage = startY + i * stepSize;
        const prevYPage = startY + (i - 1) * stepSize;
        const yScreen = yPage - scrollY;
        const prevYScreen = prevYPage - scrollY;

        const angle = yPage * frequency + phase + Math.PI;
        const prevAngle = prevYPage * frequency + phase + Math.PI;

        const x = centerX + amplitude * Math.sin(angle);
        const prevX = centerX + amplitude * Math.sin(prevAngle);

        const z = Math.cos(angle);
        const prevZ = Math.cos(prevAngle);
        const zAvg = (prevZ + z) / 2;

        const distFromStart = yPage - startY;
        const distToTip = activeLength - yPage;
        const taperStart = distFromStart < 120 ? distFromStart / 120 : 1;
        const taperEnd = distToTip < 120 ? distToTip / 120 : 1;
        const taper = Math.min(taperStart, taperEnd);

        ctx.beginPath();
        ctx.moveTo(prevX, prevYScreen);
        ctx.lineTo(x, yScreen);

        ctx.lineWidth = (1.5 + (zAvg + 1) * 0.8) * taper;
        ctx.strokeStyle = `rgba(255, 255, 255, ${taper})`;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    };

    // Render loop using requestAnimationFrame
    let frameId: number;
    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      // Spin proportional to scroll progress plus a continuous very slow, calm idle spin
      state.targetPhase = state.targetProgress * Math.PI * 16 + (performance.now() / 1000) * 0.05;

      // Lerp values for butter-smooth drawing and spin
      state.currentProgress += (state.targetProgress - state.currentProgress) * 0.08;
      
      // Lerp phase
      let diff = state.targetPhase - state.currentPhase;
      state.currentPhase += diff * 0.08;

      drawHelix(state.currentProgress, state.currentPhase);

      frameId = requestAnimationFrame(renderLoop);
    };

    // ScrollTrigger to track scroll progress
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        state.targetProgress = self.progress;
      }
    });

    // Start loop
    renderLoop();

    return () => {
      isRunning = false;
      cancelAnimationFrame(frameId);
      scrollTriggerInstance.kill();
    };
  }, { scope: containerRef, dependencies: [viewportHeight, reducedMotion] });

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-y-0 left-1/2 -translate-x-1/2 w-[200px] z-0 opacity-[0.80] hidden lg:block"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
