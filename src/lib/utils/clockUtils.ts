import type { ClockName } from "../types/clock";

export function getPaddedMinutesFromTimeInSeconds(timeSeconds: number): string {
  return ("0" + Math.floor(timeSeconds / 60)).slice(-2);
}

export function getPaddedSecondsFromTimeInSeconds(timeSeconds: number): string {
  return ("0" + (timeSeconds % 60)).slice(-2);
}

export function formatTime(timeSeconds: number): string {
  let timePieces = [getPaddedSecondsFromTimeInSeconds(timeSeconds)];
  let minutes = getPaddedMinutesFromTimeInSeconds(timeSeconds);
  const hours = getPaddedMinutesFromTimeInSeconds(Number(minutes));
  if (hours > "00") {
    minutes = getPaddedSecondsFromTimeInSeconds(Number(minutes));
    timePieces.push(minutes, hours);
  } else {
    timePieces.push(minutes);
  }
  return timePieces.reverse().join(":");
}
