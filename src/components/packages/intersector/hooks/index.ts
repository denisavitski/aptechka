import { onConnect } from '@packages/jsx/hooks'
import { ElementOrSelector } from '@packages/utils'
import { IntersectorCallback, intersector } from '..'

export function useIntersector(
  elementOrSelector: ElementOrSelector,
  callback: IntersectorCallback
): void
export function useIntersector(
  elementOrSelector: ElementOrSelector,
  callback: IntersectorCallback
): void
export function useIntersector(...args: any[]): void {
  onConnect((e) => {
    const element = args.length > 1 ? args[0] : e
    const callback = args.length > 1 ? args[1] : args[0]

    return intersector.subscribe(element, callback)
  })
}
