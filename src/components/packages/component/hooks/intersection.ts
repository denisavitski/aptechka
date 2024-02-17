import { IntersectorCallback, intersector } from '@packages/intersector'
import { ElementOrSelector } from '@packages/utils'
import { onConnect } from '../Component'
import { ElementConstructorRef } from '@packages/element-constructor'

export function onIntersection(
  callback: IntersectorCallback,
  element?: ElementOrSelector | ElementConstructorRef
) {
  onConnect((e) => {
    const target = element ? element : e instanceof Element ? e : undefined

    if (typeof target === 'string' || target instanceof Element) {
      return intersector.subscribe(target, callback)
    } else if (target?.current) {
      return intersector.subscribe(target.current, callback)
    }
  })
}
