<script lang="ts">
	import Icon from '$lib/Icon.svelte';

	let dialog: HTMLDialogElement;
	let showModal = false;

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
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>
