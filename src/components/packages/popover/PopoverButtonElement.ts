import { CSSProperty } from '@packages/css-property'
import { PopoverElement } from './PopoverElement'
import { isBrowser } from '@packages/utils'

export type PopoverButtonType = 'open' | 'close' | 'toggle'

export class PopoverButtonElement extends HTMLElement {
  #popoverElement: PopoverElement | undefined
  #type = new CSSProperty<PopoverButtonType>(this, '--type', 'open')

  constructor() {
    super()

    if (isBrowser) {
      this.addEventListener('click', () => {
        if (this.#popoverElement) {
          const type = this.#type.current

          if (
            type === 'open' ||
            (type === 'toggle' && !this.#popoverElement.opened.current)
          ) {
            this.#popoverElement.open({ trigger: this })
          } else if (
            type === 'close' ||
            (type === 'toggle' && this.#popoverElement.opened.current)
          ) {
            this.#popoverElement.close()
          }
        }
      })

      this.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
          ;(e.currentTarget as HTMLElement).click()
        }
      })
    }
  }

  public get type() {
    return this.#type
  }

  public get popoverElement() {
    return this.#popoverElement
  }

  protected connectedCallback() {
    this.#type.subscribe((e) => {
      if (this.#popoverElement) {
        if (e.current !== 'close') {
          this.setAttribute('aria-has-popup', 'true')
          this.setAttribute(
            'aria-expanded',
            this.#popoverElement.opened.current ? 'true' : 'false'
          )
          this.setAttribute('aria-controls', this.#popoverElement.id || '')
        } else {
          this.removeAttribute('aria-has-popup')
          this.removeAttribute('aria-expanded')
          this.removeAttribute('aria-controls')
        }
      }
    })

    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0
    }

    const targetId = this.getAttribute('target')

    if (targetId) {
      let popoverElement: Element | null | undefined = null

      if (targetId === 'parent') {
        const closestTarget = this.closest('[popover-target]')

        if (closestTarget) {
          popoverElement = closestTarget
        } else {
          const rootNode = this.getRootNode()

          if (rootNode instanceof ShadowRoot) {
            popoverElement = rootNode.host.closest('[popover-target]')
          } else if (rootNode instanceof HTMLElement) {
            popoverElement = rootNode.closest('[popover-target]')
          }
        }
      } else if (targetId === 'sibling') {
        popoverElement = this.parentElement?.querySelector('[popover-target]')
      } else {
        popoverElement =
          document.querySelector(`#${targetId}`) ||
          (this.getRootNode() as ParentNode).querySelector(`#${targetId}`)
      }

      if (popoverElement instanceof HTMLElement) {
        this.#popoverElement = popoverElement as PopoverElement

        this.#popoverElement.addEventListener(
          'popoverTriggered',
          this.#popoverTriggeredListener
        )
        this.#popoverElement.addEventListener(
          'popoverOpened',
          this.#popoverOpenedListener
        )
        this.#popoverElement.addEventListener(
          'popoverClosing',
          this.#popoverClosingListener
        )
        this.#popoverElement.addEventListener(
          'popoverClosed',
          this.#popoverClosedListener
        )
      } else {
        console.warn(this, `target ${targetId} not found`)
      }
    }

    this.#type.observe()
  }

  protected disconnectedCallback() {
    this.#type.unobserve()

    this.removeAttribute('aria-has-popup')
    this.removeAttribute('aria-expanded')
    this.removeAttribute('aria-controls')

    if (this.#popoverElement) {
      this.#popoverElement.removeEventListener(
        'popoverTriggered',
        this.#popoverTriggeredListener
      )

      this.#popoverElement.removeEventListener(
        'popoverOpened',
        this.#popoverOpenedListener
      )

      this.#popoverElement.removeEventListener(
        'popoverClosing',
        this.#popoverClosingListener
      )

      this.#popoverElement.removeEventListener(
        'popoverClosed',
        this.#popoverClosedListener
      )
    }
  }

  #popoverTriggeredListener = () => {
    this.classList.add('triggered')
  }

  #popoverOpenedListener = () => {
    this.classList.add('opened')

    this.setAttribute('aria-expanded', 'true')
  }

  #popoverClosingListener = () => {
    this.classList.remove('opened')
  }

  #popoverClosedListener = () => {
    this.classList.remove('triggered')

    this.setAttribute('aria-expanded', 'false')
  }
}

if (!customElements.get('e-popover-button')) {
  customElements.define('e-popover-button', PopoverButtonElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-popover-button': PopoverButtonElement
  }
}
