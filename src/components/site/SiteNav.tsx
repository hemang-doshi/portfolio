import { GithubLogoIcon } from "@phosphor-icons/react/ssr";

import { Button } from "@/components/ui/Button";
import { buildMailtoHref, siteConfig } from "@/lib/site-config";

export function SiteNav() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-plum-tinted bg-canvas/95 backdrop-blur-md">
      <div className="section-shell flex min-h-[72px] items-center justify-between gap-4 py-3">
        <a
          href="#top"
          className="flex min-h-11 items-center gap-3"
          aria-label="Hemang Doshi home"
        >
          <span
            className="grid size-9 place-items-center rounded-full border border-aubergine"
            aria-hidden="true"
          >
            <span className="grid size-5 place-items-center rounded-full border border-aubergine">
              <span className="size-1.5 rounded-full bg-aubergine" />
            </span>
          </span>
          <span className="display-heading hidden text-sm tracking-[-0.02em] text-aubergine sm:inline">
            Hemang Doshi
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center text-[length:var(--text-body-sm)] font-medium text-aubergine transition-colors hover:text-heather"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="grid size-11 place-items-center rounded-[var(--radius-md)] text-aubergine transition-colors hover:bg-aubergine/[0.05]"
            aria-label="Open Hemang Doshi on GitHub"
          >
            <GithubLogoIcon size={22} weight="regular" aria-hidden="true" />
          </a>
          <Button
            href={buildMailtoHref("Start a conversation")}
            className="px-4 text-[length:var(--text-body-sm)] sm:px-5"
          >
            Email me
          </Button>
        </div>
      </div>
    </header>
  );
}
