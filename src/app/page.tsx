import { ContactBand } from "@/components/site/ContactBand";
import { FooterTerminal } from "@/components/site/FooterTerminal";
import { HeroExperience } from "@/components/site/HeroExperience";
import { SiteNav } from "@/components/site/SiteNav";
import { WorkSystem } from "@/components/site/WorkSystem";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroExperience />
        <WorkSystem />
        <ContactBand />
      </main>
      <FooterTerminal />
    </>
  );
}
