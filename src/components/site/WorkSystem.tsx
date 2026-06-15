"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WritingNotes } from "@/components/site/WritingNotes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkCard } from "@/components/ui/WorkCard";
import { workItems } from "@/data/work";
import { HandDrawnAnnotation } from "@/components/ui/HandDrawnAnnotation";

const consoleDetails: Record<
  string,
  {
    title: string;
    repo: string;
    loc: string;
    details: string[];
    status: string;
    coverage: string;
  }
> = {
  devdeck: {
    title: "DevDeck Stack Node",
    repo: "github.com/hemang-doshi/dev-deck",
    loc: "14,240 lines (TypeScript)",
    details: [
      "Process Manager: started dev server thread on 4545",
      "Observations: log scrub buffers computed: -45% overhead",
      "Diagnostics: DD-OK-0000 active, 4 service loops mounted",
      "Status flags: non-interactive CLI agent wrapper deployed",
    ],
    status: "ACTIVE BUILD",
    coverage: "94% unit pass",
  },
  scenebook: {
    title: "SceneBook Cinematic Core",
    repo: "github.com/hemang-doshi/scenebook",
    loc: "8,420 lines (NextJS 16)",
    details: [
      "Storyboard node: 3 scenes initialized (Hook, Build, Payoff)",
      "Reel asset binder: public/media/sample-reel.mp4 mounted",
      "Sample mode: fallback memory DB active, Supabase client idle",
      "Vibe index: geist mono command center visual deck ready",
    ],
    status: "SAMPLE MODE",
    coverage: "89% playpass",
  },
  "financial-analyst": {
    title: "AI Financial LLM Engine",
    repo: "github.com/hemang-doshi/ai-financial-analyst",
    loc: "5,680 lines (Python / FastAPI)",
    details: [
      "Model inference: PGVector index built locally",
      "NLP Router: NL2SQL query compiler online",
      "Database status: sqlite dev instance active",
      "Forecast bounds: confidence scoring matrix loaded",
    ],
    status: "IDLE STATUS",
    coverage: "91% accuracy",
  },
  setuai: {
    title: "SetuAI Ethics Inspector",
    repo: "github.com/hemang-doshi/setuai",
    loc: "3,110 lines (SAP / OCR integration)",
    details: [
      "Parser node: OCR document layout model compiled",
      "Language model: multilingual translator loop warm",
      "Supplier ledger: SAP ethical scoring registry initialized",
      "Risk metric: circular dial compliance index configured",
    ],
    status: "COMPLETED BUILD",
    coverage: "95% accuracy",
  },
};

export function WorkSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalScrollRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<Array<{ command?: string; output: React.ReactNode }>>([
    {
      output: (
        <div className="text-plum-tinted/70">
          welcome to the tiny command center. type <span className="text-glowstick font-bold">help</span> if u wanna poke around.
        </div>
      )
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  useGSAP(() => {
    const workEl = containerRef.current?.querySelector("#work");
    const tpEl = containerRef.current?.querySelector("#system-console");

    // Selected work header reveal on scroll
    gsap.fromTo(".work-header-anim",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: workEl || "#work",
          start: "top 90%",
          end: "top 10%",
          scrub: 1.5,
        }
      }
    );

    const mm = gsap.matchMedia();

    // Desktop/Tablet: cards coming in sequentially (top 2 first, bottom 2 after)
    mm.add("(min-width: 768px)", () => {
      // Animate the "i'm interactive" annotation with scroll, but faster and earlier than the cards
      gsap.fromTo(".work-interactive-annotation",
        { 
          opacity: 0,
          scale: 0.6,
          x: -20,
          y: -20
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".work-grid-trigger",
            start: "top 100%",
            end: "top 85%",
            scrub: 1,
          }
        }
      );

      const workTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-grid-trigger",
          start: "top 90%",
          end: "bottom 60%",
          scrub: 1.5,
        }
      });

      workTl.fromTo([".work-card-top-left", ".work-card-top-right"],
        { 
          x: (index) => index === 0 ? -120 : 120, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1,
        }
      );

      workTl.fromTo([".work-card-bottom-left", ".work-card-bottom-right"],
        { 
          x: (index) => index === 0 ? -120 : 120, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1,
        },
        "-=0.5"
      );
    });

    // Mobile: animate each card individually as it enters the viewport (no scrub)
    mm.add("(max-width: 767px)", () => {
      const cards = [
        ".work-card-top-left",
        ".work-card-top-right",
        ".work-card-bottom-left",
        ".work-card-bottom-right"
      ];

      cards.forEach((cardSelector) => {
        gsap.fromTo(cardSelector,
          { 
            y: 40,
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 0.6,
            scrollTrigger: {
              trigger: cardSelector,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    });

    // Thought process/system console pin & reveal on scroll
    mm.add("(min-width: 1024px) and (min-height: 850px)", () => {
      const tpTl = gsap.timeline({
        scrollTrigger: {
          trigger: tpEl || "#system-console",
          start: "top center",
          end: "+=400",
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        }
      });

      tpTl.fromTo(".tp-header-anim, .tp-grid-trigger",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    });

    mm.add("(max-width: 1023px), (max-height: 849px)", () => {
      const tpTl = gsap.timeline({
        scrollTrigger: {
          trigger: tpEl || "#system-console",
          start: "top 85%",
          end: "top 30%",
          scrub: 1,
        }
      });

      tpTl.fromTo(".tp-header-anim, .tp-grid-trigger",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    });
  }, { scope: containerRef });

  const scrollToBottom = () => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  };

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="flex flex-col gap-1 text-plum-tinted/90">
            <span>Available commands:</span>
            <span>- <span className="text-glowstick font-bold">ls</span> / <span className="text-glowstick font-bold">projects</span>: List projects</span>
            <span>- <span className="text-glowstick font-bold">cat [project]</span>: Inspect project (e.g. <span className="text-fuchsia-signal font-bold">cat devdeck</span>)</span>
            <span>- <span className="text-glowstick font-bold">status</span>: Global server status metrics</span>
            <span>- <span className="text-glowstick font-bold">neofetch</span>: Display developer profile config</span>
            <span>- <span className="text-glowstick font-bold">joke</span>: Print a dev joke</span>
            <span>- <span className="text-glowstick font-bold">clear</span>: Clear terminal console</span>
          </div>
        );
        break;
      case "ls":
      case "projects":
        output = (
          <div className="flex flex-col gap-1 text-plum-tinted/90">
            {Object.keys(consoleDetails).map((key) => (
              <span key={key}>
                <span className="text-glowstick font-semibold">{key}</span> - {consoleDetails[key].title}
              </span>
            ))}
          </div>
        );
        break;
      case "cat": {
        const target = arg.toLowerCase().trim();
        if (!target) {
          output = <span className="text-strawberry">Error: Please specify a project slug. (e.g., cat devdeck)</span>;
        } else if (consoleDetails[target]) {
          const detail = consoleDetails[target];
          output = (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 border-b border-white/10 pb-1">
                <span className="text-glowstick font-bold text-[11px]">{detail.title}</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded text-[8px] text-plum-tinted uppercase">{detail.status}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span><span className="text-heather font-bold">Repository:</span> <a href={`https://${detail.repo}`} target="_blank" rel="noreferrer" className="text-fuchsia-signal hover:underline">{detail.repo}</a></span>
                <span><span className="text-heather font-bold">Code size:</span> {detail.loc}</span>
                <span><span className="text-heather font-bold">Coverage:</span> <span className="text-mint font-bold">{detail.coverage}</span></span>
                <div className="border-t border-white/5 pt-1.5 mt-1 flex flex-col gap-1 text-[9px] text-plum-tinted/80">
                  {detail.details.map((d, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-fuchsia-signal font-bold">&gt;</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        } else {
          output = <span className="text-strawberry">Error: Project &apos;{target}&apos; not found. Type &apos;ls&apos; to list available projects.</span>;
        }
        break;
      }
      case "status":
        output = (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-plum-tinted/90">
            <span><span className="text-heather font-bold">Uptime:</span> 99.98%</span>
            <span><span className="text-heather font-bold">System Load:</span> 0.42</span>
            <span><span className="text-heather font-bold">Active Nodes:</span> 4/4 Online</span>
            <span className="flex items-center gap-1">
              <span className="text-heather font-bold">Global Status:</span>
              <span className="size-1.5 rounded-full bg-forest animate-pulse" />
              <span className="text-forest uppercase font-bold text-[8px] tracking-wide">Available</span>
            </span>
          </div>
        );
        break;
      case "neofetch":
        output = (
          <div className="flex gap-4 items-start text-plum-tinted/95">
            <pre className="text-fuchsia-signal leading-tight font-bold select-none text-[8px]">
{`  _  _  ___  
 | || ||   \\ 
 | __ || |) |
 |_||_||___/ `}
            </pre>
            <div className="flex flex-col gap-0.5">
              <span><span className="text-glowstick font-bold">guest</span>@<span className="text-glowstick font-bold">hemang-portfolio</span></span>
              <span>-----------------------------</span>
              <span><span className="text-heather font-bold">mode:</span> building + creating + overthinking</span>
              <span><span className="text-heather font-bold">interests:</span> software, ai, creator tools, food, ideas, places</span>
              <span><span className="text-heather font-bold">stack:</span> ts/react/next, python, postgres, docker, ai workflows</span>
              <span><span className="text-heather font-bold">creator_arc:</span> documenting the messy middle</span>
              <span><span className="text-heather font-bold">current_bug:</span> too many ideas, not enough weekends</span>
              <span><span className="text-heather font-bold">status:</span> probably outside or shipping something</span>
            </div>
          </div>
        );
        break;
      case "joke": {
        const jokes = [
          "Why do programmers wear glasses? Because they can't C#.",
          "There are 10 types of people in the world: those who understand binary, and those who don't.",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
          "A SQL query goes into a bar, walks up to two tables and asks, 'Can I join you?'",
          "['hip', 'hip'] (hip hip array!)"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        output = <span className="italic text-plum-tinted/90">&quot;{randomJoke}&quot;</span>;
        break;
      }
      case "clear":
        setHistory([]);
        return;
      default:
        output = <span className="text-strawberry">Command not found: &apos;{cmd}&apos;. Type &apos;help&apos; to see list of commands.</span>;
    }

    setHistory((prev) => [...prev, { command: cmdText, output }]);
    setTimeout(scrollToBottom, 20);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
      setInputValue("");
    }
  };

  return (
    <div ref={containerRef}>
      <section id="work" className="section-anchor bg-transparent py-[var(--section-block-padding)]">
        <div className="section-shell">
          <div className="work-header-anim">
            <SectionHeader
              eyebrow="things i&apos;ve made"
              title="projects, experiments, and rabbit holes."
              description="a small trail of things i&apos;ve been making across software, ai workflows, creator tools, and problem-solving under real constraints. some are serious builds, some started as “wait, why is this so annoying?”"
            />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 work-grid-trigger">
            {workItems.map((item, index) => {
              let cardClass = "";
              if (index === 0) cardClass = "work-card-top-left";
              else if (index === 1) cardClass = "work-card-top-right";
              else if (index === 2) cardClass = "work-card-bottom-left";
              else if (index === 3) cardClass = "work-card-bottom-right";

              return (
                <div
                  key={item.title}
                  className="relative flex flex-col h-full"
                >
                  {index === 0 && (
                    <HandDrawnAnnotation className="absolute left-4 -top-32 work-interactive-annotation lg:flex">
                      i'm interactive!
                    </HandDrawnAnnotation>
                  )}
                  <div className={`work-card-anim flex-1 flex flex-col ${cardClass}`}>
                    <WorkCard item={item} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WritingNotes />

      <section id="system-console" className="section-anchor bg-transparent pt-6 sm:pt-8 lg:pt-8 xl:pt-10 pb-[var(--section-block-padding)]">
        <div className="section-shell relative">
          <div className="tp-header-anim max-w-xl mx-auto text-center mb-8">
            <p className="font-[family:var(--font-jetbrains-mono)] text-[10px] font-bold text-fuchsia-signal uppercase tracking-wider mb-1.5">little system console</p>
            <h2 className="text-xl font-bold text-aubergine">a slightly dramatized corner of my brain</h2>
            <p className="text-xs text-heather mt-1">type around to inspect the projects, stack, and a few bits of developer lore. mostly useful, mildly unnecessary, very on brand.</p>
          </div>
          
          <div className="tp-grid-trigger max-w-3xl mx-auto">
            <div className="rounded-[var(--radius-xl)] bg-[#240029] text-white p-5 font-mono text-[10px] flex flex-col gap-3.5 shadow-subtle-5 border border-[#240029] h-[280px] overflow-hidden">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-strawberry" />
                  <span className="size-2.5 rounded-full bg-glowstick" />
                  <span className="size-2.5 rounded-full bg-forest" />
                </div>
                <span className="text-white/40 text-[9px]">guest@hemang-portfolio:~</span>
              </div>
              
              {/* Terminal Logs/Scroll area */}
              <div ref={terminalScrollRef} className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1 custom-scrollbar">
                {history.map((entry, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    {entry.command && (
                      <div className="flex items-center gap-1 text-white/50">
                        <span>guest@hemang-portfolio:~$</span>
                        <span className="text-white font-bold">{entry.command}</span>
                      </div>
                    )}
                    <div>{entry.output}</div>
                  </div>
                ))}
              </div>

              {/* Terminal Input Bar */}
              <div className="flex items-center gap-1.5 border-t border-white/10 pt-2 flex-shrink-0">
                <span className="text-glowstick font-bold">guest@hemang-portfolio:~$</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white border-none outline-none focus:ring-0 p-0 font-mono text-[10px]"
                  placeholder="type command..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
