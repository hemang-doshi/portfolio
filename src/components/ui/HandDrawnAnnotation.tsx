import { cn } from "@/lib/utils";

type HandDrawnAnnotationProps = {
  children: string;
  className?: string;
  flip?: boolean;
};

export function HandDrawnAnnotation({
  children,
  className,
  flip = false,
}: HandDrawnAnnotationProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-20 hidden items-center gap-2 -rotate-3 font-[family:var(--font-permanent-marker)] text-[length:var(--text-body)] text-aubergine lg:flex",
        flip ? "flex-row-reverse" : "flex-row",
        className,
      )}
      aria-hidden="true"
    >
      <span className="whitespace-nowrap">{children}</span>
      <svg
        viewBox="0 0 96 44"
        className={cn(
          "h-8 w-18 overflow-visible flex-shrink-0",
          flip && "-scale-x-100",
        )}
        fill="none"
      >
        <path
          d="M4 15C30 10 50 15 78 28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M66 22C71 25 76 27 80 29C77 23 75 19 72 13"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
