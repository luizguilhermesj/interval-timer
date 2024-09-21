
<script lang="ts">
  import { Clock, Interval, Timer, Button, IntervalDisplay, Analytics } from '$lib'
  import DarkModeButton from '$lib/DarkModeButton.svelte';

  let audio: HTMLAudioElement;

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

  const timer = new Timer([
    new Interval(getColor(), 0, 1),
    new Interval(getColor(), 0, 1),
  ])

  timer.intervalFinished(() => {
    if (!audio.paused) return
    audio.play()
    setTimeout(() => {
      audio.pause()
      audio.currentTime = 0
    }, 280)
  })

  let minutes = 0;
  let seconds = 0;
  const addInterval = () => {
    if (!minutes && !seconds) return
    timer.addInterval(new Interval(getColor(), minutes, seconds));
  }

  const handleKeyPress = (e:KeyboardEvent) => {
		if (e.key != 'Enter') return 
    addInterval()
  }
</script>
<head:script>
  <script async defer src="https://buttons.github.io/buttons.js"></script>
</head:script>
<header>
  <DarkModeButton />
  <a
    class="github-button"
    href="https://github.com/luizguilhermesj"
    data-color-scheme="no-preference: light; light: light; dark: dark;"
    data-size="large"
    aria-label="Follow @luizguilhermesj on GitHub">
      GitHub
  </a>
</header>
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
<audio src="https://freesound.org/data/previews/536/536420_4921277-lq.mp3" bind:this={audio}></audio>

<Analytics />
<style>
	:root {
		--bg-color: #eeeeee;
		--bg-secondary: white;
    --bg-terciary: #fffeb1;
    --bg-success: #daffd7;
		--text-color: #000000;
		--bg-shadow-1: rgba(45, 35, 66, 0.4);
	}

	:global(html.dark-mode) {
		--bg-color: #1d3040;
		--bg-secondary: #1f1934;
    --bg-terciary: #463977;
    --bg-success: #075f00;
		--text-color: #bfc2c7;
		--bg-shadow-1: rgba(45, 35, 66, 0.4);
	}
  * {
    font-family: 'Courier New', Courier, monospace;
    font-weight: 700;
    font-size: 18px;
  }

	:global(html),
  :global(html.dark-mode)  {
		background-color: var(--bg-color);
		color: var(--text-color);
	}

  header {
    display: flex;
    justify-content: space-around;
  }
  .main {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap-reverse;
    width: 100%;
    justify-content: space-around;
    margin-top: 60px;
  }
  
  .form {
    margin: 20px auto;
    display: flex;
  }

  .form input {
    width: 50px;
    text-align: center;
    border: 0;
    outline: 0;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
    border-radius: 4px;
    font-size: 18px;
    padding: 4px 8px;
  }

  .form input:focus{
    box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  }

	:global(html.dark-mode) .form input  {
		background-color: #36395a;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#4c507e 0 -3px 0 inset;
		color: #bfc2c7;
	}

	:global(html.dark-mode) .form input  {
		background-color: #36395a;
		color: #bfc2c7;
	}

  :global(html.dark-mode) .form input:focus{
    box-shadow: #4c507e 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #4c507e 0 -3px 0 inset;
  }
</style>
