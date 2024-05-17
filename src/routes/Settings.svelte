<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import type { ClockInfo } from '$lib/types/clock';
	import { formatClockName, formatTime } from '$lib/utils/clockUtils';
	import { ThemeName, changeTheme } from '$lib/utils/themes';

	let dialog: HTMLDialogElement;
	let showModal = false;
	export let clockInfo: ClockInfo[];
	export let isClockRunning: boolean;

	// TODO: Store somewhere and retrieve it
	let current_theme = ThemeName.green_tomato;

	$: if (showModal && dialog) dialog.showModal();
</script>

<button
	on:click={() => (showModal = true)}
	class="absolute top-4 right-4 text-secondary"
	title="settings_toggle"
>
	<Icon name="settings" width="2em" height="2em" />
</button>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="bg-primary"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation class="p-2">
		<h2 class="text-lg font-bold p-2 text-secondary">Settings</h2>
		<hr class="border-1 border-secondary" />
		<div title="clock_type_selector" class="py-4 flex flex-col justify-between w-80">
			{#each clockInfo as thisClockInfo, idx}
				<div class="flex flex-col justify-center px-4 my-2">
					<label class="text-secondary-dark">
						{formatClockName(thisClockInfo.name)}
						({formatTime(clockInfo[idx].durationSeconds)})
						<input
							bind:value={clockInfo[idx].durationSeconds}
							type="number"
							disabled={isClockRunning}
							class="bg-primary w-full hover:bg-primary-dark"
						/>
					</label>
				</div>
			{/each}
		</div>

		<hr class="border-1 border-secondary" />
		<h4 class="p-2 text-secondary font-bold">Change Theme</h4>
		<select
			bind:value={current_theme}
			on:change={() => changeTheme(current_theme)}
			class="mb-4 p-2 w-full bg-primary-dark text-secondary-dark"
		>
			{#each Object.values(ThemeName) as themeName}
				<option value={themeName}>
					{themeName}
				</option>
			{/each}
		</select>
		<!-- svelte-ignore a11y-autofocus -->
		<button
			autofocus
			on:click={() => dialog.close()}
			class="text-secondary-dark bg-primary-dark w-full">Close</button
		>
	</div>
</dialog>
