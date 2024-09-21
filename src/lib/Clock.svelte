<script lang="ts">
  import type Interval from './runes/Interval.svelte';
  import type Timer from './runes/Timer.svelte';
  import ReverseButton from '$lib/ReverseButton.svelte';

  const { timer }: { timer: Timer } = $props();
  let reverse = $state(true);
  
  interface Segment {
    color: string;
    offset: number,
    angle: number,
    angleLength: number,
    speed: number,
    px: number,
    py: number,
  }

  let segments: Map<number, Segment> = $state(new Map<number, Segment>())
  let segmentsToDisplay: Segment[] = $state([])

  const getPosition = (angle: number) : {x:number, y:number} => {
    let deg = (360 + 90 - angle ) % 360
    const rad = deg * (Math.PI/180)
    return {
      x: 50 + Math.cos(rad),
      y: 50 - Math.sin(rad),
    }
  }

  const getSegmentDetails = (interval: Interval, offset: number) => {
      const progress = interval.elapsedSeconds / interval.totalSeconds
      const angle = (((interval.totalSeconds / timer.totalSeconds * 100) * progress) * 360 / 100)
      // console.log('angle', angle, interval.totalSeconds, timer.totalSeconds, progress)
      const speed = interval.running ? interval.tickRate / 1000 : 0
      const angleLength = (interval.totalSeconds/timer.totalSeconds * 360);
      const {x, y} = getPosition(angleLength + offset - (angleLength / 2));

      return {
        progress,
        angleLength,
        angle,
        speed,
        px: x,
        py: y,
      }
  }



	$effect(() => {
    if (segments.size > timer.intervals.length) {
      segments.clear()
    }

    let offset = 0;
    for(let interval of timer.intervals) {
      const { angle, angleLength, speed, px, py } = getSegmentDetails(interval, offset)

      segments.set(interval.id, {
        color: interval.color,
        angle,
        angleLength,
        speed,
        px,
        py,
        offset,
      })
      offset += angleLength
    }

    segmentsToDisplay = [...segments.entries()].reduce<Segment[]>((p, [k, s]) => {
      p.push(s)
      return p
    }, [])
  })

  const onReverse = () => {
    reverse = !reverse
  }
</script>

<div class="main">
  <div class='container'>
    {#each segmentsToDisplay as segment}
      <div class="conic-effect" class:reverse={reverse} style={`--px:${segment.px}%;--py:${segment.py}%;--speed:${segment.speed}s;--angle:${segment.angle}deg;--angleLength:${segment.angleLength}deg;--color:${segment.color};--offset:${segment.offset}deg`}></div>
    {/each}
    <div class="timer">
      <div class="top">{timer.display || "00:00"}</div>
      <span class="sub">.{Math.round(timer.elapsedSeconds % 1 * 1000).toString().padStart(3, "0")}</span>
    </div>
  </div>
  <div class="reverse">
    <span>Reverse?</span>
    <ReverseButton ontoggle={onReverse} />
  </div>
</div>


<style>
@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reverse {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container {
  position: relative;
  margin-bottom: 20px;
  height: 300px;
  width: 300px;
  min-width: 300px;
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
  background: conic-gradient(from var(--offset) at var(--px) var(--py),
    var(--color) var(--angle),
    transparent calc(var(--angle))
  );
  transition: --angle var(--speed) linear;
}

.conic-effect.reverse {
  background: conic-gradient(from 0 at var(--px) var(--py),
    transparent calc(var(--angle) + var(--offset)),
    var(--color) calc(var(--angle) + var(--offset)),
    var(--color) calc(var(--angleLength) + var(--offset)),
    transparent var(--angleLength)
  );
}

.timer {
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  background-color: rgba(255,255,255,.8);
  border-radius: 15px;
  padding: 0px 8px;
  padding-bottom: 4px;
  font-family: 'Courier New', Courier, monospace;
}
.timer .top {
  font-size: 42px;
  font-weight: 700;
}

.timer .sub {
  position: absolute;
  bottom: 4px;
  right: 10px;
  font-size: 10px;
  padding: 0;
}
</style>