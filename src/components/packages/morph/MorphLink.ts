import { ChangeHistoryAction } from '@packages/utils'
import { Morph } from './Morph'
import { cssValueParser } from '@packages/css-value-parser'

export class MorphLink {
  #morph: Morph
  #element: HTMLAnchorElement
  #pathname: string

  constructor(element: HTMLAnchorElement, morph: Morph) {
    this.#morph = morph
    this.#element = element

    this.#pathname = this.#element.getAttribute('href') || '/'

    this.#element.addEventListener('click', this.#clickListener)

    const p1 = morph.normalizePath(this.#pathname)
    const p2 = morph.normalizePath(location.pathname)

    if (
      this.#element.hasAttribute('data-include') &&
      p2.pathname.includes(p1.pathname)
    ) {
      this.#element.classList.add('current')
    } else if (p1.pathname === p2.pathname) {
      this.#element.classList.add('current')
    }

    if (this.#element.hasAttribute('data-prefetch')) {
      this.#element.addEventListener('pointerenter', this.#pointerListener)
    }
  }

  public get element() {
    return this.#element
  }

  public destroy() {
    this.#element.removeEventListener('click', this.#clickListener)
    this.#element.removeEventListener('pointerenter', this.#pointerListener)
    this.#element.classList.remove('current')
  }

  #clickListener = (e: MouseEvent) => {
    e.preventDefault()

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

    this.#morph.navigate(this.#pathname, {
      historyAction,
      centerScroll,
      offsetScroll,
      revalidate,
    })
  }

  #pointerListener = () => {
    this.#morph.prefetch(this.#pathname)
    this.#element.removeEventListener('pointerenter', this.#pointerListener)
  }
}
