<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let label: string;
  export let key: string;
  export let special: boolean;

  let pressed = false;

  function handleKeydown(event) {
    if (event.key.toLowerCase() == key.toLowerCase()
      || key == "←" && event.key == "Backspace") {
      keyPressed(key);
      pressed = true;
    }
  }

  function handleKeyup(event) {
    if (event.key.toLowerCase() == key.toLowerCase()
      || key == "←" && event.key == "Backspace") {
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

<button
  class:wide={special}
  class:pressed
  on:click={() => {
    keyPressed(label);
  }}
>
  {label}
</button>

<style>
  button {
    display: block;
    box-sizing: border-box;
    padding: 0;
    /* important to do math with margin here */
    margin: 0.2%;
    width: 9.6%;
    transition: transform 0.1s ease;

    border-radius: 5px;
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
  }

  .wide {
    flex-grow: 1;
  }

  .pressed {
    transform: translate(0, -10px) scale(1.2);
  }
</style>
