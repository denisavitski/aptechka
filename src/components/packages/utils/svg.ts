import { Dot2D } from './ts-shape'
import '@packages/libs/path-data-polyfill'

export interface GenerateSVGPathDataOptions {
  normalize?: boolean
  pathSelector?: string
}

export type BezierPoint = {
  type: string
  values: Array<number>
}

export function getPathData(
  svgRaw: string,
  { normalize = true, pathSelector = 'path' }: GenerateSVGPathDataOptions = {}
): Array<BezierPoint> {
  const el = document.createElement(null!) as HTMLElement
  el.innerHTML = svgRaw

  const svg = el.firstElementChild as SVGElement
  const path = svg.querySelector(pathSelector) as SVGPathElement

  const pathData = (path as any).getPathData() as Array<BezierPoint>

  if (normalize) {
    const viewBox = svg
      .getAttribute('viewBox')!
      .split(' ')
      .map((v) => parseFloat(v))

    const minSize = Math.min(viewBox[2], viewBox[3])

    pathData.forEach((command) => {
      command.values = command.values.map((v) => {
        return v / minSize
      })
    })
  }

  return pathData
}

function bezierCurve(
  start: Dot2D,
  control1: Dot2D,
  control2: Dot2D,
  end: Dot2D,
  segments: number
): Dot2D[] {
  const points: Dot2D[] = []

  for (let t = 0; t <= 1; t += 1 / segments) {
    const x =
      Math.pow(1 - t, 3) * start.x +
      3 * Math.pow(1 - t, 2) * t * control1.x +
      3 * (1 - t) * Math.pow(t, 2) * control2.x +
      Math.pow(t, 3) * end.x

    const y =
      Math.pow(1 - t, 3) * start.y +
      3 * Math.pow(1 - t, 2) * t * control1.y +
      3 * (1 - t) * Math.pow(t, 2) * control2.y +
      Math.pow(t, 3) * end.y

    points.push({ x, y })
  }

  return points
}

export interface GeneratePointsOptions extends GenerateSVGPathDataOptions {
  segments?: number
}

export function getPoints(svgRaw: string, options?: GeneratePointsOptions) {
  const segments = options?.segments || 20

  const data: BezierPoint[] = getPathData(svgRaw, options)

  let points: Array<Dot2D> = []

  for (let i = 0; i < data.length - 1; i++) {
    const { type, values } = data[i]

    if (type === 'M' && i === 0) {
      points.push({ x: values[0], y: values[1] })
    } else if (type === 'C') {
      const start = points[points.length - 1]
      const control1: Dot2D = { x: values[0], y: values[1] }
      const control2: Dot2D = { x: values[2], y: values[3] }
      const end: Dot2D = { x: values[4], y: values[5] }

      const curvePoints = bezierCurve(start, control1, control2, end, segments)
      points = [...points, ...curvePoints]
    }
  }

  return points
}
