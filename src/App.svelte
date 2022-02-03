<script lang="ts">
	import Header from './Header.svelte'
	import Grid from './Grid.svelte'
	import Keyboard from './Keyboard.svelte'
	import Instructions from './Instructions.svelte'
	import Results from './Results.svelte'

	class WrushleGame {
		curTimeStamp: number
		currentGrid: string[][]
		results: Results

		//gameStats
		gameEndTime: number

		constructor() {
			this.curTimeStamp = new Date().getMilliseconds()
			this.currentGrid = []
			for (let y = 0; y<6; y++) {
				let curRow: string[] = []
				for (let x = 0; x<5; x++)
					curRow.push("")
				this.currentGrid.push(curRow)
			}
			//this.results = new Results()
		}
	}

	let game = new WrushleGame()
	let browserStorage = JSON.parse( window.localStorage.getItem("game") ) as WrushleGame
	// if game already played today
	if ( browserStorage && new Date(browserStorage.curTimeStamp).toDateString() ==  new Date().toDateString() )
		// load current day
		game = browserStorage	

	console.log(game)

	function virtualKeyPressed(event) {
		console.log(event.detail.letter)
	}
</script>

<main>
	<Header/>
	<Grid grid={game.currentGrid} />
	<Keyboard on:keyPress={virtualKeyPressed} />

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
	}
</style>