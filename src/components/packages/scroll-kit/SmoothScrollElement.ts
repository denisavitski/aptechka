import { Damped, Tweened, type DampedOptions } from '@packages/animation'
import { CSSProperty } from '@packages/css-property'
import { device } from '@packages/device'
import { TICK_ORDER } from '@packages/order'
import { scrollEntries } from '@packages/scroll-entries'
import { scrollToElement } from '@packages/utils'

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
  #cssDisabled = new CSSProperty(this, '--smooth-scroll-disabled', false)
  #cssDamping = new CSSProperty(this, '--smooth-scroll-damping', 10)

  #value = new Damped(0)
  #currentRoundedValue = 0
  #needSync = false

  #tweened: Tweened | undefined

  public resize() {
    this.#value.min = 0
    this.#value.max = this.scrollHeight - this.offsetHeight
  }

  public stop() {
    this.#value.unlistenAnimationFrame()
    this.#needSync = true
  }

  public sync() {
    const currentValue = this.scrollTop

    if (this.#needSync || Math.abs(currentValue - this.#value.current) > 100) {
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

  protected connectedCallback() {
    window.addEventListener('resize', this.#resizeListener)
    this.addEventListener('keydown', this.#keydownListener)
    document.documentElement.addEventListener(
      'pointerdown',
      this.#pointerdownListener,
    )
    document.documentElement.addEventListener('touchstart', this.#touchListener)
    this.addEventListener('wheel', this.#wheelListener as any, {
      passive: false,
    })
    this.addEventListener('scroll', this.#scrollListener)

    this.#value.set(this.scrollTop, { equalize: true })

    this.#value.subscribe((e) => {
      const roundedCurrent = Math.round(e.current)

      scrollEntries.update(this, 'y', e.current)

      if (roundedCurrent !== this.#currentRoundedValue) {
        this.scroll({
          top: roundedCurrent,
          behavior: 'instant',
        })
      }

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
    this.#tweened?.close()

    scrollEntries.unregister(this)

    window.removeEventListener('resize', this.#resizeListener)
    this.removeEventListener('keydown', this.#keydownListener)
    document.documentElement.removeEventListener(
      'pointerdown',
      this.#pointerdownListener,
    )
    document.documentElement.removeEventListener(
      'touchstart',
      this.#touchListener,
    )
    this.removeEventListener('wheel', this.#wheelListener as any)
    this.removeEventListener('scroll', this.#scrollListener)
  }

  #checkDisabled() {
    return (
      this.#cssDisabled.current ||
      getComputedStyle(this).getPropertyValue('overflow') === 'hidden'
    )
  }

  #destroyTweened() {
    this.#tweened?.close()
    this.#tweened = undefined
  }

  #wheelListener = (e: WheelEvent) => {
    if (this.#checkDisabled()) {
      return
    }

    this.#destroyTweened()

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

  #touchListener = () => {
    if (this.#checkDisabled()) {
      return
    }

    this.#destroyTweened()

    this.stop()
  }

  #pointerdownListener = (e: PointerEvent) => {
    if (e.button !== 0 || this.#checkDisabled()) {
      return
    }

    if (e.target instanceof Element) {
      const anchorElement = e.target.closest('a')

      if (anchorElement) {
        this.stop()

        const url = new URL(anchorElement.href)

        if (url.hash) {
          e.preventDefault()

          scrollToElement(url.hash, {
            behavior:
              (anchorElement.getAttribute('data-behavior') as any) || 'smooth',
            center: anchorElement.hasAttribute('data-center'),
            offset: anchorElement.getAttribute('data-offset') || undefined,
            scrollElement: this,
            scrollCallback: (top, behaviour) => {
              const duration = parseFloat(
                anchorElement.getAttribute('data-duration') || '0',
              )

              const easing = anchorElement.getAttribute('data-easing') as any

              if (duration) {
                if (this.#tweened) {
                  this.#tweened.close()
                }

                this.#tweened = new Tweened(this.#value.current, {
                  duration: duration,
                  easing: easing,
                  order: TICK_ORDER.SCROLL,
                })

                this.#tweened.subscribe((e) => {
                  this.setPosition(e.current, {
                    equalize: true,
                  })
                })

                this.#tweened.set(top, { duration, easing })
              } else {
                this.setPosition(top, {
                  equalize: behaviour === 'instant',
                })
              }
            },
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

    this.#destroyTweened()

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
