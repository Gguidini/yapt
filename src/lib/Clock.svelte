<script lang="ts">
  import { onDestroy } from "svelte";
  import Icon from "./Icon.svelte";

  import { createEventDispatcher } from "svelte";
  import type { ClockName, ClockEvents } from "../types/clock";

  export let durationSeconds: number = 60 * 25; // Default is 25mins
  export let clockName: ClockName;
  let timeSpent = 0;
  let playing: boolean = false;

  let interval: number | undefined = undefined;

  $: timeLeft = durationSeconds - timeSpent;
  $: minutes = ("0" + Math.floor(timeLeft / 60)).slice(-2);
  $: seconds = ("0" + (timeLeft % 60)).slice(-2);

  const dispatch = createEventDispatcher<ClockEvents>();

  // TODO: Declare event type
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
  }

  function stopClock() {
    if (interval !== undefined) {
      clearInterval(interval);
      interval = undefined;
    }
    timeSpent = 0;
    playing = false;
  }

  function handleClockFlip() {
    if (playing) {
      clock_complete(true);
      stopClock();
    } else {
      startClock();
    }
    playing = !playing;
  }

  onDestroy(stopClock);
</script>

<div class="flex flex-col items-center justify-center">
  <div class="text-5xl pb-4">
    {minutes}:{seconds}
  </div>
  <div class="text-xl">
    <button on:click={handleClockFlip}>
      {#if playing}
        <Icon name="refresh-ccw" />
      {:else}
        <Icon name="play" />
      {/if}
    </button>
  </div>
</div>
