import { Attribute } from '@packages/attribute'
import {
  Axes2D,
  dispatchEvent,
  getElementTransitionDurationMS,
  isBrowser,
} from '@packages/utils'

export interface AccordionToggleOptions {
  skipTransition?: boolean
  exclude?: HTMLElement
}

export interface AccordionEvents {
  accordionItemToggle: CustomEvent<{
    opened: boolean
  }>
}

class AccordionItem {
  #accordionElement: AccordionElement = null!
  #element: HTMLElement = null!

  #headElement: HTMLElement = null!
  #bodyElement: HTMLElement = null!

  #activeTimeoutId: ReturnType<typeof setTimeout> | undefined

  #opened = false

  constructor(accordionElement: AccordionElement, element: HTMLElement) {
    if (
      element.firstElementChild instanceof HTMLElement &&
      element.lastElementChild instanceof HTMLElement
    ) {
      this.#accordionElement = accordionElement
      this.#element = element

      this.#headElement = element.firstElementChild
      this.#bodyElement = element.lastElementChild

      this.#bodyElement.style.overflow = 'hidden'

      if (this.#accordionElement.axisAttribute.current === 'y') {
        this.#bodyElement.style.height = '0px'
      } else {
        this.#bodyElement.style.width = '0px'
      }

      addEventListener('resize', this.#windowResizeListener)

      this.#headElement.addEventListener('click', this.#headClickListener)

      if (this.#element.hasAttribute('data-opened')) {
        this.open({ skipTransition: true })
      }
    } else {
      accordionElement.removeItem(this.#element)
    }
  }

  public get element() {
    return this.#element
  }

  public destroy() {
    if (this.#headElement) {
      this.#element.classList.remove('opened', 'triggered')
      this.#element.removeAttribute('data-opened')
      this.#headElement.style.cursor = ''
      this.#setScrollSize(undefined)

      removeEventListener('resize', this.#windowResizeListener)

      this.#headElement.removeEventListener('click', this.#headClickListener)

      clearTimeout(this.#activeTimeoutId)
    }
  }

  public open(options?: Omit<AccordionToggleOptions, 'exclude'>) {
    if (options?.skipTransition) {
      this.#skipTransition()
    }

    if (!this.#accordionElement.multipleAttribute.current) {
      this.#accordionElement.closeAll({ exclude: this.#element })
    }

    this.#opened = true

    clearTimeout(this.#activeTimeoutId)

    this.#element.classList.add('triggered')
    this.#setScrollSize(this.#scrollSize)

    setTimeout(() => {
      this.#element.classList.add('opened')
      this.#element.setAttribute('data-opened', '')
    }, 0)

    dispatchEvent(this.element, 'accordionItemToggle', {
      bubbles: true,
      composed: true,
      detail: {
        opened: this.#opened,
      },
    })
  }

  public close(options?: Omit<AccordionToggleOptions, 'exclude'>) {
    if (options?.skipTransition) {
      this.#skipTransition()
    }

    this.#opened = false

    this.#element.classList.remove('opened')

    this.#setScrollSize(0)

    this.#activeTimeoutId = setTimeout(() => {
      this.#element.classList.remove('triggered')
    }, getElementTransitionDurationMS(this.#bodyElement))

    dispatchEvent(this.element, 'accordionItemToggle', {
      bubbles: true,
      composed: true,
      detail: {
        opened: this.#opened,
      },
    })
  }

  get #scrollSize() {
    return this.#accordionElement.axisAttribute.current === 'x'
      ? this.#bodyElement.scrollWidth
      : this.#bodyElement.scrollHeight
  }

  #headClickListener = () => {
    if (!this.#opened) {
      this.open()
    } else {
      this.close()
    }
  }

  #windowResizeListener = () => {
    if (this.#opened) {
      this.#setScrollSize(0, true)
      this.#setScrollSize(this.#scrollSize)
    }
  }

  #setScrollSize(value: number | undefined, skipDuration = false) {
    if (skipDuration) {
      this.#bodyElement.style.transition = 'all 0s'

      setTimeout(() => {
        this.#bodyElement.style.transition = ''
      })
    }

    const dim =
      this.#accordionElement.axisAttribute.current === 'x' ? 'width' : 'height'

    if (value != undefined) {
      this.#bodyElement.style[dim] = `${value}px`
    } else {
      this.#bodyElement.style[dim] = ''
    }
  }

  #skipTransition() {
    this.#bodyElement.style.transition = 'all 0s'

    setTimeout(() => {
      this.#bodyElement.style.transition = ''
    }, 50)
  }
}

export class AccordionElement extends HTMLElement {
  #axisAttribute = new Attribute<Axes2D>(this, 'axis', 'y')
  #multipleAttribute = new Attribute(this, 'multiple', false)
  #items: Array<AccordionItem> = []

  #mutationObserver: MutationObserver = null!

  constructor() {
    super()

    if (isBrowser) {
      this.#mutationObserver = new MutationObserver((records) => {
        records.forEach((record) => {
          record.removedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              this.removeItem(node)
            }
          })

          record.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              this.createItem(node)
            }
          })
        })
      })
    }
  }

  public get axisAttribute() {
    return this.#axisAttribute
  }

  public get multipleAttribute() {
    return this.#multipleAttribute
  }

  public createItem(element: HTMLElement) {
    if (!this.#items.find((item) => item.element === element)) {
      this.#items.push(new AccordionItem(this, element))
    }
  }

  public removeItem(element: HTMLElement) {
    this.#items = this.#items.filter((item) => {
      if (item.element !== element) {
        return true
      } else {
        item.destroy()
      }
    })
  }

  public closeAll(options?: AccordionToggleOptions) {
    this.#items.forEach((item) => {
      if (options?.exclude !== item.element) {
        item.close(options)
      }
    })
  }

  public openAll(options?: AccordionToggleOptions) {
    this.#items.forEach((item) => {
      if (options?.exclude !== item.element) {
        item.open(options)
      }
    })
  }

  protected connectedCallback() {
    this.#axisAttribute.observe()
    this.#multipleAttribute.observe()

    this.#mutationObserver.observe(this.#root, {
      childList: true,
    })

    this.#items = [...this.#root.children]
      .map((element) => {
        if (element instanceof HTMLElement) {
          return new AccordionItem(this, element)
        }
      })
      .filter((e) => !!e) as Array<AccordionItem>
  }

  protected disconnectedCallback() {
    this.#axisAttribute.unobserve()
    this.#multipleAttribute.unobserve()
    this.#mutationObserver.disconnect()
  }

  get #root(): HTMLElement | ShadowRoot {
    return this.shadowRoot ? this.shadowRoot : this
  }
}

if (isBrowser && !customElements.get('e-accordion')) {
  customElements.define('e-accordion', AccordionElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-accordion': AccordionElement
  }

  interface HTMLElementEventMap extends AccordionEvents {}
}
