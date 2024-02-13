import { TickerCallback, TickerAddOptions, ticker } from '@packages/ticker'
import { useConnect } from './basic'
import { HookElementTarget, getTargetElement } from './utils'

export function useAnimationFrame(
  callback: TickerCallback,
  options?: Omit<TickerAddOptions, 'culling'> & {
    culling?: HookElementTarget | boolean
  }
) {
  useConnect((e) => {
    return ticker.subscribe(callback, {
      ...options,
      culling:
        typeof options?.culling === 'boolean'
          ? options?.culling
            ? e
            : undefined
          : getTargetElement(undefined, options?.culling),
    })
  })
}
