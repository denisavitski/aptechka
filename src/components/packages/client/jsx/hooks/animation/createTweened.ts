import { Tweened } from '@packages/client/animation'
import { _createStore } from '../basic/_createStore'

export function createTweened(
  ...parameters: ConstructorParameters<typeof Tweened>
) {
  return _createStore(new Tweened(...parameters))
}
