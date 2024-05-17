<!-- https://svelte.dev/examples/each-block-bindings -->
<script>
	import Icon from '$lib/Icon.svelte';
	import SubTitle from '$lib/SubTitle.svelte';

	let tasks = [
		{ done: false, text: 'finish Svelte tutorial' },
		{ done: false, text: 'build an app' },
		{ done: false, text: 'world domination' }
	];

	function add() {
		tasks = tasks.concat({ done: false, text: '' });
	}

	function clear() {
		tasks = tasks.filter((t) => !t.done);
	}

	$: remaining = tasks.filter((t) => !t.done).length;
</script>

<div class="flex flex-col flex-auto items-strech px-16 w-max">
	<SubTitle title="Tasks" iconName="list" />
	<p class="mb-4 text-secondary">{remaining} remaining</p>

	{#each tasks as todo, idx}
		<div class="my-1 flex flex-row">
			<input
				id={'todo_' + idx}
				type="checkbox"
				bind:checked={todo.done}
				class="mr-1 checked:bg-secondary bg-primary"
			/>
			<input
				placeholder="What needs to be done?"
				bind:value={todo.text}
				disabled={todo.done}
				class="disabled:line-through w-full bg-primary hover:bg-primary-dark text-secondary-dark"
			/>
		</div>
	{/each}

	<div class="flex flex-col mt-4 text-secondary-dark">
		<button
			class="m-2 text-center inline-flex items-center bg-primary-dark border border-secondary rounded-md p-2"
			on:click={add}
		>
			<Icon name="edit" /> <span class="ms-2">Add new</span>
		</button>
		<button
			class="m-2 text-center inline-flex items-center bg-primary-dark border border-secondary rounded-md p-2"
			on:click={clear}
			><Icon name="trash" /> <span class="ms-2">Clear completed</span>
		</button>
	</div>
</div>
