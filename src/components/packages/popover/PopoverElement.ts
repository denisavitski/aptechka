import { ElementLinkedStore } from '@packages/element-linked-store'
import { CSSProperty } from '@packages/css-property'
import {
  debounce,
  dispatchEvent,
  getElementTransitionDurationMS,
  isBrowser,
  parseSearchParameters,
  updateSearchParameter,
} from '@packages/utils'
import { windowResizer } from '@packages/window-resizer'
import { viewport } from '@packages/device'

export interface PopoverEvents {
  popoverTriggered: CustomEvent<{ trigger: any }>
  popoverOpened: CustomEvent<{ trigger: any }>
  popoverClosing: CustomEvent
  popoverClosed: CustomEvent
}

class PopoverGroups {
  #groups: Map<string, Array<PopoverElement>> = new Map()
  #stack: Array<PopoverElement> = []

  constructor() {
    document.documentElement.addEventListener(
      'click',
      this.#clickOutsideListener
    )
    addEventListener('keydown', this.#keydownListener)
  }

  public get groups() {
    return this.#groups
  }

  public get stack() {
    return this.#stack
  }

  public add(groupName: string, element: PopoverElement) {
    if (element.closeRest.current) {
      this.#groups.forEach((g) => {
        g.forEach((e) => {
          e.close()
        })
      })
    } else if (element.closeRestInGroup.current) {
      let group = this.#groups.get(groupName)

      group?.forEach((e) => {
        e.close()
      })
    }

    let group = this.#groups.get(groupName)

    if (!group?.length) {
      group = []
      this.#groups.set(groupName, group)
    }

    this.#stack.push(element)
    group.push(element)
  }

  public remove(groupName: string, element: PopoverElement) {
    this.#stack = this.#stack.filter((e) => e !== element)

    if (element.closeRest.current) {
      let elements: Array<PopoverElement> = []

      this.#groups.forEach((group) => {
        group.forEach((element) => elements.push(element))
      })

      this.#groups.clear()

      elements.forEach((element) => element.close())
    } else if (element.closeRestInGroup.current) {
      const group = this.#groups.get(groupName)

      this.#groups.delete(groupName)

      group?.forEach((element) => {
        element.close()
      })
    } else {
      let group = this.#groups.get(groupName)

      if (group) {
        group = group.filter((el) => el !== element)

        this.#groups.set(groupName, group)
      }
    }
  }

  #clickOutsideListener = (e: Event) => {
    const lastPopover = [...this.#stack]
      .reverse()
      .find((el) => el.clickOutside.current)

    if (lastPopover) {
      const path = e.composedPath()

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
        (lastPopover.contains(target) ||
          lastPopover.shadowRoot?.contains(target))

      const outsideTarget =
        target instanceof HTMLElement && target.hasAttribute('data-outside')

      if (!containsTarget || outsideTarget) {
        lastPopover.close()
      }
    }
  }

  #keydownListener = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      const lastPopover = [...this.#stack]
        .reverse()
        .find((el) => el.escape.current)

      if (lastPopover) {
        lastPopover.close()
      }
    }
  }
}

export class PopoverElement extends HTMLElement {
  private static stack = new PopoverGroups()

  public urlValue = ''

  #opened = false
  #startClosingTimeoutId: ReturnType<typeof setTimeout> | undefined
  #closeTimeoutId: ReturnType<typeof setTimeout> | undefined
  #openTimeoutId: ReturnType<typeof setTimeout> | undefined
  #openTransitionTimeoutId: ReturnType<typeof setTimeout> | undefined

  #history = new CSSProperty(this, '--history', false)
  #restore = new CSSProperty(this, '--restore', false)
  #closeRest = new CSSProperty<boolean>(this, '--close-rest', false)
  #closeRestInGroup = new CSSProperty<boolean>(
    this,
    '--close-rest-in-group',
    false
  )
  #group = new CSSProperty(this, '--group', '')
  #clickOutside = new CSSProperty(this, '--click-outside', false)
  #escape = new CSSProperty(this, '--escape', false)
  #checkViewportBounds = new CSSProperty(this, '--check-viewport-bounds', false)
  #historyAllowed = false
  #lastTrigger: any
  #status = new ElementLinkedStore(this, {
    opened: false,
    closing: false,
    triggered: false,
    transitionend: false,
  })
  #innerCloseElements: Array<HTMLElement> = []
  #resetScrollElements: Array<HTMLElement> = []

  constructor() {
    super()

    this.#group.subscribe((e) => {
      if (e.previous) {
        PopoverElement.stack.remove(e.previous, this)

        if (!e.current) {
          document.documentElement.classList.remove(
            `${this.group.previous}-closing`
          )

          document.documentElement.classList.remove(
            `${this.group.previous}-opened`
          )
        }
      }
    })

    this.#status.subscribe((e) => {
      if (this.group.current) {
        document.documentElement.classList.toggle(
          `${this.group.current}-closing`,
          e.current.closing
        )

        const group = PopoverElement.stack.groups.get(this.group.current)
        const element = group?.find((e) => e.opened)

        document.documentElement.classList.toggle(
          `${this.group.current}-opened`,
          !!element
        )
      }
    })
  }

  public get openClass() {
    return this.getAttribute('data-open-global-class')
  }

  public get closingClass() {
    return this.getAttribute('data-closing-global-class')
  }

  public get history() {
    return this.#history
  }

  public get restore() {
    return this.#restore
  }

  public get closeRest() {
    return this.#closeRest
  }

  public get closeRestInGroup() {
    return this.#closeRestInGroup
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

    if (this.#opened) {
      updateSearchParameter(this.id, value)
    }
  }

  public open(options?: { skipTransition?: boolean; trigger?: any }) {
    if (this.#opened) {
      return
    }

    this.#lastTrigger = options?.trigger

    clearTimeout(this.#startClosingTimeoutId)
    clearTimeout(this.#closeTimeoutId)

    this.#toggleGlobalClass(true, this.openClass)

    this.#toggleGlobalClass(false, this.closingClass)
    this.#status.set('closing', false)

    this.#status.set('triggered', true)

    dispatchEvent(this, 'popoverTriggered', {
      custom: true,
      detail: {
        trigger: this.#lastTrigger,
      },
    })

    if (this.#history.current && this.#historyAllowed) {
      history.pushState(history.state, '', this.#path)
    }

    this.#opened = true

    const opened = () => {
      // if (this.#group.current) {
      PopoverElement.stack.add(this.#group.current, this)
      // }

      this.#resetScrollElements.forEach((el) => {
        el.scroll({
          top: 0,
          left: 0,
          behavior: 'instant',
        })
      })

      this.#resizeListener()

      this.#status.set('opened', true)

      dispatchEvent(this, 'popoverOpened', {
        custom: true,
        detail: {
          trigger: this.#lastTrigger,
        },
        bubbles: true,
      })

      this.#openTimeoutId = undefined

      this.#openTransitionTimeoutId = setTimeout(() => {
        this.#status.set('transitionend', true)
      }, getElementTransitionDurationMS(this) + 10)
    }

    if (options?.skipTransition) {
      opened()
    } else {
      this.#openTimeoutId = setTimeout(opened, 10)
    }
  }

  public close() {
    if (!this.#opened) {
      return
    }

    this.#opened = false

    clearTimeout(this.#openTimeoutId)
    clearTimeout(this.#openTransitionTimeoutId)

    PopoverElement.stack.remove(this.#group.current, this)

    this.#deleteSearchParam()

    this.#toggleGlobalClass(false, this.openClass)

    this.#status.set('transitionend', false)

    this.#startClosingTimeoutId = setTimeout(() => {
      this.#status.set('opened', false)
      this.#status.set('closing', true)
      this.#toggleGlobalClass(true, this.closingClass)

      dispatchEvent(this, 'popoverClosing', {
        custom: true,
        bubbles: true,
      })

      this.#closeTimeoutId = setTimeout(() => {
        this.#status.set('triggered', false)
        this.#status.set('closing', false)
        this.#toggleGlobalClass(false, this.closingClass)

        dispatchEvent(this, 'popoverClosed', {
          custom: true,
          bubbles: true,
        })
      }, getElementTransitionDurationMS(this) + 10)
    }, 10)
  }

  protected connectedCallback() {
    this.#innerCloseElements = [
      ...this.querySelectorAll<HTMLElement>(
        `[data-popover-close${this.id ? `="${this.id}"` : ''}]`
      ),
    ]
    this.#innerCloseElements.forEach((el) => {
      el.addEventListener('click', this.#closeElementClickListener)
    })

    this.#resetScrollElements = [
      ...this.querySelectorAll<HTMLElement>(
        `[data-popover-reset-scroll${this.id ? `="${this.id}"` : ''}]`
      ),
    ]

    this.#history.observe()
    this.#restore.observe()
    this.#closeRest.observe()
    this.#closeRestInGroup.observe()
    this.#group.observe()
    this.#clickOutside.observe()
    this.#escape.observe()
    this.#checkViewportBounds.observe()

    this.setAttribute('role', 'dialog')

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

    this.#checkViewportBounds.subscribe(() => {
      this.#resizeListener()
    })

    windowResizer.subscribe(this.#resizeListener)
  }

  protected disconnectedCallback() {
    this.#innerCloseElements.forEach((el) => {
      el.removeEventListener('click', this.#closeElementClickListener)
    })

    PopoverElement.stack.remove(this.#group.current, this)

    windowResizer.unsubscribe(this.#resizeListener)

    this.#status.close()

    this.#history.close()
    this.#restore.close()
    this.#closeRest.close()
    this.#closeRestInGroup.close()
    this.#group.close()
    this.#clickOutside.close()
    this.#escape.close()
    this.#checkViewportBounds.close()

    this.removeAttribute('role')

    clearTimeout(this.#startClosingTimeoutId)
    clearTimeout(this.#closeTimeoutId)
    clearTimeout(this.#openTimeoutId)
    clearTimeout(this.#openTransitionTimeoutId)

    removeEventListener('popstate', this.#popStateListener)

    this.style.removeProperty('--content-width')
    this.style.removeProperty('--content-height')

    this.style.removeProperty('--viewport-offset-x')
    this.style.removeProperty('--viewport-offset-y')

    this.#deleteSearchParam()
  }

  get #path() {
    return `${location.pathname}${
      location.search ? location.search + '&' : '?'
    }${this.idWithValue}`
  }

  #toggleGlobalClass(on: boolean, className?: string | null) {
    if (className) {
      className.split(' ').map((v) => {
        document.documentElement.classList.toggle(v.trim(), on)
      })
    }
  }

  #deleteSearchParam() {
    if (this.#history.current) {
      const url = new URL(location.href)
      url.searchParams.delete(this.id)
      history.replaceState(history.state, '', url.href)
    }
  }

  #popStateListener = () => {
    this.#historyAllowed = false
    if (
      this.#opened &&
      this.#history.current &&
      !location.search.includes(this.id)
    ) {
      this.close()
    } else if (
      !this.#opened &&
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

    this.style.setProperty('--viewport-offset-x', '0px')
    this.style.setProperty('--viewport-offset-y', '0px')

    this.#debouncedResize()
  }

  #debouncedResize = debounce(() => {
    this.#resize()
  }, 10)

  #resize = () => {
    this.style.setProperty('--content-width', this.scrollWidth + 'px')
    this.style.setProperty('--content-height', this.scrollHeight + 'px')

    if (this.#checkViewportBounds.current) {
      const rect = this.getBoundingClientRect()

      let viewportOffsetX = 0
      let viewportOffsetY = 0

      if (rect.right > viewport.width) {
        viewportOffsetX = viewport.width - rect.right
      } else if (rect.left < 0) {
        viewportOffsetX = rect.left * -1
      }

      if (rect.bottom > viewport.height) {
        viewportOffsetY = viewport.height - rect.bottom
      } else if (rect.top < 0) {
        viewportOffsetY = rect.top * -1
      }

      this.style.setProperty('--viewport-offset-x', viewportOffsetX + 'px')
      this.style.setProperty('--viewport-offset-y', viewportOffsetY + 'px')
    }
  }

  #closeElementClickListener = () => {
    this.close()
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
