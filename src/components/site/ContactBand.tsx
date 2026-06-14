"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
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
    <div className="relative w-full max-w-md mx-auto bg-white dark:bg-[#131926] rounded-2xl border border-[#cbd5e1]/80 dark:border-[#334155] shadow-lg overflow-hidden flex flex-col font-sans text-xs text-[#1f1f1f] dark:text-[#f1f5f9] min-h-[360px]">
      
      {/* Gmail Window Header */}
      <div className="bg-[#f2f6fc] dark:bg-[#202124] text-[#1f1f1f] dark:text-[#e3e3e3] px-5 py-3 flex items-center justify-between select-none rounded-t-2xl border-b border-[#e0e0e0]/40 dark:border-[#303134]">
        <span className="font-semibold text-xs text-[#1f1f1f] dark:text-[#e3e3e3]">New Message</span>
        <div className="flex items-center gap-3 text-[#444746] dark:text-[#c4c7c5]">
          <button type="button" className="hover:bg-black/5 dark:hover:bg-white/10 p-1 rounded cursor-pointer animate-none" aria-label="Minimize">
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </button>
          <button type="button" className="hover:bg-black/5 dark:hover:bg-white/10 p-1 rounded cursor-pointer animate-none" aria-label="Expand">
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
          </button>
          <button type="button" className="hover:bg-black/5 dark:hover:bg-white/10 p-1 rounded cursor-pointer animate-none" aria-label="Close">
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
      </div>

      {sendState === "sent" ? (
        /* Success Screen */
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4 bg-white dark:bg-[#131926] rounded-b-2xl">
          <div className="size-12 rounded-full bg-honeydew border border-mint flex items-center justify-center text-forest text-xl animate-bounce">
            ✓
          </div>
          <div>
            <h4 className="font-semibold text-sm text-[#1f1f1f] dark:text-[#f1f5f9]">Message Sent!</h4>
            <p className="mt-2 text-[#767676] dark:text-[#9e9e9e] text-[11px] leading-relaxed">
              Thanks for reaching out. Hemang's inbox has received your details (simulated) and he will get back to you shortly.
            </p>
          </div>
          <button 
            onClick={() => setSendState("idle")}
            className="mt-2 px-4 py-2 border border-[#cbd5e1] dark:border-[#334155] rounded-full font-medium text-xs text-[#0b57d0] dark:text-[#38bdf8] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            Compose Another
          </button>
        </div>
      ) : (
        /* Mail Form */
        <form onSubmit={handleSend} className="flex-1 flex flex-col px-5 pb-5 pt-0 gap-0 bg-white dark:bg-[#131926] rounded-b-2xl">
          
          {/* Recipient Field */}
          <div className="flex items-center gap-2 border-b border-[#f1f3f4] dark:border-[#303134] py-2.5 text-[11px]">
            <span className="text-[#767676] dark:text-[#9e9e9e] shrink-0 w-14 text-left">To</span>
            <div 
              onClick={() => setIsRevealed(true)}
              onMouseEnter={() => setIsRevealed(true)}
              className="flex-1 min-w-0 cursor-pointer font-mono font-medium text-[#1f1f1f] dark:text-[#f1f5f9] truncate"
              title="Click/Hover to reveal email address"
            >
              {isRevealed ? (
                <span className="text-[#0b57d0] dark:text-[#38bdf8] select-all">{siteConfig.email}</span>
              ) : (
                <span className="text-[#767676]/80 dark:text-[#9e9e9e]/80">hemangd... @ gmail.com <span className="text-[9px] font-sans font-normal italic ml-2">(hover to reveal)</span></span>
              )}
            </div>
          </div>

          {/* Sender Email Input */}
          <div className="flex items-center gap-2 border-b border-[#f1f3f4] dark:border-[#303134] py-2.5 text-[11px]">
            <span className="text-[#767676] dark:text-[#9e9e9e] shrink-0 w-14 text-left">From</span>
            <input
              type="email"
              required
              placeholder="your.email@domain.com"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="flex-1 min-w-0 w-full bg-transparent border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 font-normal placeholder-[#767676]/40 text-[#1f1f1f] dark:text-[#f1f5f9]"
            />
          </div>

          {/* Subject Input */}
          <div className="flex items-center gap-2 border-b border-[#f1f3f4] dark:border-[#303134] py-2.5 text-[11px]">
            <span className="text-[#767676] dark:text-[#9e9e9e] shrink-0 w-14 text-left">Subject</span>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 min-w-0 w-full bg-transparent border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 font-normal placeholder-[#767676]/40 text-[#1f1f1f] dark:text-[#f1f5f9]"
            />
          </div>

          {/* Message Area */}
          <div className="flex-1 min-h-[140px] flex pt-3">
            <textarea
              required
              placeholder="Say hello..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-transparent border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 resize-none font-normal placeholder-[#767676]/40 text-[#1f1f1f] dark:text-[#f1f5f9] leading-relaxed text-xs pt-1"
            />
          </div>

          {/* Form Actions Footer */}
          <div className="border-t border-[#f1f3f4] dark:border-[#303134] pt-3 flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5">
              <button
                type="submit"
                disabled={sendState === "sending"}
                className="px-5 py-2 bg-[#0b57d0] hover:bg-[#0842a0] disabled:bg-[#0b57d0]/50 text-white font-semibold rounded-full shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
              >
                {sendState === "sending" ? "Sending..." : "Send"}
              </button>
              
              {/* Authentic Gmail Toolbar Emojis/Icons in proper size */}
              <div className="hidden sm:flex items-center gap-1.5 text-[#444746] dark:text-[#c4c7c5]">
                <button type="button" className="hover:bg-black/5 dark:hover:bg-white/10 p-1.5 rounded cursor-pointer" title="Formatting options">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16" /><path d="M12 4v12" /><path d="M8 10h8" /></svg>
                </button>
                <button type="button" className="hover:bg-black/5 dark:hover:bg-white/10 p-1.5 rounded cursor-pointer" title="Attach files">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                </button>
                <button type="button" className="hover:bg-black/5 dark:hover:bg-white/10 p-1.5 rounded cursor-pointer" title="Insert link">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                </button>
                <button type="button" className="hover:bg-black/5 dark:hover:bg-white/10 p-1.5 rounded cursor-pointer" title="Insert emoji">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-[#444746] dark:text-[#c4c7c5]">
              <button 
                type="button"
                onClick={() => { setSender(""); setSubject(""); setMessage(""); }}
                className="hover:bg-black/5 dark:hover:bg-white/10 p-1.5 rounded text-[#444746] hover:text-strawberry dark:text-[#c4c7c5] dark:hover:text-red-400 cursor-pointer -mr-[5px]"
                title="Discard draft"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              </button>
            </div>
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
    // Contact section pin & reveal on scroll
    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current || "#contact",
        start: "top center",
        end: "+=400",
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
      }
    });

    contactTl.fromTo(".cb-text-anim, .cb-preview-anim",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
      }
    );

  }, { scope: containerRef });

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="overflow-hidden bg-transparent py-12 text-aubergine sm:py-16 lg:py-20"
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
