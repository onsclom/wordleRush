<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Color } from "../types";

  export let color: Color;
  export let label: string;
  export let key: string;
  export let special: boolean;

  let pressed = false;

  function handleKeydown(event) {
    if (
      event.key.toLowerCase() == key.toLowerCase() ||
      (key == "←" && event.key == "Backspace")
    ) {
      keyPressed(key);
      pressed = true;
    }
  }

  function handleKeyup(event) {
    if (
      event.key.toLowerCase() == key.toLowerCase() ||
      (key == "←" && event.key == "Backspace")
    ) {
      pressed = false;
    }
  }

  const dispatch = createEventDispatcher();
  function keyPressed(key) {
    dispatch("keyPress", {
      key: key,
    });
  }
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />

<div
  class="{color}"
  class:wide={special}
  class:pressed
  on:click={() => {
    keyPressed(label);
  }}
>
  {label}
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0;
    /* important to do math with margin here */
    margin: 0.2%;
    width: 9.6%;
    transition: all 0.1s ease;

    /* border-radius: 5px; */
    border: 1px solid var(--main-text-color);
    background-color: var(--intermediate-color);
    color: var(--main-text-color);

    transition: background-color .5s ease, transform .2 ease;
  }

  .wide {
    flex-grow: 1;
  }

  .pressed {
    box-shadow: 0px 10px 5px 5px #11111180;
    transform: translate(0, -10px) scale(1.2);
  }
</style>
