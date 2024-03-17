import { _createStore } from '@packages/jsx/hooks'
import { ElementOrSelector } from '@packages/utils'
import { Damped, DampedOptions, Tweened, TweenedOptions } from '..'

export function createTweened(
  options?: Omit<TweenedOptions, ''> & { culling?: ElementOrSelector | boolean }
) {
  return _createStore(
    (e) =>
      new Tweened({
        ...options,
        culling: options?.culling === true ? e : options?.culling,
      })
  )
}

export function createDamped(
  options?: Omit<DampedOptions, ''> & { culling?: ElementOrSelector | boolean }
) {
  return _createStore((e) => {
    return new Damped({
      ...options,
      culling: options?.culling === true ? e : options?.culling,
    })
  })
}
