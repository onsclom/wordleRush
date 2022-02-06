<script lang="ts">
  import { Animation, Color } from "../types";

  export let animation: string = "";
  export let color: Color
  export let letter: string = "";
  export let animationDelay: string;;
  export let selected: boolean = false;
  // This is the best way I found to handle CSS animations in Svelte
  // Perhaps there is a better way??
  // For now I am content with this
  export function animate(animationType: Animation) {
    animation = Animation.None;
    setTimeout(() => {
      animation = animationType;
    }, 0);
  }
</script>

<div class="box {animation} {color} {animationDelay}" class:selected>
  {letter}
</div>

<style>
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    margin: 2px;
    background-color: var(--intermediate-color);
    /* box-shadow: 3px 3px 0px 0px var(--intermediate-color) */
    animation-duration: .75s;
    border: 1px solid var(--main-text-color);

    transition: background-color .5s ease;
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

  @keyframes enter {
    0% {
      transform: translate(0px,0px);
    }
   50% {
      transform: translate(0,-10px);
    }
    100% {
      transform: translate(0,0);
    }
  }
  
  .enter {
    animation-name: enter;
    animation-play-state: running;
  }
  .selected {
    border: 2px solid var(--main-text-color);
  }

  .col0 {
    animation-delay: 0s;
  }
  .col1 {
    animation-delay: .05s;
  }
  .col2 {
    animation-delay: .1s;
  }
  .col3 {
    animation-delay: .15s;
  }
  .col4 {
    animation-delay: .2s;
  }

  @keyframes textEnter {
    0% {
      transform: translate(0px,0px);
    }
   50% {
      transform: translate(0,5px);
    }
    100% {
      transform: translate(0,0);
    }
  }

  .textEnter {
    animation-name: textEnter;
    animation-duration: .2s !important;
    animation-play-state: running;
    animation-delay: 0s;
  }
</style>
