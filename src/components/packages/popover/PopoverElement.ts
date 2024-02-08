import { Attribute } from '@packages/attribute'
import { CustomElement, define } from '@packages/custom-element'
import { Store } from '@packages/store'
import { getElementTransitionDurationMS } from '@packages/utils'

@define('e-popover')
export class PopoverElement extends CustomElement {
  private static __opened: Array<PopoverElement> = []

  #openedIndex = -1
  #opened = new Store(false)
  #closeTimeoutId: ReturnType<typeof setTimeout> | undefined
  #history = new Attribute(this, 'history', false)
  #single = new Attribute(this, 'single', false)
  #historyAllowed = false

  public get history() {
    return this.#history
  }

  public get single() {
    return this.#single
  }

  public get opened() {
    return this.#opened
  }

  public open() {
    if (this.#opened.current) {
      return
    }

    this.#opened.current = true

    if (this.#single.current) {
      PopoverElement.__opened.forEach((m) => m.close())
      PopoverElement.__opened = []
    }

    PopoverElement.__opened.push(this)
    this.#openedIndex = PopoverElement.__opened.length - 1

    if (this.#history.current && this.#historyAllowed) {
      history.pushState('', '', this.#path)
    }

    clearTimeout(this.#closeTimeoutId)

    this.classList.add('triggered')
    this.style.display = 'block'

    addEventListener('click', this.#clickOutsideListener)
    addEventListener('keydown', this.#keydownListener)

    setTimeout(() => {
      this.style.opacity = '1'
      this.classList.add('opened')
    })
  }

  public close() {
    if (!this.#opened.current) {
      return
    }

    this.#opened.current = false

    PopoverElement.__opened = PopoverElement.__opened.filter((m) => m !== this)

    if (this.#history.current) {
      history.replaceState('', '', location.pathname.replace(this.id, ''))
    }

    this.classList.remove('opened')
    this.style.opacity = '0'

    removeEventListener('click', this.#clickOutsideListener)
    removeEventListener('keydown', this.#keydownListener)

    setTimeout(() => {
      this.classList.remove('triggered')
      this.style.display = 'none'
    }, getElementTransitionDurationMS(this))
  }

  protected connectedCallback() {
    this.style.opacity = '0'
    this.style.display = 'none'

    addEventListener('popstate', this.#popStateListener)

    setTimeout(() => {
      this.#popStateListener()
    }, 0)
  }

  protected disconnectedCallback() {
    clearTimeout(this.#closeTimeoutId)
    removeEventListener('popstate', this.#popStateListener)
  }

  get #path() {
    return `${location.pathname}${location.pathname.endsWith('/') ? '' : '/'}${
      this.id
    }`
  }

  #clickOutsideListener = (event: MouseEvent) => {
    this.#withOrder(() => {
      const path = event.composedPath()

      if (
        (!path.find((p) => p === this) &&
          !path.find(
            (p) => p instanceof HTMLElement && p.closest('e-popover-button')
          )) ||
        (path[0] instanceof HTMLElement && path[0].hasAttribute('outside'))
      ) {
        this.close()
      }
    })
  }

  #keydownListener = (event: KeyboardEvent) => {
    this.#withOrder(() => {
      if (event.code === 'Escape') {
        this.close()
      }
    })
  }

  #withOrder(okCallback: Function) {
    if (
      PopoverElement.__opened[this.#openedIndex - 1] ||
      PopoverElement.__opened.length === 1
    ) {
      okCallback()
    }
  }

  #popStateListener = () => {
    this.#historyAllowed = false

    if (
      this.#opened.current &&
      this.#history.current &&
      !location.pathname.includes(this.id)
    ) {
      this.close()
    } else if (
      !this.#opened.current &&
      this.#history.current &&
      location.pathname.includes(this.id)
    ) {
      this.open()
    }

    this.#historyAllowed = true
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-popover': PopoverElement
  }
}
