"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMailtoHref, siteConfig } from "@/lib/site-config";

function GmailMockup() {
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent">("idle");
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sender || !message) return;

    setSendState("sending");

    // Animate "Sending..." popup using GSAP
    gsap.fromTo(
      notificationRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
    );

    setTimeout(() => {
      setSendState("sent");
      
      // Clear inputs
      setSender("");
      setSubject("");
      setMessage("");

      // Hide success state after a while and reset form
      setTimeout(() => {
        gsap.to(notificationRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.4,
          onComplete: () => setSendState("idle")
        });
      }, 4000);
    }, 1500);
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-canvas rounded-xl border border-plum-tinted/50 shadow-subtle-5 overflow-hidden flex flex-col font-sans text-xs text-aubergine min-h-[350px]">
      
      {/* Gmail Window Header */}
      <div className="bg-aubergine text-canvas px-4 py-3 flex items-center justify-between select-none">
        <span className="font-semibold tracking-wide">New Message</span>
        <div className="flex items-center gap-2.5 opacity-80 text-sm">
          <span className="cursor-pointer hover:opacity-100">─</span>
          <span className="cursor-pointer hover:opacity-100">⤢</span>
          <span className="cursor-pointer hover:opacity-100">✕</span>
        </div>
      </div>

      {sendState === "sent" ? (
        /* Success Screen */
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4 bg-canvas">
          <div className="size-14 rounded-full bg-honeydew border border-mint flex items-center justify-center text-forest text-2xl animate-bounce">
            ✓
          </div>
          <div>
            <h4 className="font-bold text-sm text-aubergine">Message Sent!</h4>
            <p className="mt-2 text-heather text-[11px] leading-relaxed">
              Thanks for reaching out. Hemang's inbox has received your details (simulated) and he will get back to you shortly.
            </p>
          </div>
          <button 
            onClick={() => setSendState("idle")}
            className="mt-2 px-4 py-2 border border-heather rounded-lg font-bold text-aubergine hover:bg-aubergine/[0.03] transition-colors"
          >
            Compose Another
          </button>
        </div>
      ) : (
        /* Mail Form */
        <form onSubmit={handleSend} className="flex-1 flex flex-col p-4 gap-3.5 bg-canvas">
          
          {/* Recipient Field */}
          <div className="flex items-center gap-2 border-b border-plum-tinted/30 pb-2.5">
            <span className="text-heather font-medium w-10">To:</span>
            <div 
              onClick={() => setIsRevealed(true)}
              onMouseEnter={() => setIsRevealed(true)}
              className="flex-1 cursor-pointer font-mono font-semibold text-aubergine text-[11px]"
              title="Click/Hover to reveal email address"
            >
              {isRevealed ? (
                <span className="text-fuchsia-signal select-all">{siteConfig.email}</span>
              ) : (
                <span className="text-heather opacity-75">hemangd... @ gmail.com <span className="text-[9px] font-sans font-normal italic ml-2">(hover to reveal)</span></span>
              )}
            </div>
          </div>

          {/* Sender Email Input */}
          <div className="flex items-center gap-2 border-b border-plum-tinted/30 pb-2.5">
            <span className="text-heather font-medium w-10">From:</span>
            <input
              type="email"
              required
              placeholder="your.email@domain.com"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-medium placeholder-heather/50 text-aubergine"
            />
          </div>

          {/* Subject Input */}
          <div className="flex items-center gap-2 border-b border-plum-tinted/30 pb-2.5">
            <span className="text-heather font-medium w-10">Subject:</span>
            <input
              type="text"
              placeholder="Let's build a product / job inquiry"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-medium placeholder-heather/50 text-aubergine"
            />
          </div>

          {/* Message Area */}
          <div className="flex-1 min-h-[120px] flex">
            <textarea
              required
              placeholder="Hi Hemang, I saw your portfolio work and wanted to reach out regarding..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-transparent border-none outline-none resize-none font-medium placeholder-heather/50 text-aubergine leading-relaxed"
            />
          </div>

          {/* Form Actions Footer */}
          <div className="border-t border-plum-tinted/20 pt-3 flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={sendState === "sending"}
                className="px-5 py-2.5 bg-fuchsia-signal text-canvas font-bold rounded-lg shadow-sm hover:opacity-95 disabled:opacity-50 transition-opacity flex items-center gap-2"
              >
                {sendState === "sending" ? "Sending..." : "Send"}
              </button>
              {/* Fake Rich Formatting icons */}
              <div className="hidden sm:flex items-center gap-2 text-heather/60 text-sm">
                <span className="cursor-not-allowed">A</span>
                <span className="cursor-not-allowed">📎</span>
                <span className="cursor-not-allowed">🔗</span>
                <span className="cursor-not-allowed">📷</span>
              </div>
            </div>
            {/* Trash can */}
            <span 
              onClick={() => { setSender(""); setSubject(""); setMessage(""); }}
              className="cursor-pointer text-heather/60 hover:text-aubergine text-sm"
              title="Discard draft"
            >
              🗑️
            </span>
          </div>
        </form>
      )}

      {/* GSAP Status Alert Notification */}
      <div 
        ref={notificationRef}
        className="absolute bottom-4 left-4 right-4 bg-aubergine text-canvas px-4 py-3 rounded-lg shadow-elevated flex items-center justify-between border border-plum-tinted/10 pointer-events-none opacity-0 translate-y-[50px] z-30"
      >
        <span className="font-semibold text-[10px] tracking-wide uppercase">
          {sendState === "sending" ? "📨 Sending message..." : "✉️ Message sent successfully!"}
        </span>
        {sendState === "sent" && <span className="text-[9px] text-glowstick font-bold">Undo</span>}
      </div>

    </div>
  );
}

export function ContactBand() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header & Content reveal on scroll
    gsap.fromTo(".cb-text-anim, .cb-preview-anim", 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current || "#contact",
          start: "top 85%",
          end: "top 55%",
          scrub: 1,
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="overflow-hidden bg-transparent py-32 text-aubergine sm:py-44"
    >
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col items-start lg:pr-16">
          <div className="cb-text-anim">
            <Eyebrow className="text-heather">LET’S BUILD SOMETHING USEFUL</Eyebrow>
          </div>
          <h2 className="display-heading mt-4 max-w-3xl text-[length:clamp(2.4rem,6vw,var(--text-heading-lg))] leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)] text-aubergine cb-text-anim">
            Have a hard problem worth making clear?
          </h2>
          <p className="mt-6 max-w-[450px] text-[length:var(--text-body)] leading-[1.65] text-heather cb-text-anim">
            I’m interested in thoughtful teams working on developer tools, AI-native
            products, cloud platforms, and creator workflows. Based in the Indian peninsula.
          </p>
          
          <div className="mt-8 flex flex-col gap-3 sm:flex-row cb-text-anim">
            <a 
              href={buildMailtoHref("Direct Inquiry")}
              className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] px-6 py-3 text-[length:var(--text-body)] font-semibold tracking-[var(--tracking-body)] bg-fuchsia-signal text-canvas hover:bg-[color-mix(in_srgb,var(--color-fuchsia-signal)_90%,var(--color-aubergine)_10%)] transition-all hover:-translate-y-0.5 shadow-subtle"
            >
              Email Direct
            </a>
            <Button
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="border-aubergine/40 text-aubergine hover:bg-aubergine/5"
            >
              View GitHub
            </Button>
          </div>
        </div>

        {/* Custom Gmail Mockup */}
        <div className="relative cb-preview-anim w-full">
          <GmailMockup />
        </div>
      </div>
    </section>
  );
}
