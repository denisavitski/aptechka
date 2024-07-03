import { ChangeHistoryAction } from '@packages/utils'
import { Router } from './Router'

export class Link {
  #router: Router
  #element: HTMLElement
  #pathname: string
  #historyAction: ChangeHistoryAction
  #matchPaths: Array<string> | undefined

  constructor(router: Router, element: HTMLElement) {
    this.#router = router
    this.#element = element

    this.#pathname = this.#element.getAttribute('href') || '/'

    this.#historyAction =
      (this.#element.getAttribute(
        'data-history-action'
      ) as ChangeHistoryAction) || 'push'

    this.#element.addEventListener('click', this.#clickListener)

    const p1 = router.normalizePath(this.#pathname)
    const p2 = router.normalizePath(location.pathname)

    this.#matchPaths = this.#element
      .getAttribute('data-match-paths')
      ?.split(',')
      .map((v) => router.normalizePath(v.trim()).pathname)

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
  }

  public destroy() {
    this.#element.removeEventListener('click', this.#clickListener)
    this.#element.classList.remove('current')
  }

  #clickListener = (e: Event) => {
    e.preventDefault()

    this.#router.links.forEach((link) => {
      if (
        this.#pathname === link.#pathname ||
        link.#matchPaths?.includes(this.#pathname)
      ) {
        link.#element.classList.add('clicked')
      } else {
        link.#element.classList.remove('clicked')
      }
    })

    this.#router.navigate(this.#pathname, this.#historyAction)
  }
}
