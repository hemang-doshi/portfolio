import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-[family:var(--font-jetbrains-mono)] text-[length:var(--text-caption)] leading-[var(--leading-caption)] font-normal tracking-[0.1em] text-aubergine uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
