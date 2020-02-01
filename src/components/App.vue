<template>
  <div>
    <header class="App-header">
      <h1 class="App-title">ワンナイト初日犠牲者くん</h1>
      <p class="App-discription">
        ワンナイト人狼 ゲームマスター音声読み上げツール
      </p>
    </header>
    <section class="App-section">
      <h2>設定</h2>
      <Settings
        :effect.sync="options.effect"
        :sorcerer.sync="grouping['占い師']"
        :phantomThief.sync="grouping['怪盗']"
        :werewolf.sync="grouping['人狼']"
        :count.sync="options.count"
      />
    </section>
    <section class="App-section">
      <h2>カード</h2>
      <div>
        <label>
          <input type="checkbox" v-model="series.default" />
          通常 ver.
        </label>
        <label>
          <input type="checkbox" v-model="series.monster" />
          モンスター ver.
        </label>
      </div>
      <ul v-if="tarns.length" class="App-tarnList">
        <li v-for="cards of tarns" :key="cards[0].name" class="App-tarnItem">
          <Tarns :cards="cards" @toggleActive="toggleActive" />
        </li>
      </ul>
      <p v-else>セットが選択されていません</p>
    </section>
    <Actions @start="start" @stop="stop"></Actions>
    <section class="App-section">
      <h2>注意</h2>
      <p>
        スマートフォンの場合、画面ロックに注意してください。
        また、マナーモードの場合、音が出ないことがありますので解除して使用してください。
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive, computed } from '@vue/composition-api'
import speech from '../utils/speech'
import cards, { Card } from '../data/cards'
import { createTarns } from '../logics/tarns'
import Actions from './Actions.vue'
import Settings from './Settings.vue'
import Tarns from './Tarns.vue'

export default createComponent({
  setup() {
    const options = reactive({
      effect: true,
      count: 10,
    })

    const grouping = reactive({
      '占い師': true,
      '人狼': true,
      '怪盗': true,
    })

    const series = reactive({
      default: true,
      monster: false,
    })

    const useCards: Record<string, boolean> = reactive({
      'GJハンター': true,
      '占い師': true,
      '魔女っこ': true,
      '人狼': true,
      '大狼': true,
      'ゾンビ': true,
      '怪盗': true,
      '吸血鬼': true,
    })

    const tarns = computed(() =>
      createTarns({ cards, series, grouping, useCards })
    )

    const toggleActive = (name: string) => {
      useCards[name] = !useCards[name]
    }

    const start = () => {
      const activeTarns = tarns.value
        .map((cards) => cards.filter(card => card.isActive))
        .filter(v => v.length)

      return speech(activeTarns, {
        effect: options.effect,
        count: options.count,
      })
    }

    const stop = () => {
      speechSynthesis.cancel()
    }

    return {
      options,
      series,
      grouping,
      tarns,
      start,
      stop,
      toggleActive,
    }
  },
  components: {
    Actions,
    Settings,
    Tarns,
  }
})
</script>

<style>
@font-face {
  font-family: 美咲ゴシック;
  src: url("https://cdn.leafscape.be/misaki/misaki_gothic_web.woff2")
    format("woff2");
}

body,
input,
select,
button {
  font-family: 美咲ゴシック, sans-serif;
  font-size: 1rem;
}

body {
  margin: 0;
}

.App-header {
  padding: 1rem 0.5rem;
  background-color: #000;
  color: #fff;
}

.App-title {
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
}

.App-discription {
  padding: 0.5rem 0 0;
  margin: 0;
  font-size: 0.75rem;
}

.App-section {
  margin: 0.5rem;
}

.App-tarnList {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
}

.App-tarnItem {
  border-top: 3px solid #000;
}

.App-tarnItem:last-child {
  border-bottom: 3px solid #000;
}
</style>