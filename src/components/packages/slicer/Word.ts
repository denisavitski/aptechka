import { Letter } from './Letter'

export interface WordParameters {
  index: number
  text: string
  letters?: boolean
  lettersAcc?: number
  letterConstructor?: typeof Letter
  clone?: boolean
}

export class Word {
  #index: number
  #element: HTMLSpanElement
  #letters: Array<Letter>

  constructor(parameters: WordParameters) {
    this.#index = parameters.index
    this.#element = document.createElement('span')
    this.#letters = []

    if (
      parameters.letters &&
      parameters.letterConstructor &&
      parameters.lettersAcc !== undefined
    ) {
      this.#letters = parameters.text.split('').map((letter, i) => {
        return new parameters.letterConstructor!({
          index: parameters.lettersAcc! + i,
          text: letter,
          clone: parameters.clone,
        })
      })

      this.#element.append(...this.#letters.map((l) => l.element))
    } else {
      if (parameters.clone) {
        this.#element.innerHTML = `
          <span class="original">${parameters.text}</span>
          <span class="clone" aria-hidden>${parameters.text}</span>
        `
      } else {
        this.#element.innerHTML = `
          <span class="value">${parameters.text}</span>
        `
      }
    }

    this.#element.classList.add('word')
  }

  public get index() {
    return this.#index
  }

  public get element() {
    return this.#element
  }

  public get letters() {
    return this.#letters
  }
}
