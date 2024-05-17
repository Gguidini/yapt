<script lang="ts">
	import SubTitle from '$lib/SubTitle.svelte';
	import type { AppContext } from '$lib/types/app';
	import { formatTime } from '$lib/utils/clockUtils';

	export let statsInfo: AppContext;
</script>

<SubTitle title="Stats" iconName="pie-chart" />
<div class="flex items-center justify-between py-3 text-secondary-dark" id="stats">
	<p class="px-2">Focus time: {formatTime(statsInfo.focusTime)}</p>
	<p class="px-2">Completed: {statsInfo.pomodorosCompleted}</p>
	<p class="px-2">
		Incomplete: {statsInfo.pomodorosIncomplete}
	</p>
</div>
