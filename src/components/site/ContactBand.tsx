import { GitBranch, Link2, Mail } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { ShellCard } from "@/components/ui/ShellCard";

export function ContactBand() {
  return (
    <section id="contact" className="px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="mx-auto max-w-[var(--page-max-width)]">
        <ShellCard className="overflow-hidden px-5 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-[length:var(--text-caption)] uppercase tracking-[0.24em] text-silver">
                Contact
              </p>
              <h2 className="font-[family:var(--font-arcadiadisplay)] text-[length:clamp(2rem,5vw,var(--text-heading-lg))] font-[360] leading-[1.08] tracking-[0.02em] text-starlight">
                Have something worth building?
              </h2>
              <p className="text-[length:var(--text-subheading)] leading-[1.6] text-silver">
                Send me a note if you&apos;re working on developer tools, AI-native
                systems, cloud platforms, or creator workflows.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="mailto:hello@TODO" variant="primary" className="justify-center">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email me
              </Button>
              <Button
                href="https://github.com/hemang-doshi"
                variant="secondary"
                className="justify-center"
              >
                <GitBranch className="h-4 w-4" aria-hidden="true" />
                GitHub
              </Button>
              <Button
                href="https://www.linkedin.com/in/TODO"
                variant="secondary"
                className="justify-center"
              >
                <Link2 className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </Button>
            </div>
          </div>
        </ShellCard>
      </div>
    </section>
  );
}
