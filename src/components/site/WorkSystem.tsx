import { CaseStudies } from "@/components/site/CaseStudies";
import { WritingNotes } from "@/components/site/WritingNotes";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkCard } from "@/components/ui/WorkCard";
import { workItems } from "@/data/work";
import { siteConfig } from "@/lib/site-config";

export function WorkSystem() {
  return (
    <>
      <section id="work" className="section-anchor py-20 sm:py-24">
        <div className="section-shell">
          <SectionHeader
            eyebrow="SELECTED WORK"
            title="Products shaped around real constraints."
            description="Four systems exploring agent infrastructure, creator workflows, local analysis, and responsible supply chains."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {workItems.map((item) => (
              <WorkCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <CaseStudies />
      <WritingNotes />

      <section id="about" className="section-anchor pb-20 sm:pb-24">
        <div className="section-shell">
          <SectionHeader
            eyebrow="HOW I WORK"
            title="Clarity before complexity."
            description="A small operating model for moving from an unclear problem to a useful, maintainable product."
          />
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {siteConfig.processSteps.map((step) => (
              <li key={step.number} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-aubergine text-[length:var(--text-caption)] font-semibold text-canvas">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-[length:var(--text-subheading)] leading-[var(--leading-subheading)] font-semibold text-aubergine">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[length:var(--text-body-sm)] leading-[var(--leading-body-sm)] text-heather">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
