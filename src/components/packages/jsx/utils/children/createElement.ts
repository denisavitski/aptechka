export function createElement(tag: string, isSVG: boolean) {
  if (tag === 'svg') {
    return document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  } else {
    return isSVG
      ? document.createElementNS('http://www.w3.org/2000/svg', tag)
      : document.createElement(tag)
  }
}
