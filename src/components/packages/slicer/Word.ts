import { Letter } from './Letter'

export interface WordParameters {
  index: number
  text: string
  letters?: boolean
  lettersAcc?: number
  clone?: boolean
}

export class Word {
  #index: number
  #element: HTMLSpanElement
  #letters: Array<Letter>
  #hasNewLine: boolean

  constructor(parameters: WordParameters) {
    this.#index = parameters.index
    this.#element = document.createElement('span')
    this.#letters = []

    this.#hasNewLine = parameters.text.endsWith('\\n')

    if (this.#hasNewLine) {
      parameters.text = parameters.text.replace('\\n', '')
    }

    if (parameters.letters && parameters.lettersAcc !== undefined) {
      let i = 0

      const letters = parameters.text.split('').map((letter) => {
        if (letter !== ' ') {
          return new Letter({
            index: parameters.lettersAcc! + i++,
            text: letter,
            clone: parameters.clone,
          })
        }
      })

      this.#letters = letters.filter((l) => l instanceof Letter)

      this.#element.append(
        ...this.#letters.map((l) => {
          return l.element
        })
      )
    } else {
      if (parameters.clone) {
        this.#element.innerHTML = `<span class="original"><span class="value">${parameters.text}</span></span><span class="clone" aria-hidden><span class="value">${parameters.text}</span></span>`
      } else {
        this.#element.innerHTML = `<span class="original"><span class="value">${parameters.text}</span></span>`
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

  public get hasNewLine() {
    return this.#hasNewLine
  }
}
