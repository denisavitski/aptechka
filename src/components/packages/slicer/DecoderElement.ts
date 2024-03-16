import { generateId } from '@packages/utils'
import { Letter, LetterParameters } from './Letter'
import { SlicerElement } from './SlicerElement'
import { define } from '@packages/custom-element'

class DecoderLetter extends Letter {
  #chars: string

  constructor(parameters: LetterParameters) {
    super(parameters)

    this.#chars =
      generateId(
        2 + Math.floor(Math.random() * 15),
        'abcdefghijklmnopqrstuvwxyz0123456789#!%$^&*+=?'
      ) + parameters.text

    this.play(0)
  }

  public play(progress: number) {
    const current = Math.floor(progress * (this.#chars.length - 1))
    this.element.textContent = this.#chars[current]
  }
}

@define('e-decoder')
export class DecoderElement extends SlicerElement {
  constructor() {
    super({
      letterConstructor: DecoderLetter,
    })
  }

  public play(progress: number) {
    this.lettersArray.forEach((letter) => {
      ;(letter as DecoderLetter).play(progress)
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-decoder': DecoderElement
  }
}
