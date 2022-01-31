<script lang="ts">
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
      curRow.push( new Key(letter.toUpperCase(), false) )
    }
    keys.push(curRow)
  }

</script>

<div class="keyboard">
  {#each keys as row}
    <div class="keyboardRow">
      {#each row as Key}
        <button class="keyboardKey">
          {Key.letter}
        </button>
      {/each}
    </div>
  {/each}
</div>

<style>
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
