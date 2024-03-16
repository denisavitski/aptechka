import { useConnect } from '@packages/jsx/hooks'
import { TickerAddOptions, TickerCallback, ticker } from '..'
import { ElementOrSelector } from '@packages/utils'

export function useAnimationFrame(
  callback: TickerCallback,
  options?: Omit<TickerAddOptions, 'culling'> & {
    culling?: ElementOrSelector | boolean
  }
) {
  useConnect((e) => {
    return ticker.subscribe(callback, {
      ...options,
      culling: options?.culling === true ? e : options?.culling,
    })
  })
}
