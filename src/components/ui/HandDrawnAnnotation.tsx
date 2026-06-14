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
        "pointer-events-none absolute z-20 hidden max-w-40 -rotate-2 font-[family:var(--font-permanent-marker)] text-[length:var(--text-body)] leading-[1.3] text-aubergine lg:block",
        className,
      )}
      aria-hidden="true"
    >
      <span>{children}</span>
      <svg
        viewBox="0 0 96 44"
        className={cn(
          "mt-1 h-11 w-24 overflow-visible",
          flip && "-scale-x-100",
        )}
        fill="none"
      >
        <path
          d="M4 7C25 6 55 13 78 34"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M67 32C72 34 77 36 82 37C80 31 78 27 75 23"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
