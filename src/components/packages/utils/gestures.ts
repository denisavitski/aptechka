import { Axes2D } from './ts-shape'

export function setupDrag(
  onMove: (moveEvent: PointerEvent) => void,
  onDrop?: (e: PointerEvent | TouchEvent) => void
) {
  const pointerMove = (moveEvent: PointerEvent) => {
    onMove?.(moveEvent)
  }

  const drop = (e: PointerEvent | TouchEvent) => {
    removeEventListener('pointermove', pointerMove)
    removeEventListener('pointerup', drop)
    removeEventListener('touchend', drop)

    onDrop?.(e)
  }

  addEventListener('pointermove', pointerMove)
  addEventListener('pointerup', drop)
  addEventListener('touchend', drop)
}
