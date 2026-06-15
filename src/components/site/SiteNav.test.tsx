import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SiteNav } from "./SiteNav";

describe("SiteNav", () => {
  it("renders the updated navigation labels as hand-drawn chips", () => {
    const markup = renderToStaticMarkup(<SiteNav />);

    expect(markup).toContain("About me🧘‍♂️");
    expect(markup).toContain("My work💻");
    expect(markup).toContain("Skills🧠");
    expect(markup).toContain("Contact☎️");
    expect(markup).toContain('href="#hero"');
    expect(markup).toContain('href="#work"');
    expect(markup).toContain('href="#skills"');
    expect(markup).toContain('href="#contact"');
    expect(markup).toContain("nav-chip");
    expect(markup).toContain("nav-chip--pencil-arc");
    expect(markup).toContain("nav-chip--pencil-tilt");
    expect(markup).toContain("nav-chip--pencil-wobble");
    expect(markup).toContain("nav-chip--pencil-loop");
  });

  it("renders the animated brand markup instead of the static logo", () => {
    const markup = renderToStaticMarkup(<SiteNav />);

    expect(markup).toContain("brand-mascot-shell");
    expect(markup).toContain("brand-mascot-image");
    expect(markup).toContain("nav-mascot.png");
    expect(markup).toContain("Hemang Doshi");
    expect(markup).not.toContain("logoGrad");
  });
});
