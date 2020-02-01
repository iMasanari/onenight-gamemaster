import { Card } from "../data/cards"

interface CreateTarnsOptions {
  cards: Card[]
  series: Record<string, boolean>
  grouping: Record<string, boolean>
  useCards: Record<string, boolean>
}

const createCardData = (card: Card, useCards: Record<string, boolean>) =>
  ({ ...card, isActive: useCards[card.name] })

export const createTarns = ({ cards, series, grouping, useCards }: CreateTarnsOptions) => {
  const usingCards = cards.filter(card =>
    series[card.series!]
  )

  return usingCards
    .filter((card, index) =>
      !grouping[card.group!] || usingCards.findIndex(v => v.group === card.group) === index
    )
    .map(card => {
      const list = grouping[card.group!] ?
        usingCards.filter(v => v.group === card.group) : [card]

      return list.map(card => createCardData(card, useCards))
    })
}
