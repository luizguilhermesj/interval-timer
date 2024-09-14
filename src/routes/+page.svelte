
<script lang="ts">
    import { Clock, Interval, Timer } from '$lib'

    const timer = new Timer()    
    timer.addInterval(new Interval('#84aff7', 0, 1))
    timer.addInterval(new Interval('#ff5959', 0, 1))
    timer.addInterval(new Interval('#fdd45c', 0, 1))
    timer.addInterval(new Interval('#7bc68e', 0, 1))

    const onclick = () => {
      // timer.addInterval(new Interval(rndmColour(), 0, 1))
      timer.startOrPause()
    }

    const reset = () => {
      timer.reset()
    }
    function rndm( max, min = 0 ){ // [ min, max ]
        return min + Math.floor( Math.random() *( max - min + 1 ));
    }
    function rndmColour() { // Hue Saturation Lightness
        return `hsl(${rndm( 360 )},${rndm( 100 )}%,${rndm( 100 )}%)`;
    }
</script>


<div style={`--currentInterval: ${timer.color}`}>
    <Clock {timer}/>
    <button class="play" {onclick}></button>
    <button class="reset" onclick={reset}>reset</button>
    <div>
        <span></span>
    </div>
</div>
<style>
    span {
        display: block;
        width: 100px;
        height: 100px;
        background-color: var(--currentInterval);
        }
    .play:before {
      padding: 10px;
      content: "\23EF";
      cursor: pointer;
    }
</style>
<!-- 
// blue #84aff7
// red #ff5959
// yellow #fdd45c
// green #7bc68e

var timer = document.querySelector(".timer");
var minutes = document.querySelector("#minutes").value;
var seconds = document.querySelector("#seconds").value;
var play = document.querySelector("#play");
var interval;

play.addEventListener('click', () => {
  minutes = document.querySelector("#minutes").value;
  seconds = document.querySelector("#seconds").value;
  timer.innerText = minutes + ":" + seconds;
  
  var totalSeconds = minutes > 0 ? seconds + (minutes * 60) : seconds
  
  var el = document.querySelector('.circle-white');
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null; 
  setTimeout(() => {
  el.style.animation = `${totalSeconds}s circle-white linear`; 
    
  }, 100)
  
  console.log(el.style.animation)
  if (interval) {
    clearCountdown(interval);
    interval = undefined;
  } else {
    countdown();
  }
})
 -->
