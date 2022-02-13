<script lang="ts">
  import { onMount } from "svelte";
  import WrushleGame from "./WrushleGame";
  import { GameState } from "./WrushleGame";
  import Header from "./Components/Header.svelte";
  import Grid from "./Components/Grid.svelte";
  import Keyboard from "./Components/Keyboard.svelte";
  import Instructions from "./Components/Instructions.svelte";
  import Results from "./Components/Results.svelte";

  let showInstructions: boolean = false;
  let eventuallyShowInstructions: boolean = false;
  let formattedTime: string;

  let game = new WrushleGame();
  let gridComponent: Grid;
  let browserStorage = JSON.parse(
    window.localStorage.getItem("game")
  ) as WrushleGame;
  if (browserStorage == null) eventuallyShowInstructions = true;
  // if game already played today
  if (
    browserStorage &&
    browserStorage.gameData.dateString == new Date().toDateString()
  )
    // load current day
    game.gameData = browserStorage.gameData;

  console.log(game);

  function handleKeyPressed(event) {
    game.handleInput(event.detail.key);
    game = game;
  }

  // add components once done loading
  onMount(() => {
    console.log("loaded gridcomp");
    game.gameData.gridComponent = gridComponent;
    showInstructions = eventuallyShowInstructions;
  });

  function updateTimeString() {
    if (game.gameData.gameState == GameState.Done)
      return

    let endTime = game.gameData.gameStart + 5 * 60 * 1000;
    let remainingMs = endTime - new Date().getTime();

    if (game.gameData.gameState == GameState.Playing && remainingMs <= 0) {
      //lose
      game.gameData.gameState = GameState.Done;
      game.gameData.stats.lossReason = "You ran out of time!"
      return;
    }

    if (game.gameData.gameState == GameState.Playing) {
      let remainingMin = Math.floor(remainingMs / (60 * 1000));
      let remainingSec = Math.floor((remainingMs % (60 * 1000)) / 1000);
      let remainingSecStr =
        String(remainingSec).length == 1
          ? "0" + String(remainingSec)
          : String(remainingSec);
      formattedTime = `${remainingMin}:${remainingSecStr}`;
    }

    setTimeout(updateTimeString, 1000);
  }
  updateTimeString();
</script>

<main>
  {#if showInstructions}
    <Instructions
      on:exit={() => {
        showInstructions = false;
      }}
    />
  {/if}

  <Header
    {formattedTime}
    playing={game.gameData.gameState == GameState.Playing}
    score={game.gameData.stats.score}
    on:showInstructions={() => {
      showInstructions = true;
    }}
  />
  <Grid
    gridCursor={game.gameData.gridCursor}
    grid={game.gameData.grid}
    bind:this={gridComponent}
  />
  <Keyboard
    keyColors={game.gameData.keyColors}
    on:keyPress={handleKeyPressed}
  />

  {#if game.gameData.gameState == GameState.Done}
    <Results stats={game.gameData.stats}  />
  {/if}
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
