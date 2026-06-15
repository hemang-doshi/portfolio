import { HomeExperienceShell } from "@/components/site/HomeExperienceShell";
import { getInstagramProfile, getInstagramMedia } from "@/lib/instagram";

export default async function Home() {
  const [profile, posts] = await Promise.all([
    getInstagramProfile(),
    getInstagramMedia(),
  ]);

  return (
    <HomeExperienceShell profile={profile} posts={posts} />
  );
}
