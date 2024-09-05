import { Word } from './Word.js'
import { Letter } from './Letter.js'
import { Media } from '@packages/media'

export class SlicerElement extends HTMLElement {
  #originalHTML = ''
  #words: Array<Word> = []
  #letters: Array<Letter> = []

  #media: Media | null = null

  public get wordsArray() {
    return this.#words
  }

  public get lettersArray() {
    return this.#letters
  }

  public get originalHTML() {
    return this.#originalHTML
  }

  protected connectedCallback() {
    this.#originalHTML = this.innerHTML.trim()

    if (this.hasAttribute('media')) {
      this.#media = new Media(this.getAttribute('media')!)

      this.#media.subscribe((e) => {
        if (e.current) {
          this.#split()
        } else if (!e.current && e.previous) {
          this.#unsplit()
        }
      })
    } else {
      this.#split()
    }
  }

  protected disconnectedCallback() {
    this.#unsplit()

    this.#media?.close()
  }

  #split() {
    console.log(this.childNodes)

    const nodes: Array<Node> = []

    this.#words = []

    let wordsAcc = 0

    let lettersAcc = 0

    this.childNodes.forEach((node) => {
      if (node.nodeName === '#text' && node.textContent) {
        const text = node.textContent.trim()

        text
          .replace(/  +/g, ' ')
          .split(' ')
          .map((text) => {
            const word = new Word({
              index: wordsAcc,
              text: text + ' ',
              letters: this.hasAttribute('letters'),
              lettersAcc,
              clone: this.hasAttribute('clone'),
            })

            lettersAcc += word.letters.length
            wordsAcc += 1

            this.#letters.push(...word.letters)

            this.#words.push(word)
            nodes.push(word.element)
          })
      } else {
        nodes.push(node)
      }
    })

    if (this.hasAttribute('index')) {
      this.#words.forEach((word) => {
        word.element.style.setProperty('--word-index', word.index.toString())
      })

      this.#letters.forEach((letter) => {
        letter.element.style.setProperty(
          '--letter-index',
          letter.index.toString()
        )
      })
    }

    this.innerHTML = ''

    nodes.forEach((node) => {
      this.appendChild(node)
    })

    this.style.setProperty('--words-length', this.#words.length.toString())
    this.style.setProperty('--letters-length', this.#letters.length.toString())
  }

  #unsplit() {
    this.#words = []
    this.innerHTML = this.#originalHTML
    this.style.removeProperty('--words-length')
    this.style.removeProperty('--letters-length')
  }
}

if (!customElements.get('e-slicer')) {
  customElements.define('e-slicer', SlicerElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-slicer': SlicerElement
  }
}
