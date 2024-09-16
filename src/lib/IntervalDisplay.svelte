
<script lang="ts">
  import { Timer, Button } from '$lib'
  
  const { timer }: { timer: Timer } = $props();
</script>

<div class="intervals">
    {#each Object.values(timer.intervals) as interval}
    <div class="interval">
        <div style={`--currentInterval: ${interval.color}`}><span></span></div>
        <div>{interval.display}</div>
        <Button onclick={() => timer.removeInterval(interval)}>remove</Button>
    </div>
    {/each}
</div>

<style>
  span {
    display: block;
    width: 20px;
    height: 20px;
    background-color: var(--currentInterval);
  }
  .intervals {
    width: 300px;
  }
  .interval {
    display: flex;
    margin: 10px 0;
    padding: 10px;
    border-radius: 8px;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }    
</style>