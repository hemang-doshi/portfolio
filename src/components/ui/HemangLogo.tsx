import { cn } from "@/lib/utils";

export function HemangLogo({ 
  className, 
  forceLight = false 
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
      {/* Outer Circle */}
      <circle
        cx="16"
        cy="16"
        r="14"
        className={cn(
          forceLight 
            ? "stroke-white/20" 
            : "stroke-aubergine/30 dark:stroke-white/20"
        )}
        strokeWidth="1.5"
      />
      {/* Monogram H */}
      <path
        d="M10 11V21M15.5 11V21M10 16H15.5"
        className={cn(
          forceLight 
            ? "stroke-white" 
            : "stroke-aubergine dark:stroke-white"
        )}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Monogram D */}
      <path
        d="M19 11H21.5C23.5 11 25 12.5 25 16C25 19.5 23.5 21 21.5 21H19V11Z"
        className={cn(
          forceLight 
            ? "stroke-fuchsia-signal" 
            : "stroke-fuchsia-signal dark:stroke-cyan-400"
        )}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
