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
      "a devtool for making local engineering stacks easier to run, inspect, and hand off to coding agents without wasting time staring at terminals.",
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
      "a creator workspace for turning messy content ideas into scripts, assets, edits, and experiments — basically the tool i wanted for my own creator workflow.",
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
      "an ai/data experiment for turning business questions into sql, forecasts, and readable answers from structured data.",
    tags: ["Python", "FastAPI", "LLMs"],
    preview: "financial-analyst",
    emailSubject: "Discuss the AI Financial Analyst",
    githubUrl: "https://github.com/hemang-doshi/ai-financial-analyst",
  },
  {
    title: "SetuAI",
    label: "Responsible supply chains",
    description:
      "a hackathon-built workflow for making supplier compliance, document checks, and risk scoring less manual and more explainable.",
    tags: ["OCR", "SAP", "Hackathon"],
    preview: "setuai",
    emailSubject: "Discuss SetuAI",
    githubUrl: "https://github.com/hemang-doshi/setuai",
  },
];
