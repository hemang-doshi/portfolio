import type { ProjectPreviewVariant } from "@/data/work";
import { cn } from "@/lib/utils";

type ProjectPreviewProps = {
  variant: ProjectPreviewVariant;
  className?: string;
};

function WindowChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-b border-plum-tinted px-3 py-2">
      <div className="flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-smoke" />
        <span className="size-1.5 rounded-full bg-smoke" />
        <span className="size-1.5 rounded-full bg-smoke" />
      </div>
      <span className="font-[family:var(--font-jetbrains-mono)] text-[9px] tracking-[0.08em] text-heather uppercase">
        {label}
      </span>
    </div>
  );
}

function DevDeckPreview() {
  return (
    <>
      <WindowChrome label="DevDeck / local" />
      <div className="grid min-h-44 grid-cols-[72px_1fr]">
        <div className="border-r border-plum-tinted bg-aubergine/[0.035] p-3">
          <div className="mb-5 size-5 rounded-[var(--radius-md)] bg-aubergine" />
          <div className="space-y-2">
            <div className="h-1.5 w-full rounded-full bg-heather/45" />
            <div className="h-1.5 w-4/5 rounded-full bg-plum-tinted" />
            <div className="h-1.5 w-3/5 rounded-full bg-plum-tinted" />
          </div>
        </div>
        <div className="p-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="mb-1 h-2 w-16 rounded-full bg-aubergine" />
              <div className="h-1.5 w-24 rounded-full bg-plum-tinted" />
            </div>
            <div className="rounded-full border border-mint bg-honeydew px-2 py-1 text-[8px] font-semibold text-forest">
              4 services ready
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["API", "Worker", "Web"].map((service, index) => (
              <div
                key={service}
                className="rounded-[var(--radius-md)] border border-plum-tinted p-2"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[8px] font-semibold text-aubergine">
                    {service}
                  </span>
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      index === 1 ? "bg-smoke" : "bg-forest",
                    )}
                  />
                </div>
                <div className="h-1 w-full rounded-full bg-plum-tinted" />
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-[var(--radius-md)] bg-aubergine px-3 py-2 font-[family:var(--font-jetbrains-mono)] text-[8px] text-canvas">
            <span className="text-smoke">$</span> devdeck inspect --compact
          </div>
        </div>
      </div>
    </>
  );
}

function SceneBookPreview() {
  return (
    <>
      <WindowChrome label="SceneBook / week 24" />
      <div className="grid min-h-44 grid-cols-[1fr_82px] gap-3 p-3">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="mb-1 h-2 w-20 rounded-full bg-aubergine" />
              <div className="h-1.5 w-28 rounded-full bg-plum-tinted" />
            </div>
            <div className="rounded-[var(--radius-md)] border border-heather px-2 py-1 text-[8px] text-aubergine">
              New scene
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Hook", "Build", "Payoff"].map((stage, index) => (
              <div
                key={stage}
                className="rounded-[var(--radius-md)] border border-plum-tinted bg-aubergine/[0.025] p-2"
              >
                <span className="text-[8px] font-semibold text-aubergine">
                  {stage}
                </span>
                <div
                  className={cn(
                    "mt-2 rounded-[var(--radius-sm)] border border-plum-tinted bg-canvas p-2",
                    index === 0 && "shadow-subtle",
                  )}
                >
                  <div className="mb-1.5 h-1.5 w-full rounded-full bg-heather/55" />
                  <div className="h-1.5 w-3/4 rounded-full bg-plum-tinted" />
                  <div className="mt-3 h-8 rounded-[var(--radius-sm)] bg-aubergine/[0.06]" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[var(--radius-md)] bg-aubergine p-2 text-canvas">
          <div className="text-[8px] font-semibold">Asset kit</div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="aspect-square rounded-[var(--radius-sm)] bg-canvas/12"
              />
            ))}
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-canvas/25" />
        </div>
      </div>
    </>
  );
}

function FinancialPreview() {
  return (
    <>
      <WindowChrome label="Financial analyst / local" />
      <div className="min-h-44 p-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="mb-1 h-2 w-24 rounded-full bg-aubergine" />
            <div className="h-1.5 w-32 rounded-full bg-plum-tinted" />
          </div>
          <div className="rounded-full border border-mint bg-honeydew px-2 py-1 text-[8px] font-semibold text-forest">
            Local model
          </div>
        </div>
        <div className="grid grid-cols-[1fr_92px] gap-3">
          <div className="rounded-[var(--radius-md)] border border-plum-tinted p-3">
            <div className="flex h-20 items-end gap-1.5 border-b border-plum-tinted">
              {[38, 52, 43, 68, 61, 82, 74, 91].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-[2px] bg-aubergine"
                  style={{ height: `${height}%`, opacity: 0.28 + index * 0.08 }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[7px] text-heather">
              <span>Q1</span>
              <span>Q2</span>
              <span>Q3</span>
              <span>Q4</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="rounded-[var(--radius-md)] bg-aubergine p-2 text-canvas">
              <div className="text-[7px] text-plum-tinted">Forecast</div>
              <div className="mt-1 text-sm font-semibold">+12.4%</div>
            </div>
            <div className="rounded-[var(--radius-md)] border border-plum-tinted p-2">
              <div className="text-[7px] text-heather">Confidence</div>
              <div className="mt-2 h-1.5 rounded-full bg-plum-tinted">
                <div className="h-full w-4/5 rounded-full bg-aubergine" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SetuPreview() {
  return (
    <>
      <WindowChrome label="SetuAI / vendor review" />
      <div className="grid min-h-44 grid-cols-[90px_1fr] gap-3 p-3">
        <div className="rounded-[var(--radius-md)] bg-aubergine p-3 text-canvas">
          <div className="text-[8px] text-plum-tinted">Risk score</div>
          <div className="mt-1 text-2xl font-semibold">27</div>
          <div className="mt-3 h-1.5 rounded-full bg-canvas/20">
            <div className="h-full w-1/3 rounded-full bg-mint" />
          </div>
          <div className="mt-5 space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-canvas/30" />
            <div className="h-1.5 w-3/4 rounded-full bg-canvas/20" />
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div>
              <div className="mb-1 h-2 w-20 rounded-full bg-aubergine" />
              <div className="h-1.5 w-28 rounded-full bg-plum-tinted" />
            </div>
            <span className="rounded-full border border-mint bg-honeydew px-2 py-1 text-[8px] font-semibold text-forest">
              Review ready
            </span>
          </div>
          <div className="space-y-2">
            {[
              ["Registration certificate", "Extracted"],
              ["Labour policy", "Translated"],
              ["Supplier questionnaire", "Reviewed"],
            ].map(([document, state]) => (
              <div
                key={document}
                className="flex items-center justify-between rounded-[var(--radius-md)] border border-plum-tinted px-2 py-2"
              >
                <span className="text-[8px] font-medium text-aubergine">
                  {document}
                </span>
                <span className="text-[7px] text-heather">{state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const previews = {
  devdeck: DevDeckPreview,
  scenebook: SceneBookPreview,
  "financial-analyst": FinancialPreview,
  setuai: SetuPreview,
} satisfies Record<ProjectPreviewVariant, () => React.ReactNode>;

export function ProjectPreview({ variant, className }: ProjectPreviewProps) {
  const Preview = previews[variant];

  return (
    <div
      aria-hidden="true"
      data-preview={variant}
      className={cn(
        "overflow-hidden rounded-[var(--radius-md)] bg-canvas text-aubergine shadow-subtle",
        className,
      )}
    >
      <Preview />
    </div>
  );
}
