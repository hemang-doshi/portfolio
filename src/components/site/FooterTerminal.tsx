import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/ssr";

import { buildMailtoHref, siteConfig } from "@/lib/site-config";

export function FooterTerminal() {
  return (
    <footer className="bg-aubergine py-16 text-plum-tinted relative z-10">
      <div className="section-shell flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[length:var(--text-body-sm)] text-plum-tinted/70 font-medium">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" className="size-3.5 stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Somewhere in the Indian peninsula</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>Available selectively</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <div className="flex items-center gap-2">
            <a
              href={buildMailtoHref("Start a conversation")}
              className="grid size-10 place-items-center rounded-[var(--radius-md)] text-plum-tinted/80 transition-all duration-200 hover:bg-white/5 hover:text-fuchsia-signal"
              aria-label={`Email ${siteConfig.name}`}
            >
              <EnvelopeSimpleIcon size={20} weight="regular" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="grid size-10 place-items-center rounded-[var(--radius-md)] text-plum-tinted/80 transition-all duration-200 hover:bg-white/5 hover:text-fuchsia-signal"
              aria-label={`Open ${siteConfig.name} on GitHub`}
            >
              <GithubLogoIcon size={20} weight="regular" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="grid size-10 place-items-center rounded-[var(--radius-md)] text-plum-tinted/80 transition-all duration-200 hover:bg-white/5 hover:text-fuchsia-signal"
              aria-label={`Open ${siteConfig.name} on LinkedIn`}
            >
              <LinkedinLogoIcon size={20} weight="regular" aria-hidden="true" />
            </a>
          </div>
          <p className="text-[10px] text-plum-tinted/40 font-mono">
            © {new Date().getFullYear()} Hemang Doshi. Built close to the problem.
          </p>
        </div>
      </div>
    </footer>
  );
}
