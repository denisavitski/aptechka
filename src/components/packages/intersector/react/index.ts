import { Ref, useEffect } from 'react'
import { intersector, IntersectorCallback } from '../vanilla'
import { ElementOrSelector } from '@packages/utils'

export function useIntersection(
  element: Ref<HTMLElement> | ElementOrSelector,
  callback: IntersectorCallback
) {
  useEffect(() => {
    let el: ElementOrSelector | undefined | null

    if (element instanceof Element || typeof element === 'string') {
    } else if (typeof element === 'object') {
      el = element?.current
    }

    if (el) {
      return intersector.subscribe(el, callback)
    }
  }, [element, callback])
}
