import { SectionHeader } from "@/components/ui/SectionHeader";
import { ShellCard } from "@/components/ui/ShellCard";
import { caseStudies } from "@/data/case-studies";

export function CaseStudies() {
  return (
    <section id="case-studies" className="space-y-8">
      <SectionHeader
        number="02"
        title="Case Studies"
        actionHref="#contact"
        actionLabel="Request the full walkthrough"
      />
      <div className="grid gap-4">
        {caseStudies.map((study) => (
          <ShellCard
            key={study.title}
            className="p-5 transition-colors duration-200 hover:border-lead/30 hover:bg-graphite/25"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl space-y-2">
                <h3 className="font-[family:var(--font-arcadiadisplay)] text-[length:var(--text-heading-sm)] font-[360] tracking-[0.01em] text-starlight">
                  {study.title}
                </h3>
                <p className="text-[length:var(--text-body)] leading-[var(--leading-body)] text-silver">
                  {study.description}
                </p>
              </div>
              <a
                href={study.href}
                className="text-[length:var(--text-body-sm)] tracking-[0.04em] text-silver transition-colors hover:text-starlight"
              >
                Read case study →
              </a>
            </div>
          </ShellCard>
        ))}
      </div>
    </section>
  );
}
