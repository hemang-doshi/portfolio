import { ContactBand } from "@/components/site/ContactBand";
import { FooterTerminal } from "@/components/site/FooterTerminal";
import { HeroExperience } from "@/components/site/HeroExperience";
import { SiteNav } from "@/components/site/SiteNav";
import { WorkSystem } from "@/components/site/WorkSystem";
import { SpinningRope } from "@/components/ui/SpinningRope";
import { getInstagramProfile, getInstagramMedia } from "@/lib/instagram";

export default async function Home() {
  const [profile, posts] = await Promise.all([
    getInstagramProfile(),
    getInstagramMedia(),
  ]);

  return (
    <div id="top">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <SpinningRope />
      <main id="main-content" className="relative">
        <HeroExperience profile={profile} posts={posts} />
        <WorkSystem />
        <ContactBand />
      </main>
      <FooterTerminal />
    </div>
  );
}
