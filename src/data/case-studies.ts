export type CaseStudy = {
  title: string;
  description: string;
  href: string;
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Agent-first infrastructure",
    description:
      "Designing tools that keep orchestration tight, observable, and economical under real developer workloads.",
    href: "#contact",
  },
  {
    title: "Cloud-ready systems",
    description:
      "Shipping pragmatic platform layers that stay simple locally and hold up when the scale curve arrives.",
    href: "#contact",
  },
  {
    title: "Local AI workflows",
    description:
      "Building assistants that respect privacy, run close to the source, and still feel operationally sharp.",
    href: "#contact",
  },
  {
    title: "Creator workflow systems",
    description:
      "Turning fragmented planning and asset loops into deliberate operating systems for creative output.",
    href: "#contact",
  },
];
