import { useCreate, useDisconnect } from '@packages/jsx/hooks'
import { ElementOrSelector } from '@packages/utils'
import { Damped, DampedOptions, Tweened, TweenedOptions } from '..'

export function useTweened(
  options?: Omit<TweenedOptions, ''> & { culling?: ElementOrSelector | boolean }
) {
  const instance = useCreate((e) => {
    return new Tweened({
      ...options,
      culling: options?.culling === true ? e : options?.culling,
    })
  })

  useDisconnect(() => {
    instance.close()
  })

  return instance
}

export function useDamped(
  options?: Omit<DampedOptions, ''> & { culling?: ElementOrSelector | boolean }
) {
  const instance = useCreate((e) => {
    return new Damped({
      ...options,
      culling: options?.culling === true ? e : options?.culling,
    })
  })

  useDisconnect(() => {
    instance.close()
  })

  return instance
}
