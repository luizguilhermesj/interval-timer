
<script lang="ts">
  import { Timer, Button, Interval } from '$lib'
  import {flip} from 'svelte/animate';
  
  const { timer }: { timer: Timer } = $props();

  let mouseYCoordinate: number | null = $state(null); // pointer y coordinate within client
  let distanceTopGrabbedVsPointer: number | null = $state(null);

  let draggingItem: Interval | null = $state(null);
  let draggingItemId: number | null = $state(null);
  let draggingItemIndex: number | null = $state(null);

  let hoveredItemIndex: number | null = $state(null);

  $effect(() => {
      // prevents the ghost flickering at the top
      if (mouseYCoordinate == null || mouseYCoordinate == 0) {
          // showGhost = false;
      }
  })

  $effect(() => {
      if (
          draggingItemIndex != null &&
          hoveredItemIndex != null &&
          draggingItemIndex != hoveredItemIndex
      ) {
          // swap items
          [timer.intervals[draggingItemIndex], timer.intervals[hoveredItemIndex]] = [
              timer.intervals[hoveredItemIndex],
              timer.intervals[draggingItemIndex],
          ];

          // balance
          draggingItemIndex = hoveredItemIndex;
      }
  })

  
  
</script>

<ul class="intervals"

  >
  {#if mouseYCoordinate && draggingItem}
    <li class="interval ghost" style="top: {mouseYCoordinate + (distanceTopGrabbedVsPointer || 0)}px;">
      <div style={`--currentInterval: ${draggingItem.color}`}><span></span></div>
      <div>{draggingItem.display}</div>
      <Button onclick={() => draggingItem && timer.removeInterval(draggingItem)}>remove</Button>
    </li>
  {/if}
  {#each Object.values(timer.intervals) as interval, index (interval)}
      <li 
        class="interval"
        class:dragging={draggingItemId == interval.id}
        draggable={true} 
        ondragstart={(e:DragEvent) => {
            mouseYCoordinate = e.clientY;
            //console.log('dragstart', mouseYCoordinate);

            draggingItem = interval;
            draggingItemIndex = index;
            draggingItemId = interval.id;

            console.log(e.target.getBoundingClientRect().y)
            distanceTopGrabbedVsPointer = e.target && e.target.getBoundingClientRect().y - e.clientY;
        }}
        ondrag={(e) => {
            mouseYCoordinate = e.clientY;
            //console.log('drag', mouseYCoordinate);
        }}
        ondragover={(e) => {
            hoveredItemIndex = index;
        }}
        ondragend={(e) => {
            //console.log('dragend', mouseYCoordinate);
            //console.log('\n');

            // mouseYCoordinate = e.clientY;

            draggingItemId = null; // makes item visible
            hoveredItemIndex = null; // prevents instant swap
        }}
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
  .interval.dragging {
    opacity: 0;
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
  .ghost {
    width: 280px;

    margin-bottom: 10px;
    pointer-events: none;
    z-index: 99;
    position: absolute;
    top: 0;
    left: 10;
  }
</style>