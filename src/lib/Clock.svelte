<script lang="ts">
	import type Timer from './runes/Timer.svelte';

  const { timer }: { timer: Timer } = $props();
  interface Segments {
    [key:string]: {
      color: string;
      offset: number,
      angle: number,
      speed: number,
      px: number,
      py: number,
    }
  }

  let segments: Segments = $state({})

  const getPosition = (angle: number) : {x:number, y:number} => {
    let deg = (360 + 90 - angle ) % 360
    const rad = deg * (Math.PI/180)
    return {
      x: 50 + Math.cos(rad),
      y: 50 - Math.sin(rad),
    }
  }

	$effect(() => {
    let offset = 0;
    for(let interval of timer.intervals) {
      const progress = interval.elapsedSeconds / interval.getTotalSeconds()
      const angle = (((interval.getTotalSeconds() / timer.totalSeconds * 100) * progress) * 360 / 100)
      // console.log('angle', angle, interval.getTotalSeconds(), timer.totalSeconds, progress)
      const speed = interval.running ? interval.tickRate / 1000 : 0
      const angleLength = (interval.getTotalSeconds()/timer.totalSeconds * 360);
      const {x:px, y:py} = getPosition(angleLength + offset - (angleLength / 2))
      
      segments[interval.id] = {
        color: interval.color,
        offset,
        angle,
        speed,
        px,
        py,
      }
      offset += angle 
    }
  })

</script>

<div class='container'>
  {#each Object.values(segments) as segment}
    <div class="conic-effect" style={`--px:${segment.px}%;--py:${segment.py}%;--speed:${segment.speed}s;--angle:${segment.angle}deg;--color:${segment.color};--offset:${segment.offset}deg`}></div>
  {/each}
  <span class="timer">{timer.display}</span>
</div>


<style>
@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.container {
  position: relative;
  height: 300px;
  width: 300px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.conic-effect {
  height: 300px;
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  --color: hsl(31, 94%, 61%);
  background: conic-gradient(from var(--offset) at var(--px) var(--py),
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
  background-color: rgba(255,255,255,.8);
  border-radius: 15px;
  padding: 0px 8px;
  font-family: 'Courier New', Courier, monospace;
}
</style>