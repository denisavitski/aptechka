import { Damped, Tweened } from '@packages/animation'
import { currentComponentElement } from '../ComponentElement'

export function useDamped(...options: ConstructorParameters<typeof Damped>) {
  const store = new Damped(...options)
  currentComponentElement.stores.add(store)
  return store
}

export function useTweened(...options: ConstructorParameters<typeof Tweened>) {
  const store = new Tweened(...options)
  currentComponentElement.stores.add(store)
  return store
}
