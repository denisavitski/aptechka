import { CustomElement, define } from '@packages/custom-element'
import { Attribute } from '@packages/attribute'
import {
  Axes2D,
  getElementTransitionDurationMS,
  isBrowser,
} from '@packages/utils'

export interface AccordionItemToggleEventDetail {
  opened: boolean
}

export interface AccordionToggleOptions {
  skipTransition?: boolean
  exclude?: HTMLElement
}

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
        this.open({ skipTransition: true })
      }
    } else {
      accordionElement.removeItem(this.#element)
    }
  }

  public get element() {
    return this.#element
  }

  public get opened() {
    return this.#opened
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

  public open(options?: Omit<AccordionToggleOptions, 'exclude'>) {
    if (options?.skipTransition) {
      this.#skipTransition()
    }

    if (!this.#accordionElement.multipleAttribute.current) {
      this.#accordionElement.closeAll({ exclude: this.#element })
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

    this.#dispatchEvent('toggle')
  }

  public close(options?: Omit<AccordionToggleOptions, 'exclude'>) {
    if (options?.skipTransition) {
      this.#skipTransition()
    }

    this.#opened = false

    this.#element.classList.remove('opened')

    this.#setScrollHeight(0)

    this.#activeTimeoutId = setTimeout(() => {
      this.#element.classList.remove('triggered')
    }, getElementTransitionDurationMS(this.#bodyElement))

    this.#dispatchEvent('toggle')
  }

  get #root() {
    return this.#element.parentElement || this.#element.getRootNode()
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
    this.#dispatchEvent('size-change')
  }

  #childrenSizeChangeListener = () => {
    if (this.#opened) {
      this.#setScrollHeight(0, true)
      this.#setScrollHeight(this.#bodyElement.scrollHeight)
    }
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

  #dispatchEvent(name: 'toggle' | 'size-change') {
    if (name === 'toggle') {
      this.#element.dispatchEvent(
        new CustomEvent<AccordionItemToggleEventDetail>(
          'accordion-item-toggle',
          {
            bubbles: true,
            composed: true,
            detail: {
              opened: this.#opened,
            },
          }
        )
      )
    } else if (name === 'size-change') {
      this.#root.dispatchEvent(
        new CustomEvent('accordion-item-size-change', {
          bubbles: true,
          composed: true,
        })
      )
    }
  }

  #skipTransition() {
    this.#bodyElement.style.transition = 'all 0s'

    setTimeout(() => {
      this.#bodyElement.style.transition = ''
    }, 50)
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
    'accordion-item-toggle': CustomEvent<AccordionItemToggleEventDetail>
  }
}
