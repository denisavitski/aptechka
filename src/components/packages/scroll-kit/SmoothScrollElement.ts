import { Damped, type DampedOptions } from '@packages/animation'
import { CSSProperty } from '@packages/css-property'
import { device, viewport } from '@packages/device'
import { TICK_ORDER } from '@packages/order'
import { scrollEntries } from '@packages/scroll-entries'
import {
  ElementOrSelector,
  getElement,
  scrollToElement,
  ScrollToElementOptions,
  scrollToElementTweened,
} from '@packages/utils'

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

  #cssDisabled = new CSSProperty(this, '--smooth-scroll-disabled', false)
  #cssDamping = new CSSProperty(this, '--smooth-scroll-damping', 10)

  #value = new Damped(0, { order: TICK_ORDER.SCROLL })
  #currentRoundedValue = 0
  #needSync = false

  public resize() {
    this.#value.min = 0

    if (this.#scrollElement instanceof HTMLElement) {
      this.#value.max =
        this.#scrollElement.scrollHeight - this.#scrollElement.offsetHeight
    } else {
      this.#value.max = document.documentElement.offsetHeight - viewport.height
    }
  }

  public stop() {
    scrollToElementTweened.value?.set(this.scrollTop, { equalize: true })
    this.#value.unlistenAnimationFrame()
    this.#needSync = true
  }

  public sync() {
    let currentValue = 0

    if (this.#scrollElement instanceof HTMLElement) {
      currentValue = this.#scrollElement.scrollTop
    } else {
      currentValue = this.#scrollElement.scrollY
    }

    if (
      device.isMobile ||
      this.#needSync ||
      Math.abs(currentValue - this.#value.current) > 100
    ) {
      this.#needSync = false
      this.#value.set(currentValue, { equalize: true })
    }
  }

  public shiftPosition(value: number) {
    this.resize()
    this.sync()
    this.#value.shift(value)
  }

  public setPosition(value: number, options?: DampedOptions) {
    this.resize()
    this.sync()
    this.#value.set(value, options)
  }

  public scrollToValue(value: number, behavior?: ScrollBehavior | undefined) {
    if (device.isMobile) {
      this.scroll({
        top: value,
        behavior,
      })
    } else {
      this.setPosition(value, {
        equalize: behavior === 'instant',
      })
    }
  }

  public scrollToElement(
    elementOrSelector: ElementOrSelector<HTMLElement>,
    options?: Omit<
      ScrollToElementOptions,
      'scrollCallback' | 'scrollElement' | 'startValue'
    >,
  ) {
    scrollToElement(elementOrSelector, {
      ...options,
      scrollElement: this.#scrollElement,
      startValue: this.#value.current,
      scrollCallback: (top) => {
        this.scrollToValue(
          top,
          options?.duration ? 'instant' : options?.behavior,
        )
      },
    })
  }

  protected connectedCallback() {
    if (this.dataset.element === 'window') {
      this.#scrollElement = window
    } else {
      this.#scrollElement =
        getElement<HTMLElement>(this.dataset.element) || this
    }

    window.addEventListener('resize', this.#resizeListener)
    this.#scrollElement.addEventListener(
      'keydown',
      this.#keydownListener as any,
    )

    document.documentElement.addEventListener(
      'pointerdown',
      this.#pointerdownListener,
    )

    this.#scrollElement.addEventListener('wheel', this.#wheelListener as any, {
      passive: false,
    })
    this.#scrollElement.addEventListener('scroll', this.#scrollListener)

    this.#value.set(this.scrollTop, { equalize: true })

    this.#value.subscribe((e) => {
      const roundedCurrent = Math.round(e.current)

      scrollEntries.update(this, 'y', e.current)

      if (roundedCurrent !== this.#currentRoundedValue && !device.isMobile) {
        this.#scrollElement.scroll({
          top: roundedCurrent,
          behavior: 'instant',
        })
      }

      document.documentElement.classList.toggle(
        'scrolling',
        roundedCurrent !== this.#currentRoundedValue,
      )

      this.#currentRoundedValue = roundedCurrent
    })

    this.#cssDamping.observe()
    this.#cssDisabled.observe()

    this.#cssDamping.subscribe((e) => {
      this.#value.damping = e.current
    })

    scrollEntries.register(this)

    this.resize()
  }

  protected disconnectedCallback() {
    this.#value.close()
    this.#cssDamping.close()
    this.#cssDisabled.close()

    scrollEntries.unregister(this)

    document.documentElement.classList.remove('scrolling')

    window.removeEventListener('resize', this.#resizeListener)
    this.#scrollElement.removeEventListener(
      'keydown',
      this.#keydownListener as any,
    )

    document.documentElement.removeEventListener(
      'pointerdown',
      this.#pointerdownListener,
    )

    this.#scrollElement.removeEventListener('wheel', this.#wheelListener as any)
    this.#scrollElement.removeEventListener('scroll', this.#scrollListener)
  }

  #checkDisabled() {
    return (
      this.#cssDisabled.current ||
      getComputedStyle(this).getPropertyValue('overflow') === 'hidden'
    )
  }

  #wheelListener = (e: WheelEvent) => {
    if (this.#checkDisabled() || device.isMobile) {
      return
    }

    if (
      !(
        (Math.sign(e.deltaY) < 0 &&
          this.#value.target === 0 &&
          this.#value.direction < 0) ||
        (Math.sign(e.deltaY) > 0 &&
          this.#value.target === this.#value.max &&
          this.#value.direction > 0)
      )
    ) {
      e.stopPropagation()
    }

    if (e.target instanceof Element) {
      const preventElement = e.target.closest('[data-prevent-smooth-scroll]')

      if (preventElement) {
        const attrValue = preventElement.getAttribute(
          'data-prevent-smooth-scroll',
        )

        if (!attrValue) {
          return
        } else if (matchMedia(attrValue).matches) {
          return
        }
      }
    }

    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      return
    }

    e.preventDefault()
    this.shiftPosition(e.deltaY)
  }

  #pointerdownListener = (e: PointerEvent) => {
    if (e.target instanceof Element) {
      const anchorElement = e.target.closest('a')

      if (e.button !== 0 || (this.#checkDisabled() && !anchorElement)) {
        return
      }

      if (
        anchorElement &&
        !anchorElement.hasAttribute('data-smooth-scroll-skip') &&
        this.contains(anchorElement)
      ) {
        this.stop()

        const url = new URL(anchorElement.href)

        if (url.hash) {
          e.preventDefault()

          this.scrollToElement(url.hash, {
            behavior:
              (anchorElement.getAttribute('data-scroll-behavior') as any) ||
              'smooth',
            offset:
              anchorElement.getAttribute('data-scroll-offset') || undefined,
            center: anchorElement.hasAttribute('data-scroll-center'),
            duration:
              parseFloat(
                anchorElement.getAttribute('data-scroll-duration') || '0',
              ) || undefined,
            easing:
              (anchorElement.getAttribute('data-scroll-easing') as any) ||
              undefined,
          })
        }
      }
    }
  }

  #resizeListener = () => {
    this.resize()
    this.sync()
  }

  #keydownListener = (e: KeyboardEvent) => {
    if (this.#checkDisabled()) {
      return
    }

    if (scrollKeys.has(e.code)) {
      this.stop()
    }
  }

  #scrollListener = () => {
    if (device.isMobile) {
      this.sync()
    }
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
