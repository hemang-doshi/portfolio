import type { ReactNode } from "react";

type PillTagProps = {
  children: ReactNode;
};

export function PillTag({ children }: PillTagProps) {
  return (
    <span className="inline-flex rounded-[var(--radius-full-2)] border border-heather bg-canvas px-3 py-1.5 text-[length:var(--text-caption)] leading-[var(--leading-caption)] font-medium tracking-[var(--tracking-caption)] text-aubergine">
      {children}
    </span>
  );
}
