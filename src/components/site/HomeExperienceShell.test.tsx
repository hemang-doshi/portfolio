import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HomeExperienceShellFrame } from "./HomeExperienceShell";

describe("HomeExperienceShellFrame", () => {
  it("renders the loading screen and keeps the site shell hidden until startup is ready", () => {
    const markup = renderToStaticMarkup(
      <HomeExperienceShellFrame isReady={false} profile={null} posts={[]} />,
    );

    expect(markup).toContain("Booting the goofy internet machine");
    expect(markup).toContain('data-site-shell="true"');
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain("loader-goof");
  });

  it("reveals the site shell after startup is ready", () => {
    const markup = renderToStaticMarkup(
      <HomeExperienceShellFrame isReady={true} profile={null} posts={[]} />,
    );

    expect(markup).toContain('data-site-shell="true"');
    expect(markup).not.toContain("Booting the goofy internet machine");
    expect(markup).toContain('data-hero-active="true"');
  });
});
