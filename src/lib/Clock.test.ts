import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { assert, expect, test } from "vitest";
import Clock from "./Clock.svelte";

test("test Clock component", () => {
  const clock = render(Clock, {
    clockName: "focus_time",
    durationSeconds: 10 * 60,
  });
  const clockTime = screen.queryByText(/10:00/iu);
  expect(clockTime).toBeTruthy();
  expect(clockTime?.tagName).toBe("DIV");
  expect(clockTime?.classList.value).toBe("text-5xl pb-4");
});
