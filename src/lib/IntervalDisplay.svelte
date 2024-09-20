
<script lang="ts">
  import { Timer, Button, Interval } from '$lib'
	import {dndzone} from 'svelte-dnd-action';
	import {flip} from 'svelte/animate';
	import ColorPicker from 'svelte-awesome-color-picker';
  
	const flipDurationMs = 200;
  const { timer }: { timer: Timer } = $props();
  let dragDisabled = $state(true);
  let isOpen: {[key:number]:boolean} = $state({});

	function handleSort(e: {detail: { items: Interval[] }}) {
		timer.intervals = e.detail.items;
	} 

  $effect(() => {
    dragDisabled = timer.getCurrentInterval()?.running || Object.values(isOpen).some(el => el)
  })
</script>

<ul class="intervals" use:dndzone={{dropTargetStyle: {}, items: timer.intervals, flipDurationMs, dragDisabled}} onconsider={handleSort} onfinalize={handleSort}>
  {#each Object.values(timer.intervals) as interval (interval.id)}
      <li 
        class="interval"
        class:finishing-long={
          interval.running
          && interval.elapsedSeconds > interval.totalSeconds * 0.8
          && interval.elapsedSeconds <= interval.totalSeconds * 0.9
          && interval.totalSeconds - interval.elapsedSeconds < 20
        }
        class:finishing={
          interval.running
          && interval.elapsedSeconds > interval.totalSeconds * 0.9
          && interval.totalSeconds - interval.elapsedSeconds < 5
        }
        class:finished={interval.elapsedSeconds >= interval.totalSeconds}
        animate:flip={{duration:flipDurationMs}}
        >
          <button class="color-picker" onclick={() => {
              isOpen[interval.id] = true
            }}>
            <ColorPicker
              label=''
              bind:isOpen={isOpen[interval.id]}
              hex={interval.color}
              on:input={(e) => {
                e.preventDefault()
                e.stopPropagation()
                e.stopImmediatePropagation()
                interval.color = e.detail.hex || interval.color;
              }}
            />
          </button>
          <div>{interval.display}</div>
          <Button onclick={() => timer.removeInterval(interval)}>remove</Button>
      </li>
  {/each}
</ul>

<style>
  li { display: block;}
  .color-picker {
    border: none;
    background: none;
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
    background-color: #daffd7;
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