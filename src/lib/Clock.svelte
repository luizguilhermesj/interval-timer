<script lang="ts">
  import Interval from './runes/Interval.svelte'
	import type Timer from './runes/Timer.svelte';
  // blue #84aff7
  // red #ff5959
  // yellow #fdd45c
  // green #7bc68e

  const { timer }: { timer: Timer } = $props();

  let { currentInterval } = $derived(timer)

  let totalSeconds = timer.minutes > 0 ? timer.seconds + (timer.minutes * 60) : timer.seconds

  const sum = timer.intervals.reduce((p,c) => p + c.minutes, 0)

  interface Segments {
    [key:string]: {
      color: string;
      offset: number,
      percentage: number
    }
  }

  const segments: Segments = $state({})

	$effect(() => {
    let offset = 0;
    for(let interval of timer.intervals) {
      const progress = interval.elapsedTime / (interval.minutes * 60)
      const percentage = (interval.minutes/sum * 100) * progress
      segments[interval.color] = {
        color: interval.color,
        offset,
        percentage,
      }
      offset += percentage * 360 / 100
    }
  })

</script>

{#each Object.values(segments) as segment}
  <div class="pie" style={`--percentage:${segment.percentage}%;--color:${segment.color};--offset:${segment.offset}deg`}></div>
{/each}
<span class="timer">{timer.display}</span>
<style>
.pie {
  width: 300px;
  aspect-ratio: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-grid;
  place-content: center;
  margin: 5px;
  font-size: 25px;
  font-weight: bold;
  font-family: sans-serif;
  transform: translate(-50%, -50%);
}
.pie:before {
  content: "";
  position: absolute;
  border-radius: 50%;
  inset: 0;
  background: conic-gradient(from var(--offset),var(--color) var(--percentage),#0000 0);
}
</style>