<script lang="ts">
	import WrushleGame from './WrushleGame'
	import Header from './Header.svelte'
	import Grid from './Grid.svelte'
	import Keyboard from './Keyboard.svelte'
	import Instructions from './Instructions.svelte'
	import Results from './Results.svelte'

	let game = new WrushleGame()
	let browserStorage = JSON.parse( window.localStorage.getItem("game") ) as WrushleGame
	// if game already played today
	if ( browserStorage && new Date(browserStorage.timestamp).toDateString() ==  new Date().toDateString() )
		// load current day
		game = browserStorage	

	console.log(game)

	function handleKeyPressed(event) {
		game.handleInput(event.detail.key)
		game=game
	}
</script>

<main>
	<Header/>
	<Grid grid={game.grid}/>
	<Keyboard on:keyPress={handleKeyPressed} />

	<Instructions/>
	<Results/>
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
		overflow: hidden;
	}
</style>