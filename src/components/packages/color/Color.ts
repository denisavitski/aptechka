export class Color {
  #hex = ''
  #rgba = { r: 0, g: 0, b: 0, a: 1 }

  constructor(color: string) {
    this.#parseColor(color)
  }

  get r() {
    return this.#rgba.r
  }
  get g() {
    return this.#rgba.g
  }
  get b() {
    return this.#rgba.b
  }
  get a() {
    return this.#rgba.a
  }

  get hex() {
    return this.#hex
  }
  get rgba() {
    return { ...this.#rgba }
  }

  mix(otherColor: Color, ratio = 0.5) {
    if (!(otherColor instanceof Color)) {
      throw new Error('Argument must be an instance of Color')
    }

    if (ratio < 0 || ratio > 1) {
      throw new Error('Ratio must be between 0 and 1')
    }

    const r = Math.round(this.r * (1 - ratio) + otherColor.r * ratio)
    const g = Math.round(this.g * (1 - ratio) + otherColor.g * ratio)
    const b = Math.round(this.b * (1 - ratio) + otherColor.b * ratio)
    const a = this.a * (1 - ratio) + otherColor.a * ratio

    return new Color(`rgba(${r}, ${g}, ${b}, ${a})`)
  }

  public toString() {
    if (this.a === 1) {
      return this.hex
    }

    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
  }

  public toRGBString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`
  }

  public toRGBAString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
  }

  #parseColor(color: string) {
    if (typeof color !== 'string') {
      throw new Error('Color must be a string')
    }

    const trimmedColor = color.trim().toLowerCase()

    if (trimmedColor.startsWith('#')) {
      this.#parseHex(trimmedColor)
    } else if (trimmedColor.startsWith('rgb')) {
      this.#parseRgb(trimmedColor)
    } else {
      throw new Error('Unsupported color format. Use hex, rgb, or rgba.')
    }
  }

  #parseHex(hexColor: string) {
    let hex = hexColor.replace('#', '')

    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('')
    }

    if (hex.length === 8) {
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      const a = parseInt(hex.substring(6, 8), 16) / 255

      this.#setRGBA(r, g, b, a)
      this.#setHexFromRGBA()
      return
    }

    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)

      this.#setRGBA(r, g, b, 1)
      this.#setHexFromRGBA()
      return
    }

    throw new Error('Invalid HEX color format')
  }

  #parseRgb(rgbColor: string) {
    const match = rgbColor.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
    )

    if (!match) {
      throw new Error('Invalid RGB/RGBA color format')
    }

    const r = Math.max(0, Math.min(255, parseInt(match[1])))
    const g = Math.max(0, Math.min(255, parseInt(match[2])))
    const b = Math.max(0, Math.min(255, parseInt(match[3])))
    const a = match[4] ? Math.max(0, Math.min(1, parseFloat(match[4]))) : 1

    this.#setRGBA(r, g, b, a)
    this.#setHexFromRGBA()
  }

  #setRGBA(r: number, g: number, b: number, a: number) {
    this.#rgba = {
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
      a: Math.round(a * 100) / 100,
    }
  }

  #setHexFromRGBA() {
    const { r, g, b, a } = this.#rgba

    const hexR = r.toString(16).padStart(2, '0')
    const hexG = g.toString(16).padStart(2, '0')
    const hexB = b.toString(16).padStart(2, '0')

    this.#hex = `#${hexR}${hexG}${hexB}`

    if (a < 1) {
      const hexA = Math.round(a * 255)
        .toString(16)
        .padStart(2, '0')
      this.#hex += hexA
    }
  }
}
