
<script lang="ts">
  import { Timer, Button, Interval } from '$lib'
	import {dndzone} from 'svelte-dnd-action';
	import {flip} from 'svelte/animate';
  
	const flipDurationMs = 200;
  const { timer }: { timer: Timer } = $props();

	function handleSort(e) {
		timer.intervals = e.detail.items;
	} 
</script>

<ul class="intervals" use:dndzone={{dropTargetStyle: {}, items: timer.intervals, flipDurationMs}} onconsider={handleSort} onfinalize={handleSort}>
  {#each Object.values(timer.intervals) as interval, index (interval)}
      <li 
        class="interval"
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
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }
</style>