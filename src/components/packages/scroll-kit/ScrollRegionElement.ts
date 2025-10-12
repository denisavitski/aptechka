import { CSSProperty } from '@packages/css-property'
import { ElementLinkedStore } from '@packages/element-linked-store'
import { elementResizer } from '@packages/element-resizer'
import { ticker } from '@packages/ticker'
import {
  clamp,
  dispatchEvent,
  getCumulativeOffsetTop,
  getStickyOffset,
  requestLoadingCallback,
} from '@packages/utils'
import { windowResizer } from '@packages/window-resizer'

export interface ScrollRegionElementEvents {
  scrollRegionProgress: CustomEvent<{
    scrolled: number
    progress: number
  }>
  scrollRegionEnter: CustomEvent
  scrollRegionExit: CustomEvent
}

export class ScrollRegionElement extends HTMLElement {
  #statusHolderElements: Array<HTMLElement> = [this]
  #progressHolderElements: Array<HTMLElement> = [this]
  #scrollElement: HTMLElement | Window | null = null

  #statusHolderCSSProperty = new CSSProperty<string | false>(
    this,
    '--scroll-region-status-holder',
    false,
  )
  #progressHolderCSSProperty = new CSSProperty<string | false>(
    this,
    '--scroll-region-progress-holder',
    false,
  )
  #disabledCSSProperty = new CSSProperty<boolean>(
    this,
    '--scroll-region-disabled',
    false,
  )
  #startOffsetCSSProperty = new CSSProperty<number>(
    this,
    '--scroll-region-start-offset',
    0,
    {
      rawValueCheck: false,
    },
  )
  #startOffsetMinCSSProperty = new CSSProperty<number | false>(
    this,
    '--scroll-region-start-offset-min',
    false,
    {
      rawValueCheck: false,
    },
  )
  #startExtraOffsetCSSProperty = new CSSProperty<number>(
    this,
    '--scroll-region-start-extra-offset',
    0,
    {
      rawValueCheck: false,
    },
  )
  #distanceCSSProperty = new CSSProperty<number>(
    this,
    '--scroll-region-distance',
    0,
    {
      rawValueCheck: false,
    },
  )
  #distanceOffsetCSSProperty = new CSSProperty<number>(
    this,
    '--scroll-region-distance-offset',
    0,
    {
      rawValueCheck: false,
    },
  )
  #progressVarCSSProperty = new CSSProperty<string>(
    this,
    '--scroll-region-progress-var',
    '',
  )
  #enterOnceCSSProperty = new CSSProperty<boolean>(
    this,
    '--scroll-region-enter-once',
    false,
  )

  #status = new ElementLinkedStore(this, {
    enabled: false,
    entered: false,
    enteredOnLoad: false,
    activated: false,
  })

  #initialPosition = 0
  #start = 0
  #finish = 0
  #distance = 0
  #scrolled = 0
  #progress = 0

  #visible = false

  #loadingUnsub: ReturnType<typeof requestLoadingCallback> | undefined

  public get start() {
    return this.#start
  }

  public get finish() {
    return this.#finish
  }

  public get distance() {
    return this.#distance
  }

  public get scrolled() {
    return this.#scrolled
  }

  public get progress() {
    return this.#progress
  }

  public get status() {
    return this.#status
  }

  public get scrollValue() {
    return this.#scrollElement instanceof HTMLElement
      ? this.#scrollElement!.scrollTop
      : this.#scrollElement!.scrollY
  }

  public resize() {
    if (this.#disabledCSSProperty.current) {
      return
    }

    this.#initialPosition = getCumulativeOffsetTop(this)

    this.#start = this.#initialPosition

    if (typeof this.#startOffsetMinCSSProperty.current === 'number') {
      this.#start += Math.max(
        this.#startOffsetCSSProperty.current,
        this.#startOffsetMinCSSProperty.current,
      )
    } else {
      this.#start += this.#startOffsetCSSProperty.current
    }

    this.#start += this.#startExtraOffsetCSSProperty.current

    this.#start -= getStickyOffset(this, 'top')

    this.#finish = this.#start

    if (this.#distanceCSSProperty.current) {
      this.#finish += this.#distanceCSSProperty.current
    } else {
      this.#finish += this.offsetHeight
    }

    this.#finish += this.#distanceOffsetCSSProperty.current

    this.#distance = this.#finish - this.#start

    this.#visible = this.offsetWidth !== 0 && this.offsetHeight !== 0

    this.tick()
  }

  public tick() {
    if (this.#disabledCSSProperty.current) {
      return
    }

    const scrollValue = this.scrollValue

    this.#scrolled = clamp(scrollValue - this.#start, 0, this.#distance)

    this.#progress = this.#scrolled / this.#distance || 0

    if (this.#progressVarCSSProperty.current) {
      for (
        let index = 0;
        index < this.#progressHolderElements.length;
        index++
      ) {
        const element = this.#progressHolderElements[index]
        element.style.setProperty(
          this.#cssVar(this.#progressVarCSSProperty.current),
          this.#progress.toFixed(6),
        )
      }
    }

    this.#status.set('activated', scrollValue >= this.#start)

    if (
      this.#visible &&
      this.#status.isFalse('entered') &&
      scrollValue >= this.#start &&
      scrollValue <= this.#finish
    ) {
      this.#enter()
    } else if (
      this.#visible &&
      !this.#enterOnceCSSProperty.current &&
      this.#status.isTrue('entered') &&
      (scrollValue < this.#start || scrollValue > this.#finish)
    ) {
      this.#exit()
    }

    if (this.#enterOnceCSSProperty.current && this.#progress === 1) {
      if (!this.#status.current.entered) {
        this.#enter()
      }

      this.destroy()
    }

    dispatchEvent(this, 'scrollRegionProgress', {
      detail: {
        progress: this.#progress,
        scrolled: this.#scrolled,
      },
    })
  }

  public destroy() {
    this.#loadingUnsub?.()

    this.disable(false)

    this.#statusHolderCSSProperty.close()
    this.#progressHolderCSSProperty.close()
    this.#disabledCSSProperty.close()
    this.#startOffsetCSSProperty.close()
    this.#startOffsetMinCSSProperty.close()
    this.#startExtraOffsetCSSProperty.close()
    this.#distanceCSSProperty.close()
    this.#distanceOffsetCSSProperty.close()
    this.#progressVarCSSProperty.close()
    this.#enterOnceCSSProperty.close()
  }

  public enable() {
    ticker.subscribe(this.#tickListener, { culling: this })
    elementResizer.subscribe(this, this.#resizeListener)
    windowResizer.subscribe(this.#resizeListener)
    this.#tickListener()

    this.#status.set('enabled', true)
  }

  public disable(resetStatus = true) {
    ticker.unsubscribe(this.#tickListener)
    elementResizer.unsubscribe(this.#resizeListener)
    windowResizer.unsubscribe(this.#resizeListener)

    if (resetStatus) {
      this.#status.reset()
    }

    this.#removeGlobalClasses()
  }

  protected connectedCallback() {
    const scrollSelector = this.getAttribute('data-scroll') || '.page-scroll'

    if (scrollSelector) {
      this.#scrollElement = document.querySelector<HTMLElement>(scrollSelector)
    } else {
      this.#scrollElement = window
    }

    this.#loadingUnsub = requestLoadingCallback('load', this.#loadingListener)
  }

  protected disconnectedCallback() {
    this.destroy()
  }

  #addGlobalClasses() {
    if (this.hasAttribute('data-global-class')) {
      document.documentElement.classList.add(
        this.getAttribute('data-global-class')!,
      )
    }
  }

  #removeGlobalClasses() {
    if (this.hasAttribute('data-global-class')) {
      document.documentElement.classList.remove(
        this.getAttribute('data-global-class')!,
      )
    }
  }

  #init() {
    this.#statusHolderCSSProperty.subscribe((e) => {
      if (this.#statusHolderElements.length) {
        this.#statusHolderElements.forEach((el) => {
          this.#status.removeElement(el)
        })
      }

      this.#statusHolderElements = []

      if (e.current) {
        e.current
          .split(',')
          .map((v) => v.trim())
          .forEach((selector) => {
            const element = document.querySelector(selector)

            if (element instanceof HTMLElement) {
              this.#statusHolderElements.push(element)
              this.#status.addElement(element)
            }
          })
      } else {
        this.#statusHolderElements = [this]
        this.#status.addElement(this)
      }
    })

    this.#progressHolderCSSProperty.subscribe((e) => {
      if (this.#progressHolderElements.length) {
        this.#progressHolderElements.forEach((el) => {
          el.style.removeProperty(
            this.#cssVar(this.#progressVarCSSProperty.current),
          )
        })
      }

      this.#progressHolderElements = []

      if (e.current) {
        e.current
          .split(',')
          .map((v) => v.trim())
          .forEach((selector) => {
            const element = document.querySelector(selector)

            if (element instanceof HTMLElement) {
              this.#progressHolderElements.push(element)
            }
          })
      } else {
        this.#progressHolderElements = [this]
      }
    })

    this.#disabledCSSProperty.subscribe((e) => {
      if (e.current && !e.previous) {
        this.disable()
      } else {
        this.enable()
      }
    })

    this.#progressVarCSSProperty.subscribe((e) => {
      if (e.current) {
        this.#tickListener()
      } else if (e.previous) {
        this.#progressHolderElements.forEach((el) => {
          el.style.removeProperty(this.#cssVar(e.previous!))
        })
      }
    })

    this.#distanceCSSProperty.subscribe(() => {
      this.#resizeListener()
    })

    this.#statusHolderCSSProperty.observe()
    this.#progressHolderCSSProperty.observe()
    this.#disabledCSSProperty.observe()
    this.#startOffsetCSSProperty.observe()
    this.#startOffsetMinCSSProperty.observe()
    this.#startExtraOffsetCSSProperty.observe()
    this.#distanceCSSProperty.observe()
    this.#distanceOffsetCSSProperty.observe()

    this.#progressVarCSSProperty.observe()
    this.#enterOnceCSSProperty.observe()
  }

  #resizeListener = () => {
    this.resize()
  }

  #tickListener = () => {
    this.tick()
  }

  #enter() {
    const scrollValue = this.scrollValue

    this.#status.set('entered', true)

    if (scrollValue === 0) {
      this.#status.set('enteredOnLoad', true)
    }

    this.#addGlobalClasses()

    dispatchEvent(this, 'scrollRegionEnter')
  }

  #exit() {
    this.#status.set('entered', false)

    this.#removeGlobalClasses()

    dispatchEvent(this, 'scrollRegionExit')
  }

  #cssVar(value: string) {
    return `--${value}`
  }

  #loadingListener = () => {
    this.#init()
  }
}

if (!customElements.get('e-scroll-region')) {
  customElements.define('e-scroll-region', ScrollRegionElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-region': ScrollRegionElement
  }

  interface HTMLElementEventMap extends ScrollRegionElementEvents {}
}
