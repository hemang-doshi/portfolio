import { cn } from "@/lib/utils";

export function HemangLogo({
  className,
  forceLight = false,
}: {
  className?: string;
  forceLight?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-9", className)}
    >
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --logo-stop-1: #df37a7;
          --logo-stop-2: #ffcc11;
        }
        .dark {
          --logo-stop-1: #df37a7;
          --logo-stop-2: #00f0ff;
        }
      `}} />
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--logo-stop-1)" />
          <stop offset="100%" stopColor="var(--logo-stop-2)" />
        </linearGradient>
      </defs>
      <circle
        cx="16"
        cy="16"
        r="14"
        className={cn(
          forceLight
            ? "stroke-white/20"
            : "stroke-aubergine/20 dark:stroke-white/20"
        )}
        strokeWidth="1.5"
      />
      <g
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M8 8V24 M8 16H16 M16 8V24"
          className={cn(
            forceLight
              ? "stroke-white"
              : "stroke-aubergine dark:stroke-white"
          )}
        />
        <path
          d="M16 8H21C25.4 8 28 11.6 28 16C28 20.4 24.4 24 21 24H16"
          stroke="url(#logoGrad)"
        />
      </g>
    </svg>
  );
}
