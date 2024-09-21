
<script lang="ts">
    const props = $props()
</script>

<button class="button" {...props}>{@render props.children()}</button>

<style>
.button {
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding: 8px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
  margin: 4px;
}

:global(html.dark-mode) .button {
  background-color: #36395a;
  color: #FCFCFD;
  box-shadow: rgba(174, 136, 255, 0.4) 0 2px 4px,rgba(169, 132, 250, 0.3) 0 7px 13px -3px,#4c507e 0 -3px 0 inset;
}
.button:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}
:global(html.dark-mode) .button:focus {
  box-shadow: #4c507e 0 0 0 1.5px inset, rgba(174, 136, 255, 0.4) 0 2px 4px,rgba(169, 132, 250, 0.3) 0 7px 13px -3px,#4c507e 0 -3px 0 inset;
}


.button:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}


.button:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}
:global(html.dark-mode) .button:active {
  box-shadow: #4c507e 0 0 0 1.5px inset, rgba(174, 136, 255, 0.4) 0 2px 4px,rgba(169, 132, 250, 0.3) 0 7px 13px -3px,#4c507e 0 -3px 0 inset;
}
</style>