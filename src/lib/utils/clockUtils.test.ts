import { expect, test, describe } from "vitest";
import {
  formatTime,
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

  test("Test formatTime", () => {
    expect(formatTime(100)).toBe("01:40");
    expect(formatTime(60)).toBe("01:00");
    expect(formatTime(59)).toBe("00:59");
    expect(formatTime(1)).toBe("00:01");
    expect(formatTime(3600)).toBe("01:00:00");
    expect(formatTime(3630)).toBe("01:00:30");
    expect(formatTime(3690)).toBe("01:01:30");
  });
});
