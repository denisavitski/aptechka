import { Attribute } from '@packages/attribute'
import { CSSProperty } from '@packages/css-property'
import { Store } from '@packages/store/vanilla'
import {
  debounce,
  dispatchEvent,
  getElementTransitionDurationMS,
} from '@packages/utils'
import { windowResizer } from '@packages/window-resizer/vanilla'

export interface PopoverEvents {
  popoverTriggered: CustomEvent<{ trigger: any }>
  popoverOpened: CustomEvent<{ trigger: any }>
  popoverClosing: CustomEvent
  popoverClosed: CustomEvent
}

export class PopoverElement extends HTMLElement {
  private static __opened: Array<PopoverElement> = []

  #openedIndex = -1
  #opened = new Store(false)
  #closeTimeoutId: ReturnType<typeof setTimeout> | undefined
  #openTimeoutId: ReturnType<typeof setTimeout> | undefined
  #history = new CSSProperty(this, '--history', false)
  #restore = new CSSProperty(this, '--restore', false)
  #dominance = new CSSProperty(this, '--dominance', 0)
  #clickOutside = new CSSProperty(this, '--click-outside', false)
  #escape = new CSSProperty(this, '--escape', false)
  #historyAllowed = false
  #lastTrigger: any

  public get history() {
    return this.#history
  }

  public get restore() {
    return this.#restore
  }

  public get dominance() {
    return this.#dominance
  }

  public get clickOutside() {
    return this.#clickOutside
  }

  public get escape() {
    return this.#escape
  }

  public get opened() {
    return this.#opened
  }

  public get lastTrigger() {
    return this.#lastTrigger
  }

  public open = (options?: { skipTransition?: boolean; trigger?: any }) => {
    if (this.#opened.current) {
      return
    }

    this.#lastTrigger = options?.trigger

    this.#opened.current = true

    if (this.#dominance.current) {
      PopoverElement.__opened = PopoverElement.__opened.filter((e) => {
        if (e !== this && this.dominance.current >= e.dominance.current) {
          e.close()
          return false
        }

        return true
      })
    }

    PopoverElement.__opened.push(this)
    this.#openedIndex = PopoverElement.__opened.length - 1

    if (this.#history.current && this.#historyAllowed) {
      history.pushState('', '', this.#path)
    }

    clearTimeout(this.#closeTimeoutId)

    this.classList.remove('closing')
    this.classList.add('triggered')
    this.style.display = 'block'

    dispatchEvent(this, 'popoverTriggered', {
      custom: true,
      detail: {
        trigger: this.#lastTrigger,
      },
    })

    const opened = () => {
      addEventListener('click', this.#clickOutsideListener)
      addEventListener('keydown', this.#keydownListener)

      this.#resize()

      this.style.opacity = '1'
      this.classList.add('opened')

      dispatchEvent(this, 'popoverOpened', {
        custom: true,
        detail: {
          trigger: this.#lastTrigger,
        },
      })

      this.#openTimeoutId = undefined
    }

    if (options?.skipTransition) {
      opened()
    } else {
      this.#openTimeoutId = setTimeout(opened, 10)
    }
  }

  public close = () => {
    if (!this.#opened.current) {
      return
    }

    removeEventListener('click', this.#clickOutsideListener)
    removeEventListener('keydown', this.#keydownListener)

    this.#opened.current = false

    PopoverElement.__opened = PopoverElement.__opened.filter((m) => {
      if (m === this) {
        return false
      } else if (
        m.#dominance.current < this.dominance.current &&
        !m.#openTimeoutId
      ) {
        m.close()
        return false
      }

      return true
    })

    this.#deleteSearchParam()

    this.classList.remove('opened')
    this.classList.add('closing')
    this.style.opacity = '0'

    dispatchEvent(this, 'popoverClosing', {
      custom: true,
    })

    setTimeout(() => {
      this.classList.remove('triggered')
      this.classList.remove('closing')
      this.style.display = 'none'

      dispatchEvent(this, 'popoverClosed', {
        custom: true,
      })
    }, getElementTransitionDurationMS(this) + 10)
  }

  protected connectedCallback() {
    this.#history.observe()
    this.#restore.observe()
    this.#dominance.observe()
    this.#clickOutside.observe()
    this.#escape.observe()

    this.style.opacity = '0'
    this.style.display = 'none'

    this.setAttribute('popover-target', '')
    this.classList.remove('closing')
    this.classList.remove('closed')
    this.classList.remove('triggered')
    this.classList.remove('opened')

    addEventListener('popstate', this.#popStateListener)

    setTimeout(() => {
      if (this.#restore.current) {
        this.#popStateListener()
      } else {
        this.#deleteSearchParam()
        this.#historyAllowed = true
      }
    }, 0)

    windowResizer.subscribe(this.#resizeListener)
  }

  protected disconnectedCallback() {
    windowResizer.unsubscribe(this.#resizeListener)

    this.#history.unobserve()
    this.#restore.unobserve()
    this.#dominance.unobserve()
    this.#clickOutside.unobserve()
    this.#escape.unobserve()

    this.style.opacity = ''
    this.style.display = ''

    this.removeAttribute('popover-target')

    PopoverElement.__opened = PopoverElement.__opened.filter((m) => m !== this)

    clearTimeout(this.#closeTimeoutId)
    clearTimeout(this.#openTimeoutId)

    removeEventListener('popstate', this.#popStateListener)
    removeEventListener('click', this.#clickOutsideListener)
    removeEventListener('keydown', this.#keydownListener)

    this.style.removeProperty('--content-width')
    this.style.removeProperty('--content-height')
  }

  get #path() {
    return `${location.pathname}${
      location.search ? location.search + '&' : '?'
    }${this.id}`
  }

  #clickOutsideListener = (event: MouseEvent) => {
    if (!this.#clickOutside.current) {
      return
    }

    this.#withOrder(() => {
      const path = event.composedPath()

      if (
        path.find(
          (el) =>
            el instanceof HTMLElement && el.hasAttribute('data-popover-content')
        )
      ) {
        return
      }

      const target = path[0]

      const containsTarget =
        target instanceof HTMLElement &&
        (this.contains(target) || this.shadowRoot?.contains(target))

      const outsideTarget =
        target instanceof HTMLElement && target.hasAttribute('data-outside')

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
    if (!this.#escape.current) {
      return
    }

    this.#withOrder(() => {
      if (event.code === 'Escape') {
        this.close()
      }
    })
  }

  #withOrder(okCallback: Function) {
    if (
      PopoverElement.__opened[this.#openedIndex - 1] ||
      PopoverElement.__opened.length === 1 ||
      PopoverElement.__opened
        .filter((e) => e !== this)
        .every((e) => this.#dominance.current > e.dominance.current)
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

  #resizeListener = () => {
    this.style.setProperty('--content-width', 'initial')
    this.style.setProperty('--content-height', 'initial')

    this.#debouncedResize()
  }

  #debouncedResize = debounce(() => {
    this.#resize()
  }, 10)

  #resize = () => {
    this.style.setProperty('--content-width', this.scrollWidth + 'px')
    this.style.setProperty('--content-height', this.scrollHeight + 'px')
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
