import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  number: string;
  title: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
};

export function SectionHeader({
  number,
  title,
  actionHref,
  actionLabel,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-lead/15 pb-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-[length:var(--text-caption)] uppercase tracking-[0.22em] text-silver">
          <span>{number}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-mercury-blue" aria-hidden="true" />
        </div>
        <h2 className="font-[family:var(--font-arcadiadisplay)] text-[length:clamp(1.75rem,3vw,var(--text-heading))] font-[360] leading-[var(--leading-heading)] tracking-[0.01em] text-starlight">
          {title}
        </h2>
      </div>
      {actionHref && actionLabel ? (
        <a
          href={actionHref}
          className="text-[length:var(--text-body-sm)] tracking-[0.02em] text-silver transition-colors hover:text-starlight"
        >
          {actionLabel}
        </a>
      ) : null}
    </div>
  );
}
