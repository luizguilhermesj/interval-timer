<script lang="ts">
  import Interval from './runes/Interval.svelte'
    // blue #84aff7
// red #ff5959
// yellow #fdd45c
// green #7bc68e
export let timer;


  let totalSeconds = timer.minutes > 0 ? timer.seconds + (timer.minutes * 60) : timer.seconds

  const sum = timer.intervals.reduce((p,c) => p + c.minutes, 0)

  const segments: {color: string; offset: number}[] = []

  let offset = 503
  for(let interval of timer.intervals) {
    offset = offset - interval.minutes/sum * 503
    segments.push({
      color: interval.color,
      offset, 
    })
  }

  segments.reverse()

</script>
{#snippet circle(style: string)}
	<circle class="circle" {style} cx="100" cy="100" r="80" />
{/snippet}
<svg width="200" height="200" style="--time: {totalSeconds}s;">
  {#each segments as segment}
    {@render circle(`stroke: ${segment.color}; stroke-dashoffset: ${Math.floor(segment.offset)}`)}
  {/each}
  <circle class="circle circle-white" cx="100" cy="100" r="80" />
</svg>
<span class="timer">{timer.display}</span>


<style>
@keyframes circle-white {
  0% {
    stroke-dashoffset: 0;
    stroke-dasharray: 503;
    transform: rotateZ(0deg);
  }
  100% {
    stroke-dashoffset: 503;
    stroke-dasharray: 503;
    transform: rotateZ(360deg);
  }
}
svg {
  border-radius: 50%;
  border: 3px solid black;
  background-color: transparent;
  position: absolute;
  background-color: transparent;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateZ(-90deg);
}
svg .circle {
  stroke-width: 160;
  fill: transparent;
  stroke-dasharray: 503;
}
svg .circle-white {
  transform-origin: 50% 50%;
  transform: rotateZ(0deg);
  stroke: rgba(255,255,255,1);
  stroke-dashoffset: 0;
  stroke-dasharray: 0;
  animation: var(--time) circle-white linear;
  animation-fill-mode: forwards;
}

.timer {
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 42px;
  font-weight: 700;
}

#inputs {
    display: flex;
    justify-content: center;
}
#minutes,
#seconds {
  width: 30px;
}

#play:before {
  padding: 10px;
  content: "\23EF";
  cursor: pointer;
}
</style>