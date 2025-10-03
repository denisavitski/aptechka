import { dispatchEvent } from '@packages/utils'

export interface PageScrollDetail {
  left: number
  top: number
}

export type PageScrollEvent = CustomEvent<PageScrollDetail>

export class PageScroll {
  #element: HTMLElement | Window = null!
  #x = 0
  #y = 0
  #isWindow = false
  #selector: string | undefined

  constructor(selector?: string) {
    this.#selector = selector
  }

  public get element() {
    return this.#element
  }

  public get x() {
    return this.#x
  }

  public get y() {
    return this.#y
  }

  public get value() {
    let top = 0
    let left = 0

    if (this.#isWindow) {
      top = window.scrollY
      left = window.scrollX
    } else {
      top = (this.#element as HTMLElement).scrollTop
      left = (this.#element as HTMLElement).scrollLeft
    }

    return { top, left }
  }

  public destroy() {
    this.#element?.removeEventListener('scroll', this.#scrollListener)
    document.documentElement.classList.remove('scroll-y')
    document.documentElement.classList.remove('scroll-x')
    document.documentElement.classList.remove('scroll-y-forward')
    document.documentElement.classList.remove('scroll-y-backward')
    document.documentElement.classList.remove('scroll-x-forward')
    document.documentElement.classList.remove('scroll-x-backward')
  }

  public update() {
    this.#element?.removeEventListener('scroll', this.#scrollListener)

    this.#y = 0
    this.#x = 0

    this.#element = this.#selector
      ? document.querySelector<HTMLElement>(this.#selector) || window
      : window

    this.#isWindow = this.#element === window

    this.#element?.addEventListener('scroll', this.#scrollListener)

    this.#scrollListener()
  }

  #scrollListener = () => {
    const { left, top } = this.value

    const directionY = top - this.#y
    const directionX = left - this.#x

    this.#y = top
    this.#x = left

    document.documentElement.classList.toggle('scroll-y', top > 0)
    document.documentElement.classList.toggle('scroll-x', left > 0)
    document.documentElement.classList.toggle(
      'scroll-y-forward',
      directionY > 0,
    )
    document.documentElement.classList.toggle(
      'scroll-y-backward',
      directionY < 0,
    )
    document.documentElement.classList.toggle(
      'scroll-x-forward',
      directionX > 0,
    )
    document.documentElement.classList.toggle(
      'scroll-x-backward',
      directionX < 0,
    )

    dispatchEvent(document, 'pageScroll', {
      detail: this.value,
    })
  }
}

declare global {
  interface DocumentEventMap {
    pageScroll: PageScrollEvent
  }
}
