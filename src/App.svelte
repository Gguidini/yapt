<script lang="ts">
  import Clock from "./lib/Clock.svelte";
  import type { AppContext } from "./types/app";
  import type { ClockEvents, ClockInfo } from "./types/clock";
  import pomotimer from "./assets/pomotimer.svg";
  import app from "./main";
  import {
    getPaddedMinutesFromTimeInSeconds,
    getPaddedSecondsFromTimeInSeconds,
  } from "./utils/clockUtils";

  const CLOCK_INFO: ClockInfo[] = [
    { name: "focus_time", durationSeconds: 60 * 25 },
    { name: "short_pause", durationSeconds: 60 * 5 },
    { name: "long_pause", durationSeconds: 60 * 10 },
  ];

  let appContext: AppContext = {
    focusTime: 0,
    pomodorosCompleted: 0,
    pomodorosIncomplete: 0,
    isClockRunning: false,
  };

  let currentClockIdx: number = 0;
  $: currentClockInfo = CLOCK_INFO[currentClockIdx];

  function handleClockComplete(
    event: CustomEvent<ClockEvents["clock_complete"]>
  ) {
    if (event.detail.clock == "focus_time") {
      const focusTime = appContext.focusTime + event.detail.duration;
      const pomodorosCompleted =
        appContext.pomodorosCompleted + Number(!event.detail.was_manual_reset);
      const pomodorosIncomplete =
        appContext.pomodorosIncomplete + Number(event.detail.was_manual_reset);

      appContext = {
        focusTime,
        pomodorosCompleted,
        pomodorosIncomplete,
        isClockRunning: false,
      };
    }

    currentClockIdx = (currentClockIdx + 1) % CLOCK_INFO.length;
  }

  function handleClockStarted(_: CustomEvent<ClockEvents["clock_started"]>) {
    appContext = { ...appContext, isClockRunning: true };
  }
</script>

<main class="font-mono flex flex-col items-strech justify-items-center">
  <img
    src={pomotimer}
    alt="Pomodoro timer"
    style="width: 128px; height: 128px;"
    class="self-center"
  />
  <h1 class="py-8 px-4 text-xl">Yet Another Pomodoro Timer</h1>

  <h3 class="font-bold">Stats</h3>
  <div class="flex items-center justify-between py-3" id="stats">
    <p class="px-2">Focus time: {appContext.focusTime}s</p>
    <p class="px-2">Pomodoros completed: {appContext.pomodorosCompleted}</p>
    <p class="px-2">Pomodoros incomplete: {appContext.pomodorosIncomplete}</p>
  </div>

  <div id="clock-type-selector" class="py-4 flex justify-between">
    {#each CLOCK_INFO as clockInfo, idx}
      <div class="flex flex-col justify-center px-4">
        <label>
          <input
            type="radio"
            bind:group={currentClockIdx}
            value={idx}
            disabled={appContext.isClockRunning}
          />
          {clockInfo.name.replace("_", " ")}
          ({getPaddedMinutesFromTimeInSeconds(
            CLOCK_INFO[idx].durationSeconds
          )}:{getPaddedSecondsFromTimeInSeconds(
            CLOCK_INFO[idx].durationSeconds
          )})
        </label>
        <input
          bind:value={CLOCK_INFO[idx].durationSeconds}
          type="number"
          disabled={appContext.isClockRunning}
        />
      </div>
    {/each}
  </div>

  <div class="py-8 px-4 border-2 border-indigo-900 shadow-lg" id="clock">
    <Clock
      durationSeconds={currentClockInfo.durationSeconds}
      clockName={currentClockInfo.name}
      on:clock_complete={handleClockComplete}
      on:clock_started={handleClockStarted}
    />
  </div>
</main>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
