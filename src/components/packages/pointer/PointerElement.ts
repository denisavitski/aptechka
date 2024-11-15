import { CSSProperty } from '@packages/css-property'
import { Pointer } from './Pointer'
import { isBrowser } from '@packages/utils'

export class PointerElement extends HTMLElement {
  #pointer: Pointer

  #dampingCSSProperty = new CSSProperty<number>(this, '--damping', 20)
  #massCSSProperty = new CSSProperty<number>(this, '--mass', 0)
  #stiffnessCSSProperty = new CSSProperty<number>(this, '--stiffness', 0)
  #cartesianCSSProperty = new CSSProperty<boolean>(this, '--cartesian', false)
  #normalizeCSSProperty = new CSSProperty<boolean>(this, '--normalize', false)

  constructor() {
    super()

    this.#pointer = new Pointer({
      element: this,
    })

    this.#dampingCSSProperty.subscribe((e) => {
      this.#pointer.x.damping = e.current
      this.#pointer.y.damping = e.current
      this.#pointer.z.damping = e.current
    })

    this.#cartesianCSSProperty.subscribe((e) => {
      this.#pointer.cartesian = e.current
    })

    this.#normalizeCSSProperty.subscribe((e) => {
      this.#pointer.normalize = e.current
    })

    this.#massCSSProperty.subscribe((e) => {
      this.#pointer.x.mass = e.current
      this.#pointer.y.mass = e.current
      this.#pointer.z.mass = e.current
    })

    this.#stiffnessCSSProperty.subscribe((e) => {
      this.#pointer.x.stiffness = e.current
      this.#pointer.y.stiffness = e.current
      this.#pointer.z.stiffness = e.current
    })

    this.#pointer.x.subscribe((e) => {
      this.style.setProperty('--x', e.current.toString())
    })

    this.#pointer.y.subscribe((e) => {
      this.style.setProperty('--y', e.current.toString())
    })

    this.#pointer.z.subscribe((e) => {
      this.style.setProperty('--z', e.current.toString())
    })
  }

  public get pointer() {
    return this.#pointer
  }

  protected connectedCallback() {
    this.#pointer.connect()

    this.#dampingCSSProperty.observe()
    this.#massCSSProperty.observe()
    this.#stiffnessCSSProperty.observe()
  }

  protected disconnectedCallback() {
    this.#pointer.disconnect()

    this.#dampingCSSProperty.unobserve()
    this.#massCSSProperty.unobserve()
    this.#stiffnessCSSProperty.unobserve()

    this.style.removeProperty('--x')
    this.style.removeProperty('--y')
    this.style.removeProperty('--z')
  }
}

if (isBrowser && !customElements.get('e-pointer')) {
  customElements.define('e-pointer', PointerElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-pointer': PointerElement
  }
}
