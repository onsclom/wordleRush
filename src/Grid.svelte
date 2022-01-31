<script lang="ts">
  export let grid: string[][]
</script>

<div class="gridHolder">
  <div class="grid">
    {#each grid as row}
    <div class="gridRow">
      {#each row as letter}
        <div class="box">
          {letter}
        </div>
      {/each}
    </div>
    {/each}
  </div>
</div>

<style>
  .gridHolder {
    display: flex;
    flex-grow: 1;
    /* aspect-ratio: 1/1; */

  }
  .grid {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  }
  
  .gridRow {
    display: flex;
    flex-grow: 1;
  }
  
  .box {
    flex-grow: 1;
    margin: 2px;
    border: 1px solid var(--main-text-color);
  }
</style>