<script lang="ts">
  import { Animation, Color } from "../WrushleGame";

  export let animation: string = "";
  export let color: Color
  export let letter: string = "";
  export let animationDelay: number = 0;

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

<div class="box {animation} {color}" style="animation-delay: {animationDelay}s">
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

  .blank {
  }
  
  .green {
    background-color: #8f8;
  }
  
  .yellow {
    background-color: #ff4;
  }
  
  .black {
    background-color: #bbb;
  }
</style>
