export type EvidenceItem = {
  title: string;
  problem: string;
  approach: string;
  relatedProject: string;
};

export const evidenceItems: EvidenceItem[] = [
  {
    title: "Agent-first infrastructure",
    problem:
      "Agent workflows become expensive and opaque when orchestration, diagnostics, and local context are treated as separate concerns.",
    approach:
      "Design the developer loop as one observable system with compact context, explicit state, and small operational surfaces.",
    relatedProject: "DevDeck",
  },
  {
    title: "Cloud-ready systems",
    problem:
      "Early products need to move quickly without locking themselves into infrastructure that becomes fragile at the first scale change.",
    approach:
      "Keep the local path simple, define boundaries early, and introduce platform complexity only where usage proves it is needed.",
    relatedProject: "DevDeck",
  },
  {
    title: "Local AI workflows",
    problem:
      "Sensitive data and slow feedback loops make generic hosted assistants a poor fit for high-context analytical work.",
    approach:
      "Run inference and retrieval close to the source, expose the reasoning path, and keep the human in control of consequential output.",
    relatedProject: "AI Financial Analyst",
  },
  {
    title: "Creator workflow systems",
    problem:
      "Creative work fragments across planning documents, asset folders, scripts, and publishing tools before production even begins.",
    approach:
      "Organize the workflow around the artifact being shipped, with one deliberate path from idea to reusable production context.",
    relatedProject: "SceneBook",
  },
];
