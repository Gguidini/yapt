<!-- https://svelte.dev/examples/each-block-bindings -->
<script>
  import SubTitle from "./SubTitle.svelte";

  let tasks = [
    { done: false, text: "finish Svelte tutorial" },
    { done: false, text: "build an app" },
    { done: false, text: "world domination" },
  ];

  function add() {
    tasks = tasks.concat({ done: false, text: "" });
  }

  function clear() {
    tasks = tasks.filter((t) => !t.done);
  }

  $: remaining = tasks.filter((t) => !t.done).length;
</script>

<div class="flex flex-col flex-auto items-strech px-16">
  <SubTitle title="Tasks" />
  <p class="mb-4">{remaining} remaining</p>

  {#each tasks as todo}
    <div class="my-1">
      <input type="checkbox" bind:checked={todo.done} />

      <input
        placeholder="What needs to be done?"
        bind:value={todo.text}
        disabled={todo.done}
        class="disabled:line-through"
      />
    </div>
  {/each}

  <div class="flex justify-between mt-4">
    <button on:click={add}> Add new </button>
    <button on:click={clear}> Clear completed </button>
  </div>
</div>
