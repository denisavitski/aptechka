import { cssUnitParser } from '@packages/css-unit-parser'
import { viewport } from '@packages/device'

class CSSValueParser {
  public static CSS_UNITS = new Set([
    'px',
    'rem',
    'vw',
    'vh',
    'vmin',
    'vmax',
    'em',
    'cm',
    'mm',
    'Q',
    'in',
    'pc',
    'pt',
    'ex',
    'ch',
    'lh',
    'rlh',
    'vb',
    'vi',
    'svw',
    'svh',
    'lvw',
    'lvh',
    'dvw',
    'dvh',
  ])

  public parse(value: string, element?: HTMLElement): any {
    const num = parseFloat(value)
    const isNumber = !isNaN(num)
    const unit = isNumber ? value.match(/[a-z]+$/i)?.[0] : undefined

    if (isNumber && !unit) {
      return num
    } else if (unit) {
      if (unit === 'px') {
        return num
      } else if (unit === 'oh') {
        return (element?.offsetHeight || 0) * (num / 100)
      } else if (unit === 'ow') {
        return (element?.offsetWidth || 0) * (num / 100)
      } else if (unit === 'ohmh') {
        return ((element?.offsetHeight || 0) - viewport.height) * (num / 100)
      } else if (unit === 'owmw') {
        return ((element?.offsetWidth || 0) + viewport.width) * (num / 100)
      } else if (unit === 'ohph') {
        console.log(
          ((element?.offsetHeight || 0) + viewport.height) * (num / 100),
        )
        return ((element?.offsetHeight || 0) + viewport.height) * (num / 100)
      } else if (unit === 'owpw') {
        return ((element?.offsetWidth || 0) - viewport.width) * (num / 100)
      } else if (unit && CSSValueParser.CSS_UNITS.has(unit as any)) {
        return cssUnitParser.parse(value, element)
      } else {
        return value
      }
    } else if (value.includes('calc')) {
      if (value.includes('raw!')) {
        return value.replace('raw!', '')
      } else {
        return cssUnitParser.parse(value, element)
      }
    } else if (value === 'true') {
      return true
    } else if (value === 'false') {
      return false
    } else {
      return value
    }
  }
}

export const cssValueParser = new CSSValueParser()
