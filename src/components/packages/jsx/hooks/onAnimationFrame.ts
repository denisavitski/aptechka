import { TickerAddOptions, TickerCallback, ticker } from '@packages/ticker'
import { ElementOrSelector } from '@packages/utils'
import { onConnect } from './basic/onConnect'

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
