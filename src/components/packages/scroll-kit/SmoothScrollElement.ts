import { Damped } from '@packages/animation-kit/Damped'
import { CSSProperty } from '@packages/css-property'
import { device, viewport } from '@packages/device'
import { TICK_ORDER } from '@packages/order'
import { scrollEntries } from '@packages/scroll-entries'
import { ElementOrSelector, getElement } from '@packages/utils'
import { ScrollNavigator, ScrollNavigatorOptions } from './ScrollNavigator'

const scrollKeys = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  'Space',
])

export class SmoothScrollElement extends HTMLElement {
  #scrollElement: HTMLElement | Window = this
  #pointerElement: HTMLElement = this
  #cssDisabled = new CSSProperty(this, '--smooth-scroll-disabled', false)
  #cssDamping = new CSSProperty(this, '--smooth-scroll-damping', 10)
  #damped = new Damped()
  #rounded = 0
  #needSync = false

  constructor() {
    super()
    this.#damped.setTickerOptions({ order: TICK_ORDER.SCROLL })
  }

  public resize() {
    const min = 0
    const max =
      this.#scrollElement instanceof HTMLElement
        ? this.#scrollElement.scrollHeight - this.#scrollElement.offsetHeight
        : document.documentElement.offsetHeight - viewport.height

    this.#damped.setEdges(min, max)
  }

  public stop() {
    ScrollNavigator.tryStop(this.#scrollElement, this.scrollTop)
    this.#damped.stopAnimation()
    this.#needSync = true
  }

  public trySync() {
    const cv = this.#currentScroll

    if (
      device.isMobile ||
      this.#needSync ||
      Math.abs(cv - this.#damped.current) > 100
    ) {
      this.#needSync = false
      this.#damped.setWithoutAnimation(cv)
    }
  }

  public shiftPosition(value: number) {
    this.resize()
    this.trySync()
    this.#damped.set(this.#damped.target + value)
  }

  public setPosition(value: number, behavior?: ScrollBehavior) {
    this.resize()
    this.trySync()

    if (behavior === 'instant') {
      this.#damped.setWithoutAnimation(value)
    } else {
      this.#damped.set(value)
    }
  }

  public scrollToValue(value: number, behavior?: ScrollBehavior) {
    if (device.isMobile) {
      this.scroll({ top: value, behavior })
    } else {
      this.setPosition(value, behavior)
    }
  }

  public scrollToElement(
    elementOrSelector: ElementOrSelector<HTMLElement>,
    options?: Omit<
      ScrollNavigatorOptions,
      'scrollCallback' | 'scrollElement' | 'startValue'
    >,
  ) {
    ScrollNavigator.scrollToElement(elementOrSelector, {
      ...options,
      scrollElement: this.#scrollElement,
      startValue: this.#damped.current,
      scrollCallback: (top) => {
        this.scrollToValue(
          top,
          options?.duration ? 'instant' : options?.behavior,
        )
      },
    })
  }

  public connectedCallback() {
    this.#initScrollElement()
    this.#addListeners()

    this.#damped.setWithoutAnimation(this.scrollTop)

    this.#damped.subscribe((e) => {
      const rounded = Math.round(e.current)

      scrollEntries.update(this, 'y', e.current)

      if (rounded !== this.#rounded && !device.isMobile) {
        this.#setNativeScroll(rounded)
      }

      document.documentElement.classList.toggle(
        'scrolling',
        rounded !== this.#rounded,
      )

      console.log(rounded)

      this.#rounded = rounded
    })

    this.#cssDamping.observe()
    this.#cssDisabled.observe()

    this.#cssDamping.subscribe((e) => {
      this.#damped.setOptions({ damping: e.current })
    })

    scrollEntries.register(this)

    this.resize()
  }

  public disconnectedCallback() {
    this.#damped.close()
    this.#cssDamping.close()
    this.#cssDisabled.close()

    scrollEntries.unregister(this)

    document.documentElement.classList.remove('scrolling')
    this.#removeListeners()
  }

  get #currentScroll(): number {
    return this.#scrollElement instanceof HTMLElement
      ? this.#scrollElement.scrollTop
      : this.#scrollElement.scrollY
  }

  #setNativeScroll(top: number) {
    this.#scrollElement.scroll({ top, behavior: 'instant' })
  }

  #initScrollElement() {
    if (this.dataset.element === 'window') {
      this.#scrollElement = window
      this.#pointerElement = document.documentElement
    } else {
      this.#scrollElement =
        getElement<HTMLElement>(this.dataset.element) || this
      this.#scrollElement.setAttribute('tabindex', '0')
      this.#pointerElement = this
    }
  }

  #addListeners() {
    window.addEventListener('resize', this.#resizeListener)
    this.#scrollElement.addEventListener(
      'keydown',
      this.#keydownListener as any,
    )
    this.#pointerElement.addEventListener('click', this.#pointerdownListener)
    this.#scrollElement.addEventListener('wheel', this.#wheelListener as any, {
      passive: false,
    })
    this.#scrollElement.addEventListener('scroll', this.#scrollListener)
  }

  #removeListeners() {
    window.removeEventListener('resize', this.#resizeListener)
    this.#scrollElement.removeEventListener(
      'keydown',
      this.#keydownListener as any,
    )
    this.#pointerElement.removeEventListener('click', this.#pointerdownListener)
    this.#scrollElement.removeEventListener('wheel', this.#wheelListener as any)
    this.#scrollElement.removeEventListener('scroll', this.#scrollListener)
  }

  #checkDisabled() {
    return (
      this.#cssDisabled.current ||
      getComputedStyle(this).getPropertyValue('overflow') === 'hidden'
    )
  }

  #inOverflowDirection(e: WheelEvent) {
    const dy = Math.sign(e.deltaY)
    return !(
      (dy < 0 && this.#damped.target === 0 && this.#damped.direction < 0) ||
      (dy > 0 &&
        this.#damped.target === this.#damped.max &&
        this.#damped.direction > 0)
    )
  }

  #shouldSkipSmoothScroll(e: WheelEvent) {
    if (!(e.target instanceof Element)) return false

    const el = e.target.closest('[data-prevent-smooth-scroll]')
    if (!el) return false

    const attr = el.getAttribute('data-prevent-smooth-scroll')
    if (!attr) return true

    return !matchMedia(attr).matches
  }

  #wheelListener = (e: WheelEvent) => {
    if (this.#checkDisabled() || device.isMobile) return

    if (!this.#inOverflowDirection(e)) {
      e.stopPropagation()
    }

    if (this.#shouldSkipSmoothScroll(e)) return

    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

    ScrollNavigator.tryStop(this.#scrollElement, this.scrollTop)

    e.preventDefault()
    this.shiftPosition(e.deltaY)
  }

  #pointerdownListener = (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return

    const anchor = e.target.closest('a')
    if (e.button !== 0 || (this.#checkDisabled() && !anchor)) return

    if (
      anchor &&
      !anchor.hasAttribute('data-smooth-scroll-skip') &&
      this.contains(anchor)
    ) {
      const url = new URL(anchor.href)

      if (url.hash) {
        e.preventDefault()

        this.stop()

        this.scrollToElement(url.hash, {
          behavior:
            (anchor.getAttribute('data-scroll-behavior') as any) || 'smooth',
          offset: anchor.getAttribute('data-scroll-offset') || undefined,
          center: anchor.hasAttribute('data-scroll-center'),
          duration:
            parseFloat(anchor.getAttribute('data-scroll-duration') || '0') ||
            undefined,
          easing:
            (anchor.getAttribute('data-scroll-easing') as any) || undefined,
        })
      }
    }
  }

  #resizeListener = () => {
    this.resize()
    this.trySync()
  }

  #keydownListener = (e: KeyboardEvent) => {
    if (this.#checkDisabled()) return
    if (scrollKeys.has(e.code)) this.stop()
  }

  #scrollListener = () => {
    this.trySync()
  }
}

if (!customElements.get('e-smooth-scroll')) {
  customElements.define('e-smooth-scroll', SmoothScrollElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-smooth-scroll': SmoothScrollElement
  }
}
