import { createDerivedArray } from '@packages/store/hooks'
import { getCombatContext } from './Combat'
import { Card } from './Card'

export const Hand: JSX.Component = () => {
  const combat = getCombatContext()!

  const slots = createDerivedArray(combat.cards, (card) => {
    return <Card {...card}></Card>
  })

  return slots
}
