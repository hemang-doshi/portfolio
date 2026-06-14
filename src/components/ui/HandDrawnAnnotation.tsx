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
        "pointer-events-none absolute z-20 hidden items-start gap-2 -rotate-3 font-[family:var(--font-permanent-marker)] text-[length:var(--text-body)] text-aubergine lg:flex",
        className,
      )}
      aria-hidden="true"
    >
      {flip ? (
        <>
          {/* Flipped: SVG on the left pointing left, text on the right */}
          <svg
            viewBox="0 0 96 44"
            width="96"
            height="44"
            className="overflow-visible flex-shrink-0"
            style={{ transform: "scaleX(-1)" }}
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
          <span className="whitespace-nowrap select-none -mt-1">{children}</span>
        </>
      ) : (
        <>
          {/* Normal: text on the left, SVG on the right pointing right */}
          <span className="whitespace-nowrap select-none -mt-1">{children}</span>
          <svg
            viewBox="0 0 96 44"
            width="96"
            height="44"
            className="overflow-visible flex-shrink-0"
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
        </>
      )}
    </div>
  );
}
