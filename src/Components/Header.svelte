<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Animation } from "../types";

  export let playing: Boolean = true;
  
  export let formattedTime: string = "5:00"
  export let score: number = 0;

  $: scoreUp = doAnimation(score)

  let animation: Animation = Animation.None;

  const dispatch = createEventDispatcher();

  function showInstructions() {
    dispatch("showInstructions", {});
  }
  
  function doAnimation(score) {
    animate(Animation.ScoreUp)
  }

  export function animate(animationType: Animation) {
    animation = Animation.None;
    setTimeout(() => {
      animation = animationType;
    }, 0);
  }

</script>

<div class="headerFlex">
  <div class="contentHolder">
    {#if playing}
      <h2>{formattedTime}</h2>
      <h2 class="scoreText {animation}">+ {score}</h2>
    {:else}
      <h1>WRUSHLE</h1>
    {/if}
  </div>
  <button class="end" on:click={showInstructions}>?</button>
</div>

<style>
  .scoreText {
    animation-duration: .75s;
  }
  @keyframes scoreUp {
    0% {
      transform: scale(1.0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1.0);
    }
  }
  .scoreUp {
    animation-name: scoreUp;
    animation-play-state: running;
  }
  .contentHolder {
    display: flex;
    justify-content:space-between;
    width: 100%;
    align-items: center;
  }
  h2 {
    margin: 1rem;
  }
  div {
    display: flex;
    height: 2.5em;
    background-color: var(--intermediate-color);
  }
  .headerFlex {
    justify-content: space-between;
    border-bottom: 1px solid var(--main-text-color);
  }
  .end {
    display: block;
    justify-self: flex-end;
  }
  button {
    padding: 0rem 1rem;
    border: 0;
    border-left: 1px solid var(--main-text-color);
  }
</style>
