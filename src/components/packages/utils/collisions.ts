import { Circle, Dot2D, Rect2D } from './ts-shape.js'

export function dotRectCollision(dot: Dot2D, rect: Rect2D) {
  return (
    dot.x < rect.x + rect.width &&
    dot.x > rect.x &&
    dot.y < rect.y + rect.height &&
    dot.y > rect.y
  )
}

export function dotCircleCollision(dot: Dot2D, circle: Circle) {
  const distance = Math.sqrt((dot.x - circle.x) ** 2 + (dot.y - circle.y) ** 2)
  return distance < circle.radius
}

export function dotPolygonCollision(dot: Dot2D, polygon: Array<Dot2D>) {
  let inside = false

  const { x, y } = dot

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i]!.x,
      yi = polygon[i]!.y
    const xj = polygon[j]!.x,
      yj = polygon[j]!.y

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }

  return inside
}
