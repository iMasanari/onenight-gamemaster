<template>
  <div class="Card">
    <ul class="Card-nameList">
      <li v-for="card of cards" :key="card.name" class="Card-nameItem">
        <label :class="['Card-nameText', { isDisable: !card.isActive }]">
          <input
            type="checkbox"
            :checked="card.isActive"
            @change="toggleActive(card.name)"
          />
          {{ card.name }}
        </label>
      </li>
    </ul>
    <p>
      <span
        v-for="card of cards"
        :key="card.name"
        :class="['Card-effect', { isDisable: !card.isActive }]"
      >
        【{{ card.name }}】 {{ card.effect }}
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { createComponent, PropType } from '@vue/composition-api'
import { Card } from '../data/cards'

export default createComponent({
  props: {
    cards: Array as unknown as {
      type: PropType<(Card & { isActive: boolean })[]>
      required: true
    },
  },
  setup(props, { emit }) {
    const toggleActive = (name: string) => {
      emit('toggleActive', name)
    }

    return { toggleActive }
  }
})
</script>

<style>
.Card {
  margin: 1rem;
}

.Card-nameList {
  list-style: none;
  margin: 0;
  padding: 0;
}

.Card-nameItem {
  display: inline;
  font-weight: bold;
  font-size: 1.2rem;
}

.Card-nameText.isDisable {
  color: #aaa;
}

.Card-effect {
  display: block;
}

.Card-effect.isDisable {
  color: #aaa;
}
</style>