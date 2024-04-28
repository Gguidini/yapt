<script lang="ts">
  // From https://github.com/the-pudding/svelte-starter/blob/svelte/src/components/helpers/Icon.svelte

  import feather from "feather-icons";
  export const directions = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];

  export let name: feather.FeatherIconNames;
  export let direction = "n";
  export let strokeWidth: string = "2px";
  export let width = "1em";
  export let height = "1em";

  $: icon = feather.icons[name];
  $: rotation = directions.indexOf(direction) * 45;
  $: if (icon) {
    if (strokeWidth) icon.attrs["stroke-width"] = strokeWidth;
  }
</script>

<svg
  {...icon.attrs}
  style="width: {width}; height: {height}; transform: rotate({rotation}deg);"
>
  <g>
    {@html icon.contents}
  </g>
</svg>

<style>
  svg {
    width: 1em;
    height: 1em;
    overflow: visible;
    transform-origin: 50% 50%;
  }
</style>
