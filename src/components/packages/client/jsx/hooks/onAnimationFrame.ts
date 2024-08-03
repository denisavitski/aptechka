import {
  TickerAddOptions,
  TickerCallback,
  ticker,
} from '@packages/client/ticker'
import { ElementOrSelector } from '@packages/client/utils'
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
