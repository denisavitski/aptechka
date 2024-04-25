import { Dimension2D, Dot2D, Rect2D } from './ts-shape.js'

export function screenToCartesian(
  screenCoordinate: Dot2D,
  container: Pick<Rect2D, 'width' | 'height'>,
  normalize = false
) {
  let x = screenCoordinate.x - container.width / 2
  let y = container.height / 2 - screenCoordinate.y

  if (normalize) {
    x = x / (container.width / 2)
    y = y / (container.height / 2)
  }

  return { x, y }
}

export function normalize(coordinate: Dot2D, size: Dimension2D) {
  const x = coordinate.x / size.width
  const y = coordinate.y / size.height

  return { x, y }
}

export function getPointerPosition(
  event: MouseEvent | PointerEvent | Dot2D,
  rect?: Rect2D
) {
  rect = rect
    ? rect
    : {
        x: 0,
        y: 0,
        width: document.documentElement.offsetWidth,
        height: innerHeight,
      }

  return {
    x: ((event.x - rect.x) / rect.width) * rect.width,
    y: ((event.y - rect.y) / rect.height) * rect.height,
  }
}
