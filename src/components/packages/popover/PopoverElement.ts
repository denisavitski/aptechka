import { CSSProperty } from '@packages/css-property'
import { Store } from '@packages/store'
import {
  debounce,
  dispatchEvent,
  getElementTransitionDurationMS,
  isBrowser,
  parseSearchParameters,
  updateSearchParameter,
} from '@packages/utils'
import { windowResizer } from '@packages/window-resizer'

export interface PopoverEvents {
  popoverTriggered: CustomEvent<{ trigger: any }>
  popoverOpened: CustomEvent<{ trigger: any }>
  popoverClosing: CustomEvent
  popoverClosed: CustomEvent
}

export class PopoverElement extends HTMLElement {
  private static __opened: Array<PopoverElement> = []

  public urlValue = ''

  #openIndex = -1
  #opened = new Store(false)
  #closeTimeoutId: ReturnType<typeof setTimeout> | undefined
  #openTimeoutId: ReturnType<typeof setTimeout> | undefined
  #history = new CSSProperty(this, '--history', false)
  #restore = new CSSProperty(this, '--restore', false)
  #dominance = new CSSProperty(this, '--dominance', 0)
  #group = new CSSProperty(this, '--group', '')
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

  public get group() {
    return this.#group
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

  public get idWithValue() {
    return `${this.id}${this.urlValue ? '=' + this.urlValue : ''}`
  }

  public updateUrlValue(value?: string | number) {
    this.urlValue = value?.toString() || ''

    if (this.#opened.current) {
      updateSearchParameter(this.id, value)
    }
  }

  public open = (options?: { skipTransition?: boolean; trigger?: any }) => {
    if (this.#opened.current) {
      return
    }

    this.#lastTrigger = options?.trigger

    if (this.#dominance.current) {
      PopoverElement.__opened = PopoverElement.__opened.filter((e) => {
        if (e !== this && this.#checkDomination(this, e)) {
          e.close()
          return false
        }

        return true
      })
    }

    PopoverElement.__opened.push(this)
    this.#openIndex = PopoverElement.__opened.length - 1
    this.style.setProperty('--open-index', this.#openIndex.toString())

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

    if (this.#history.current && this.#historyAllowed) {
      history.pushState(history.state, '', this.#path)
    }

    this.#opened.current = true

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

      this.setAttribute('aria-hidden', 'false')
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
      } else if (!m.#openTimeoutId && this.#checkDomination(this, m)) {
        m.close()
        return false
      }

      return true
    })

    this.#deleteSearchParam()

    this.classList.remove('opened')
    this.classList.add('closing')
    this.setAttribute('aria-hidden', 'true')
    this.style.opacity = '0'

    dispatchEvent(this, 'popoverClosing', {
      custom: true,
    })

    setTimeout(() => {
      this.classList.remove('triggered')
      this.classList.remove('closing')
      this.style.display = 'none'
      this.style.removeProperty('--open-index')

      dispatchEvent(this, 'popoverClosed', {
        custom: true,
      })
    }, getElementTransitionDurationMS(this) + 10)
  }

  protected connectedCallback() {
    this.#history.observe()
    this.#restore.observe()
    this.#dominance.observe()
    this.#group.observe()
    this.#clickOutside.observe()
    this.#escape.observe()

    this.style.opacity = '0'
    this.style.display = 'none'

    this.setAttribute('role', 'dialog')
    this.setAttribute('aria-hidden', 'true')

    this.classList.remove('closing')
    this.classList.remove('closed')
    this.classList.remove('triggered')
    this.classList.remove('opened')

    addEventListener('popstate', this.#popStateListener)

    setTimeout(() => {
      if (this.#restore.current) {
        this.urlValue = parseSearchParameters(location.search)[this.id]
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

    this.#history.close()
    this.#restore.close()
    this.#dominance.close()
    this.#group.close()
    this.#clickOutside.close()
    this.#escape.close()

    this.style.opacity = ''
    this.style.display = ''

    this.removeAttribute('role')
    this.removeAttribute('aria-hidden')

    PopoverElement.__opened = PopoverElement.__opened.filter((m) => m !== this)

    clearTimeout(this.#closeTimeoutId)
    clearTimeout(this.#openTimeoutId)

    removeEventListener('popstate', this.#popStateListener)
    removeEventListener('click', this.#clickOutsideListener)
    removeEventListener('keydown', this.#keydownListener)

    this.style.removeProperty('--content-width')
    this.style.removeProperty('--content-height')

    this.#deleteSearchParam()
  }

  get #path() {
    return `${location.pathname}${
      location.search ? location.search + '&' : '?'
    }${this.idWithValue}`
  }

  get #isLast() {
    return this.#openIndex === PopoverElement.__opened.length - 1
  }

  #clickOutsideListener = (event: MouseEvent) => {
    if (!this.#clickOutside.current || !this.#isLast) {
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
        target instanceof Node &&
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
      history.replaceState(history.state, '', url.href)
    }
  }

  #keydownListener = (event: KeyboardEvent) => {
    if (!this.#escape.current || !this.#isLast) {
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
      PopoverElement.__opened[this.#openIndex - 1] ||
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
      this.open({ trigger: this.idWithValue })
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

  #checkDomination(a: PopoverElement, b: PopoverElement) {
    if (
      a.#group.current === b.#group.current &&
      a.dominance.current >= b.dominance.current
    ) {
      return true
    }
  }
}

if (isBrowser && !customElements.get('e-popover')) {
  customElements.define('e-popover', PopoverElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-popover': PopoverElement
  }

  interface HTMLElementEventMap extends PopoverEvents {}
}
