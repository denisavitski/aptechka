// TODO

import { CustomElement, define } from '@packages/custom-element'
import { createStylesheet, element, span } from '@packages/element-constructor'

const stylesheet = createStylesheet({
  ':host': {
    position: 'relative',
    overflow: 'hidden',
    display: 'grid',
  },

  '.number1, .number2': {
    'grid-column': '1/1',
    'grid-row': '1/1',
  },
})

@define('e-counter')
export class CounterElement extends CustomElement {
  #from: number = null!
  #to: number = null!
  #step: number = null!
  #pad: number = null!
  #delay: number = null!
  #dir: number = null!
  #stop: number = null!
  #easing: string = null!

  #intervalId: ReturnType<typeof setInterval> | undefined

  #number1Element: HTMLElement = null!
  #number2Element: HTMLElement = null!

  #current: number = null!

  #counter = 0

  constructor() {
    super()

    this.openShadow(stylesheet)

    element(this, {
      children: [
        span({
          class: 'number1',
          ref: (e) => (this.#number1Element = e),
        }),
        span({
          class: 'number2',
          ref: (e) => (this.#number2Element = e),
        }),
      ],
    })
  }

  protected connectedCallback() {
    this.#from = parseInt(this.getAttribute('from') || '10')
    this.#to = parseInt(this.getAttribute('to') || '0')
    this.#step = parseInt(this.getAttribute('step') || '1')
    this.#pad = parseInt(
      this.getAttribute('pad') || this.#from.toString().length.toString()
    )
    this.#delay = parseInt(this.getAttribute('delay') || '1000')
    this.#dir = Math.sign(this.#to - this.#from)
    this.#stop = parseInt(this.getAttribute('stop') || '0')
    this.#easing = this.getAttribute('easing') || 'linear'

    this.#current = this.#from
    this.#counter = 0

    this.#updatetText(this.#number1Element)

    this.#number1Element.style.transition = `transform ${this.#delay / 1000}s`
    this.#number2Element.style.transition = `transform ${this.#delay / 1000}s`

    this.#intervalId = setInterval(this.#tick, this.#delay)
  }

  protected disconnectedCallback() {
    clearInterval(this.#intervalId)
  }

  #tick = () => {
    this.#current += this.#dir * this.#step

    this.#counter++

    if (this.#counter % 2 !== 0) {
      this.#transform(this.#number1Element, this.#number2Element)
    } else {
      this.#transform(this.#number2Element, this.#number1Element)
    }

    if (this.#current === this.#stop) {
      clearInterval(this.#intervalId)
    }
  }

  #transform(outElement: HTMLElement, inElement: HTMLElement) {
    this.#updatetText(inElement)

    inElement.style.transition = `0s`
    inElement.style.transform = `translateY(100%)`

    setTimeout(() => {
      inElement.style.transition = `transform ${this.#delay / 1000}s ${
        this.#easing
      }`
      inElement.style.transform = `translateY(0%)`
    }, 20)

    outElement.style.transform = `translateY(-100%)`
  }

  #updatetText(element: HTMLElement) {
    const sign = Math.sign(this.#current)

    element.textContent = `${sign >= 0 ? '' : '-'}${Math.abs(this.#current)
      .toString()
      .padStart(this.#pad, '0')}`
  }
}
