import { Attribute } from '@packages/attribute'
import { Store } from '@packages/store/vanilla'
import { dispatchEvent, getElementTransitionDurationMS } from '@packages/utils'

export interface PopoverEvents {
  popoverTriggered: CustomEvent
  popoverOpened: CustomEvent
  popoverClosing: CustomEvent
  popoverClosed: CustomEvent
}

export class PopoverElement extends HTMLElement {
  private static __opened: Array<PopoverElement> = []

  #openedIndex = -1
  #opened = new Store(false)
  #closeTimeoutId: ReturnType<typeof setTimeout> | undefined
  #history = new Attribute(this, 'history', false)
  #restore = new Attribute(this, 'restore', false)
  #single = new Attribute(this, 'single', false)
  #historyAllowed = false

  public get history() {
    return this.#history
  }

  public get restore() {
    return this.#restore
  }

  public get single() {
    return this.#single
  }

  public get opened() {
    return this.#opened
  }

  public open = (useTransition = true) => {
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

    dispatchEvent(this, 'popoverTriggered', {
      custom: true,
    })

    const opened = () => {
      addEventListener('click', this.#clickOutsideListener)
      addEventListener('keydown', this.#keydownListener)

      this.style.opacity = '1'
      this.classList.add('opened')

      dispatchEvent(this, 'popoverOpened', {
        custom: true,
      })
    }

    if (useTransition) {
      setTimeout(opened)
    } else {
      opened()
    }
  }

  public close = () => {
    if (!this.#opened.current) {
      return
    }

    this.#opened.current = false

    PopoverElement.__opened = PopoverElement.__opened.filter((m) => m !== this)

    this.#deleteSearchParam()

    this.classList.remove('opened')
    this.style.opacity = '0'

    dispatchEvent(this, 'popoverClosing', {
      custom: true,
    })

    removeEventListener('click', this.#clickOutsideListener)
    removeEventListener('keydown', this.#keydownListener)

    setTimeout(() => {
      this.classList.remove('triggered')
      this.style.display = 'none'

      dispatchEvent(this, 'popoverClosed', {
        custom: true,
      })
    }, getElementTransitionDurationMS(this) + 10)
  }

  protected connectedCallback() {
    this.#history.observe()
    this.#restore.observe()
    this.#single.observe()

    this.style.opacity = '0'
    this.style.display = 'none'

    this.setAttribute('popover-target', '')

    addEventListener('popstate', this.#popStateListener)

    setTimeout(() => {
      if (this.#restore.current) {
        this.#popStateListener()
      } else {
        this.#deleteSearchParam()
        this.#historyAllowed = true
      }
    }, 0)
  }

  protected disconnectedCallback() {
    this.#history.unobserve()
    this.#restore.unobserve()
    this.#single.unobserve()

    this.style.opacity = ''
    this.style.display = ''

    this.removeAttribute('popover-target')

    PopoverElement.__opened = PopoverElement.__opened.filter((m) => m !== this)

    clearTimeout(this.#closeTimeoutId)

    removeEventListener('popstate', this.#popStateListener)
  }

  get #path() {
    return `${location.pathname}${
      location.search ? location.search + '&' : '?'
    }${this.id}`
  }

  #clickOutsideListener = (event: MouseEvent) => {
    this.#withOrder(() => {
      const path = event.composedPath()

      const target = path[0]

      const containsTarget =
        target instanceof HTMLElement &&
        (this.contains(target) || this.shadowRoot?.contains(target))

      const outsideTarget =
        target instanceof HTMLElement && target.hasAttribute('outside')

      if (!containsTarget || outsideTarget) {
        this.close()
      }
    })
  }

  #deleteSearchParam() {
    if (this.#history.current) {
      const url = new URL(location.href)
      url.searchParams.delete(this.id)
      history.replaceState(null, '', url.href)
    }
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
      !location.search.includes(this.id)
    ) {
      this.close()
    } else if (
      !this.#opened.current &&
      this.#history.current &&
      location.search.includes(this.id)
    ) {
      this.open()
    }

    this.#historyAllowed = true
  }
}

if (!customElements.get('e-popover')) {
  customElements.define('e-popover', PopoverElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-popover': PopoverElement
  }

  interface HTMLElementEventMap extends PopoverEvents {}
}
