import { GithubLogoIcon } from "@phosphor-icons/react/ssr";

import { PillTag } from "@/components/ui/PillTag";
import { ProjectPreview } from "@/components/ui/ProjectPreview";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { WorkItem } from "@/data/work";

type WorkCardProps = {
  item: WorkItem;
};

export function WorkCard({ item }: WorkCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] bg-canvas shadow-subtle transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-subtle-5">
      <div className="bg-aubergine/[0.025] p-3 sm:p-4">
        <ProjectPreview variant={item.preview} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 font-[family:var(--font-jetbrains-mono)] text-[length:var(--text-caption)] tracking-[0.08em] text-heather uppercase">
              {item.label}
            </p>
            <h3 className="text-[length:var(--text-heading-sm)] leading-[var(--leading-heading-sm)] font-semibold tracking-[var(--tracking-heading-sm)] text-aubergine">
              {item.title}
            </h3>
          </div>
          {item.status ? <StatusBadge label={item.status.label} /> : null}
        </div>

        <p className="mb-6 flex-1 text-[length:var(--text-body)] leading-[var(--leading-body)] tracking-[var(--tracking-body)] text-heather">
          {item.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <PillTag key={tag}>{tag}</PillTag>
          ))}
        </div>

        <a
          href={item.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 self-start text-[length:var(--text-body-sm)] font-semibold text-aubergine transition-colors hover:text-heather"
        >
          <GithubLogoIcon size={18} weight="bold" aria-hidden="true" />
          View source code
        </a>
      </div>
    </article>
  );
}
