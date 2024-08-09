import { PopoverElement } from './PopoverElement'
import { element } from '@packages/client/element-constructor'
import { isBrowser } from '@packages/client/utils'

export type PopoverButtonType = 'open' | 'close' | 'toggle'

export class PopoverButtonElement extends HTMLElement {
  #popoverElement: PopoverElement | undefined

  constructor() {
    super()

    if (isBrowser) {
      element(this, {
        tabindex: this.getAttribute('tabindex') || '0',
        onClick: () => {
          if (this.#popoverElement) {
            const type = this.getAttribute('type') || 'open'

            if (
              type === 'open' ||
              (type === 'toggle' && !this.#popoverElement.opened.current)
            ) {
              this.#popoverElement.open()
            } else if (
              type === 'close' ||
              (type === 'toggle' && this.#popoverElement.opened.current)
            ) {
              this.#popoverElement.close()
            }
          }
        },
        onKeydown: (e) => {
          if (e.code === 'Space') {
            ;(e.currentTarget as HTMLElement).click()
          }
        },
      })
    }
  }

  public get popoverElement() {
    return this.#popoverElement
  }

  protected connectedCallback() {
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
  }

  protected disconnectedCallback() {
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
  }

  #popoverClosingListener = () => {
    this.classList.remove('opened')
  }

  #popoverClosedListener = () => {
    this.classList.remove('triggered')
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
