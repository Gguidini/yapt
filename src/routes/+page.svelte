<script lang="ts">
	import Clock from '$lib/Clock.svelte';
	import type { AppContext } from '$lib/types/app';
	import type { ClockEvents, ClockInfo } from '$lib/types/clock';
	import pomotimer from '$lib/images/pomotimer.svg';
	import { CLOCK_INFO, formatClockName, formatTime } from '$lib/utils/clockUtils';
	import SubTitle from '$lib/SubTitle.svelte';
	import Tasks from '$lib/Tasks.svelte';
	import Settings from './Settings.svelte';

	let appContext: AppContext = {
		focusTime: 0,
		pomodorosCompleted: 0,
		pomodorosIncomplete: 0,
		isClockRunning: false
	};

	let currentClockIdx: number = 0;
	$: currentClockInfo = CLOCK_INFO[currentClockIdx];
	$: currentClockNameFormatted = formatClockName(CLOCK_INFO[currentClockIdx].name);

	function handleClockComplete(event: CustomEvent<ClockEvents['clock_complete']>) {
		const currentContext = appContext;
		if (event.detail.clock == 'focus_time') {
			currentContext.focusTime += event.detail.duration;
			currentContext.pomodorosCompleted += Number(!event.detail.was_manual_reset);
			currentContext.pomodorosIncomplete += Number(event.detail.was_manual_reset);
		}
		appContext = { ...currentContext, isClockRunning: false };
		currentClockIdx = (currentClockIdx + 1) % CLOCK_INFO.length;
	}

	function handleClockStarted(_: CustomEvent<ClockEvents['clock_started']>) {
		appContext = { ...appContext, isClockRunning: true };
	}
</script>

<svelte:head>
	<link rel="icon" href={pomotimer} />
</svelte:head>

<main class="font-mono">
	<Settings>
		<div title="clock_type_selector" class="py-4 flex flex-col justify-between w-80">
			{#each CLOCK_INFO as clockInfo, idx}
				<div class="flex flex-col justify-center px-4">
					<label>
						{clockInfo.name.replace('_', ' ')}
						({formatTime(CLOCK_INFO[idx].durationSeconds)})
						<input
							bind:value={CLOCK_INFO[idx].durationSeconds}
							type="number"
							disabled={appContext.isClockRunning}
						/>
					</label>
				</div>
			{/each}
		</div>
	</Settings>
	<div class="flex content-between align-center m-2"></div>
	<div class="flex flex-col items-strech">
		<img
			src={pomotimer}
			alt="Pomodoro timer"
			style="width: 128px; height: 128px;"
			class="self-center"
		/>
		<h1 class="py-8 px-4 text-xl">Yet Another Pomodoro Timer</h1>
	</div>

	<div class="flex flex-col items-strech justify-evenly lg:flex-row">
		<div class="flex flex-col justify-start items-strech justify-items-center" id="pomodoro">
			<div class="py-4 flex justify-between" id="current_clock_selector">
				{#each CLOCK_INFO as clockInfo, idx}
					<label>
						<input
							type="radio"
							bind:group={currentClockIdx}
							value={idx}
							disabled={appContext.isClockRunning}
						/>
						{clockInfo.name.replace('_', ' ')}
					</label>
				{/each}
			</div>
			<p class="text-lg font-bold">
				{currentClockNameFormatted} • {formatTime(CLOCK_INFO[currentClockIdx].durationSeconds)}
			</p>
			<div class="py-8 px-4 border-2 border-indigo-900 shadow-lg" id="clock">
				<Clock
					durationSeconds={currentClockInfo.durationSeconds}
					clockName={currentClockInfo.name}
					on:clock_complete={handleClockComplete}
					on:clock_started={handleClockStarted}
				/>
			</div>

			<SubTitle title="Stats" iconName="pie-chart" />
			<div class="flex items-center justify-between py-3" id="stats">
				<p class="px-2">Focus time: {formatTime(appContext.focusTime)}</p>
				<p class="px-2">Pomodoros completed: {appContext.pomodorosCompleted}</p>
				<p class="px-2">
					Pomodoros incomplete: {appContext.pomodorosIncomplete}
				</p>
			</div>
		</div>

		<div class="flex justify-end items-strech" id="tasks">
			<Tasks />
		</div>
	</div>
</main>
