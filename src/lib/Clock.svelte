<script lang="ts">
	import type Timer from './runes/Timer.svelte';

  const { timer }: { timer: Timer } = $props();


  interface Segments {
    [key:string]: {
      color: string;
      offset: number,
      angle: number,
      speed: number,
    }
  }

  const segments: Segments = $state({})

	$effect(() => {
    const totalMinutes = timer.intervals.reduce((p,c) => p + c.minutes + c.seconds / 60, 0)
    let offset = 0;
    for(let interval of timer.intervals) {
      const progress = interval.elapsedSeconds / interval.getTotalSeconds()
      const angle = (((interval.getTotalMinutes()/totalMinutes * 100) * progress) * 360 / 100)
      const speed = interval.running ? 1 : 0


      
      segments[interval.id] = {
        color: interval.color,
        offset,
        angle,
        speed,
      }
      offset += angle 
    }
  })

</script>

{#each Object.values(segments) as segment}
  <div class="conic-effect" style={`--speed:${segment.speed}s;--angle:${segment.angle}deg;--color:${segment.color};--offset:${segment.offset}deg`}></div>
{/each}
<span class="timer">{timer.display}</span>


<style>
  /* CSS custom property */
@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

/* Conic Effect */
.conic-effect {
  height: 300px;
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  --color: hsl(31, 94%, 61%);
  background: conic-gradient(
    from var(--offset),
    var(--color) var(--angle),
    transparent calc(var(--angle))
  );
  transition: --angle var(--speed) linear;
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
</style>