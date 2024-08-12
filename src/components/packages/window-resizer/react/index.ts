'use client'

import { useEffect } from 'react'
import { windowResizer, WindowResizer } from '../vanilla'

export function useWindowResizer([callback, order]: Parameters<
  WindowResizer['subscribe']
>) {
  useEffect(() => {
    return windowResizer.subscribe(callback, order)
  }, [callback, order])
}
