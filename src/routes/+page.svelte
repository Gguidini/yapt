<script lang="ts">
	import Clock from '$lib/Clock.svelte';
	import type { AppContext } from '$lib/types/app';
	import type { ClockEvents } from '$lib/types/clock';
	import pomotimer from '$lib/images/pomotimer.svg';
	import { CLOCK_INFO, formatClockName, formatTime } from '$lib/utils/clockUtils';
	import Tasks from '$lib/Tasks.svelte';
	import Settings from './Settings.svelte';
	import Stats from './Stats.svelte';

	let clockInfo = [...CLOCK_INFO];

	let appContext: AppContext = {
		focusTime: 0,
		pomodorosCompleted: 0,
		pomodorosIncomplete: 0,
		isClockRunning: false
	};

	let currentClockIdx: number = 0;
	$: currentClockInfo = clockInfo[currentClockIdx];

	function handleClockComplete(event: CustomEvent<ClockEvents['clock_complete']>) {
		const currentContext = appContext;
		if (event.detail.clock == 'focus_time') {
			currentContext.focusTime += event.detail.duration;
			currentContext.pomodorosCompleted += Number(!event.detail.was_manual_reset);
			currentContext.pomodorosIncomplete += Number(event.detail.was_manual_reset);
		}
		appContext = { ...currentContext, isClockRunning: false };
		currentClockIdx = (currentClockIdx + 1) % clockInfo.length;
	}

	function handleClockStarted(_: CustomEvent<ClockEvents['clock_started']>) {
		appContext = { ...appContext, isClockRunning: true };
	}
</script>

<svelte:head>
	<link rel="icon" href={pomotimer} />
</svelte:head>

<main class="font-mono">
	<!-- Settings is glued to the left-top corner -->
	<Settings bind:clockInfo isClockRunning={appContext.isClockRunning} />

	<div class="flex flex-col items-center">
		<img
			src={pomotimer}
			alt="Pomodoro timer"
			style="width: 128px; height: 128px;"
			class="self-center"
		/>
		<h1 class="pb-8 pt-2 px-4 text-xl font-extrabold text-secondary-dark">
			Yet Another Pomodoro Timer
		</h1>
	</div>

	<div class="flex flex-col items-strech justify-evenly lg:flex-row">
		<div
			class="flex flex-col justify-start items-strech justify-items-center basis-1/2"
			title="pomodoro"
		>
			<select
				bind:value={currentClockIdx}
				class="mb-4 p-2 rounded-lg text-lg font-bold bg-primary-dark text-secondary-dark"
			>
				{#each clockInfo as clockInfo, idx}
					<option value={idx}>
						{formatClockName(clockInfo.name)} • {formatTime(clockInfo.durationSeconds)}
					</option>
				{/each}
			</select>
			<div class="py-8 px-4 border-2 border-secondary shadow-lg" id="clock">
				<Clock
					bind:durationSeconds={currentClockInfo.durationSeconds}
					clockName={currentClockInfo.name}
					on:clock_complete={handleClockComplete}
					on:clock_started={handleClockStarted}
				/>
			</div>

			<Stats bind:statsInfo={appContext} />
		</div>

		<div class="flex justify-end items-strech basis-1/2" id="tasks">
			<Tasks />
		</div>
	</div>
</main>
