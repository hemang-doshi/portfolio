import { CaseStudies } from "@/components/site/CaseStudies";
import { StatusPanel } from "@/components/site/StatusPanel";
import { WritingNotes } from "@/components/site/WritingNotes";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkCard } from "@/components/ui/WorkCard";
import { workItems } from "@/data/work";

export function WorkSystem() {
  return (
    <section id="systems" className="relative bg-deep-space px-4 pb-24 pt-8 sm:px-6 sm:pb-32">
      <div className="mx-auto grid max-w-[var(--page-max-width)] gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
        <div className="space-y-20">
          <section id="work" className="space-y-8">
            <SectionHeader
              number="01"
              title="Selected Work"
              actionHref="#contact"
              actionLabel="Ask what ships next"
            />
            <div className="grid gap-4 md:grid-cols-2">
              {workItems.map((item) => (
                <WorkCard
                  key={item.title}
                  item={item}
                  featured={item.badge === "Featured"}
                />
              ))}
            </div>
          </section>

          <CaseStudies />
          <WritingNotes />
        </div>

        <StatusPanel />
      </div>
    </section>
  );
}
