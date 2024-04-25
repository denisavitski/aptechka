export function measureText(context: CanvasRenderingContext2D, text: string) {
  const metrics = context.measureText(text)
  const height =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
  const width = metrics.width

  return {
    height,
    width,
  }
}

export function fixPosition(position: number) {
  return Math.floor(position) + 0.5
}

export function cover(
  contentWidth: number,
  contentHeight: number,
  containerWidth: number,
  containerHeight: number,
  offsetLeft?: number,
  offsetTop?: number
) {
  let contentRatio = contentWidth / contentHeight
  let containerRatio = containerWidth / containerHeight
  let resultHeight = 0
  let resultWidth = 0

  offsetLeft = typeof offsetLeft === 'undefined' ? 0.5 : offsetLeft
  offsetTop = typeof offsetTop === 'undefined' ? 0.5 : offsetTop

  if (contentRatio > containerRatio) {
    resultHeight = containerHeight
    resultWidth = containerHeight * contentRatio
  } else {
    resultWidth = containerWidth
    resultHeight = containerWidth / contentRatio
  }

  return [
    (containerWidth - resultWidth) * offsetLeft,
    (containerHeight - resultHeight) * offsetTop,
    resultWidth,
    resultHeight,
  ] as const
}

export function contain(
  contentWidth: number,
  contentHeight: number,
  containerWidth: number,
  containerHeight: number,
  offsetLeft?: number,
  offsetTop?: number
) {
  let contentRatio = contentWidth / contentHeight
  let containerRatio = containerWidth / containerHeight
  let resultHeight = 0
  let resultWidth = 0

  offsetLeft = typeof offsetLeft === 'undefined' ? 0.5 : offsetLeft
  offsetTop = typeof offsetTop === 'undefined' ? 0.5 : offsetTop

  if (contentRatio > containerRatio) {
    resultWidth = containerWidth
    resultHeight = containerWidth / contentRatio
  } else {
    resultHeight = containerHeight
    resultWidth = containerHeight * contentRatio
  }

  return [
    (containerWidth - resultWidth) * offsetLeft,
    (containerHeight - resultHeight) * offsetTop,
    resultWidth,
    resultHeight,
  ] as const
}
