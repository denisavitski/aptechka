import { camelToKebab } from '@packages/utils'

export class MorphParamsDependent {
  #element: HTMLElement
  #params: Array<{ name: string; value: string }> = []

  constructor(element: HTMLElement) {
    this.#element = element

    for (const key in this.#element.dataset) {
      const kebabKey = camelToKebab(key)

      if (kebabKey.startsWith('param-')) {
        const name = kebabKey.split('param-')[1]
        const value = this.#element.dataset[key]!

        this.#params.push({
          name,
          value,
        })
      }
    }

    document.addEventListener(
      'morphURLParametersChange',
      this.#urlChangeListener,
    )

    this.#update()
  }

  public destroy() {
    document.removeEventListener(
      'morphURLParametersChange',
      this.#urlChangeListener,
    )
  }

  #update() {
    const locationParams = new URLSearchParams(location.search)

    let matched: any = !!this.#params.find((param) => {
      return (
        locationParams.has(param.name) &&
        (locationParams.get(param.name) === param.value ||
          param.value === '*' ||
          param.value === 'all' ||
          param.value === 'any' ||
          param.value === 'vse' ||
          locationParams.get(param.name) === '*' ||
          locationParams.get(param.name) === 'all' ||
          locationParams.get(param.name) === 'any' ||
          locationParams.get(param.name) === 'vse')
      )
    })

    if (!matched && this.#element.hasAttribute('data-match-no-params')) {
      matched = !this.#params.filter((param) => {
        return locationParams.has(param.name)
      }).length
    }

    const hideClass = this.#element.getAttribute('data-hide-class')

    if (matched) {
      if (hideClass) {
        this.#element.classList.remove(hideClass)
      } else {
        this.#element.style.display = ''
      }
    } else {
      if (hideClass) {
        this.#element.classList.add(hideClass)
      } else {
        this.#element.style.display = 'none'
      }
    }

    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent('resize'))
    })
  }

  #urlChangeListener = () => {
    this.#update()
  }
}
