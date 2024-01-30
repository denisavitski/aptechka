import { Router, RouterHistoryAction } from './Router'

export class Link {
  #router: Router
  #element: HTMLElement
  #pathname: string
  #historyAction: RouterHistoryAction

  constructor(router: Router, element: HTMLElement) {
    this.#router = router
    this.#element = element
    this.#pathname = this.#element.getAttribute('href') || '/'
    this.#historyAction =
      (this.#element.getAttribute('data-history-action') as RouterHistoryAction) || 'push'

    this.#element.addEventListener('click', this.#clickListener)

    if (location.pathname === this.#pathname) {
      this.#element.classList.add('current')
    }
  }

  public destroy() {
    this.#element.removeEventListener('click', this.#clickListener)
    this.#element.classList.remove('current')
  }

  #clickListener = (e: Event) => {
    e.preventDefault()

    this.#router.navigate(this.#pathname, this.#historyAction)
  }
}
