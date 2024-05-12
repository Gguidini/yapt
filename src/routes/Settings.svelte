<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import type { ClockInfo } from '$lib/types/clock';
	import { formatClockName, formatTime } from '$lib/utils/clockUtils';

	let dialog: HTMLDialogElement;
	let showModal = false;
	export let clockInfo: ClockInfo[];
	export let isClockRunning: boolean;

	$: if (showModal && dialog) dialog.showModal();
</script>

<button
	on:click={() => (showModal = true)}
	class="absolute top-4 right-4 text-indigo-900"
	title="settings_toggle"
>
	<Icon name="settings" width="2em" height="2em" />
</button>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation class="p-2">
		<h2 class="text-lg font-bold p-2">Settings</h2>
		<hr />
		<div title="clock_type_selector" class="py-4 flex flex-col justify-between w-80">
			{#each clockInfo as thisClockInfo, idx}
				<div class="flex flex-col justify-center px-4">
					<label>
						{formatClockName(thisClockInfo.name)}
						({formatTime(clockInfo[idx].durationSeconds)})
						<input
							bind:value={clockInfo[idx].durationSeconds}
							type="number"
							disabled={isClockRunning}
						/>
					</label>
				</div>
			{/each}
		</div>
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>
