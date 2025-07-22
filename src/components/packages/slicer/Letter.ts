export interface LetterParameters {
  index: number
  text: string
  clone?: boolean
}

export class Letter {
  #index: number
  #element: HTMLSpanElement

  constructor(parameters: LetterParameters) {
    this.#index = parameters.index
    this.#element = document.createElement('span')
    this.#element.classList.add('letter')

    if (parameters.clone) {
      this.#element.innerHTML = `<span class="original">${parameters.text}</span><span class="clone" aria-hidden>${parameters.text}</span>`
    } else {
      this.#element.innerHTML = `<span class="value">${parameters.text}</span>`
    }
  }

  public get index() {
    return this.#index
  }

  public get element() {
    return this.#element
  }
}
