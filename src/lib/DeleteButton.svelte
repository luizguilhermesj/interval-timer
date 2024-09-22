<script lang="ts">
    export let onclick;
</script>
<button class="container" {onclick} >
    <div class="remove icon"></div>
</button>
<style>
    * {
  outline: none;
}

.container {
    cursor: pointer;
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
    background: none;
    height: 15px;
    width: 15px;
    padding: 15px;
    transition: all .2s
}

.container:hover {
    transform: scale(1.3);
}

.container:hover .remove.icon:before,
.container:hover .remove.icon:after {
  background-color: red;
}
.remove.icon {
    position: relative;
    left: -9px;
    top: -1px;
}

.remove.icon:before {
  content: '';
  position: absolute;
  width: 20px;
  height: 3px;
  background-color: var(--text-color);
  border-radius: 4px;
    transition: all .2s;
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
}

.remove.icon:after {
  content: '';
  position: absolute;
  width: 20px;
  height: 3px;
  background-color: var(--text-color);
  border-radius: 4px;
  transition: all .2s;
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
}
</style>