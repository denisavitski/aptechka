// https://github.com/sanalabs/corner-smoothing

import { cssUnitParser } from '@packages/css-unit-parser'
import { elementResizer } from '@packages/element-resizer'
import { ticker } from '@packages/ticker'
import { generateId } from '@packages/utils'
import { getSvgPath, NotchParams } from './getSvgPath'

export class NotchedElement extends HTMLElement {
  #svgElement: SVGElement
  #pathElement: SVGPathElement

  constructor() {
    super()

    const clip = this.hasAttribute('clip')
    const clipId = clip ? 'clip-' + generateId(10) : null

    const tmpElement = document.createElement('div')
    tmpElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg">
        ${clipId ? `<clipPath id="${clipId}">` : ''}
          <path></path>
        ${clipId ? `</clipPath>` : ''}
      </svg>
      <slot></slot>
    `

    if (clipId) {
      this.style.clipPath = `url(#${clipId})`
    }

    this.style.position = 'relative'

    this.#svgElement = tmpElement.querySelector('svg')!
    this.#svgElement.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      zIndex: -1;
      display: block;
      width: 100%;
      height: 100%;
    `

    this.#pathElement = tmpElement.querySelector('path')!

    this.prepend(tmpElement.firstElementChild!)
  }

  protected connectedCallback() {
    elementResizer.subscribe(this, this.#resizeListener)

    ticker.subscribe(this.#resizeListener)
  }

  protected disconnectedCallback() {
    elementResizer.unsubscribe(this.#resizeListener)
  }

  #resizeListener = () => {
    const width = this.offsetWidth
    const height = this.offsetHeight

    const computed = getComputedStyle(this)

    this.#svgElement.setAttributeNS(
      'http://www.w3.org/2000/svg',
      'viewBox',
      `0 0 ${width} ${height}`,
    )

    const cornerRadius = cssUnitParser.parse(
      computed.getPropertyValue('--notched-corner-radius'),
    )

    const topLeftCornerRadius = cssUnitParser.parse(
      computed.getPropertyValue('--notched-top-left-corner-radius'),
    )

    const topRightCornerRadius = cssUnitParser.parse(
      computed.getPropertyValue('--notched-top-right-corner-radius'),
    )

    const bottomRightCornerRadius = cssUnitParser.parse(
      computed.getPropertyValue('--notched-bottom-right-corner-radius'),
    )

    const bottomLeftCornerRadius = cssUnitParser.parse(
      computed.getPropertyValue('--notched-bottom-left-corner-radius'),
    )

    const cornerAngleAlpha =
      parseFloat(computed.getPropertyValue('--notched-corner-angle-alpha')) ||
      undefined

    const topLeftCornerAngleAlpha =
      parseFloat(
        computed.getPropertyValue('--notched-top-left-corner-angle-alpha'),
      ) || undefined

    const topRightCornerAngleAlpha =
      parseFloat(
        computed.getPropertyValue('--notched-top-right-corner-angle-alpha'),
      ) || undefined

    const bottomRightCornerAngleAlpha =
      parseFloat(
        computed.getPropertyValue('--notched-bottom-right-corner-angle-alpha'),
      ) || undefined

    const bottomLeftCornerAngleAlpha =
      parseFloat(
        computed.getPropertyValue('--notched-bottom-left-corner-angle-alpha'),
      ) || undefined

    const cornerSmoothing =
      parseFloat(computed.getPropertyValue('--notched-corner-smoothing')) || 0

    const preserveSmoothing =
      computed.getPropertyValue('--notched-preserve-smoothing') === 'false'
        ? false
        : true

    const topNotches = this.#parseCSSNotchValue(
      computed.getPropertyValue('--notched-top-notches'),
    )
    const rightNotches = this.#parseCSSNotchValue(
      computed.getPropertyValue('--notched-right-notches'),
    )
    const bottomNotches = this.#parseCSSNotchValue(
      computed.getPropertyValue('--notched-bottom-notches'),
    )
    const leftNotches = this.#parseCSSNotchValue(
      computed.getPropertyValue('--notched-left-notches'),
    )

    const color = computed.getPropertyValue('--notched-color')

    const path = getSvgPath({
      cornerRadius,
      topLeftCornerRadius,
      topRightCornerRadius,
      bottomRightCornerRadius,
      bottomLeftCornerRadius,
      cornerAngleAlpha,
      topLeftCornerAngleAlpha,
      topRightCornerAngleAlpha,
      bottomRightCornerAngleAlpha,
      bottomLeftCornerAngleAlpha,
      cornerSmoothing,
      preserveSmoothing,
      topNotches,
      rightNotches,
      bottomNotches,
      leftNotches,
      width,
      height,
    })

    this.#pathElement.setAttribute('d', path)

    if (color) {
      this.#pathElement.setAttribute('fill', color)
    }
  }

  #parseCSSNotchValue(value: string) {
    const notchesString = value
      .split(',')
      .map((v) => v.trim())
      .filter((v) => !!v)

    const notches: Array<NotchParams> = []

    notchesString.forEach((notchString) => {
      const valuesStrings = notchString
        .split(' ')
        .map((v) => v.trim())
        .filter((v) => !!v)

      notches.push({
        start: cssUnitParser.parse(valuesStrings[0]!) || 0,
        length: cssUnitParser.parse(valuesStrings[1]!) || 0,
        slope: cssUnitParser.parse(valuesStrings[2]!) || 0,
        depth: cssUnitParser.parse(valuesStrings[3]!) || 0,
      })
    })

    return notches
  }
}

if (!customElements.get('e-notched')) {
  customElements.define('e-notched', NotchedElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-notched': NotchedElement
  }
}
