import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("reserves Fuchsia Signal for the primary conversion action", () => {
    const markup = renderToStaticMarkup(
      <Button href="mailto:test@example.com">Start a conversation</Button>,
    );

    expect(markup).toContain("bg-fuchsia-signal");
    expect(markup).toContain("rounded-[var(--radius-md)]");
    expect(markup).toContain('href="mailto:test@example.com"');
  });

  it("renders the secondary action with the Heather outline", () => {
    const markup = renderToStaticMarkup(
      <Button href="#work" variant="secondary">
        Explore selected work
      </Button>,
    );

    expect(markup).toContain("border-heather");
    expect(markup).not.toContain("bg-fuchsia-signal");
  });
});
