class CSSUnitParser {
  #dummyElement: HTMLElement = null!

  public parse(value: string) {
    this.#createDummy()

    this.#dummyElement.style.left = value
    const computedWidth = getComputedStyle(this.#dummyElement).getPropertyValue('left')

    return parseFloat(computedWidth)
  }

  #createDummy() {
    if (!this.#dummyElement) {
      this.#dummyElement = document.createElement('div')
      this.#dummyElement.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        visibility: hidden;
      `
    }

    if (!document.body.contains(this.#dummyElement)) {
      document.body.prepend(this.#dummyElement)
    }
  }
}

export const cssUnitParser = new CSSUnitParser()
