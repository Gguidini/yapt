<script lang="ts">
  import Clock from "./lib/Clock.svelte";
  import type { AppContext } from "./types/app";
  import type { ClockEvents, ClockInfo } from "./types/clock";
  import pomotimer from "./assets/pomotimer.svg";

  const CLOCK_INFO: ClockInfo[] = [
    { name: "focus_time", durationSeconds: 60 * 25 },
    { name: "short_pause", durationSeconds: 60 * 5 },
    { name: "long_pause", durationSeconds: 60 * 10 },
  ];

  let appContext: AppContext = {
    focusTime: 0,
    pomodorosCompleted: 0,
    pomodorosIncomplete: 0,
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

      appContext = { focusTime, pomodorosCompleted, pomodorosIncomplete };
    }

    currentClockIdx = (currentClockIdx + 1) % CLOCK_INFO.length;
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

  <div class="flex items-center justify-around py-4" id="stats">
    <p>Focus time: {appContext.focusTime}s</p>
    <p>Pomodoros completed: {appContext.pomodorosCompleted}</p>
    <p>Pomodoros incomplete: {appContext.pomodorosIncomplete}</p>
  </div>

  <div id="clock-type-selector" class="py-4">
    {#each CLOCK_INFO as clockInfo, idx}
      <label>
        <input type="radio" bind:group={currentClockIdx} value={idx} />
        {clockInfo.name.replace("_", " ")}
      </label>
    {/each}
  </div>

  <div class="py-8 px-4 border border-indigo-900 shadow-lg" id="clock">
    <Clock
      durationSeconds={currentClockInfo.durationSeconds}
      clockName={currentClockInfo.name}
      on:clock_complete={handleClockComplete}
    />
  </div>
</main>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
