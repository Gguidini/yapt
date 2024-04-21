import { expect, test, describe } from "vitest";
import {
  getPaddedMinutesFromTimeInSeconds,
  getPaddedSecondsFromTimeInSeconds,
} from "./clockUtils";

describe("Test clockUtils", () => {
  test("Test getPaddedMinutesFromTimeInSeconds", () => {
    expect(getPaddedMinutesFromTimeInSeconds(300)).toBe("05");
    expect(getPaddedMinutesFromTimeInSeconds(1500)).toBe("25");
    expect(getPaddedMinutesFromTimeInSeconds(0)).toBe("00");
    expect(getPaddedMinutesFromTimeInSeconds(60)).toBe("01");
    expect(getPaddedMinutesFromTimeInSeconds(59)).toBe("00");
    expect(getPaddedMinutesFromTimeInSeconds(660)).toBe("11");
  });

  test("Test getPaddedSecondsFromTimeInSeconds", () => {
    expect(getPaddedSecondsFromTimeInSeconds(0)).toBe("00");
    expect(getPaddedSecondsFromTimeInSeconds(1)).toBe("01");
    expect(getPaddedSecondsFromTimeInSeconds(10)).toBe("10");
    expect(getPaddedSecondsFromTimeInSeconds(60)).toBe("00");
    expect(getPaddedSecondsFromTimeInSeconds(59)).toBe("59");
  });
});
