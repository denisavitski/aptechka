import { ClassLinkedStatus } from '@packages/class-linked-status'
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

class PopoverGroups {
  #groups: Map<string, Array<PopoverElement>> = new Map()
  #stack: Array<PopoverElement> = []

  constructor() {
    addEventListener('click', this.#clickOutsideListener)
    addEventListener('keydown', this.#keydownListener)
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

  #opened = new Store(false)
  #closeTimeoutId: ReturnType<typeof setTimeout> | undefined
  #openTimeoutId: ReturnType<typeof setTimeout> | undefined
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
  #historyAllowed = false
  #lastTrigger: any
  #status = new ClassLinkedStatus(this, {
    opened: false,
    closing: false,
    closed: false,
    triggered: false,
  })

  constructor() {
    super()

    this.#group.subscribe((e) => {
      if (e.previous) {
        PopoverElement.stack.remove(e.previous, this)
      }
    })
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

    if (this.#opened.current) {
      updateSearchParameter(this.id, value)
    }
  }

  public open(options?: { skipTransition?: boolean; trigger?: any }) {
    if (this.#opened.current) {
      return
    }

    this.#lastTrigger = options?.trigger

    clearTimeout(this.#closeTimeoutId)

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

    this.#opened.current = true

    const opened = () => {
      // if (this.#group.current) {
      PopoverElement.stack.add(this.#group.current, this)
      // }

      this.#resize()

      this.#status.set('opened', true)

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

  public close() {
    if (!this.#opened.current) {
      return
    }

    clearTimeout(this.#openTimeoutId)

    PopoverElement.stack.remove(this.#group.current, this)

    this.#opened.current = false

    this.#deleteSearchParam()

    this.#status.set('opened', false)
    this.#status.set('closing', true)

    dispatchEvent(this, 'popoverClosing', {
      custom: true,
    })

    this.#closeTimeoutId = setTimeout(() => {
      this.#status.set('triggered', false)
      this.#status.set('closing', false)

      dispatchEvent(this, 'popoverClosed', {
        custom: true,
      })
    }, getElementTransitionDurationMS(this) + 10)
  }

  protected connectedCallback() {
    this.#history.observe()
    this.#restore.observe()
    this.#closeRest.observe()
    this.#closeRestInGroup.observe()
    this.#group.observe()
    this.#clickOutside.observe()
    this.#escape.observe()

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

    windowResizer.subscribe(this.#resizeListener)
  }

  protected disconnectedCallback() {
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

    this.removeAttribute('role')

    clearTimeout(this.#closeTimeoutId)
    clearTimeout(this.#openTimeoutId)

    removeEventListener('popstate', this.#popStateListener)

    this.style.removeProperty('--content-width')
    this.style.removeProperty('--content-height')

    this.#deleteSearchParam()
  }

  get #path() {
    return `${location.pathname}${
      location.search ? location.search + '&' : '?'
    }${this.idWithValue}`
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
