import { Axes2D } from './ts-shape'

export function setupDrag(
  onMove: (moveEvent: PointerEvent) => void,
  onDrop?: () => void
) {
  const pointerMove = (moveEvent: PointerEvent) => {
    onMove?.(moveEvent)
  }

  const drop = () => {
    removeEventListener('pointermove', pointerMove)
    removeEventListener('pointerup', drop)
    removeEventListener('touchend', drop)

    onDrop?.()
  }

  addEventListener('pointermove', pointerMove)
  addEventListener('pointerup', drop)
  addEventListener('touchend', drop)
}
