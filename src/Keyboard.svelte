<script lang="ts">
import { createEventDispatcher } from "svelte";

  class Key {
    letter: string;
    functionality: boolean;
    constructor(letter: string, functionality: boolean) {
      this.letter = letter;
      this.functionality = functionality;
    }
  }

  let keyboardLetters = ["qwertyuiop", "asdfghjkl", "<zxcvbnm>"];

  let keys: Key[][] = [];

  for (const row of keyboardLetters) {
    let curRow = [];
    for (const letter of row) {
      if (letter == "<") {
        curRow.push( new Key("ENTER", true) )
      }
      else if (letter == ">") 
        curRow.push( new Key("←", true ) )
      else 
        curRow.push( new Key(letter.toUpperCase(), false) )
    }
    keys.push(curRow)
  }

  const dispatch = createEventDispatcher();
  function keyPressed(letter: string) {
    dispatch("keyPress", {letter})
  }

</script>

<div class="keyboard">
  {#each keys as row}
    <div class="keyboardRow">
      {#each row as Key}
        <button class="keyboardKey" class:wide={Key.functionality} on:click={()=>{keyPressed(Key.letter)}}>
          {Key.letter}
        </button>
      {/each}
    </div>
  {/each}
</div>

<style>

  .wide {
    flex-grow: 1;
  }
  .keyboard {
    display:flex;
    flex-direction: column;
    height: 200px;
  }

  .keyboardRow {
    flex-grow: 1;
    display: flex;
    align-items: stretch;
    justify-content:center
  }

  .keyboardKey {
    display: block;
    box-sizing: border-box;
    padding: 0;
    /* important to do math with margin here */
    margin: .2%;
    width: 9.6%;
  }
</style>
