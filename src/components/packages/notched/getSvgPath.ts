// Плавные уголки отсюда: https://github.com/phamfoo/figma-squircle/blob/main/src/index.ts

interface RoundedRectangle {
  topLeftCornerRadius: number
  topRightCornerRadius: number
  bottomRightCornerRadius: number
  bottomLeftCornerRadius: number
  width: number
  height: number
}

interface NormalizedCorner {
  radius: number
  roundingAndSmoothingBudget: number
}

interface NormalizedCorners {
  topLeft: NormalizedCorner
  topRight: NormalizedCorner
  bottomLeft: NormalizedCorner
  bottomRight: NormalizedCorner
}

type Corner = keyof NormalizedCorners

type Side = 'top' | 'left' | 'right' | 'bottom'

interface Adjacent {
  side: Side
  corner: Corner
}

export function distributeAndNormalize({
  topLeftCornerRadius,
  topRightCornerRadius,
  bottomRightCornerRadius,
  bottomLeftCornerRadius,
  width,
  height,
}: RoundedRectangle): NormalizedCorners {
  const roundingAndSmoothingBudgetMap: Record<Corner, number> = {
    topLeft: -1,
    topRight: -1,
    bottomLeft: -1,
    bottomRight: -1,
  }

  const cornerRadiusMap: Record<Corner, number> = {
    topLeft: topLeftCornerRadius,
    topRight: topRightCornerRadius,
    bottomLeft: bottomLeftCornerRadius,
    bottomRight: bottomRightCornerRadius,
  }

  Object.entries(cornerRadiusMap)
    .sort(([, radius1], [, radius2]) => {
      return radius2 - radius1
    })
    .forEach(([cornerName, radius]) => {
      const corner = cornerName as Corner
      const adjacents = adjacentsByCorner[corner]

      const budget = Math.min(
        ...adjacents.map((adjacent) => {
          const adjacentCornerRadius = cornerRadiusMap[adjacent.corner]
          if (radius === 0 && adjacentCornerRadius === 0) {
            return 0
          }

          const adjacentCornerBudget =
            roundingAndSmoothingBudgetMap[adjacent.corner]

          const sideLength =
            adjacent.side === 'top' || adjacent.side === 'bottom'
              ? width
              : height

          if (adjacentCornerBudget >= 0) {
            return sideLength - roundingAndSmoothingBudgetMap[adjacent.corner]
          } else {
            return (radius / (radius + adjacentCornerRadius)) * sideLength
          }
        }),
      )

      roundingAndSmoothingBudgetMap[corner] = budget
      cornerRadiusMap[corner] = Math.min(radius, budget)
    })

  return {
    topLeft: {
      radius: cornerRadiusMap.topLeft,
      roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.topLeft,
    },
    topRight: {
      radius: cornerRadiusMap.topRight,
      roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.topRight,
    },
    bottomLeft: {
      radius: cornerRadiusMap.bottomLeft,
      roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.bottomLeft,
    },
    bottomRight: {
      radius: cornerRadiusMap.bottomRight,
      roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.bottomRight,
    },
  }
}

const adjacentsByCorner: Record<Corner, Array<Adjacent>> = {
  topLeft: [
    {
      corner: 'topRight',
      side: 'top',
    },
    {
      corner: 'bottomLeft',
      side: 'left',
    },
  ],
  topRight: [
    {
      corner: 'topLeft',
      side: 'top',
    },
    {
      corner: 'bottomRight',
      side: 'right',
    },
  ],
  bottomLeft: [
    {
      corner: 'bottomRight',
      side: 'bottom',
    },
    {
      corner: 'topLeft',
      side: 'left',
    },
  ],
  bottomRight: [
    {
      corner: 'bottomLeft',
      side: 'bottom',
    },
    {
      corner: 'topRight',
      side: 'right',
    },
  ],
}

export interface CornerPathParams {
  a: number
  b: number
  c: number
  d: number
  p: number
  cornerRadius: number
  arcSectionLength: number
}

export interface CornerParams {
  cornerAngleAlpha?: number
  cornerRadius: number
  cornerSmoothing: number
  preserveSmoothing: boolean
  roundingAndSmoothingBudget: number
}

export interface NotchParams {
  start: number
  length: number
  slope: number
  depth: number
}

export function getPathParamsForCorner({
  cornerRadius,
  cornerSmoothing,
  preserveSmoothing,
  roundingAndSmoothingBudget,
  cornerAngleAlpha = 90,
}: CornerParams): CornerPathParams {
  let p = (1 + cornerSmoothing) * cornerRadius

  if (!preserveSmoothing) {
    const maxCornerSmoothing = roundingAndSmoothingBudget / cornerRadius - 1
    cornerSmoothing = Math.min(cornerSmoothing, maxCornerSmoothing)
    p = Math.min(p, roundingAndSmoothingBudget)
  }

  const arcMeasure = 90 * (1 - cornerSmoothing)
  const arcSectionLength =
    Math.sin(toRadians(arcMeasure / 2)) * cornerRadius * Math.sqrt(2)

  const angleAlpha = (cornerAngleAlpha - arcMeasure) / 2
  const p3ToP4Distance = cornerRadius * Math.tan(toRadians(angleAlpha / 2))

  const angleBeta = 45 * cornerSmoothing
  const c = p3ToP4Distance * Math.cos(toRadians(angleBeta))
  const d = c * Math.tan(toRadians(angleBeta))

  let b = (p - arcSectionLength - c - d) / 3
  let a = 2 * b

  if (preserveSmoothing && p > roundingAndSmoothingBudget) {
    const p1ToP3MaxDistance =
      roundingAndSmoothingBudget - d - arcSectionLength - c

    const minA = p1ToP3MaxDistance / 6
    const maxB = p1ToP3MaxDistance - minA

    b = Math.min(b, maxB)
    a = p1ToP3MaxDistance - b
    p = Math.min(p, roundingAndSmoothingBudget)
  }

  return {
    a,
    b,
    c,
    d,
    p,
    arcSectionLength,
    cornerRadius,
  }
}

interface SVGPathInput {
  width: number
  height: number
  topRightPathParams: CornerPathParams
  bottomRightPathParams: CornerPathParams
  bottomLeftPathParams: CornerPathParams
  topLeftPathParams: CornerPathParams
  topNotches?: Array<NotchParams>
  rightNotches?: Array<NotchParams>
  bottomNotches?: Array<NotchParams>
  leftNotches?: Array<NotchParams>
}

export function getSVGPathFromPathParams({
  width,
  height,
  topLeftPathParams,
  topRightPathParams,
  bottomLeftPathParams,
  bottomRightPathParams,
  topNotches = [],
  rightNotches = [],
  bottomNotches = [],
  leftNotches = [],
}: SVGPathInput) {
  let d = `M ${topLeftPathParams.p} 0`

  topNotches.forEach((n) => {
    d += drawTopNotch(n)
  })
  d += `L ${width - topRightPathParams.p} 0`
  d += drawTopRightPath(topRightPathParams)

  rightNotches.forEach((n) => {
    d += drawRightNotch(n, width)
  })
  d += `L ${width} ${height - bottomRightPathParams.p}`
  d += drawBottomRightPath(bottomRightPathParams)

  bottomNotches.forEach((n) => {
    d += drawBottomNotch(n, height)
  })
  d += `L ${bottomLeftPathParams.p} ${height}`
  d += drawBottomLeftPath(bottomLeftPathParams)

  leftNotches.forEach((n) => {
    d += drawLeftNotch(n)
  })
  d += `L 0 ${topLeftPathParams.p}`
  d += drawTopLeftPath(topLeftPathParams)

  d += 'Z'

  return d.replace(/[\t\s\n]+/g, ' ').trim()
}

function drawTopNotch({ start, length, slope, depth }: NotchParams) {
  const end = start + length
  return `
    L${start} 0
    C ${start + slope * 0.5},0 ${start + slope * 0.5},${depth} ${start + slope},${depth}
    L${end - slope},${depth}
    C ${end - slope * 0.5},${depth} ${end - slope * 0.5},0 ${end},0
  `
}

function drawBottomNotch(
  { start, length, slope, depth }: NotchParams,
  height: number,
) {
  const end = start + length
  return `
    L${end},${height}
    C ${end - slope * 0.5},${height} ${end - slope * 0.5},${height - depth} ${end - slope},${height - depth}
    L${start + slope},${height - depth}
    C ${start + slope * 0.5},${height - depth} ${start + slope * 0.5},${height} ${start},${height}
  `
}

function drawLeftNotch({ start, length, slope, depth }: NotchParams) {
  const end = start + length
  return `
    L0,${end}
    C 0,${end - slope * 0.5} ${depth},${end - slope * 0.5} ${depth},${end - slope}
    L${depth},${start + slope}
    C ${depth},${start + slope * 0.5} 0,${start + slope * 0.5} 0,${start}
  `
}

function drawRightNotch(
  { start, length, slope, depth }: NotchParams,
  width: number,
) {
  const end = start + length
  return `
    L${width},${start}
    C ${width},${start + slope * 0.5} ${width - depth},${start + slope * 0.5} ${width - depth},${start + slope}
    L${width - depth},${end - slope}
    C ${width - depth},${end - slope * 0.5} ${width},${end - slope * 0.5} ${width},${end}
  `
}

function drawTopRightPath({
  cornerRadius,
  a,
  b,
  c,
  d,
  p,
  arcSectionLength,
}: CornerPathParams) {
  if (cornerRadius) {
    return rounded`
    c ${a} 0 ${a + b} 0 ${a + b + c} ${d}
    a ${cornerRadius} ${cornerRadius} 0 0 1 ${arcSectionLength} ${arcSectionLength}
    c ${d} ${c}
        ${d} ${b + c}
        ${d} ${a + b + c}`
  } else {
    return rounded`l ${p} 0`
  }
}

function drawBottomRightPath({
  cornerRadius,
  a,
  b,
  c,
  d,
  p,
  arcSectionLength,
}: CornerPathParams) {
  if (cornerRadius) {
    return rounded`
    c 0 ${a}
      0 ${a + b}
      ${-d} ${a + b + c}
    a ${cornerRadius} ${cornerRadius} 0 0 1 -${arcSectionLength} ${arcSectionLength}
    c ${-c} ${d}
      ${-(b + c)} ${d}
      ${-(a + b + c)} ${d}`
  } else {
    return rounded`l 0 ${p}`
  }
}

function drawBottomLeftPath({
  cornerRadius,
  a,
  b,
  c,
  d,
  p,
  arcSectionLength,
}: CornerPathParams) {
  if (cornerRadius) {
    return rounded`
    c ${-a} 0
      ${-(a + b)} 0
      ${-(a + b + c)} ${-d}
    a ${cornerRadius} ${cornerRadius} 0 0 1 -${arcSectionLength} -${arcSectionLength}
    c ${-d} ${-c}
      ${-d} ${-(b + c)}
      ${-d} ${-(a + b + c)}`
  } else {
    return rounded`l ${-p} 0`
  }
}

function drawTopLeftPath({
  cornerRadius,
  a,
  b,
  c,
  d,
  p,
  arcSectionLength,
}: CornerPathParams) {
  if (cornerRadius) {
    return rounded`
    c 0 ${-a}
      0 ${-(a + b)}
      ${d} ${-(a + b + c)}
    a ${cornerRadius} ${cornerRadius} 0 0 1 ${arcSectionLength} -${arcSectionLength}
    c ${c} ${-d}
      ${b + c} ${-d}
      ${a + b + c} ${-d}`
  } else {
    return rounded`l 0 ${-p}`
  }
}

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180
}

function rounded(strings: TemplateStringsArray, ...values: number[]): string {
  return strings.reduce((acc, str, i) => {
    const value = values[i]

    if (typeof value === 'number') {
      return acc + str + value.toFixed(4)
    } else {
      return acc + str + (value ?? '')
    }
  }, '')
}

export interface GetSvgPathParams {
  cornerSmoothing: number
  preserveSmoothing?: boolean

  topNotches?: Array<NotchParams>
  rightNotches?: Array<NotchParams>
  bottomNotches?: Array<NotchParams>
  leftNotches?: Array<NotchParams>

  cornerRadius?: number
  topLeftCornerRadius?: number
  topRightCornerRadius?: number
  bottomRightCornerRadius?: number
  bottomLeftCornerRadius?: number

  cornerAngleAlpha?: number
  topLeftCornerAngleAlpha?: number
  topRightCornerAngleAlpha?: number
  bottomRightCornerAngleAlpha?: number
  bottomLeftCornerAngleAlpha?: number

  width: number
  height: number
}

export function getSvgPath({
  cornerRadius = 0,
  topLeftCornerRadius,
  topRightCornerRadius,
  bottomRightCornerRadius,
  bottomLeftCornerRadius,

  cornerAngleAlpha = 90,
  topLeftCornerAngleAlpha,
  topRightCornerAngleAlpha,
  bottomRightCornerAngleAlpha,
  bottomLeftCornerAngleAlpha,

  cornerSmoothing,
  preserveSmoothing = false,

  topNotches,
  rightNotches,
  bottomNotches,
  leftNotches,

  width,
  height,
}: GetSvgPathParams) {
  topLeftCornerRadius = topLeftCornerRadius ?? cornerRadius
  topRightCornerRadius = topRightCornerRadius ?? cornerRadius
  bottomLeftCornerRadius = bottomLeftCornerRadius ?? cornerRadius
  bottomRightCornerRadius = bottomRightCornerRadius ?? cornerRadius

  topLeftCornerAngleAlpha = topLeftCornerAngleAlpha ?? cornerAngleAlpha
  topRightCornerAngleAlpha = topRightCornerAngleAlpha ?? cornerAngleAlpha
  bottomLeftCornerAngleAlpha = bottomLeftCornerAngleAlpha ?? cornerAngleAlpha
  bottomRightCornerAngleAlpha = bottomRightCornerAngleAlpha ?? cornerAngleAlpha

  if (
    topLeftCornerRadius === topRightCornerRadius &&
    topRightCornerRadius === bottomRightCornerRadius &&
    bottomRightCornerRadius === bottomLeftCornerRadius &&
    bottomLeftCornerRadius === topLeftCornerRadius &&
    topLeftCornerAngleAlpha === topRightCornerAngleAlpha &&
    topRightCornerAngleAlpha === bottomRightCornerAngleAlpha &&
    bottomRightCornerAngleAlpha === bottomLeftCornerAngleAlpha &&
    bottomLeftCornerAngleAlpha === topLeftCornerAngleAlpha
  ) {
    const roundingAndSmoothingBudget = Math.min(width, height) / 2
    const cornerRadius = Math.min(
      topLeftCornerRadius,
      roundingAndSmoothingBudget,
    )

    const pathParams = getPathParamsForCorner({
      cornerRadius,
      cornerSmoothing,
      cornerAngleAlpha,
      preserveSmoothing,
      roundingAndSmoothingBudget,
    })

    return getSVGPathFromPathParams({
      width,
      height,
      topLeftPathParams: pathParams,
      topRightPathParams: pathParams,
      bottomLeftPathParams: pathParams,
      bottomRightPathParams: pathParams,
      topNotches,
      rightNotches,
      bottomNotches,
      leftNotches,
    })
  }

  const { topLeft, topRight, bottomLeft, bottomRight } = distributeAndNormalize(
    {
      topLeftCornerRadius,
      topRightCornerRadius,
      bottomRightCornerRadius,
      bottomLeftCornerRadius,
      width,
      height,
    },
  )

  return getSVGPathFromPathParams({
    width,
    height,
    topLeftPathParams: getPathParamsForCorner({
      cornerSmoothing,
      preserveSmoothing,
      cornerRadius: topLeft.radius,
      roundingAndSmoothingBudget: topLeft.roundingAndSmoothingBudget,
      cornerAngleAlpha: topLeftCornerAngleAlpha,
    }),
    topRightPathParams: getPathParamsForCorner({
      cornerSmoothing,
      preserveSmoothing,
      cornerRadius: topRight.radius,
      roundingAndSmoothingBudget: topRight.roundingAndSmoothingBudget,
      cornerAngleAlpha: topRightCornerAngleAlpha,
    }),
    bottomRightPathParams: getPathParamsForCorner({
      cornerSmoothing,
      preserveSmoothing,
      cornerRadius: bottomRight.radius,
      roundingAndSmoothingBudget: bottomRight.roundingAndSmoothingBudget,
      cornerAngleAlpha: bottomRightCornerAngleAlpha,
    }),
    bottomLeftPathParams: getPathParamsForCorner({
      cornerSmoothing,
      preserveSmoothing,
      cornerRadius: bottomLeft.radius,
      roundingAndSmoothingBudget: bottomLeft.roundingAndSmoothingBudget,
      cornerAngleAlpha: bottomLeftCornerAngleAlpha,
    }),
    topNotches,
    rightNotches,
    bottomNotches,
    leftNotches,
  })
}
