<template>
  <ul>
    <li>
      <label>
        <input type="checkbox" :checked="effect" @change="updateEffect" />
        効果を読み上げる
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" :checked="sorcerer" @change="updateSorcerer" />
        同時行動【占い師、魔女っこ】
      </label>
    </li>
    <li>
      <label>
        <input
          type="checkbox"
          checked="phantomThief"
          @change="updatePhantomThief"
        />
        同時行動【怪盗、吸血鬼】
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" :checked="werewolf" @change="updateWerewolf" />
        同時行動【人狼、大狼】
      </label>
    </li>
    <li>
      <label>
        カウント
        <input
          type="number"
          :value="count"
          @change="updateCount"
          min="0"
          class="Settings-countInput"
        />
      </label>
    </li>
  </ul>
</template>

<script lang="ts">
import { createComponent, PropType } from '@vue/composition-api'

export default createComponent({
  props: {
    effect: Boolean,
    sorcerer: Boolean,
    phantomThief: Boolean,
    werewolf: Boolean,
    count: Number,
  },
  setup(props, { emit }) {
    const updateEffect = (e: Event) =>
      emit('update:effect', (e.currentTarget as HTMLInputElement).checked)

    const updateSorcerer = (e: Event) =>
      emit('update:sorcerer', (e.currentTarget as HTMLInputElement).checked)

    const updatePhantomThief = (e: Event) =>
      emit('update:phantomThief', (e.currentTarget as HTMLInputElement).checked)

    const updateWerewolf = (e: Event) =>
      emit('update:werewolf', (e.currentTarget as HTMLInputElement).checked)

    const updateCount = (e: Event) =>
      emit('update:count', +(e.currentTarget as HTMLInputElement).value || 0)

    return {
      updateEffect,
      updateSorcerer,
      updatePhantomThief,
      updateWerewolf,
      updateCount,
    }
  },
})
</script>

<style>
.Settings-countInput {
  width: 4em;
  text-align: right;
}
</style>