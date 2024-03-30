import { createStore } from '@packages/store/hooks'
import { CardParameters } from './Card'
import { createContext, getContext } from '@packages/jsx/hooks'
import { Store } from '@packages/store'
import { Hand } from './Hand'

export interface CombatContext {
  cards: Store<Array<CardParameters>>
}

export function getCombatContext() {
  return getContext<CombatContext>('combat')
}

export const Combat: JSX.Component = () => {
  let tmpCardId = 0

  const cards = createStore<Array<CardParameters>>([])

  const context: CombatContext = {
    cards,
  }

  createContext('combat', context)

  addEventListener('keydown', (e) => {
    if (e.key === '1') {
      cards.current = [...cards.current, { id: tmpCardId++ }]
    } else if (e.key === '2') {
      cards.current = cards.current.slice(1)
    }
  })

  return (
    <>
      <Hand></Hand>
    </>
  )
}
