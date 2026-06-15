import { cn } from "@/lib/utils";

type HandDrawnAnnotationProps = {
  children: string;
  className?: string;
  flip?: boolean;
  twisty?: boolean;
};

export function HandDrawnAnnotation({
  children,
  className,
  flip = false,
  twisty = false,
}: HandDrawnAnnotationProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-20 hidden items-start gap-2 -rotate-3 font-[family:var(--font-permanent-marker)] text-[length:var(--text-body)] text-aubergine lg:flex",
        className,
      )}
      aria-hidden="true"
    >
      {twisty ? (
        flip ? (
          <>
            {/* Flipped: SVG on the left pointing left, text on the right */}
            <svg
              viewBox="0 0 100 60"
              width="100"
              height="60"
              className="overflow-visible flex-shrink-0"
              style={{ transform: "scaleX(-1)" }}
              fill="none"
            >
              <path
                d="M 5,20 C 35,5 55,5 50,25 C 45,45 15,35 30,20 C 45,5 80,15 90,35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 80,33 C 84,35 88,36 91,36 C 89,32 87,28 85,24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="whitespace-nowrap select-none mt-2">{children}</span>
          </>
        ) : (
          <>
            {/* Normal: text on the left, SVG on the right pointing right */}
            <span className="whitespace-nowrap select-none mt-2">{children}</span>
            <svg
              viewBox="0 0 100 60"
              width="100"
              height="60"
              className="overflow-visible flex-shrink-0"
              fill="none"
            >
              <path
                d="M 5,20 C 35,5 55,5 50,25 C 45,45 15,35 30,20 C 45,5 80,15 90,35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 80,33 C 84,35 88,36 91,36 C 89,32 87,28 85,24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )
      ) : (
        flip ? (
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
        )
      )}
    </div>
  );
}
