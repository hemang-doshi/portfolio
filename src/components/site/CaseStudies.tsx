import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { evidenceItems } from "@/data/case-studies";
import { buildMailtoHref } from "@/lib/site-config";

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="section-anchor border-y border-plum-tinted bg-aubergine/[0.025] py-20 sm:py-24"
    >
      <div className="section-shell">
        <SectionHeader
          eyebrow="ENGINEERING EVIDENCE"
          title="The thinking behind the work."
          description="A few recurring system problems, and the practical approaches I use to make them clearer, smaller, and easier to operate."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {evidenceItems.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[var(--radius-xl)] bg-canvas p-6 shadow-subtle sm:p-8"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="grid size-8 place-items-center rounded-full bg-aubergine text-[length:var(--text-caption)] font-semibold text-canvas">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-[family:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] text-heather uppercase">
                  {item.relatedProject}
                </span>
              </div>
              <h3 className="text-[length:var(--text-heading-sm)] leading-[var(--leading-heading-sm)] font-semibold tracking-[var(--tracking-heading-sm)] text-aubergine">
                {item.title}
              </h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 font-[family:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] text-heather uppercase">
                    Problem
                  </p>
                  <p className="text-[length:var(--text-body-sm)] leading-[var(--leading-body-sm)] text-aubergine">
                    {item.problem}
                  </p>
                </div>
                <div>
                  <p className="mb-2 font-[family:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] text-heather uppercase">
                    Approach
                  </p>
                  <p className="text-[length:var(--text-body-sm)] leading-[var(--leading-body-sm)] text-aubergine">
                    {item.approach}
                  </p>
                </div>
              </div>
              <a
                href={buildMailtoHref(`Discuss ${item.title}`)}
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-[length:var(--text-body-sm)] font-semibold text-aubergine transition-colors hover:text-heather"
              >
                Talk through the approach
                <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
