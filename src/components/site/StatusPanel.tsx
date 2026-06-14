import { Activity, Clock3, Layers3, Server } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { ShellCard } from "@/components/ui/ShellCard";
import { StatusItem } from "@/components/ui/StatusItem";

const statusItems = [
  { icon: Activity, label: "Focus mode", value: "Deep work" },
  { icon: Layers3, label: "Build queue", value: "2 active" },
  { icon: Server, label: "Systems", value: "All green" },
  { icon: Clock3, label: "Uptime", value: "99.9%" },
];

export function StatusPanel() {
  return (
    <aside id="about" className="lg:sticky lg:top-28">
      <ShellCard className="overflow-hidden p-5 sm:p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-silver">
                  System status
                </p>
                <h2 className="mt-2 font-[family:var(--font-arcadiadisplay)] text-[length:var(--text-heading-sm)] font-[360] tracking-[0.01em] text-starlight">
                  Online
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-lead/15 px-3 py-1.5 text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-silver">
                <span className="h-1.5 w-1.5 rounded-full bg-mercury-blue" aria-hidden="true" />
                Stable
              </div>
            </div>
            <p className="text-[length:var(--text-body)] leading-[1.6] text-silver">
              Building reliable agent systems that run locally, scale in the
              cloud, and feel exceptional to use.
            </p>
          </div>

          <div className="grid gap-3">
            {statusItems.map((item) => (
              <StatusItem key={item.label} {...item} />
            ))}
          </div>

          <div className="space-y-3 rounded-[var(--radius-md)] border border-lead/10 bg-black/10 p-4">
            <p className="text-[length:var(--text-caption)] uppercase tracking-[0.18em] text-silver">
              Active projects
            </p>
            <div className="space-y-3">
              {[
                ["DevDeck", "Core engine"],
                ["SceneBook", "Creator OS"],
                ["Portfolio", "Proof-of-work system"],
              ].map(([name, detail]) => (
                <div key={name} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-silver/60" aria-hidden="true" />
                    <span className="text-[length:var(--text-body)] text-starlight">{name}</span>
                  </div>
                  <span className="text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-silver">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Button href="#contact" variant="primary" withArrow className="w-full justify-center">
            Let&apos;s build together
          </Button>
        </div>
      </ShellCard>
    </aside>
  );
}
