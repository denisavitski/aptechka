import { onConnect } from '@packages/jsx/hooks'
import { TickerAddOptions, TickerCallback, ticker } from '..'
import { ElementOrSelector } from '@packages/utils'

export function onAnimationFrame(
  callback: TickerCallback,
  options?: Omit<TickerAddOptions, 'culling'> & {
    culling?: ElementOrSelector | boolean
  }
) {
  onConnect((e) => {
    return ticker.subscribe(callback, {
      ...options,
      culling: options?.culling === true ? e : options?.culling,
    })
  })
}
