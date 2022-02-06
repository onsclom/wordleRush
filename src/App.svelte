<script lang="ts">
	import { onMount } from "svelte";

  import WrushleGame from "./WrushleGame";
  import Header from "./Components/Header.svelte";
  import Grid from "./Components/Grid.svelte";
  import Keyboard from "./Components/Keyboard.svelte";
  import Instructions from "./Components/Instructions.svelte";
  import Results from "./Components/Results.svelte";

  let game = new WrushleGame();
  let gridComponent: Grid;
  let browserStorage = JSON.parse(
    window.localStorage.getItem("game")
  ) as WrushleGame;
  // if game already played today
  if (
    browserStorage &&
    new Date(browserStorage.timestamp).toDateString() ==
      new Date().toDateString()
  )
    // load current day
    game = browserStorage;

  console.log(game);

  function handleKeyPressed(event) {
    game.handleInput(event.detail.key);
    game = game;
  }

	// add components once done loading
	onMount( () => {
		game.gridComponent=gridComponent
	} )
</script>

<main>
  <Header />
  <Grid grid={game.grid} bind:this={gridComponent} />
  <Keyboard on:keyPress={handleKeyPressed} />

  <Instructions />
  <Results />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;
    padding: 0;
    max-width: 500px;
    margin: auto;
    justify-content: space-between;
    overflow-y: hidden;
		overflow-x: hidden;
  }
</style>
