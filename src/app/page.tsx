import { HomeExperienceFeed } from "@/components/site/HomeExperienceFeed";

// Static: the Instagram feed loads from /api/instagram/feed in the browser,
// so the page is served straight from the edge and never re-rendered per visit.
export default function Home() {
  return <HomeExperienceFeed />;
}
