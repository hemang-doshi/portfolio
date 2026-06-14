export type NoteItem = {
  date: string;
  title: string;
  description: string;
  emailSubject: string;
};

export const notes: NoteItem[] = [
  {
    date: "Jun 2026",
    title: "The rise of agent-first software",
    description:
      "Why orchestration quality is becoming a product surface, not just an implementation detail.",
    emailSubject: "Send me the note: The rise of agent-first software",
  },
  {
    date: "May 2026",
    title: "Local-first AI is the new default",
    description:
      "A case for keeping models, context, and iteration loops closer to the machine doing the work.",
    emailSubject: "Send me the note: Local-first AI is the new default",
  },
  {
    date: "Apr 2026",
    title: "Designing for clarity in complex systems",
    description:
      "How interface restraint can make sophisticated infrastructure feel immediate and trustworthy.",
    emailSubject: "Send me the note: Designing for clarity in complex systems",
  },
  {
    date: "Mar 2026",
    title: "Building proof-of-work in public",
    description:
      "Shipping visible systems that let the work explain the builder better than a résumé ever could.",
    emailSubject: "Send me the note: Building proof-of-work in public",
  },
];
