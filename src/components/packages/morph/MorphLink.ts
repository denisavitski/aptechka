import { ChangeHistoryAction } from '@packages/utils'
import { Morph } from './Morph'
import { cssValueParser } from '@packages/css-value-parser'

export class MorphLink {
  #morph: Morph
  #element: HTMLAnchorElement
  #path: string

  constructor(element: HTMLAnchorElement, morph: Morph) {
    this.#morph = morph
    this.#element = element

    this.#path = this.#element.getAttribute('href') || '/'

    this.#element.addEventListener('click', this.#clickListener)

    this.checkCurrent(location.pathname)

    if (this.#element.hasAttribute('data-prefetch')) {
      this.#element.addEventListener('pointerenter', this.#pointerListener)
    }
  }

  public get element() {
    return this.#element
  }

  public checkCurrent(path: string) {
    const locationUrl = this.#morph.normalizePath(path)
    const linkUrl = this.#morph.normalizePath(this.#path)

    if (
      this.#element.hasAttribute('data-include') &&
      locationUrl.pathname.includes(linkUrl.pathname)
    ) {
      this.#element.classList.add('current')
    } else if (linkUrl.pathname === locationUrl.pathname) {
      this.#element.classList.add('current')
    } else if (
      this.#element
        .getAttribute('data-associated-paths')
        ?.split(',')
        .find((path) => path.includes(locationUrl.pathname))
    ) {
      this.#element.classList.add('current')
    } else {
      this.#element.classList.remove('current')
    }
  }

  public destroy() {
    this.#element.removeEventListener('click', this.#clickListener)
    this.#element.removeEventListener('pointerenter', this.#pointerListener)
    this.#element.classList.remove('current')
  }

  #clickListener = (e: MouseEvent) => {
    e.preventDefault()

    const back = this.#element.hasAttribute('data-back')

    if (back && this.#morph.previousURL) {
      history.back()
    } else {
      this.#path = this.#element.getAttribute('href') || '/'

      const historyAction =
        (this.#element.getAttribute(
          'data-history-action'
        ) as ChangeHistoryAction) || 'push'

      const centerScroll = this.#element.hasAttribute('data-center-scroll')

      const offsetScrollRawValue = getComputedStyle(this.#element)
        .getPropertyValue('--offset-scroll')
        .trim()

      const offsetScroll = offsetScrollRawValue
        ? cssValueParser.parse(offsetScrollRawValue)
        : undefined

      const revalidate = this.#element.hasAttribute('data-revalidate')

      const keepSearchParameters = this.#element.hasAttribute(
        'data-keep-search-parameters'
      )

      const submorph = this.#element
        .getAttribute('data-submorph')
        ?.split(',')
        .map((v) => v.trim())

      const clearState = this.#element.hasAttribute('data-clear-state')

      this.#morph.navigate(this.#path, {
        historyAction,
        centerScroll,
        offsetScroll,
        revalidate,
        keepSearchParameters,
        submorph,
        clearState,
      })
    }
  }

  #pointerListener = () => {
    const revalidate = this.#element.hasAttribute('data-revalidate')
    this.#morph.prefetch(this.#path, revalidate)
    this.#element.removeEventListener('pointerenter', this.#pointerListener)
  }
}
