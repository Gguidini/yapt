<script lang="ts">
  import Clock from "./lib/Clock.svelte";
  import type { ClockEvents, ClockInfo } from "./types/clock";

  const CLOCK_INFO: ClockInfo[] = [
    { name: "focus_time", durationSeconds: 60 * 25 },
    { name: "short_pause", durationSeconds: 60 * 5 },
    { name: "long_pause", durationSeconds: 60 * 10 },
    { name: "dev_clock", durationSeconds: 10 },
  ];
  let currentClockIdx: number = 0;
  let focusTime: number = 0;
  let pomodorosCompleted: number = 0;
  $: currentClockInfo = CLOCK_INFO[currentClockIdx];

  function handleClockComplete(event: CustomEvent<ClockEvents['clock_complete']>) {
    focusTime += event.detail.duration;
    pomodorosCompleted += Number(!event.detail.was_manual_reset);

    currentClockIdx = (currentClockIdx + 1) % CLOCK_INFO.length;
    alert("Clock complete");
  }
</script>

<main class="font-mono">
  <h1 class="py-8 px-4 text-xl">Yet Another Pomodoro Timer</h1>

  <div class="flex items-center justify-around py-4" id="stats">
    <p>Focus time: {focusTime}s</p>
    <p>Pomodoros completed: {pomodorosCompleted}</p>
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
