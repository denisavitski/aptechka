import { Tweened, TweenedOptions } from '@packages/animation-kit/Tweened'
import { viewport } from '@packages/device'
import { TICK_ORDER } from '@packages/order'
import type { SmoothScrollElement } from '@packages/scroll-kit'
import {
  findScrollParentElement,
  getCumulativeOffsetTop,
  getElement,
  type ElementOrSelector,
} from '@packages/utils'

export interface ScrollNavigatorOptions
  extends Pick<TweenedOptions, 'duration' | 'easing'> {
  behavior?: ScrollBehavior
  offset?: number | string | ElementOrSelector<HTMLElement>
  center?: boolean
  startValue?: number
  scrollElement?: HTMLElement | Window
  scrollCallback?: (value: number) => void
}

export abstract class ScrollNavigator {
  static #tweened: Tweened | null = null
  static #currentScrollContainer: HTMLElement | Window = window

  public static get tweened() {
    return this.#tweened
  }

  public static get currentScrollContainer() {
    return this.#currentScrollContainer
  }

  public static tryStop(scrollElement: Window | HTMLElement, value: number) {
    if (
      this.#currentScrollContainer === scrollElement &&
      this.#tweened?.active
    ) {
      this.#tweened?.setWithoutAnimation(value)
    }
  }

  public static scrollToElement(
    elementOrSelectorOrNumber: ElementOrSelector<HTMLElement> | number,
    {
      behavior = 'instant',
      offset = 0,
      center = false,
      scrollElement,
      scrollCallback,
      duration,
      easing,
      startValue,
    }: ScrollNavigatorOptions = {},
  ) {
    let elementPosition: number | undefined
    let centerElement = scrollElement
    let scrollContainerElement = scrollElement

    if (typeof elementOrSelectorOrNumber === 'number') {
      elementPosition = elementOrSelectorOrNumber
    } else {
      const element = getElement(elementOrSelectorOrNumber)
      if (element) {
        centerElement = element
        scrollContainerElement =
          scrollElement || findScrollParentElement(element)
        elementPosition = getCumulativeOffsetTop(element)
      }
    }

    if (
      centerElement &&
      scrollContainerElement &&
      typeof elementPosition === 'number'
    ) {
      this.#currentScrollContainer = scrollContainerElement

      const offsetValue = this.#resolveOffset(offset)
      const top = this.#computeFinalTop(
        elementPosition,
        offsetValue,
        center,
        centerElement,
        scrollContainerElement,
      )

      const performScroll = (value: number) =>
        this.#performScroll(scrollContainerElement, value, behavior, duration)

      if (duration) {
        this.#animateTo(
          top,
          duration,
          easing,
          startValue,
          scrollContainerElement,
          scrollCallback,
          performScroll,
        )
      } else {
        if (scrollCallback) scrollCallback(top)
        else performScroll(top)
      }
    }
  }

  static #resolveOffset(offset: ScrollNavigatorOptions['offset']): number {
    if (typeof offset === 'number') return offset

    if (typeof offset === 'string' && !isNaN(parseFloat(offset))) {
      return parseFloat(offset)
    }

    const el = getElement(offset)
    return el ? el.offsetHeight * -1 : 0
  }

  static #computeFinalTop(
    elementPosition: number,
    offsetValue: number,
    center: boolean,
    centerElement: Element | Window,
    scrollContainerElement: HTMLElement | Window,
  ): number {
    const height =
      centerElement instanceof HTMLElement
        ? centerElement.offsetHeight
        : innerHeight

    const centerValue = center ? innerHeight / -2 + height / 2 : 0

    let top = elementPosition + offsetValue + centerValue

    const maxScroll =
      scrollContainerElement instanceof HTMLElement
        ? scrollContainerElement.scrollHeight - viewport.height
        : document.documentElement.scrollHeight - viewport.height

    return Math.min(maxScroll, top)
  }

  static #performScroll(
    container: HTMLElement | Window,
    value: number,
    behavior: ScrollBehavior,
    duration?: number | false,
  ) {
    if (
      container instanceof HTMLElement &&
      container.tagName === 'E-SMOOTH-SCROLL'
    ) {
      ;(container as SmoothScrollElement).scrollToValue(
        value,
        duration ? 'instant' : behavior,
      )
    } else {
      container.scroll({
        top: value,
        behavior: duration ? 'instant' : behavior,
      })
    }
  }

  static #animateTo(
    top: number,
    duration: number,
    easing: TweenedOptions['easing'],
    startValue: number | undefined,
    container: HTMLElement | Window,
    scrollCallback: ((value: number) => void) | undefined,
    performScroll: (value: number) => void,
  ) {
    if (this.#tweened) this.#tweened.close()

    const initial =
      startValue ??
      (container instanceof HTMLElement ? container.scrollTop : window.scrollY)

    this.#tweened = new Tweened({
      initial,
      duration: Math.min(duration, duration * (Math.abs(initial - top) / 3000)),
      easing,
    })

    this.#tweened.setTickerOptions({ order: TICK_ORDER.SCROLL })

    this.#tweened.subscribe((e) => {
      if (scrollCallback) scrollCallback(e.current)
      else performScroll(e.current)
    })

    this.#tweened.set(top)
  }
}
