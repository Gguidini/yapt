import type { ClockName } from "../types/clock";

export function getPaddedMinutesFromTimeInSeconds(timeSeconds: number): string {
  return ("0" + Math.floor(timeSeconds / 60)).slice(-2);
}

export function getPaddedSecondsFromTimeInSeconds(timeSeconds: number): string {
  return ("0" + (timeSeconds % 60)).slice(-2);
}
