import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function ShellCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-lead/15 bg-[linear-gradient(180deg,rgba(39,39,53,0.38),rgba(30,30,42,0.88))] backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
