export type ClockName = "focus_time" | "short_pause" | "long_pause";

export type ClockInfo = {
  name: ClockName;
  durationSeconds: number;
};

export type ClockEvents = {
  clock_complete: {
    totalDuration: number;
    duration: number;
    clock: ClockName;
    was_manual_reset: boolean;
  };
};
