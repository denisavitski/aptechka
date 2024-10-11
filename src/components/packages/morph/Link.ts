import { ChangeHistoryAction } from '@packages/utils'
import { Morph } from './Morph'

export class Link {
  #morph: Morph
  #element: HTMLAnchorElement
  #pathname: string
  #historyAction: ChangeHistoryAction
  #state: string | undefined
  #matchPaths: Array<string> | undefined

  constructor(element: HTMLAnchorElement, morph: Morph) {
    this.#morph = morph
    this.#element = element

    this.#pathname = this.#element.getAttribute('href') || '/'

    this.#historyAction =
      (this.#element.getAttribute(
        'data-history-action'
      ) as ChangeHistoryAction) || 'push'

    this.#state = this.#element.getAttribute('data-state') || undefined

    this.#element.addEventListener('click', this.#clickListener)

    const p1 = morph.normalizePath(this.#pathname)
    const p2 = morph.normalizePath(location.pathname)

    this.#matchPaths = this.#element
      .getAttribute('data-match-paths')
      ?.split(',')
      .map((v) => morph.normalizePath(v.trim()).pathname)

    if (this.#element.hasAttribute('data-include')) {
      if (p2.pathname.includes(p1.pathname)) {
        this.#element.classList.add('current')
      }
    } else {
      if (
        p1.pathname === p2.pathname ||
        this.#matchPaths?.includes(p2.pathname)
      ) {
        this.#element.classList.add('current')
        this.#element.classList.add('clicked')
      } else {
        this.#element.classList.remove('clicked')
      }
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

    this.#morph.links.forEach((link) => {
      if (
        this.#pathname === link.#pathname ||
        link.#matchPaths?.includes(this.#pathname)
      ) {
        link.#element.classList.add('clicked')
      } else {
        link.#element.classList.remove('clicked')
      }
    })

    this.#morph.navigate(this.#pathname, {
      historyAction: this.#historyAction,
      state: this.#state,
    })
  }

  #pointerListener = () => {
    this.#morph.prefetch(this.#pathname)
    this.#element.removeEventListener('pointerenter', this.#pointerListener)
  }
}
