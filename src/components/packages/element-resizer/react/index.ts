import { useEffect } from 'react'
import { elementResizer, ElementResizer } from '../vanilla'

export function useElementResizer([callback, order]: Parameters<
  ElementResizer['subscribe']
>) {
  useEffect(() => {
    return elementResizer.subscribe(callback, order)
  }, [callback, order])
}
