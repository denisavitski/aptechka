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

      const reg1 =
        /([\s\u00A0\u1680\u2000-\u200F\u2028\u2029\u202F\u205F\u3000\uFEFF\-–—])/

      const reg2 =
        /^[\s\u00A0\u1680\u2000-\u200F\u2028\u2029\u202F\u205F\u3000\uFEFF\-–—]$/

      const wordParts = parameters.text
        .split(reg1)
        .filter((part) => part.trim() !== '')

      if (wordParts.length > 1) {
        this.#element.classList.add('words-inside')
      }

      wordParts.forEach((word, wordIndex, wordArray) => {
        const letters = word.split('').map((letter) => {
          if (letter !== ' ') {
            return new Letter({
              index: parameters.lettersAcc! + i++,
              text: letter,
              clone: parameters.clone,
            })
          }
        })

        this.#letters = letters.filter((l) => l instanceof Letter)

        if (wordArray.length > 1) {
          const el = document.createElement('span')

          el.append(
            ...this.#letters.map((l) => {
              return l.element
            }),
          )
          this.#element.append(el)

          if (wordIndex !== wordArray.length - 1) {
            this.#element.append(el)
          }
        } else {
          this.#element.append(
            ...this.#letters.map((l) => {
              return l.element
            }),
          )
        }
      })
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
