import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { ProjectPreviewVariant } from "../../data/work";
import { ProjectPreview } from "./ProjectPreview";

const variants: ProjectPreviewVariant[] = [
  "devdeck",
  "scenebook",
  "financial-analyst",
  "setuai",
];

describe("ProjectPreview", () => {
  it.each(variants)("renders the %s interface as decorative content", (variant) => {
    const markup = renderToStaticMarkup(<ProjectPreview variant={variant} />);

    expect(markup).toContain(`data-preview="${variant}"`);
    expect(markup).toContain('aria-hidden="true"');
  });
});
