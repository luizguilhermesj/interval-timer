<script lang="ts">
	import { browser } from '$app/environment';
    let { reverse = $bindable(true) } : { reverse: boolean } = $props()

  if (browser) {
    reverse = localStorage.getItem('reverse') == 'true'
  }

  const onchange = () => {
    reverse = !reverse

    localStorage.setItem('reverse', reverse.toString())
  }

</script>

<!-- <div class="container">
  <input type="checkbox" name="checkbox" id="checkbox" onchange={() => ontoggle()}/>
  <label for="checkbox" class="label"> </label>
</div> -->
<div class="toggle-button-cover">
  <div id="button-3" class="button r">
    <input class="checkbox" type="checkbox" checked={!reverse} {onchange}>
    <div class="knobs"></div>
    <div class="layer"></div>
  </div>
</div>

<style>
.toggle-button-cover {
  display: inline-block;
}

.knobs,
.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--bg-secondary);
}

.button {
  position: relative;
  top: 50%;
  width: 74px;
  height: 36px;
  overflow: hidden;
  box-shadow: var(--box-shadow-2);
}

.checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.knobs {
  z-index: 2;
}

.layer {
  width: 100%;
  transition: 0.3s ease all;
  z-index: 1;
}

.button.r,
.button.r .layer {
  border-radius: 100px;
}

#button-3 .knobs:before {
  content: "YES";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 20px;
  height: 10px;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  padding: 9px 4px;
  background-color: #03a9f4;
  border-radius: 50%;
  transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
}

#button-3 .checkbox:active + .knobs:before {
  width: 46px;
  border-radius: 100px;
}

#button-3 .checkbox:checked:active + .knobs:before {
  margin-left: -26px;
}

#button-3 .checkbox:checked + .knobs:before {
  content: "NO";
  left: 42px;
  background-color: #f44336;
}

#button-3 .checkbox:checked ~ .layer {
  background-color: #fcebeb;
}

</style>