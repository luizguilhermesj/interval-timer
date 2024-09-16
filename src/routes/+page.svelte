
<script lang="ts">
  import { Clock, Interval, Timer, Button, IntervalDisplay } from '$lib'


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
    addInterval()
  }

</script>
<div class="main">
  <div>
    <div class="form inputs">
      <Button onclick={timer.startOrPause.bind(timer)}>start/stop</Button>
      <Button onclick={timer.reset.bind(timer)}>reset</Button>
    </div>
    <div class="form list">
      <input onkeypress={handleKeyPress} type="number" bind:value={minutes} min=0 max=60 />
      <input onkeypress={handleKeyPress} type="number" bind:value={seconds} min=0 max=60 />
      <Button style={'margin-left: 20px'} onclick={addInterval}>add</Button>
    </div>
    <IntervalDisplay {timer} />
  </div>
  <Clock {timer} />
</div>
<style>
  * {
    font-family:'Courier New', Courier, monospace;
  }

  .main {
    display: flex;
    flex-wrap: wrap-reverse;
    width: 100%;
    justify-content: space-around;
    margin-top: 60px;
  }

  .inputs {
    
  }
  
  .form {
    margin: 20px auto;
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
                
</style>
