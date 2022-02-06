<script lang="ts">
  import Box from "./Box.svelte"
  import type { Color, Animation, GridSquare } from "../WrushleGame";

  export let grid: GridSquare[][];

  export let boxes: Box[] = []
  
  export function animate(animation: Animation, rowNum: number = 0) {
    for (let i=rowNum*5; i<rowNum*5+5; i++) {
      boxes[i].animate(animation)
    }
  }
</script>

<div class="holder" >
  <div class="grid">
    {#each grid as row, y}
      {#each row as gridSquare, x}
        <!-- <div class="box" class:wiggle={gridSquare.animation==Animation.Wiggle}>
          {gridSquare.letter}
        </div> -->
        <Box letter={gridSquare.letter} animationDelay={x*.05} color={gridSquare.color} bind:this={ boxes[y*5+x] }  />
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
    margin: 4px;
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
    /* box-shadow: 3px 3px 0px 0px var(--intermediate-color) */
    animation-duration: 0.5s;
    box-shadow: 0px 10px 5px 5px #11111180;
  }
</style>
