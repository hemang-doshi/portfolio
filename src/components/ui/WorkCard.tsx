import { ArrowUpRight } from "lucide-react";

import type { WorkItem } from "@/data/work";
import { cn } from "@/lib/utils";

import { ShellCard } from "./ShellCard";

type WorkCardProps = {
  item: WorkItem;
  featured?: boolean;
};

export function WorkCard({ item, featured = false }: WorkCardProps) {
  return (
    <ShellCard
      className={cn(
        "group overflow-hidden p-5 transition-colors duration-300 hover:border-lead/30 hover:bg-graphite/30",
        featured && "md:col-span-2",
      )}
    >
      <div className="space-y-5">
        <div className="rounded-[var(--radius-md)] border border-lead/10 bg-black/15 p-4">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-silver">
              <span className="h-1.5 w-1.5 rounded-full bg-mercury-blue" aria-hidden="true" />
              <span>{item.badge ?? "System module"}</span>
            </div>
            <span className="text-[length:var(--text-caption)] tracking-[0.16em] text-silver/75">
              v1
            </span>
          </div>
          <div className="relative h-28 overflow-hidden rounded-[var(--radius-md)] border border-lead/10 bg-[linear-gradient(180deg,rgba(39,39,53,0.7),rgba(23,23,33,0.95))]">
            <div className="absolute inset-x-0 top-0 h-px bg-lead/20" />
            <div className="absolute inset-y-0 left-[12%] w-px bg-lead/10" />
            <div className="absolute inset-y-0 left-[58%] w-px bg-lead/10" />
            <div className="absolute inset-x-0 top-[28%] h-px bg-lead/10" />
            <div className="absolute inset-x-0 top-[68%] h-px bg-lead/10" />
            <div className="absolute left-[14%] top-[24%] h-10 w-20 rounded-[var(--radius-md)] border border-lead/15 bg-midnight-slate/70" />
            <div className="absolute left-[42%] top-[48%] h-12 w-28 rounded-[var(--radius-md)] border border-lead/15 bg-graphite/45" />
            <div className="absolute right-5 top-5 h-2 w-2 rounded-full bg-mercury-blue" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-[family:var(--font-arcadiadisplay)] text-[length:var(--text-heading-sm)] font-[360] leading-[var(--leading-heading-sm)] tracking-[0.01em] text-starlight">
              {item.title}
            </h3>
            <a
              href={item.href}
              className="rounded-full border border-lead/15 p-2 text-silver transition-colors hover:text-starlight"
              aria-label={`Open ${item.title}`}
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <p className="max-w-[60ch] text-[length:var(--text-body)] leading-[var(--leading-body)] text-silver">
            {item.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-lead/15 px-3 py-1.5 text-[length:var(--text-caption)] tracking-[0.08em] text-silver"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </ShellCard>
  );
}
