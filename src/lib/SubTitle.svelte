<script lang="ts">
	import type { FeatherIconNames } from 'feather-icons';
	import Icon from '$lib/Icon.svelte';

	export let title: string;
	export let iconName: FeatherIconNames | undefined = undefined;
</script>

<h3 class="font-bold border-b-2 border-secondary mt-4">
	<div class="m-2 text-center inline-flex items-center text-secondary-dark">
		{#if iconName !== undefined}
			<span class="me-2"><Icon name={iconName} /></span>
		{/if}
		{title}
	</div>
</h3>
