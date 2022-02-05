<script lang="ts">
  import Key from "./Key.svelte";
  import { createEventDispatcher } from "svelte";
  
  class KeyData {
    label: string;
    key: string;
    functionality: boolean;
    clicked: boolean;
    constructor(label: string, functionality: boolean) {
      this.label = label;
      this.key = label;
      this.functionality = functionality;
    }
  }
  
  let keyboardLetters = ["qwertyuiop", "asdfghjkl", "<zxcvbnm>"];
    let keys: KeyData[][] = [];
    let keyToData: { [key: string]: KeyData } = {};
    
    for (const row of keyboardLetters) {
      let curRow = [];
      for (const letter of row) {
        let curKey: KeyData;
        if (letter == "<") curKey = new KeyData("ENTER", true);
        else if (letter == ">") curKey = new KeyData("←", true);
        else curKey = new KeyData(letter.toUpperCase(), false);
        curRow.push(curKey);
      }
      keys.push(curRow);
    }

    const dispatch = createEventDispatcher();
    function handlePress(event) {
      dispatch("keyPress", event.detail);
    }
</script>

<div class="keyboard">
  {#each keys as row}
    <div class="keyboardRow">
      {#each row as keyData}
        <Key label={keyData.label} special={keyData.functionality} key={keyData.key} on:keyPress={handlePress}/>
      {/each}
    </div>
  {/each}
</div>

<style>
  .keyboard {
    display: flex;
    flex-direction: column;
    height: 200px;
    /* background-color: var(--main-text-color); */
    padding: .1rem;
  }

  .keyboardRow {
    flex-grow: 1;
    display: flex;
    align-items: stretch;
    justify-content: center;
  }
</style>
