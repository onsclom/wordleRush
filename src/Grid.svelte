<script lang="ts">
  import type { Color } from './WrushleGame'

  export let grid: string[][];
  export let colors: Color[][];
</script>

<div class="holder">
  <div class="grid">
    {#each grid as row}
      {#each row as letter}
        <div class="box">
          {letter}
        </div>
      {/each}
    {/each}
  </div>
</div>

<style>
  .holder {
    max-height: 480px;
    justify-self: center;
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }
  .grid {
    flex-grow: 1;
    margin: 0.5rem;
    max-height: 480px;
    max-width: 400px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
      ". . . . ."
      ". . . . ."
      ". . . . ."
      ". . . . ."
      ". . . . ."
      ". . . . .";
  }
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    margin: 2px;
    border: 1px solid var(--main-text-color);
  }
</style>
