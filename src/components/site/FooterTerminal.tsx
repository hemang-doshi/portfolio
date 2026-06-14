import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react/ssr";

import { buildMailtoHref, siteConfig } from "@/lib/site-config";

export function FooterTerminal() {
  return (
    <footer className="border-t border-plum-tinted bg-canvas py-8">
      <div className="section-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-aubergine">{siteConfig.name}</p>
          <p className="mt-1 text-[length:var(--text-body-sm)] text-heather">
            {siteConfig.location} • {siteConfig.timezone} •{" "}
            {siteConfig.availability}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={buildMailtoHref("Start a conversation")}
            className="grid size-11 place-items-center rounded-[var(--radius-md)] text-aubergine transition-colors hover:bg-aubergine/[0.05]"
            aria-label={`Email ${siteConfig.name}`}
          >
            <EnvelopeSimpleIcon size={21} weight="regular" aria-hidden="true" />
          </a>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="grid size-11 place-items-center rounded-[var(--radius-md)] text-aubergine transition-colors hover:bg-aubergine/[0.05]"
            aria-label={`Open ${siteConfig.name} on GitHub`}
          >
            <GithubLogoIcon size={21} weight="regular" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
