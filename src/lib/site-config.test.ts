import { describe, expect, it } from "vitest";

import { workItems } from "../data/work";
import { buildMailtoHref, siteConfig } from "./site-config";

describe("site configuration", () => {
  it("uses the verified email and GitHub identity", () => {
    expect(siteConfig.email).toBe("hemangdoshi26@gmail.com");
    expect(siteConfig.githubUrl).toBe("https://github.com/hemang-doshi");
  });

  it("defines the handwritten navbar labels with the expected section anchors", () => {
    expect(siteConfig.navigation).toEqual([
      { label: "About me 🧘‍♂️", href: "#hero", variant: "pencil-arc" },
      { label: "My work 💻", href: "#work", variant: "pencil-tilt" },
      { label: "Skills 🧠", href: "#skills", variant: "pencil-wobble" },
      { label: "Contact ☎️", href: "#contact", variant: "pencil-loop" },
    ]);
  });

  it("builds URL-encoded email links with an optional project subject", () => {
    expect(buildMailtoHref("Discuss DevDeck")).toBe(
      "mailto:hemangdoshi26@gmail.com?subject=Discuss%20DevDeck",
    );
    expect(buildMailtoHref()).toBe("mailto:hemangdoshi26@gmail.com");
  });

  it("keeps one deliberate preview variant for every selected project", () => {
    expect(workItems.map((item) => item.preview)).toEqual([
      "devdeck",
      "scenebook",
      "financial-analyst",
      "setuai",
    ]);
  });
});
