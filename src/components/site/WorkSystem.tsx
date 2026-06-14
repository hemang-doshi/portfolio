"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { WritingNotes } from "@/components/site/WritingNotes";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkCard } from "@/components/ui/WorkCard";
import { workItems } from "@/data/work";

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
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<Array<{ command?: string; output: React.ReactNode }>>([
    {
      output: (
        <div className="text-plum-tinted/70">
          Welcome to Hemang's interactive terminal. Type <span className="text-glowstick font-bold">help</span> to begin.
        </div>
      )
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  useGSAP(() => {
    const workEl = containerRef.current?.querySelector("#work");
    const tpEl = containerRef.current?.querySelector("#system-console");

    // Selected work reveal on scroll
    gsap.fromTo(".work-header-anim, .work-card-anim",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: workEl || "#work",
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        }
      }
    );

    // Thought process/system console reveal on scroll
    gsap.fromTo(".tp-header-anim, .tp-grid-trigger",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: tpEl || "#system-console",
          start: "top 85%",
          end: "top 55%",
          scrub: 1,
        }
      }
    );
  }, { scope: containerRef });

  const scrollToBottom = () => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
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
          output = <span className="text-strawberry">Error: Project '{target}' not found. Type 'ls' to list available projects.</span>;
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
              <span><span className="text-heather font-bold">OS:</span> PortfolioOS v2.0</span>
              <span><span className="text-heather font-bold">Shell:</span> portfolio-sh</span>
              <span><span className="text-heather font-bold">Host:</span> Mac Studio (M2 Ultra)</span>
              <span><span className="text-heather font-bold">Stack:</span> NextJS, React, TS, Python, GSAP</span>
              <span><span className="text-heather font-bold">Uptime:</span> 99.98%</span>
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
        output = <span className="italic text-plum-tinted/90">"{randomJoke}"</span>;
        break;
      }
      case "clear":
        setHistory([]);
        return;
      default:
        output = <span className="text-strawberry">Command not found: '{cmd}'. Type 'help' to see list of commands.</span>;
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
      <section id="work" className="section-anchor bg-transparent py-32 sm:py-44">
        <div className="section-shell">
          <div className="work-header-anim">
            <SectionHeader
              eyebrow="SELECTED WORK"
              title="Products shaped around real constraints."
              description="Four systems exploring agent infrastructure, creator workflows, local analysis, and responsible supply chains."
            />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 work-grid-trigger">
            {workItems.map((item) => (
              <div key={item.title} className="work-card-anim">
                <WorkCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <WritingNotes />

      <section id="system-console" className="section-anchor bg-transparent py-32 sm:py-44">
        <div className="section-shell relative">
          <div className="tp-header-anim max-w-xl mx-auto text-center mb-8">
            <p className="font-[family:var(--font-jetbrains-mono)] text-[10px] font-bold text-fuchsia-signal uppercase tracking-wider mb-1.5">System Operations Console</p>
            <h2 className="text-xl font-bold text-aubergine">Interactive Diagnostic Terminal</h2>
            <p className="text-xs text-heather mt-1">Execute commands directly to inspect system logs, node status, and tech stack configurations.</p>
          </div>
          
          <div className="tp-grid-trigger max-w-3xl mx-auto">
            {/* Interactive Console Terminal */}
            <div className="rounded-[var(--radius-xl)] bg-aubergine text-canvas p-5 font-mono text-[10px] flex flex-col gap-3.5 shadow-subtle-5 border border-aubergine h-[280px] overflow-hidden">
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
              <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1 custom-scrollbar">
                {history.map((entry, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    {entry.command && (
                      <div className="flex items-center gap-1 text-white/50">
                        <span>guest@hemang-portfolio:~$</span>
                        <span className="text-canvas font-bold">{entry.command}</span>
                      </div>
                    )}
                    <div>{entry.output}</div>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Input Bar */}
              <div className="flex items-center gap-1.5 border-t border-white/10 pt-2 flex-shrink-0">
                <span className="text-glowstick font-bold">guest@hemang-portfolio:~$</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-canvas border-none outline-none focus:ring-0 p-0 font-mono text-[10px]"
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
