<script lang="ts">
    import { fly } from 'svelte/transition';
    import type { GameStats } from '../WrushleGame';
    import { Color } from '../types';
    export let stats: GameStats;

    let timeUntil: string = "00:00:00"

    let colorDict = {}
    colorDict[Color.Green]="🟩"
    colorDict[Color.Black]="🔲"
    colorDict[Color.Yellow]="🟨"

    function copyForDiscord() {
      let results: string = `Wrushle: ${new Date().toDateString()}\n${stats.score} point${stats.score!=1?"s":""}\n\n`

      for (let word of stats.guessHistory) {
        for (let guess of word) {
          if ( guess[0].letter) {
            results += guess.map( (gridSquare) => colorDict[gridSquare.color] ).join("")
            results += `||${guess.map( (gridSquare) => gridSquare.letter ).join("")}||`
            results += "\n"
          }
        }
        results += "\n"
      }

      navigator.clipboard.writeText(results)
    }

    function setTime() {
      let now = new Date();
      let midnight = new Date();
      midnight.setHours(24);
      midnight.setMinutes(0);
      midnight.setSeconds(0);
      midnight.setMilliseconds(0);

      let hours = Math.floor((midnight.getTime() - now.getTime()) / 1000 / 60 / 60);
      let mins = Math.floor((midnight.getTime() - now.getTime()) / 1000 / 60) % 60;
      let minsText = mins.toString();
      if (minsText.length == 1) minsText = "0" + minsText;
      let secs = Math.floor((midnight.getTime() - now.getTime()) / 1000) % 60;
      let secsText = secs.toString();
      if (secsText.length == 1) secsText = "0" + secsText;

      timeUntil = `${hours}:${minsText}:${secsText}`

      setTimeout(setTime, 1000)
    }
    setTime()
</script>

<div class="resultHolder" transition:fly="{{ y: 200, duration: 250 }}">
  <div class="header">
    <h1>RESULTS</h1>
  </div>

  <div class="content" >
    <p>{stats.lossReason}</p>
    <p><b>
      {stats.score} point{stats.score!=1?"s":""}
    </b></p>
    
    <button on:click={copyForDiscord}>
      copy spoiler free for discord
    </button>


    <p>
      {timeUntil} until next Wrushle.
    </p>

    <hr>
    <p>
      Wrushle is an open source project built with Svelte and TypeScript. Check out the source code <a href="https://github.com/onsclom/wordleRush">here</a>. 
    </p>
  </div>
</div>

<style>
  .resultHolder {
    z-index: 1;
    position: absolute;
    max-width: 500px;
    width: 100%;
    height: 100%;
    background-color: var(--main-bg-color);
    background-color: #ffffffcc;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
  .header {
    display: flex;
    justify-content:space-between;
    width: 100%;
    border-bottom: 1px solid var(--main-text-color);
  }
  .content {
    padding: 1rem;
  }
  button {
    background-color: var(--main-bg-color);
    margin: 1rem;
  }
  hr {
    border: 0;
    border-bottom: 1px solid var(--main-text-color)
  }
</style>