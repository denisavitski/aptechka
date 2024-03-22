import { _createStore } from '@packages/jsx/hooks'
import { ElementOrSelector } from '@packages/utils'
import { Damped, DampedOptions, Tweened, TweenedOptions } from '..'

export function createTweened(
  initialValue?: number,
  options?: Omit<TweenedOptions, ''> & { culling?: ElementOrSelector | boolean }
) {
  return _createStore(
    (e) =>
      new Tweened(initialValue, {
        ...options,
        culling: options?.culling === true ? e : options?.culling,
      })
  )
}

export function createDamped(
  initialValue?: number,
  options?: Omit<DampedOptions, ''> & { culling?: ElementOrSelector | boolean }
) {
  return _createStore((e) => {
    return new Damped(initialValue, {
      ...options,
      culling: options?.culling === true ? e : options?.culling,
    })
  })
}
