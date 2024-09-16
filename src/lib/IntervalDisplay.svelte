
<script lang="ts">
  import { Timer, Button, Interval } from '$lib'
	import {dndzone} from 'svelte-dnd-action';
	import {flip} from 'svelte/animate';
  
	const flipDurationMs = 200;
  const { timer }: { timer: Timer } = $props();
  let dragDisabled = $state(false);

	function handleSort(e) {
		timer.intervals = e.detail.items;
	} 

  $effect(() => {
    dragDisabled = timer.getCurrentInterval()?.running
  })
</script>

<ul class="intervals" use:dndzone={{dropTargetStyle: {}, items: timer.intervals, flipDurationMs, dragDisabled}} onconsider={handleSort} onfinalize={handleSort}>
  {#each Object.values(timer.intervals) as interval, index (interval)}
      <li 
        class="interval"
        class:finishing-long={
          interval.running
          && interval.elapsedSeconds > interval.seconds * 0.8
          && interval.elapsedSeconds <= interval.seconds * 0.9
          && interval.seconds - interval.elapsedSeconds < 20
        }
        class:finishing={
          interval.running
          && interval.elapsedSeconds > interval.seconds * 0.9
          && interval.seconds - interval.elapsedSeconds < 5
        }
        class:finished={interval.elapsedSeconds >= interval.seconds}
        animate:flip={{duration:flipDurationMs}}
        >
          <div style={`--currentInterval: ${interval.color}`}><span></span></div>
          <div>{interval.display}</div>
          <Button onclick={() => timer.removeInterval(interval)}>remove</Button>
      </li>
  {/each}
</ul>

<style>
  li { display: block;}
  span {
    display: block;
    width: 20px;
    height: 20px;
    background-color: var(--currentInterval);
  }
  .intervals {
    width: 300px;
    padding: 0;
  }

  .interval {
    background-color: white;
    cursor: grab;
    display: flex;
    margin: 10px 0;
    padding: 10px;
    border-radius: 8px;
    justify-content: space-between;
    align-items: center;
    transition: background-color .3s;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }
  .interval.finished {
    background-color: #ffd7d7;
  }

  .interval.finishing,
  .interval.finishing-long {
    animation: finishing;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  .interval.finishing {
    animation-duration: .1s;
  }
  .interval.finishing-long {
    animation-duration: .5s;
  }

  @keyframes finishing {
    0% {
      background-color: white;
    }
    100% {
      background-color: #fffeb1;
    }
  }
</style>