export type NavItem = {
  label: string;
  href: string;
  variant: "pencil-arc" | "pencil-tilt" | "pencil-wobble" | "pencil-loop";
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type SiteConfig = {
  name: string;
  monogram: string;
  email: string;
  githubUrl: string;
  location: string;
  timezone: string;
  availability: string;
  linkedinUrl: string;
  navigation: NavItem[];
  processSteps: ProcessStep[];
};

export const siteConfig: SiteConfig = {
  name: "Hemang Doshi",
  monogram: "HD",
  email: "hemangdoshi26@gmail.com",
  githubUrl: "https://github.com/hemang-doshi",
  linkedinUrl: "https://linkedin.com/in/hemang-doshi",
  location: "India",
  timezone: "IST",
  availability: "Available selectively",
  navigation: [
    { label: "About me 🧘‍♂️", href: "#hero", variant: "pencil-arc" },
    { label: "My work 💻", href: "#work", variant: "pencil-tilt" },
    { label: "Skills 🧠", href: "#skills", variant: "pencil-wobble" },
    { label: "Contact ☎️", href: "#contact", variant: "pencil-loop" },
  ],
  processSteps: [
    {
      number: "01",
      title: "Frame the system",
      description:
        "Turn an ambiguous problem into a clear product boundary, user flow, and set of technical constraints.",
    },
    {
      number: "02",
      title: "Build the smallest useful loop",
      description:
        "Ship the core interaction early, then use real feedback to decide what deserves additional complexity.",
    },
    {
      number: "03",
      title: "Ship and learn",
      description:
        "Make the result observable, maintainable, and easy to improve after it meets the people using it.",
    },
  ],
};

export function buildMailtoHref(subject?: string, body?: string) {
  const query = [
    subject ? `subject=${encodeURIComponent(subject)}` : null,
    body ? `body=${encodeURIComponent(body)}` : null,
  ]
    .filter(Boolean)
    .join("&");

  return `mailto:${siteConfig.email}${query ? `?${query}` : ""}`;
}
