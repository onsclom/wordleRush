<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';


  const dispatch = createEventDispatcher();

  function exit() {
    dispatch('exit', {});
  }
</script>

<div class="instructionHolder" transition:fly="{{ y: 200, duration: 250 }}">
  <div class="header">
    <h1>INFO</h1>
    <button on:click={exit}>
      X
    </button>
  </div>

  <div class="content">
    <p>Wrushle is a high-score, time based variant of <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>. If you have not played <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> yet, you should play that first.</p>
    <p>All the rules of Wordle carry over, but with some additions:</p>
    <ul>
      <li>The goal is to get a high score.</li>
      <li>After completing one word successfully, a new word is given.</li>
      <li>There is a 5 minute time limit.</li>
      <li>+1 point is awarded for every correct letter guessed.</li>
      <li>The game ends upon failing a word or time running out, whichever comes first.</li>
    </ul>
    <hr>
    <p>
      Wrushle is an open source project built with Svelte and TypeScript. Check out the source code <a href="https://github.com/onsclom/wordleRush">here</a>. 
    </p>
  </div>
  <p>
  </p>
</div>

<style>
  .instructionHolder {
    position: absolute;
    max-width: 500px;
    width: 100%;
    height: 100%;
    background-color: var(--main-bg-color);
    background-color: #ffffff88;
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
    padding: 0rem 1rem;
    border: 0;
    border-left: 1px solid var(--main-text-color);
  }
  hr {
    border: 0;
    border-bottom: 1px solid var(--main-text-color)
  }
</style>