"use client";

import React, { useState, useEffect, useRef } from "react";
import type { ProjectPreviewVariant } from "@/data/work";
import { cn } from "@/lib/utils";

type ProjectPreviewProps = {
  variant: ProjectPreviewVariant;
  className?: string;
};

// Branded SVGs
const DevDeckLogo = () => (
  <svg className="size-5" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="18" width="72" height="72" rx="12" fill="var(--color-aubergine)" opacity="0.95"/>
    <rect x="26" y="30" width="72" height="72" rx="12" fill="var(--color-fuchsia-signal)" opacity="0.96"/>
    <rect x="38" y="42" width="72" height="72" rx="12" fill="var(--color-aubergine)"/>
    <path d="M57 60 L74 77 L57 94" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="82" y="90" width="22" height="8" rx="4" fill="var(--color-fuchsia-signal)"/>
  </svg>
);

const SceneBookLogo = () => (
  <svg className="size-5" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sbGradient" x1="10" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fffdf8"/>
        <stop offset="0.42" stopColor="#ff6847"/>
        <stop offset="1" stopColor="#69a7ff"/>
      </linearGradient>
    </defs>
    <rect x="7" y="7" width="50" height="50" rx="15" fill="#07080b" stroke="url(#sbGradient)" strokeWidth="2.5"/>
    <path d="M18 19.5h28.5M18 28.5h28.5M18 37.5h15.5" stroke="#fffdf8" strokeWidth="3.2" strokeLinecap="round"/>
    <path d="M39.5 36.2l9.2 5.4-9.2 5.3v-10.7z" fill="#ff6847"/>
    <path d="M18 47c5.9-4.4 11.4-4.4 17 0 5.6-4.4 11.1-4.4 17 0" stroke="#69a7ff" strokeWidth="2.3" strokeLinecap="round" fill="none"/>
  </svg>
);

const FinancialAnalystLogo = () => (
  <svg className="size-5" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="7" width="50" height="50" rx="15" fill="#ffffff" stroke="var(--color-heather)" strokeWidth="2"/>
    <circle cx="32" cy="32" r="16" stroke="var(--color-aubergine)" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6"/>
    <circle cx="32" cy="32" r="6" fill="var(--color-fuchsia-signal)"/>
    <path d="M20 40 L28 32 L36 36 L44 26" stroke="var(--color-aubergine)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SetuAiLogo = () => (
  <svg className="size-5" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="7" width="50" height="50" rx="15" fill="#ffffff" stroke="var(--color-heather)" strokeWidth="2"/>
    <path d="M32 18 L44 23 L44 34 C44 42 39 48 32 50 C25 48 20 42 20 34 L20 23 Z" fill="var(--color-aubergine)" opacity="0.05" stroke="var(--color-aubergine)" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M27 32 L30 35 L37 27" stroke="var(--color-forest)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function WindowChrome({ label, logo }: { label: string; logo?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-plum-tinted px-4 py-2.5 bg-canvas">
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-aubergine/10" />
        <span className="size-2 rounded-full bg-aubergine/10" />
        <span className="size-2 rounded-full bg-aubergine/10" />
      </div>
      <div className="flex items-center gap-2">
        {logo}
        <span className="font-[family:var(--font-jetbrains-mono)] text-[10px] font-bold tracking-[0.08em] text-heather uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}

function DevDeckPreview() {
  const [services, setServices] = useState([
    { name: "API", status: "idle", port: "8080" },
    { name: "Worker", status: "idle", port: "N/A" },
    { name: "Web", status: "idle", port: "3000" }
  ]);
  const [logs, setLogs] = useState<string[]>([
    "DevDeck v1.4.7 console ready.",
    "Click a command below to test the agent stack."
  ]);
  const [typing, setTyping] = useState<string | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const triggerCommand = (cmd: string) => {
    if (typing) return;
    setTyping(cmd);
    setLogs(prev => [...prev, `\n$ ${cmd}`]);

    if (cmd === "devdeck start") {
      setTimeout(() => {
        setLogs(prev => [...prev, "Initializing docker resources..."]);
      }, 400);
      setTimeout(() => {
        setLogs(prev => [...prev, "[+] Service Web bound to port 3000"]);
        setServices(prev => prev.map(s => s.name === "Web" ? { ...s, status: "active" } : s));
      }, 800);
      setTimeout(() => {
        setLogs(prev => [...prev, "[+] Service API listening on port 8080"]);
        setServices(prev => prev.map(s => s.name === "API" ? { ...s, status: "active" } : s));
      }, 1200);
      setTimeout(() => {
        setLogs(prev => [...prev, "[+] Service Worker thread active", "Deck status: 3/3 services healthy."]);
        setServices(prev => prev.map(s => s.name === "Worker" ? { ...s, status: "active" } : s));
        setTyping(null);
      }, 1600);
    } else if (cmd === "devdeck status") {
      setTimeout(() => {
        setLogs(prev => [
          ...prev,
          "Fetching service states...",
          ...services.map(s => `  ${s.name}: ${s.status === "active" ? "RUNNING" : "STOPPED"} (${s.port})`)
        ]);
        setTyping(null);
      }, 600);
    } else if (cmd === "devdeck diagnose") {
      setTimeout(() => {
        setLogs(prev => [
          ...prev,
          "Scanning local logs...",
          "No anomalies found. CPU/Memory thresholds at nominal levels."
        ]);
        setTyping(null);
      }, 600);
    }
  };

  return (
    <div className="flex flex-col bg-canvas text-aubergine min-h-56">
      <WindowChrome label="DevDeck Control Plane" logo={<DevDeckLogo />} />
      <div className="grid grid-cols-[100px_1fr] flex-1 min-h-48">
        {/* Left rail service panels */}
        <div className="border-r border-plum-tinted bg-aubergine/[0.02] p-3 flex flex-col gap-3">
          <p className="font-[family:var(--font-jetbrains-mono)] text-[8px] font-bold text-heather uppercase tracking-wider">Services</p>
          <div className="flex flex-col gap-2">
            {services.map(s => (
              <div key={s.name} className="flex flex-col gap-1 rounded-[var(--radius-md)] border border-plum-tinted/50 bg-canvas p-1.5 shadow-subtle text-[9px]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{s.name}</span>
                  <span className={cn("size-2 rounded-full", s.status === "active" ? "bg-forest animate-pulse" : "bg-smoke")} />
                </div>
                <span className="text-[7px] text-heather">{s.port !== "N/A" ? `port ${s.port}` : "no port"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right terminal area */}
        <div className="flex flex-col p-3 gap-3 h-full">
          <div ref={terminalRef} className="flex-1 rounded-[var(--radius-md)] bg-aubergine p-3 font-[family:var(--font-jetbrains-mono)] text-[9px] text-canvas overflow-y-auto shadow-inner">
            {logs.map((l, i) => (
              <div key={i} className="whitespace-pre-wrap leading-relaxed">{l}</div>
            ))}
            {typing && <div className="text-fuchsia-signal animate-pulse">Running {typing}...</div>}
          </div>

          {/* Interactive controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerCommand("devdeck start")}
              disabled={!!typing}
              className="px-2.5 py-1.5 text-[9px] font-bold tracking-wider uppercase bg-fuchsia-signal text-canvas rounded-[var(--radius-md)] hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              Start
            </button>
            <button
              onClick={() => triggerCommand("devdeck status")}
              disabled={!!typing}
              className="px-2.5 py-1.5 text-[9px] font-bold tracking-wider uppercase border border-heather text-aubergine rounded-[var(--radius-md)] hover:bg-aubergine/[0.05] disabled:opacity-50 transition-colors"
            >
              Status
            </button>
            <button
              onClick={() => triggerCommand("devdeck diagnose")}
              disabled={!!typing}
              className="px-2.5 py-1.5 text-[9px] font-bold tracking-wider uppercase border border-heather text-aubergine rounded-[var(--radius-md)] hover:bg-aubergine/[0.05] disabled:opacity-50 transition-colors"
            >
              Diagnose
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneBookPreview() {
  const [selectedStage, setSelectedStage] = useState<"Hook" | "Build" | "Payoff">("Hook");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(15);

  const stageDetails = {
    Hook: {
      timing: "0:00 - 0:05",
      description: "Visual: Agent starts DevDeck. Sound: terminal tap audio. Cue: logo scale pulse.",
      assets: 2
    },
    Build: {
      timing: "0:05 - 0:22",
      description: "Visual: Code flow splits horizontally. Sound: fast rhythmic loop. Cue: color invert.",
      assets: 4
    },
    Payoff: {
      timing: "0:22 - 0:30",
      description: "Visual: Success marks animate. Sound: soft synth chime. Cue: contact band slide-in.",
      assets: 1
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayhead(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col bg-canvas text-aubergine min-h-56">
      <WindowChrome label="SceneBook Studio / v2.0" logo={<SceneBookLogo />} />
      <div className="grid grid-cols-[110px_1fr] flex-1 min-h-48 p-3 gap-3 bg-[#07080b]/[0.01]">
        {/* Storyboard stages selector */}
        <div className="flex flex-col gap-2">
          <p className="font-[family:var(--font-jetbrains-mono)] text-[8px] font-bold text-heather uppercase tracking-wider">Storyboard</p>
          {(["Hook", "Build", "Payoff"] as const).map(stage => (
            <button
              key={stage}
              onClick={() => { setSelectedStage(stage); setPlayhead(stage === "Hook" ? 15 : stage === "Build" ? 50 : 85); }}
              className={cn(
                "w-full text-left p-2 rounded-[var(--radius-md)] border text-[9px] transition-all",
                selectedStage === stage
                  ? "bg-aubergine text-canvas border-aubergine shadow-subtle"
                  : "border-plum-tinted bg-canvas hover:border-heather"
              )}
            >
              <div className="font-semibold">{stage}</div>
              <div className="text-[7px] opacity-75">{stageDetails[stage].timing}</div>
            </button>
          ))}
        </div>

        {/* Video Canvas & Controls */}
        <div className="flex flex-col gap-3 justify-between h-full">
          <div className="flex-1 rounded-[var(--radius-md)] border border-plum-tinted bg-[#07080b] p-3 text-canvas relative overflow-hidden flex flex-col justify-between shadow-inner">
            {/* Visual simulation of video scene */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#240029] via-[#ff6847]/10 to-[#69a7ff]/10 opacity-30 pointer-events-none" />
            <div className="flex justify-between items-start z-10">
              <span className="text-[8px] font-mono bg-[#ff6847]/20 border border-[#ff6847]/30 text-[#ff6847] px-1.5 py-0.5 rounded-full">
                Stage: {selectedStage}
              </span>
              <span className="text-[8px] font-mono opacity-60">
                Assets: {stageDetails[selectedStage].assets} linked
              </span>
            </div>
            
            <p className="text-[9px] leading-relaxed max-w-sm mt-4 z-10 font-medium">
              {stageDetails[selectedStage].description}
            </p>

            <div className="mt-4 flex items-center justify-between z-10">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="size-7 rounded-full bg-canvas/15 border border-canvas/20 flex items-center justify-center hover:bg-canvas/25 transition-colors text-[9px]"
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <span className="text-[8px] font-mono opacity-60">0:30 clip</span>
            </div>
          </div>

          {/* Timeline track */}
          <div className="relative h-2 bg-plum-tinted rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            setPlayhead(pct);
          }}>
            <div
              className="absolute top-0 bottom-0 bg-fuchsia-signal transition-all duration-700"
              style={{ width: `${playhead}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-aubergine border border-canvas shadow-subtle transition-all duration-700"
              style={{ left: `calc(${playhead}% - 6px)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FinancialPreview() {
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<number[]>([]);

  const presets = [
    {
      q: "Forecast Q3 SaaS revenue growth",
      sql: "SELECT month, SUM(revenue) FROM billing WHERE type = 'SaaS' AND quarter = 'Q3' GROUP BY month ORDER BY month;",
      chart: [40, 58, 85]
    },
    {
      q: "Analyze Q4 active subscriber retention",
      sql: "SELECT cohort, retention_rate FROM cohorts WHERE quarter = 'Q4' AND active = true;",
      chart: [92, 88, 82]
    }
  ];

  const triggerPreset = (idx: number) => {
    if (loading) return;
    setActivePreset(idx);
    setLoading(true);
    setTypedPrompt("");
    setSqlQuery("");
    setChartData([]);

    // Simulate type-out
    const fullText = presets[idx].q;
    let charIdx = 0;
    const interval = setInterval(() => {
      setTypedPrompt(fullText.slice(0, charIdx + 1));
      charIdx++;
      if (charIdx >= fullText.length) {
        clearInterval(interval);
        
        // Mock SQL compilation
        setTimeout(() => {
          setSqlQuery(presets[idx].sql);
        }, 500);

        // Render Graph
        setTimeout(() => {
          setChartData(presets[idx].chart);
          setLoading(false);
        }, 1200);
      }
    }, 25);
  };

  return (
    <div className="flex flex-col bg-canvas text-aubergine min-h-56">
      <WindowChrome label="AI Financial Analyst" logo={<FinancialAnalystLogo />} />
      <div className="grid grid-cols-[140px_1fr] flex-1 min-h-48 p-3 gap-3">
        {/* Preset Queries */}
        <div className="flex flex-col gap-2 border-r border-plum-tinted/55 pr-3">
          <p className="font-[family:var(--font-jetbrains-mono)] text-[8px] font-bold text-heather uppercase tracking-wider">Sample Queries</p>
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => triggerPreset(i)}
              disabled={loading}
              className={cn(
                "text-left p-2 rounded-[var(--radius-md)] border text-[9px] transition-all disabled:opacity-50",
                activePreset === i
                  ? "bg-aubergine text-canvas border-aubergine"
                  : "border-plum-tinted hover:border-heather bg-canvas"
              )}
            >
              {p.q}
            </button>
          ))}
        </div>

        {/* Query execution and visualization */}
        <div className="flex flex-col gap-3 justify-between h-full">
          <div className="flex-1 rounded-[var(--radius-md)] border border-plum-tinted p-3 bg-aubergine/[0.01] flex flex-col gap-3 shadow-inner">
            {/* Prompt bar */}
            <div className="flex items-center gap-2 border-b border-plum-tinted/70 pb-2">
              <span className="text-[9px] font-mono text-heather">Input:</span>
              <div className="flex-1 text-[9px] font-medium min-h-4 bg-canvas px-2 py-0.5 rounded border border-plum-tinted/40">
                {typedPrompt || <span className="opacity-40 italic">Select a query query from left...</span>}
              </div>
            </div>

            {/* Generated SQL block */}
            {sqlQuery && (
              <div className="rounded bg-aubergine p-2 font-[family:var(--font-jetbrains-mono)] text-[7px] text-canvas leading-relaxed overflow-x-auto">
                <span className="text-glowstick">SQL Compiled:</span>
                <p className="mt-1">{sqlQuery}</p>
              </div>
            )}

            {/* Chart visualization */}
            {chartData.length > 0 && (
              <div className="flex-1 flex flex-col justify-end">
                <div className="flex h-16 items-end gap-3 justify-center border-b border-plum-tinted">
                  {chartData.map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-aubergine rounded-t-[3px] transition-all duration-700 ease-out"
                        style={{ height: `${val}%`, opacity: 0.4 + idx * 0.25 }}
                      />
                      <span className="text-[7px] font-mono mt-1 text-heather">M{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex items-center justify-center text-[9px] font-mono text-heather gap-2">
                <span className="size-2 rounded-full bg-fuchsia-signal animate-ping" />
                Analyzing data streams...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const DOCUMENTS = [
  {
    name: "Registration Certificate",
    status: "Verified",
    score: 96,
    details: "Official verification signature matched. ISO validation stamps confirmed. Registered in India."
  },
  {
    name: "Labour & safety Policy",
    status: "Extracted",
    score: 82,
    details: "Ethical wage metrics match legal local mandates. Missing certification of heavy-machinery standards."
  },
  {
    name: "Supplier Audit Questionnaire",
    status: "Under Review",
    score: 64,
    details: "Secondary supplier statements pending. High trace environmental carbon score flagged."
  }
];

function SetuPreview() {
  const [selectedDoc, setSelectedDoc] = useState<number>(0);
  const [complianceScore, setComplianceScore] = useState(0);

  useEffect(() => {
    // Animate score from 0 to selected document score
    const target = DOCUMENTS[selectedDoc].score;
    let curr = 0;
    
    // Set to 0 in next tick to avoid synchronous setState warning
    const timeout = setTimeout(() => {
      setComplianceScore(0);
    }, 0);

    const interval = setInterval(() => {
      curr += 2;
      if (curr >= target) {
        setComplianceScore(target);
        clearInterval(interval);
      } else {
        setComplianceScore(curr);
      }
    }, 15);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [selectedDoc]);

  // Compute dash array offset for circle animation
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (complianceScore / 100) * circumference;

  return (
    <div className="flex flex-col bg-canvas text-aubergine min-h-56">
      <WindowChrome label="SetuAI Ethics & Compliance Monitor" logo={<SetuAiLogo />} />
      <div className="grid grid-cols-[1fr_120px] flex-1 min-h-48 p-3 gap-3">
        {/* Document lines */}
        <div className="flex flex-col gap-2.5 justify-center">
          <p className="font-[family:var(--font-jetbrains-mono)] text-[8px] font-bold text-heather uppercase tracking-wider">Verification Checklist</p>
          {DOCUMENTS.map((doc, idx) => (
            <div
              key={doc.name}
              onClick={() => setSelectedDoc(idx)}
              className={cn(
                "flex items-center justify-between rounded-[var(--radius-md)] border p-2 cursor-pointer transition-all",
                selectedDoc === idx
                  ? "border-aubergine bg-aubergine/[0.02] shadow-subtle"
                  : "border-plum-tinted hover:border-heather"
              )}
            >
              <div className="flex flex-col">
                <span className="text-[9px] font-bold">{doc.name}</span>
                <span className="text-[7px] text-heather">{doc.status}</span>
              </div>
              <span className={cn(
                "px-1.5 py-0.5 rounded-full text-[7px] font-bold uppercase",
                doc.status === "Verified" ? "bg-honeydew text-forest" : "bg-aubergine/[0.04] text-heather"
              )}>
                {doc.score}%
              </span>
            </div>
          ))}
        </div>

        {/* Compliance Dial & Fact drawer */}
        <div className="flex flex-col gap-3 justify-between border-l border-plum-tinted/55 pl-3 h-full">
          <div className="flex flex-col items-center justify-center pt-2">
            <div className="relative size-16">
              <svg className="size-full transform -rotate-90">
                {/* Background path */}
                <circle cx="32" cy="32" r={radius} stroke="var(--color-plum-tinted)" strokeWidth="3.5" fill="none" opacity="0.3" />
                {/* Animated compliance dial path */}
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  stroke="var(--color-aubergine)"
                  strokeWidth="3.5"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-[family:var(--font-jetbrains-mono)] text-[11px] font-bold">
                {complianceScore}
              </div>
            </div>
            <span className="text-[7px] font-mono uppercase tracking-wider text-heather mt-1">Trust index</span>
          </div>

          <div className="flex-1 rounded-[var(--radius-md)] bg-aubergine/[0.02] border border-plum-tinted/40 p-2 text-[8px] leading-relaxed text-heather max-h-20 overflow-y-auto">
            {DOCUMENTS[selectedDoc].details}
          </div>
        </div>
      </div>
    </div>
  );
}

const previews = {
  devdeck: DevDeckPreview,
  scenebook: SceneBookPreview,
  "financial-analyst": FinancialPreview,
  setuai: SetuPreview,
} satisfies Record<ProjectPreviewVariant, () => React.ReactNode>;

export function ProjectPreview({ variant, className }: ProjectPreviewProps) {
  const Preview = previews[variant];

  return (
    <div
      aria-hidden="true"
      data-preview={variant}
      className={cn(
        "overflow-hidden rounded-[var(--radius-xl)] bg-canvas text-aubergine border border-plum-tinted/40 shadow-subtle transition-[transform,box-shadow] duration-300 hover:shadow-subtle-5",
        className
      )}
    >
      <Preview />
    </div>
  );
}
