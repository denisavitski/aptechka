import { CustomElement, define } from '@packages/custom-element'
import { Attribute } from '@packages/attribute'
import {
  Axes2D,
  getElementTransitionDurationMS,
  isBrowser,
} from '@packages/utils'

export interface AccordionItemOptions {}

class AccordionItem {
  #accordionElement: AccordionElement = null!
  #element: HTMLElement = null!

  #headElement: HTMLElement = null!
  #bodyElement: HTMLElement = null!

  #resizeObserver: ResizeObserver = null!
  #observed = false

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

      this.#headElement.style.cursor = 'default'
      this.#bodyElement.style.height = '0px'
      this.#bodyElement.style.overflow = 'hidden'

      this.#resizeObserver = new ResizeObserver(this.#bodyResizeListener)

      addEventListener('resize', this.#windowResizeListener)

      this.#headElement.addEventListener('click', this.#headClickListener)
      this.#element.addEventListener(
        'accordion-item-size-change',
        this.#childrenSizeChangeListener
      )

      if (this.#element.hasAttribute('data-opened')) {
        const duration = getElementTransitionDurationMS(this.#bodyElement)

        this.#bodyElement.style.transition = 'all 0s'

        this.open()

        setTimeout(() => {
          this.#bodyElement.style.transition = ''
        }, duration)
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
      this.#headElement.style.cursor = ''
      this.#setScrollHeight(undefined)

      this.#resizeObserver.disconnect()
      removeEventListener('resize', this.#windowResizeListener)

      this.#headElement.removeEventListener('click', this.#headClickListener)
      this.#element.removeEventListener(
        'accordion-item-size-change',
        this.#childrenSizeChangeListener
      )

      clearTimeout(this.#activeTimeoutId)
    }
  }

  public open() {
    if (!this.#accordionElement.multipleAttribute.current) {
      this.#accordionElement.closeAll()
    }

    if (!this.#observed) {
      this.#resizeObserver.observe(this.#bodyElement)
    }

    this.#opened = true

    clearTimeout(this.#activeTimeoutId)

    this.#element.classList.add('triggered')
    this.#setScrollHeight(this.#bodyElement.scrollHeight)

    setTimeout(() => {
      this.#element.classList.add('opened')
    }, 0)
  }

  public close() {
    this.#opened = false

    this.#element.classList.remove('opened')

    this.#setScrollHeight(0)

    this.#activeTimeoutId = setTimeout(() => {
      this.#element.classList.remove('triggered')
    }, getElementTransitionDurationMS(this.#bodyElement))
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
      this.#setScrollHeight(0, true)
      this.#setScrollHeight(this.#bodyElement.scrollHeight)
    }
  }

  #bodyResizeListener = () => {
    ;(this.#element.parentElement || this.#element.getRootNode()).dispatchEvent(
      new CustomEvent('accordion-item-size-change', {
        bubbles: true,
        composed: true,
      })
    )
  }

  #childrenSizeChangeListener = () => {
    this.#setScrollHeight(0, true)
    this.#setScrollHeight(this.#bodyElement.scrollHeight)
  }

  #setScrollHeight(value: number | undefined, skipDuration = false) {
    if (skipDuration) {
      this.#bodyElement.style.transition = 'all 0s'

      setTimeout(() => {
        this.#bodyElement.style.transition = ''
      })
    }

    if (value != undefined) {
      this.#bodyElement.style.height = `${value}px`
    } else {
      this.#bodyElement.style.height = ''
    }
  }
}

@define('e-accordion')
export class AccordionElement extends CustomElement {
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

  public closeAll() {
    this.#items.forEach((item) => {
      item.close()
    })
  }

  public openAll() {
    this.#items.forEach((item) => {
      item.open()
    })
  }

  protected connectedCallback() {
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
    this.#mutationObserver.disconnect()
  }

  get #root(): HTMLElement | ShadowRoot {
    return this.shadowRoot ? this.shadowRoot : this
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-accordion': AccordionElement
  }

  interface HTMLElementEventMap {
    'accordion-item-size-change': CustomEvent
  }
}
