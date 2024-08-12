import { Ref, useEffect } from 'react'
import { ticker, TickerAddOptions, TickerCallback } from '../vanilla'

export function useTicker(
  callback: TickerCallback,
  {
    maxFPS,
    order,
    culling,
  }: Omit<TickerAddOptions, 'culling'> & {
    culling?: TickerAddOptions['culling'] | Ref<HTMLElement>
  } = {}
) {
  useEffect(() => {
    let cul: TickerAddOptions['culling']

    if (culling instanceof Element || typeof culling === 'string') {
    } else if (typeof culling === 'object') {
      cul = culling?.current
    }

    return ticker.subscribe(callback, {
      maxFPS,
      order,
      culling: cul,
    })
  }, [callback, maxFPS, order, culling])
}
