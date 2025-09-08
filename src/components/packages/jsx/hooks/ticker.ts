import { ticker } from '@packages/ticker'
import { useConnect } from './component/lifecycle'

export function useTicker(...parameters: Parameters<typeof ticker.subscribe>) {
  useConnect(() => {
    return ticker.subscribe(...parameters)
  })
}
