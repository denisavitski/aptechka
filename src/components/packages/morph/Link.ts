import { Morph, MorphHistoryAction } from './Morph'

export class Link {
  #morph: Morph
  #element: HTMLAnchorElement
  #pathname: string
  #historyAction: MorphHistoryAction

  constructor(element: HTMLAnchorElement, morph: Morph) {
    this.#morph = morph
    this.#element = element
    this.#pathname = this.#element.getAttribute('href') || '/'
    this.#historyAction =
      (this.#element.getAttribute('data-history-action') as MorphHistoryAction) || 'push'

    this.#element.addEventListener('click', this.#clickListener)

    if (this.#pathname === location.pathname) {
      this.#element.classList.add('current')
    }
  }

  public destroy() {
    this.#element.removeEventListener('click', this.#clickListener)
    this.#element.classList.remove('current')
  }

  #clickListener = (e: MouseEvent) => {
    e.preventDefault()
    this.#morph.navigate(this.#pathname, this.#historyAction)
  }
}
