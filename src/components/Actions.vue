<template>
  <div class="Actions">
    <button @click="start" class="Actions-button">再生</button>
    <button @click="stop" class="Actions-button">停止</button>
  </div>
</template>

<script lang="ts">
import { createComponent, PropType } from '@vue/composition-api'

export default createComponent({
  setup(props, { emit }) {
    const start = () =>
      emit('start')

    const stop = () =>
      emit('stop')

    return {
      start,
      stop,
    }
  },
})
</script>

<style>
.Actions {
  margin: 1rem 0;
  text-align: center;
}

.Actions-button {
  -webkit-appearance: none;
  appearance: none;
  padding: 0.5em 1em;
  border: 3px solid #000;
  background: #fff;
  color: #000;
}

.Actions-button:active {
  background: #000;
  color: #fff;
}
</style>