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
            (type === 'toggle' && !this.#popoverElement.opened)
          ) {
            this.#popoverElement.open({ trigger: this })
          } else if (
            type === 'close' ||
            (type === 'toggle' && this.#popoverElement.opened)
          ) {
            this.#popoverElement.close()
          }
        }
      })

      this.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !this.hasAttribute('keydown-disabled')) {
          e.preventDefault()
          this.click()
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

  public changePopover(targetId: string) {
    this.#unlistenPopover()

    if (targetId) {
      let popoverElement: Element | null | undefined = null

      if (targetId === 'parent') {
        const closestTarget = this.closest('[data-popover]')

        if (closestTarget) {
          popoverElement = closestTarget
        } else {
          const rootNode = this.getRootNode()

          if (rootNode instanceof ShadowRoot) {
            popoverElement = rootNode.host.closest('[data-popover]')
          } else if (rootNode instanceof HTMLElement) {
            popoverElement = rootNode.closest('[data-popover]')
          }
        }
      } else if (targetId === 'sibling') {
        popoverElement = this.parentElement?.querySelector('[data-popover]')
      } else if (targetId === 'ancestor-child') {
        const find = (el: HTMLElement | null): HTMLElement | null => {
          if (!el) {
            return null
          }

          let founded = el.querySelector<HTMLElement>('[data-popover]')

          if (!founded && el?.parentElement) {
            founded = find(el.parentElement)
          }

          return founded
        }

        popoverElement = find(this.parentElement) || null
      } else {
        let selector = targetId

        if (isNaN(parseInt(selector))) {
          if (
            !targetId.startsWith('.') &&
            !targetId.startsWith('[') &&
            !targetId.startsWith('#')
          ) {
            selector = `#${targetId}`
          }

          popoverElement =
            document.querySelector(selector) ||
            (this.getRootNode() as ParentNode).querySelector(selector)
        }

        if (!popoverElement) {
          const elements = [...document.querySelectorAll('[data-popover-ids]')]
          const founded = elements.find((el) =>
            el
              .getAttribute('data-popover-ids')
              ?.split(',')
              .find((v) => v.trim() === targetId)
          )

          if (founded) {
            popoverElement = founded
          }
        }
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

    this.#updateType(this.#type.current)
  }

  protected connectedCallback() {
    this.#type.subscribe((e) => {
      this.#updateType(e.current)
    })

    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0
    }

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button')
    }

    const targetId = this.getAttribute('target')

    if (targetId) {
      this.changePopover(targetId)
    }

    if (this.isConnected) {
      this.#type.observe()
    }
  }

  protected disconnectedCallback() {
    this.#type.unobserve()

    this.removeAttribute('aria-haspopup')
    this.removeAttribute('aria-expanded')
    this.removeAttribute('aria-controls')
    this.removeAttribute('role')
    this.removeAttribute('tabindex')

    this.#unlistenPopover()
  }

  #unlistenPopover() {
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

  #popoverTriggeredListener = (e: Event) => {
    if (e.target !== this.#popoverElement) {
      return
    }

    if (this.#type.current !== 'close') {
      this.classList.add('triggered')
    }
  }

  #popoverOpenedListener = (e: Event) => {
    if (e.target !== this.#popoverElement) {
      return
    }

    if (this.#type.current !== 'close') {
      this.classList.add('opened')
      this.setAttribute('aria-expanded', 'true')
    }
  }

  #popoverClosingListener = (e: Event) => {
    if (e.target !== this.#popoverElement) {
      return
    }

    if (this.#type.current !== 'close') {
      this.classList.remove('opened')
    }
  }

  #popoverClosedListener = (e: Event) => {
    if (e.target !== this.#popoverElement) {
      return
    }

    if (this.#type.current !== 'close') {
      this.classList.remove('triggered')
      this.setAttribute('aria-expanded', 'false')
    }
  }

  #updateType(value: PopoverButtonType) {
    if (this.#popoverElement instanceof PopoverElement) {
      if (value !== 'close') {
        this.setAttribute('aria-haspopup', 'true')
        this.setAttribute(
          'aria-expanded',
          this.#popoverElement.opened ? 'true' : 'false'
        )
        this.setAttribute('aria-controls', this.#popoverElement.id || '')
      } else {
        this.removeAttribute('aria-haspopup')
        this.removeAttribute('aria-expanded')
        this.removeAttribute('aria-controls')
      }
    }
  }
}

if (isBrowser && !customElements.get('e-popover-button')) {
  customElements.define('e-popover-button', PopoverButtonElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-popover-button': PopoverButtonElement
  }
}
