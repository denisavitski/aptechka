import { ticker, TickerAddOptions, TickerCallback } from '@packages/ticker'
import { activeComponent } from '../ComponentElement'
import { useConnect } from './component/lifecycle'

export interface UseTickerOptions extends TickerAddOptions {
  componentCulling?: boolean
}

export function useTicker(
  callback: TickerCallback,
  options?: UseTickerOptions,
) {
  if (activeComponent.current) {
    useConnect(() => {
      return ticker.subscribe(callback, {
        ...options,
        culling: options?.componentCulling
          ? activeComponent.current
          : options?.culling,
      })
    })
  } else {
    return ticker.subscribe(callback, options)
  }
}
