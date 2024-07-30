import { IntersectorCallback, intersector } from '@packages/intersector'
import { ElementOrSelector } from '@packages/utils'
import { onConnect } from './basic/onConnect'

export function onIntersection(
  elementOrSelector: ElementOrSelector,
  callback: IntersectorCallback
): void
export function onIntersection(
  elementOrSelector: ElementOrSelector,
  callback: IntersectorCallback
): void
export function onIntersection(...args: any[]): void {
  onConnect((e) => {
    const element = args.length > 1 ? args[0] : e
    const callback = args.length > 1 ? args[1] : args[0]

    return intersector.subscribe(element, callback)
  })
}
