<script lang="ts">
	import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function showInstructions() {
    dispatch('showInstructions', {});
  }
</script>

<div class="headerFlex">
  <div>
    <h1>
      WRUSHLE
    </h1>
  </div>
  <button class="end" on:click={showInstructions}>?</button>
</div>

<style>
  div {
    display: flex;
    height: 2.5em;
    background-color: var(--intermediate-color);
  }
  .headerFlex {
    justify-content:space-between;
    border-bottom: 1px solid var(--main-text-color);
  }
  .end {
    display:block;
    justify-self:flex-end;
  }
  button {
    padding: 0rem 1rem;
    border: 0;
    border-left: 1px solid var(--main-text-color);
  }

</style>