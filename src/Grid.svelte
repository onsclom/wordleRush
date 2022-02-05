<script lang="ts">
  import type { Color, Animation, GridSquare } from './WrushleGame'

  export let grid: GridSquare[][];

  //really this should just get grid data..
  
</script>

<div class="holder">
  <div class="grid">
    {#each grid as row}
      {#each row as gridSquare}
        <div class="box" >
          {gridSquare.letter}
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
    animation-duration: 1s;
  }

  @keyframes wiggle {
		0% {
			transform: rotate(0deg);
		}
		20% {
			transform: rotate(-15deg);
		}
		40% {
			transform: rotate(15deg);
		}
		60% {
			transform: rotate(-7deg);
		}
		80% {
			transform: rotate(7deg);
		}
		90% {
			transform: rotate(-3deg);
		}
		95% {
			transform: rotate(2deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}

  .wiggle {
		animation-name: wiggle;
		animation-play-state: running;
	}
</style>
