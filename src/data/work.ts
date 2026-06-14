export type ProjectPreviewVariant =
  | "devdeck"
  | "scenebook"
  | "financial-analyst"
  | "setuai";

export type WorkStatus = {
  label: string;
  tone: "success";
};

export type WorkItem = {
  title: string;
  label: string;
  description: string;
  tags: string[];
  preview: ProjectPreviewVariant;
  emailSubject: string;
  status?: WorkStatus;
  githubUrl: string;
};

export const workItems: WorkItem[] = [
  {
    title: "DevDeck",
    label: "Agent infrastructure",
    description:
      "An agent-first engineering workspace for orchestrating local development stacks with compact diagnostics and lower token overhead.",
    tags: ["TypeScript", "CLI", "Agent Infra"],
    preview: "devdeck",
    emailSubject: "Discuss DevDeck",
    status: { label: "Active build", tone: "success" },
    githubUrl: "https://github.com/hemang-doshi/dev-deck",
  },
  {
    title: "SceneBook",
    label: "Creator systems",
    description:
      "A creator operating system that brings planning, assets, scripts, and agentic workflows into one focused production loop.",
    tags: ["Next.js", "AI Tools", "Creator OS"],
    preview: "scenebook",
    emailSubject: "Discuss SceneBook",
    status: { label: "Active build", tone: "success" },
    githubUrl: "https://github.com/hemang-doshi/scenebook",
  },
  {
    title: "AI Financial Analyst",
    label: "Local AI",
    description:
      "A local-first analysis assistant using NL2SQL, forecasting, and LLM workflows to answer leadership questions from structured data.",
    tags: ["Python", "FastAPI", "LLMs"],
    preview: "financial-analyst",
    emailSubject: "Discuss the AI Financial Analyst",
    githubUrl: "https://github.com/hemang-doshi/ai-financial-analyst",
  },
  {
    title: "SetuAI",
    label: "Responsible supply chains",
    description:
      "A multilingual supply-chain ethics and compliance prototype for vendor onboarding, document extraction, and explainable risk scoring.",
    tags: ["OCR", "SAP", "Hackathon"],
    preview: "setuai",
    emailSubject: "Discuss SetuAI",
    githubUrl: "https://github.com/hemang-doshi/setuai",
  },
];
