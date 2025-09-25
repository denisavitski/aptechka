import { Color } from './Color'

export class DocumentColors {
  #colorMap: Map<string, Color>

  constructor() {
    this.#colorMap = new Map()
    this.#collectColors()
  }

  get size() {
    return this.#colorMap.size
  }

  public get(variableName: string) {
    return this.#colorMap.get(variableName)
  }

  public getAll() {
    return new Map(this.#colorMap)
  }

  public getAllAsObject() {
    const result: Record<string, Color> = {}

    this.#colorMap.forEach((color, variableName) => {
      result[variableName] = color
    })

    return result
  }

  public getVariableNames() {
    return Array.from(this.#colorMap.keys())
  }

  public refresh() {
    this.#colorMap.clear()
    this.#collectColors()
  }

  public getColor(variableName: string) {
    const color = this.#colorMap.get(variableName)
    if (!color) {
      throw new Error(`Цветовая переменная ${variableName} не найдена`)
    }
    return color
  }

  public has(variableName: string) {
    return this.#colorMap.has(variableName)
  }

  #collectColors() {
    const styles = getComputedStyle(document.documentElement)

    Array.from(document.styleSheets).forEach((stylesheet) => {
      Array.from(stylesheet.cssRules).forEach((rule) => {
        if (rule instanceof CSSStyleRule && rule.selectorText === 'html') {
          Array.from(rule.style).forEach((variableName) => {
            if (variableName.startsWith('--color')) {
              const value = styles.getPropertyValue(variableName).trim()

              try {
                const color = new Color(value)

                this.#colorMap.set(variableName, color)
              } catch (error) {
                console.warn(
                  `Не удалось распарсить цвет ${variableName}: ${value}`,
                  error,
                )
              }
            }
          })
        }
      })
    })
  }
}
