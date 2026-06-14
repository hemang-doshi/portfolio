export type WorkItem = {
  title: string;
  badge?: string;
  description: string;
  tags: string[];
  href: string;
};

export const workItems: WorkItem[] = [
  {
    title: "DevDeck",
    badge: "Featured",
    description:
      "Agent-first engineering workspace for orchestrating local development stacks with compact diagnostics and lower token overhead.",
    tags: ["TypeScript", "CLI", "Agent Infra"],
    href: "#contact",
  },
  {
    title: "SceneBook",
    description:
      "Creator operating system for short-form builders, combining planning, assets, scripts, and agentic workflows.",
    tags: ["Next.js", "AI Tools", "Creator OS"],
    href: "#contact",
  },
  {
    title: "AI Financial Analyst",
    description:
      "Local-first financial analysis assistant using NL2SQL, forecasting, and LLM workflows for leadership queries.",
    tags: ["Python", "FastAPI", "LLMs"],
    href: "#contact",
  },
  {
    title: "SetuAI",
    description:
      "Supply-chain ethics and compliance prototype for multilingual vendor onboarding and risk scoring.",
    tags: ["OCR", "SAP", "Hackathon"],
    href: "#contact",
  },
];
