export type Group = '占い師' | '人狼' | '怪盗'
export type Series = 'default' | 'monster'

export interface Card {
  name: string
  pronunciation?: string
  group: Group | null
  effect: string
  effectPronunciation?: string
  series: Series | null
}

const tarns: Card[] = [{
  name: 'GJハンター',
  pronunciation: 'グットジョブハンター',
  group: null,
  effect: 'ハントしてください。',
  series: 'monster',
}, {
  name: '占い師',
  group: '占い師',
  effect: '誰かを選び、占ってください。',
  series: 'default',
}, {
  name: '魔女っこ',
  group: '占い師',
  effect: '誰か一人を占ってください。',
  series: 'monster',
}, {
  name: '人狼',
  pronunciation: 'じんろう',
  group: '人狼',
  effect: '人狼同士 目配せしてください。',
  effectPronunciation: 'じんろう同士 目配せしてください。',
  series: 'default',
}, {
  name: '大狼',
  pronunciation: 'おおおおかみ',
  group: '人狼',
  effect: '仲間を見つけ、記憶をたどってください。',
  series: 'monster',
}, {
  name: 'ゾンビ',
  group: null,
  effect: '墓地からもらう体を選んでください。',
  series: 'monster',
}, {
  name: '怪盗',
  group: '怪盗',
  effect: '誰かの心を盗んでください。',
  series: 'default',
}, {
  name: '吸血鬼',
  group: '怪盗',
  effect: '吸血してください。',
  series: 'monster',
}]

export default tarns
