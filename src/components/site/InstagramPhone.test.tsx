import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { InstagramPhone } from "./InstagramPhone";

describe("InstagramPhone", () => {
  it("renders the revised profile shell with the local Night Drive audio source", () => {
    const markup = renderToStaticMarkup(<InstagramPhone profile={null} posts={[]} />);

    expect(markup).toContain("Digital creator");
    expect(markup).toContain('src="/audio/night-drive.mp3"');
    expect(markup).toContain('aria-label="Cellular signal"');
    expect(markup).toContain('aria-label="Wi-Fi signal"');
    expect(markup).toContain('aria-label="Battery level"');
    expect(markup).toContain('aria-label="Notifications"');
    expect(markup).toContain('aria-label="Create post"');
    expect(markup).toContain('aria-label="Expand Night Drive player"');
    expect(markup).toContain('data-floating-player-anchor="true"');
  });

  it("removes GitHub, stories, annotation copy, and legacy emoji glyphs", () => {
    const markup = renderToStaticMarkup(<InstagramPhone profile={null} posts={[]} />);

    expect(markup).not.toContain("github.com/hemang-doshi");
    expect(markup).not.toContain("DevDeck");
    expect(markup).not.toContain("SceneBook");
    expect(markup).not.toContain("click me");
    expect(markup).not.toContain("📶");
    expect(markup).not.toContain("🔋");
    expect(markup).not.toContain("🔔");
    expect(markup).not.toContain("➕");
    expect(markup).not.toContain("❤️");
    expect(markup).not.toContain("💬");
    expect(markup).not.toContain("👤");
  });
});
