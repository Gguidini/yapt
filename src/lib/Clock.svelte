<script lang="ts">
	import { onDestroy } from 'svelte';
	import Icon from '$lib/Icon.svelte';

	import { createEventDispatcher } from 'svelte';
	import type { ClockName, ClockEvents } from '$lib/types/clock';
	import { formatTime } from '$lib/utils/clockUtils';
	import { Sound } from 'svelte-sound';
	import achievement_sound from '$lib/sound/achievement.wav';

	export let durationSeconds: number = 60 * 25; // Default is 25mins
	export let clockName: ClockName;
	let timeSpent = 0;
	let isClockRunning: boolean = false;
	const clockCompleteSound = new Sound(achievement_sound);

	let interval: string | number | NodeJS.Timeout | undefined = undefined;

	$: timeLeft = durationSeconds - timeSpent;

	const dispatch = createEventDispatcher<ClockEvents>();

	const clock_complete = (was_manual_reset: boolean) => {
		clockCompleteSound.play();
		dispatch('clock_complete', {
			totalDuration: durationSeconds,
			duration: timeSpent,
			clock: clockName,
			was_manual_reset: was_manual_reset
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
		dispatch('clock_started', { clock: clockName });
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

<svelte:head>
	<title>YAPT • {formatTime(timeLeft)}</title>
</svelte:head>

<div class="flex flex-col items-center justify-center">
	<div class="text-5xl pb-4 text-secondary">
		{formatTime(timeLeft)}
	</div>
	<div class="text-xl">
		<button
			on:click={handleClockFlip}
			class="rounded-full bg-secondary p-2 text-primary text-center"
		>
			{#if isClockRunning}
				<Icon name="refresh-ccw" width="2em" height="2em" />
			{:else}
				<Icon name="play" width="2em" height="2em" />
			{/if}
		</button>
	</div>
</div>
