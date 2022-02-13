<script lang="ts">
  import Box from "./Box.svelte"
  import type { Animation } from "../types";
  import type { GridSquare, Vector2 } from "../WrushleGame"

  export let grid: GridSquare[][];
  export let gridCursor: Vector2;
  export let boxes: Box[] = []
  
  export function animateRow(animation: Animation, rowNum: number = 0) {
    for (let i=rowNum*5; i<rowNum*5+5; i++) {
      boxes[i].animate(animation)
    }
  }

  export function animateAll(animation: Animation) {
    for (let box of boxes)
      box.animate(animation)
  }

  export function animation(animation: Animation, columnNum: number=0, rowNum: number = 0) {
    boxes[5*rowNum+columnNum].animate(animation)
  }

  function isSelected(x: number,y: number ): boolean {
    return gridCursor.x == x && gridCursor.y == y
  }
</script>

<div class="holder" >
  <div class="grid">
    {#each grid as row, y}
      {#each row as gridSquare, x}
        <Box selected={ gridCursor.x == x && gridCursor.y == y } letter={gridSquare.letter} animationDelay={"col"+String(x)} color={gridSquare.color} bind:this={ boxes[y*5+x] }  />
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
