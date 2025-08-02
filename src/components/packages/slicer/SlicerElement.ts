import { Word } from './Word'
import { Letter } from './Letter'
import { Media } from '@packages/media'
import { isBrowser } from '@packages/utils'

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
    console.log(this.#originalHTML)

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
    const nodes: Array<Node> = []
    this.#words = []
    let wordsAcc = 0
    let lettersAcc = 0

    const processTextNode = (textNode: Text) => {
      const text = textNode.textContent?.trim()
      if (!text) return document.createDocumentFragment()

      const fragment = document.createDocumentFragment()
      text
        .replace(
          /[\s\u00A0\u1680\u2000-\u200F\u2028\u2029\u202F\u205F\u3000\uFEFF]+/g,
          ' '
        )
        .split(' ')
        .forEach((wordText, i, arr) => {
          if (!wordText) return

          const word = new Word({
            index: wordsAcc,
            text: wordText + (i < arr.length - 1 ? ' ' : ''),
            letters: this.hasAttribute('letters'),
            lettersAcc,
            clone: this.hasAttribute('clone'),
          })

          lettersAcc += word.letters.length
          wordsAcc += 1

          this.#letters.push(...word.letters)
          this.#words.push(word)
          fragment.appendChild(word.element)
        })

      return fragment
    }

    const walk = (node: Node): Node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return processTextNode(node as Text)
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const clone = node.cloneNode(false) as Element

        Array.from(node.childNodes).forEach((child) => {
          const processedChild = walk(child)

          if (processedChild) {
            if (processedChild.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
              Array.from(processedChild.childNodes).forEach((node, i, arr) => {
                clone.append(node)

                if (i !== arr.length - 1) {
                  clone.append(new Text(' '))
                }
              })
            } else {
              clone.appendChild(processedChild)
            }
          }
        })

        return clone
      }

      return node.cloneNode()
    }

    Array.from(this.childNodes).forEach((node) => {
      const processedNode = walk(node)

      if (processedNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        nodes.push(...Array.from(processedNode.childNodes))
      } else {
        nodes.push(processedNode)
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

    nodes.forEach((node, i) => {
      this.appendChild(node)

      if (i < nodes.length - 1 && node.nodeType === Node.ELEMENT_NODE) {
        this.appendChild(new Text(' '))
      }
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

if (isBrowser && !customElements.get('e-slicer')) {
  customElements.define('e-slicer', SlicerElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-slicer': SlicerElement
  }
}
