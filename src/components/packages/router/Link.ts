import { ChangeHistoryAction, SplitPathResult } from '@packages/utils'
import { Router } from './Router'

export class Link {
  #router: Router
  #element: HTMLAnchorElement

  constructor(router: Router, element: HTMLAnchorElement) {
    this.#router = router
    this.#element = element

    this.#element.addEventListener('click', this.#clickListener)
  }

  public checkCurrent(url: SplitPathResult) {}

  get #path() {
    const url = new URL(this.#element.href)
    const normalizedURL = this.#router.normalizePath(
      url.pathname + url.search + url.hash,
    )

    return normalizedURL.path
  }

  public destroy() {
    this.#element.removeEventListener('click', this.#clickListener)
    this.#element.classList.remove('current')
  }

  #clickListener = (e: Event) => {
    e.preventDefault()

    const path = this.#path

    const historyAction =
      (this.#element.getAttribute(
        'data-history-action',
      ) as ChangeHistoryAction) || 'push'

    this.#router.navigate(path, {
      historyAction,
    })
  }
}
