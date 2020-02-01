import { Card } from '../data/cards'

type SpeachOptions = Partial<
  & Pick<SpeechSynthesisUtterance, 'lang' | 'pitch' | 'rate' | 'text' | 'voice' | 'volume'>
  & { breakTime: number }
>


const defaultSpeachOptions: SpeachOptions = {
  lang: 'ja-JP',
}

const speech = (text: string, { breakTime = 0, ...options }: SpeachOptions = {}) =>
  new Promise((resolve, reject) => {
    const synthes = new SpeechSynthesisUtterance(text)

    Object.assign(synthes, defaultSpeachOptions, options)

    synthes.addEventListener('end', () => {
      setTimeout(resolve, breakTime)
    })
    synthes.addEventListener('error', reject)

    speechSynthesis.speak(synthes)
  })

const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

const countdown = (count: number) => {
  const counts = Array.from({ length: count + 1 }, (_, i) => count - i).join('、')

  return speech(counts, { rate: 0.7, breakTime: 1000 })
}

export interface Options {
  count: number
  effect: boolean
}

export default async (tarns: Card[][], options: Options) => {
  speechSynthesis.cancel()

  await sleep(100)

  speech('夜になりました。')
  await speech('みなさん、顔を伏せて机を軽く叩いてください。', { breakTime: 1000 })

  for (const cards of tarns) {
    const names = cards.map(v => v.pronunciation || v.name).join('、')
    const effects = options.effect
      ? cards.map(v => `${v.pronunciation || v.name}は目を覚まし、${v.effectPronunciation || v.effect}`)
      : []

    speech(`${names}のターンです。`)

    for (const effect of effects) {
      speech(effect)
    }

    await countdown(options.count)
  }

  speech('夜が明けました。')
  speech('全員、目を覚ましてください。')
}
