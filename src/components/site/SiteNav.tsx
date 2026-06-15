"use client";

import { useEffect, useState } from "react";
import { GithubLogoIcon, SunIcon, MoonIcon } from "@phosphor-icons/react/ssr";
import { siteConfig } from "@/lib/site-config";
import { NavMascot } from "@/components/ui/NavMascot";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    queueMicrotask(() => {
      setTheme(isDark ? "dark" : "light");
    });

    document.documentElement.classList.toggle("dark", isDark);

    // Force scroll to top on initial page mount
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-plum-tinted/30 bg-canvas/70 backdrop-blur-md">
      <div className="section-shell flex min-h-[72px] items-center justify-between gap-4 py-3">
        <a
          href="#top"
          className="flex min-h-11 items-center gap-3"
          aria-label="Hemang Doshi home"
        >
          <NavMascot />
          <span className="display-heading hidden text-sm tracking-[-0.02em] text-aubergine sm:inline">
            Hemang Doshi
          </span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "nav-chip flex min-h-11 items-center justify-center px-3.5 text-[length:var(--text-body-sm)] font-medium text-aubergine transition-colors hover:text-heather",
                `nav-chip--${item.variant}`,
              )}
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
          
          <button
            onClick={toggleTheme}
            className="grid size-11 place-items-center rounded-[var(--radius-md)] text-aubergine transition-colors hover:bg-aubergine/[0.05] cursor-pointer"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? (
              <MoonIcon size={22} weight="regular" aria-hidden="true" />
            ) : (
              <SunIcon size={22} weight="regular" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
