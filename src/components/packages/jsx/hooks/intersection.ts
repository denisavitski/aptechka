import { IntersectorCallback, intersector } from '@packages/intersector'
import { useConnect } from './basic'
import { HookElementTarget, getTargetElement } from './utils'

export function useIntersection(
  callback: IntersectorCallback,
  element?: HookElementTarget
) {
  useConnect((e) => {
    return intersector.subscribe(getTargetElement(e, element), callback)
  })
}
