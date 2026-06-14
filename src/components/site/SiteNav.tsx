import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Systems", href: "#systems" },
  { label: "Writing", href: "#writing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-[var(--page-max-width)] items-center justify-between rounded-full border border-lead/15 bg-midnight-slate/70 px-4 py-3 backdrop-blur-md sm:px-5">
        <a
          href="#top"
          className="text-[length:var(--text-body)] font-[480] tracking-[0.16em] text-starlight"
          aria-label="Hemang Doshi home"
        >
          [HD]
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[length:var(--text-body-sm)] tracking-[0.04em] text-silver transition-colors hover:text-starlight"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button href="#contact" variant="primary" withArrow className="px-4 py-2 text-[length:var(--text-body-sm)]">
          Let&apos;s build
        </Button>
      </div>
    </header>
  );
}
