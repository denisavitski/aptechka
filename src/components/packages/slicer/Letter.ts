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
      this.#element.innerHTML = `<span class="original"><span class="value">${parameters.text}</span></span><span class="clone" aria-hidden><span class="value">${parameters.text}</span></span>`
    } else {
      this.#element.innerHTML = `<span class="original"><span class="value">${parameters.text}</span></span>`
    }
  }

  public get index() {
    return this.#index
  }

  public get element() {
    return this.#element
  }
}
