
<script lang="ts">
  import { Timer, Button, Interval } from '$lib'
	import {dndzone} from 'svelte-dnd-action';
	import {flip} from 'svelte/animate';
	import ColorPicker from 'svelte-awesome-color-picker';
	import DeleteButton from './DeleteButton.svelte';
  
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
          <div class="label">
            <input onchange={(e) => interval.label = e.currentTarget.value} value={interval.label} />
          </div>
          <div class="display">{interval.display}</div>
          <DeleteButton onclick={() => timer.removeInterval(interval)} />
      </li>
  {/each}
</ul>

<style>
  .color-picker {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
  }

  .label {
    padding: 0 10px;
    outline: none;
  }

  .label input {
    background-color: transparent;
    color: inherit;
    border: none;
    padding: 0 4px;
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    width: 100%;
    height: 100%;
    outline: none;
    box-sizing: border-box;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }

  .label input:focus {
    border: 1px solid black;
  }

  .display {
    align-self: center;
    margin-right: 4px;
  }
  .intervals {
    width: 300px;
    padding: 0;
  }

  .interval {
    background-color: var(--bg-secondary);
    cursor: grab;
    display: flex;
    margin: 10px 0;
    padding: 10px;
    border-radius: 8px;
    justify-content: space-between;
    transition: background-color .3s;
    box-shadow: var(--box-shadow-1);
    align-items: stretch;
  }


  .interval.finished {
    background-color: var(--bg-success);
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
      background-color: var(--bg-secondary);
    }
    100% {
      background-color: var(--bg-terciary);
    }
  }
</style>