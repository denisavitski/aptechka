import { Damped } from '@packages/animation'
import { _createStore } from '../basic/_createStore'

export function createDamped(
  ...parameters: ConstructorParameters<typeof Damped>
) {
  return _createStore(new Damped(...parameters))
}
