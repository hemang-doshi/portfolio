import type { LucideIcon } from "lucide-react";

type StatusItemProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export function StatusItem({ icon: Icon, label, value }: StatusItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-md)] border border-lead/10 bg-black/10 px-4 py-3">
      <div className="mt-0.5 rounded-full border border-lead/15 p-2 text-silver">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <p className="text-[length:var(--text-caption)] uppercase tracking-[0.16em] text-silver">
          {label}
        </p>
        <p className="text-[length:var(--text-body)] font-[420] text-starlight">{value}</p>
      </div>
    </div>
  );
}
