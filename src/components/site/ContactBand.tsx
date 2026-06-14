import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProjectPreview } from "@/components/ui/ProjectPreview";
import { buildMailtoHref, siteConfig } from "@/lib/site-config";

export function ContactBand() {
  return (
    <section id="contact" className="overflow-hidden bg-aubergine py-20 text-canvas sm:py-24">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <Eyebrow className="text-plum-tinted">LET’S BUILD SOMETHING USEFUL</Eyebrow>
          <h2 className="display-heading mt-4 max-w-3xl text-[length:clamp(2.4rem,6vw,var(--text-heading-lg))] leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)] text-canvas">
            Have a hard problem worth making clear?
          </h2>
          <p className="mt-6 max-w-2xl text-[length:var(--text-body)] leading-[1.6] text-plum-tinted">
            I’m interested in thoughtful teams working on developer tools, AI-native
            products, cloud platforms, and creator workflows. Based in{" "}
            {siteConfig.location}, working in {siteConfig.timezone}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={buildMailtoHref("Start a conversation")} withArrow>
              Start a conversation
            </Button>
            <Button
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="border-plum-tinted text-canvas hover:bg-canvas/10"
            >
              View GitHub
            </Button>
          </div>
        </div>

        <div className="relative lg:translate-x-12">
          <ProjectPreview
            variant="devdeck"
            className="shadow-subtle-5 lg:scale-110"
          />
        </div>
      </div>
    </section>
  );
}
