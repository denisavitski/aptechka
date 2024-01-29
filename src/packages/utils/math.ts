import { Dot2D } from './ts-shape.js'

export function lerp(a: number, b: number, c: number) {
  return (1 - c) * a + c * b
}

export function damp(a: number, b: number, c: number, dt: number) {
  return lerp(a, b, 1 - Math.exp(-c * dt))
}

export function step(edge: number, value: number, x = 0, y = 1): number {
  return value < edge ? x : y
}

export function round(number: number, precision: number = 5): number {
  return +number.toFixed(precision)
}

export function clamp(number: number, min: number = 0, max: number = 0) {
  return Math.max(min, Math.min(number, max))
}

export function mapRange(value: number, rangeA: [number, number], rangeB: [number, number]) {
  const ratio = (value - rangeA[0]) / (rangeA[1] - rangeA[0])

  const mappedValue = ratio * (rangeB[1] - rangeB[0]) + rangeB[0]

  const clampedValue = clamp(mappedValue, rangeB[0], rangeB[1])

  return clampedValue
}

// https://github.com/mrdoob/three.js/blob/dev/src/math/MathUtils.js#L84
export function smoothstep(x: number, min: number, max: number) {
  if (x <= min) return 0
  if (x >= max) return 1

  x = (x - min) / (max - min)

  return x * x * (3 - 2 * x)
}

// https://github.com/mrdoob/three.js/blob/dev/src/math/MathUtils.js#L95
export function smootherstep(x: number, min: number, max: number) {
  if (x <= min) return 0
  if (x >= max) return 1

  x = (x - min) / (max - min)

  return x * x * x * (x * (x * 6 - 15) + 10)
}

export function calculateDistance(d1: Dot2D, d2: Dot2D) {
  const xDistance = d2.x - d1.x
  const yDistance = d2.y - d1.y

  const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))

  return distance
}

export function calculateDistanceWithRadius(
  x1: number,
  y1: number,
  r1: number,
  x2: number,
  y2: number,
  r2: number,
) {
  const dx = x2 - x1
  const dy = y2 - y1
  const distance = Math.sqrt(dx * dx + dy * dy) - (r1 + r2)
  return distance
}
