
<script lang="ts">
  import { Clock, Interval, Timer, Button } from '$lib'

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
    if (minutes || seconds)
    timer.addInterval(new Interval(getColor(), minutes, seconds))
  }

  const handleKeyPress = (e:KeyboardEvent) => {
		 if (e.key != 'Enter') return

  }

</script>

<div class="main">
  <div>
    <div class="form">
      <Button onclick={timer.startOrPause.bind(timer)}>start/stop</Button>
      <Button onclick={timer.reset.bind(timer)}>reset</Button>
    </div>
    <div class="form">
      <input onkeypress={handleKeyPress} type="number" bind:value={minutes} min=0 max=60 />
      <input onkeypress={handleKeyPress} type="number" bind:value={seconds} min=0 max=60 />
      <Button style={'margin-left: 20px'} onclick={addInterval}>add</Button>
    </div>
    <div class="intervals">
      {#each Object.values(timer.intervals) as interval}
        <div class="interval">
          <div style={`--currentInterval: ${interval.color}`}><span></span></div>
          <div>{interval.display}</div>
          <Button onclick={() => timer.removeInterval(interval)}>remove</Button>
        </div>
      {/each}
    </div>
  </div>
  <Clock {timer}/>
</div>
<style>
  * {
    font-family:'Courier New', Courier, monospace;
  }

  .main {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 60px;
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
  
  .form {
    margin: 20px;
    display: flex;
  }

  .form input {
    width: 36px;
    border: 0;
    outline: 0;
    color: rgb(60, 66, 87);
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
    border-radius: 4px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    padding: 4px 8px;
    min-height: 28px;
    vertical-align: middle;
    transition: background-color .24s,box-shadow .24s;
    transition-property: background-color, box-shadow;
    transition-duration: 0.24s, 0.24s;
    transition-timing-function: ease, ease;
    transition-delay: 0s, 0s;
  }

  .form input:focus{
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    /* box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(58 151 212 / 36%) 0px 0px 0px 4px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px; */
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
