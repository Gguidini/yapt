import { render, screen } from "@testing-library/svelte";
// import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

import Icon from "./Icon.svelte";

test("feather icon", () => {
  const icon = render(Icon, { name: "feather" });
  // Asserts that an SVG is added to the document
  expect(icon.container.children[0].tagName).toBe("svg");
});
