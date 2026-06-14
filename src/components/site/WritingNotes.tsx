import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { notes } from "@/data/notes";
import { buildMailtoHref } from "@/lib/site-config";

export function WritingNotes() {
  return (
    <section id="writing" className="section-anchor py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="WRITING & NOTES"
          title="Ideas I’m working through."
          description="Short notes on agents, local AI, product clarity, and the craft of making technical work legible."
          align="left"
        />

        <div className="mt-10 border-t border-plum-tinted">
          {notes.map((note) => (
            <article
              key={note.title}
              className="grid gap-4 border-b border-plum-tinted py-7 sm:grid-cols-[110px_1fr_auto] sm:items-center"
            >
              <p className="font-[family:var(--font-jetbrains-mono)] text-[length:var(--text-caption)] tracking-[0.08em] text-heather uppercase">
                {note.date}
              </p>
              <div className="max-w-2xl">
                <h3 className="text-[length:var(--text-heading-sm)] leading-[var(--leading-heading-sm)] font-semibold tracking-[var(--tracking-heading-sm)] text-aubergine">
                  {note.title}
                </h3>
                <p className="mt-2 text-[length:var(--text-body-sm)] leading-[var(--leading-body-sm)] text-heather">
                  {note.description}
                </p>
              </div>
              <a
                href={buildMailtoHref(note.emailSubject)}
                className="inline-flex min-h-11 items-center gap-2 self-start text-[length:var(--text-body-sm)] font-semibold text-aubergine transition-colors hover:text-heather sm:self-center"
              >
                Request note
                <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
