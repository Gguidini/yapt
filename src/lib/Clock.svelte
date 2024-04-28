<script lang="ts">
  import { onDestroy } from "svelte";
  import Icon from "$lib/Icon.svelte";

  import { createEventDispatcher } from "svelte";
  import type { ClockName, ClockEvents } from "$lib/types/clock";
  import { formatTime } from "$lib/utils/clockUtils";

  export let durationSeconds: number = 60 * 25; // Default is 25mins
  export let clockName: ClockName;
  let timeSpent = 0;
  let isClockRunning: boolean = false;

  let interval: string | number | NodeJS.Timeout | undefined = undefined;

  $: timeLeft = durationSeconds - timeSpent;

  const dispatch = createEventDispatcher<ClockEvents>();

  const clock_complete = (was_manual_reset: boolean) => {
    dispatch("clock_complete", {
      totalDuration: durationSeconds,
      duration: timeSpent,
      clock: clockName,
      was_manual_reset: was_manual_reset,
    });
  };

  function startClock() {
    interval = setInterval(() => {
      timeSpent++;
      if (timeSpent == durationSeconds) {
        clock_complete(false);
        stopClock();
      }
    }, 1000);
    isClockRunning = true;
    dispatch("clock_started", { clock: clockName });
  }

  function stopClock() {
    if (interval !== undefined) {
      clearInterval(interval);
      interval = undefined;
    }
    timeSpent = 0;
    isClockRunning = false;
  }

  function handleClockFlip() {
    if (isClockRunning) {
      clock_complete(true);
      stopClock();
    } else {
      startClock();
    }
  }

  onDestroy(stopClock);
</script>

<div class="flex flex-col items-center justify-center">
  <div class="text-5xl pb-4">
    {formatTime(timeLeft)}
  </div>
  <div class="text-xl">
    <button on:click={handleClockFlip}>
      {#if isClockRunning}
        <Icon name="refresh-ccw" />
      {:else}
        <Icon name="play" />
      {/if}
    </button>
  </div>
</div>
