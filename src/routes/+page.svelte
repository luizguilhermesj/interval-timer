
<script lang="ts">
    import { Clock, Interval, Timer } from '$lib'
    const intervals = [
        new Interval('#84aff7', 1, 10),
        new Interval('#ff5959', .5),
        new Interval('#fdd45c', .05),
        new Interval('#7bc68e', .03),
    ]

    const timer = new Timer(intervals)
    timer.start()
</script>


<div style={`--currentInterval: ${timer.currentInterval?.color}`}>
    <Clock {timer}/>
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
