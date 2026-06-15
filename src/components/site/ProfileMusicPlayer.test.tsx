import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { formatAudioTime, ProfileMusicPlayer } from "./ProfileMusicPlayer";

describe("ProfileMusicPlayer", () => {
  it("formats elapsed audio time for zero, normal, and invalid values", () => {
    expect(formatAudioTime(0)).toBe("0:00");
    expect(formatAudioTime(65)).toBe("1:05");
    expect(formatAudioTime(Number.NaN)).toBe("0:00");
    expect(formatAudioTime(Number.POSITIVE_INFINITY)).toBe("0:00");
  });

  it("renders a tiny profile-audio pill with title-only text and waveform treatment", () => {
    const markup = renderToStaticMarkup(
      <ProfileMusicPlayer
        src="/audio/night-drive.mp3"
        title="Night Drive"
        artist="The_Mountain"
      />,
    );

    expect(markup).toContain("Night Drive");
    expect(markup).toContain("The_Mountain");
    expect(markup).toContain('data-player-pill="true"');
    expect(markup).toContain('aria-label="Expand Night Drive player"');
    expect(markup).toContain('src="/audio/night-drive.mp3"');
    expect(markup).toContain('preload="metadata"');
  });

  it("renders a detached floating mini-player shell with artwork and dismiss control", () => {
    const markup = renderToStaticMarkup(
      <ProfileMusicPlayer
        src="/audio/night-drive.mp3"
        title="Night Drive"
        artist="The_Mountain"
      />,
    );

    expect(markup).toContain('data-floating-player="true"');
    expect(markup).toContain('aria-label="Close floating player"');
    expect(markup).toContain('aria-label="Floating player artwork"');
    expect(markup).toContain('aria-label="Play audio"');
    expect(markup).toContain('aria-label="Mute audio"');
    expect(markup).toContain('aria-label="Seek through track"');
  });
});
