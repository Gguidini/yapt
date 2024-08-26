<script lang="ts">
	import Clock from '$lib/Clock.svelte';
	import type { ClockEvents } from '$lib/types/clock';
	import { formatClockName, formatTime } from '$lib/utils/clockUtils';
	import { LoopCombinator, SingleCombinator } from '$lib/utils/flow';

	const pomodoro = new LoopCombinator([
		new LoopCombinator(
			[
				new SingleCombinator({ name: 'focus_time', durationSeconds: 60 * 25 }),
				new SingleCombinator({ name: 'short_pause', durationSeconds: 60 * 5 })
			],
			3
		),
		new SingleCombinator({ name: 'long_pause', durationSeconds: 60 * 10 })
	]);

	function handleClockComplete(event: CustomEvent<ClockEvents['clock_complete']>) {
		currentValue = pomodoro.value();
	}

	let currentValue = pomodoro.value();
</script>

<main class="font-mono">
	{formatClockName(currentValue.name)} • {formatTime(currentValue.durationSeconds)}
	<div class="py-8 px-4 border-2 border-secondary shadow-lg" id="clock">
		<Clock
			bind:durationSeconds={currentValue.durationSeconds}
			clockName={currentValue.name}
			on:clock_complete={handleClockComplete}
		/>
	</div>
</main>
