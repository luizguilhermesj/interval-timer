
<script lang="ts">
  import { Clock, Interval, Timer } from '$lib'

  let index = 0;
  const getColor = () => {
    const COLORS = [
      '#84aff7',
      '#ff5959',
      '#fdd45c',
      '#7bc68e',
    ]
    const color = COLORS[index]
    index = index == COLORS.length - 1 ? 0 : index + 1
    return color
  }

  const timer = new Timer()    
  timer.addInterval(new Interval(getColor(), 0, 1))
  timer.addInterval(new Interval(getColor(), 0, 1))

  let minutes = 0;
  let seconds = 0;

  const addInterval = () => {
    timer.addInterval(new Interval(getColor(), minutes, seconds))
  }

</script>

<div>
  <Clock {timer}/>
  <button class="play" onclick={timer.startOrPause.bind(timer)}></button>
  <button class="reset" onclick={timer.reset.bind(timer)}>reset</button>
  <div class="form">
    <input type="number" bind:value={minutes} min=0 max=60 />
    <input type="number" bind:value={seconds} min=0 max=60 />
    <button onclick={addInterval}>add</button>
  </div>
  <div class="intervals">
    {#each Object.values(timer.intervals) as interval}
      <div class="interval">
        <div style={`--currentInterval: ${interval.color}`}><span></span></div>
        <div>{interval.display}</div>
        <button class="delete" onclick={() => timer.removeInterval(interval)}>remove</button>
      </div>
    {/each}
  </div>
</div>
<style>
  * {
    font-family: Arial, Helvetica, sans-serif;
  }
  span {
      display: block;
      width: 20px;
      height: 20px;
      background-color: var(--currentInterval);
      }
  .play:before {
    padding: 10px;
    content: "\23EF";
    cursor: pointer;
  }

  .form input {
    width: 36px;
  }
  .intervals {
    width: 300px;
  }
  .interval {
    display: flex;
    border: 1px solid grey;
    margin: 10px 0;
    padding: 10px;
    border-radius: 8px;
    justify-content: space-between;
    align-items: center;
  }
</style>
