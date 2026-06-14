import { SectionHeader } from "@/components/ui/SectionHeader";
import { ShellCard } from "@/components/ui/ShellCard";
import { notes } from "@/data/notes";

export function WritingNotes() {
  return (
    <section id="writing" className="space-y-8">
      <SectionHeader
        number="03"
        title="Writing / Notes"
        actionHref="#contact"
        actionLabel="Ask for the longer version"
      />
      <div className="grid gap-4">
        {notes.map((note) => (
          <ShellCard
            key={note.title}
            className="p-5 transition-colors duration-200 hover:border-lead/30 hover:bg-graphite/25"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl space-y-2">
                <p className="text-[length:var(--text-caption)] uppercase tracking-[0.16em] text-silver">
                  {note.date}
                </p>
                <h3 className="font-[family:var(--font-arcadiadisplay)] text-[length:var(--text-heading-sm)] font-[360] tracking-[0.01em] text-starlight">
                  {note.title}
                </h3>
                <p className="text-[length:var(--text-body)] leading-[var(--leading-body)] text-silver">
                  {note.description}
                </p>
              </div>
              <a
                href={note.href}
                className="text-[length:var(--text-body-sm)] tracking-[0.04em] text-silver transition-colors hover:text-starlight"
              >
                Read note →
              </a>
            </div>
          </ShellCard>
        ))}
      </div>
    </section>
  );
}
