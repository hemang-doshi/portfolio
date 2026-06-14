import { ContactBand } from "@/components/site/ContactBand";
import { FooterTerminal } from "@/components/site/FooterTerminal";
import { HeroExperience } from "@/components/site/HeroExperience";
import { SiteNav } from "@/components/site/SiteNav";
import { WorkSystem } from "@/components/site/WorkSystem";
import { SpinningRope } from "@/components/ui/SpinningRope";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <SpinningRope />
      <main id="main-content" className="relative">
        <HeroExperience />
        <WorkSystem />
        <ContactBand />
      </main>
      <FooterTerminal />
    </>
  );
}
