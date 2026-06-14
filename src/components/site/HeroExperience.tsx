import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HandDrawnAnnotation } from "@/components/ui/HandDrawnAnnotation";
import { ProjectPreview } from "@/components/ui/ProjectPreview";
import { workItems } from "@/data/work";
import { buildMailtoHref } from "@/lib/site-config";

const showcaseItems = workItems.slice(0, 3);

export function HeroExperience() {
  return (
    <section id="top" className="hero-gradient relative overflow-hidden">
      <div className="section-shell relative pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Eyebrow className="mb-5">AI-NATIVE ENGINEER • SYSTEMS BUILDER</Eyebrow>
          <h1 className="display-heading text-[length:clamp(2.8rem,8vw,var(--text-display))] leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-aubergine">
            Building systems people can actually use.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-[length:clamp(1rem,2vw,var(--text-subheading))] leading-[1.55] tracking-[var(--tracking-subheading)] text-aubergine">
            I’m Hemang Doshi, a developer who likes turning vague ideas, messy
            workflows, and technical complexity into clean products people can
            actually use. This site is where I document the work, thinking, and
            taste behind that.
          </p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              href={buildMailtoHref("Start a conversation")}
              withArrow
              className="w-full sm:w-auto"
            >
              Start a conversation
            </Button>
            <Button
              href="#work"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Explore selected work
            </Button>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 font-[family:var(--font-permanent-marker)] text-[length:var(--text-body)] text-aubergine lg:hidden">
          <span>proof over promises</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 42 20"
            className="h-5 w-11"
            fill="none"
          >
            <path
              d="M3 4C14 4 23 8 34 15M29 15l7 1-2-7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="relative z-10 mt-6 lg:mt-20">
          <div className="grid gap-4 md:grid-cols-3">
            {showcaseItems.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[var(--radius-xl)] bg-canvas shadow-subtle-5"
              >
                <ProjectPreview
                  variant={item.preview}
                  className="rounded-none shadow-none"
                />
                <div className="flex items-center justify-between gap-3 border-t border-plum-tinted px-5 py-4">
                  <div>
                    <p className="font-[family:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] text-heather uppercase">
                      {item.label}
                    </p>
                    <h2 className="mt-1 text-[length:var(--text-body)] font-semibold text-aubergine">
                      {item.title}
                    </h2>
                  </div>
                  <span
                    className="size-2 rounded-full bg-aubergine"
                    aria-hidden="true"
                  />
                </div>
              </article>
            ))}
          </div>

          <HandDrawnAnnotation className="-top-[72px] left-3">
            agent-first by design
          </HandDrawnAnnotation>
          <HandDrawnAnnotation className="-top-[72px] right-3" flip>
            built close to the problem
          </HandDrawnAnnotation>
          <HandDrawnAnnotation className="-bottom-20 left-[44%]">
            proof over promises
          </HandDrawnAnnotation>
        </div>
      </div>
    </section>
  );
}
