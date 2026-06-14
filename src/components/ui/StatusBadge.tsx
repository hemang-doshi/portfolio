import { CheckCircleIcon } from "@phosphor-icons/react/ssr";

type StatusBadgeProps = {
  label: string;
};

export function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-full-2)] border border-mint bg-honeydew px-3 py-1 text-[length:var(--text-caption)] leading-[var(--leading-caption)] font-medium text-forest">
      <CheckCircleIcon size={13} weight="fill" aria-hidden="true" />
      {label}
    </span>
  );
}
