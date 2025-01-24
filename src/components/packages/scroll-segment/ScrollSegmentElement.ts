import { CSSProperty } from '@packages/css-property'
import { RESIZE_ORDER, TICK_ORDER } from '@packages/order'
import { windowResizer } from '@packages/window-resizer'
import {
  dispatchEvent,
  getCumulativeOffsetLeft,
  getCumulativeOffsetTop,
  getStickyOffset,
  isBrowser,
  step,
} from '@packages/utils'
import { Store } from '@packages/store'
import { ScrollEntry, scrollEntries } from '@packages/scroll-entries'
import { debounce } from '@packages/utils'
import { Damped } from '@packages/animation'
import { ScrollSegmentDefaultContainer } from './ScrollSegmentDefaultContainer'

export interface ScrollSegmentEvents {
  scrollSegmentCapture: CustomEvent
  scrollSegmentCaptureFromStart: CustomEvent
  scrollSegmentCaptureFromFinish: CustomEvent
  scrollSegmentRelease: CustomEvent
  scrollSegmentReleaseFromStart: CustomEvent
  scrollSegmentReleaseFromFinish: CustomEvent
}

export interface ScrollSegmentContainer {
  element: HTMLElement
  currentScrollValue: number
  vertical: boolean
  onScroll(callback: Function): void
  offScroll(callback: Function): void
}

export interface ScrollSegmentContainerElement
  extends Omit<ScrollSegmentContainer, 'element'>,
    HTMLElement {}

export class ScrollSegmentElement extends HTMLElement {
  #scrollContainer: ScrollSegmentContainer | ScrollSegmentContainerElement =
    null!
  #dampingCSSProperty = new CSSProperty<number>(this, '--damping', 20)
  #massCSSProperty = new CSSProperty<number>(this, '--mass', 0)
  #stiffnessCSSProperty = new CSSProperty<number>(this, '--stiffness', 0)
  #targetCSSProperty = new CSSProperty<string>(this, '--target', '')
  #disabledCSSProperty = new CSSProperty<boolean>(this, '--disabled', false)
  #distanceOffsetCSSProperty = new CSSProperty<number>(
    this,
    '--distance-offset',
    0,
    { rawValueCheck: false }
  )
  #startOffsetCSSProperty = new CSSProperty<number>(this, '--start-offset', 0, {
    rawValueCheck: false,
  })
  #captureOnceCSSProperty = new CSSProperty<boolean>(
    this,
    '--capture-once',
    false
  )
  #capturedCSSProperty = new CSSProperty<string>(this, '--captured', '')
  #releasedCSSProperty = new CSSProperty<string>(this, '--released', '')
  #capturedFromStartCSSProperty = new CSSProperty<string>(
    this,
    '--captured-from-start',
    ''
  )
  #capturedFromFinishCSSProperty = new CSSProperty<string>(
    this,
    '--captured-from-finish',
    ''
  )
  #releasedFromStartCSSProperty = new CSSProperty<string>(
    this,
    '--released-from-start',
    ''
  )
  #releasedFromFinishCSSProperty = new CSSProperty<string>(
    this,
    '--released-from-finish',
    ''
  )
  #passedVarCSSProperty = new CSSProperty<string>(this, '--passed-var', '')
  #progressVarCSSProperty = new CSSProperty<string>(this, '--progress-var', '')
  #progressArcVarCSSProperty = new CSSProperty<string>(
    this,
    '--progress-arc-var',
    ''
  )
  #progressArcMultCSSProperty = new CSSProperty<number>(
    this,
    '--progress-arc-mult',
    1
  )
  #animationVarTypeCSSProperty = new CSSProperty<'current' | 'target'>(
    this,
    '--animation-var-type',
    'target'
  )
  #distanceVarCSSProperty = new CSSProperty<string>(this, '--distance-var', '')
  #startVarCSSProperty = new CSSProperty<string>(this, '--start-var', '')
  #finishVarCSSProperty = new CSSProperty<string>(this, '--finish-var', '')

  #isCaptured = new Store(false)
  #isReleased = new Store(false)
  #isCapturedFromStart = new Store(false)
  #isReleasedFromStart = new Store(false)
  #isCapturedFromFinish = new Store(false)
  #isReleasedFromFinish = new Store(false)

  #anotherScrollEntries: Array<ScrollEntry> = []
  #targetElement: HTMLElement = this

  #directionPosition = 0
  #directionSize = 0
  #moverDirectionSize = 0

  #passed = new Damped(0, { order: TICK_ORDER.SEGMENT, min: 0, max: 1 })
  #progress = 0

  #start = 0
  #distance = 0
  #finish = 0

  #isResized = false
  #isCapturedOnce = false
  #isDisabled = true

  #skipPassNotification = false

  public get scrollContainer() {
    return this.#scrollContainer
  }

  public set scrollContainer(
    value: ScrollSegmentContainerElement | ScrollSegmentContainer
  ) {
    this.#disconnect()
    this.#scrollContainer = value
    this.#connect()
  }

  public get distanceOffsetCSSProperty() {
    return this.#distanceOffsetCSSProperty
  }

  public get startOffsetCSSProperty() {
    return this.#startOffsetCSSProperty
  }

  public get captureOnceCSSProperty() {
    return this.#captureOnceCSSProperty
  }

  public get capturedCSSProperty() {
    return this.#capturedCSSProperty
  }

  public get releasedCSSProperty() {
    return this.#releasedCSSProperty
  }

  public get capturedFromStartCSSProperty() {
    return this.#capturedFromStartCSSProperty
  }

  public get capturedFromFinishCSSProperty() {
    return this.#capturedFromFinishCSSProperty
  }

  public get releasedFromStartCSSProperty() {
    return this.#releasedFromStartCSSProperty
  }

  public get releasedFromFinishCSSProperty() {
    return this.#releasedFromFinishCSSProperty
  }

  public get passedVarCSSProperty() {
    return this.#passedVarCSSProperty
  }

  public get progressVarCSSProperty() {
    return this.#progressVarCSSProperty
  }

  public get progressArcVarCSSProperty() {
    return this.#progressArcVarCSSProperty
  }

  public get progressArcMultCSSProperty() {
    return this.#progressArcMultCSSProperty
  }

  public get animationVarTypeCSSProperty() {
    return this.#animationVarTypeCSSProperty
  }

  public get distanceVarCSSProperty() {
    return this.#distanceVarCSSProperty
  }

  public get startVarCSSProperty() {
    return this.#startVarCSSProperty
  }

  public get finishVarCSSProperty() {
    return this.#finishVarCSSProperty
  }

  public get disabledCSSProperty() {
    return this.#disabledCSSProperty
  }

  public get dampingCSSProperty() {
    return this.#dampingCSSProperty
  }

  public get massCSSProperty() {
    return this.#massCSSProperty
  }

  public get stiffnessCSSProperty() {
    return this.#stiffnessCSSProperty
  }

  public get targetCSSProperty() {
    return this.#targetCSSProperty
  }

  public get isCaptured() {
    return this.#isCaptured
  }

  public get isReleased() {
    return this.#isReleased
  }

  public get isCapturedFromStart() {
    return this.#isCapturedFromStart
  }

  public get isReleasedFromStart() {
    return this.#isReleasedFromStart
  }

  public get isCapturedFromFinish() {
    return this.#isCapturedFromFinish
  }

  public get isReleasedFromFinish() {
    return this.#isReleasedFromFinish
  }

  public get directionPosition() {
    return this.#directionPosition
  }

  public get directionSize() {
    return this.#directionSize
  }

  public get passed() {
    return this.#passed
  }

  public get progress() {
    return this.#progress
  }

  public get progressArc() {
    return (
      Math.abs(Math.cos(this.#progress * Math.PI)) *
      this.#progressArcMultCSSProperty.current
    )
  }

  public get start() {
    return this.#start
  }

  public get finish() {
    return this.#finish
  }

  public get distance() {
    return this.#distance
  }

  public get isCapturedOnce() {
    return this.#isCapturedOnce
  }

  public get isDisabled() {
    return this.#isDisabled
  }

  public resize = () => {
    this.#directionSize = this.#scrollContainer.vertical
      ? this.offsetHeight
      : this.offsetWidth

    const el =
      this.#scrollContainer instanceof HTMLElement
        ? this.#scrollContainer
        : this.#scrollContainer.element

    this.#directionPosition = this.#scrollContainer.vertical
      ? getCumulativeOffsetTop(this, el)
      : getCumulativeOffsetLeft(this, el)

    const stickyOffset = getStickyOffset(
      this,
      this.#scrollContainer.vertical ? 'top' : 'left'
    )

    this.#directionPosition -= stickyOffset

    this.#start = this.getStart()
    this.#distance = this.getDistance()

    this.#start += this.#startOffsetCSSProperty.current
    this.#distance += this.#distanceOffsetCSSProperty.current

    this.#finish = this.#start + this.#distance

    if (
      this.#scrollContainer.currentScrollValue > this.#finish &&
      !this.#isCaptured.current &&
      !this.#isReleased.current
    ) {
      this.#isCaptured.current = true
    }

    this.setVar(this.#startVarCSSProperty.current, this.#start)
    this.setVar(this.#finishVarCSSProperty.current, this.#finish)
    this.setVar(this.#distanceVarCSSProperty.current, this.#distance)

    this.#passed.max = this.#distance

    this.#isResized = true

    this.#tickListener()
  }

  public tick() {
    let scrollValue = this.#scrollContainer.currentScrollValue

    this.#anotherScrollEntries.forEach((se) => {
      scrollValue += se.value
    })

    const delta = scrollValue - this.#start

    if (!this.#skipPassNotification) {
      this.#skipPassNotification = this.#passed.previous
        ? Math.abs(this.#passed.previous - delta) > 1000
        : false
    }

    this.#passed.set(delta)

    const fscrollValue = Math.round(scrollValue)

    if (this.#isCaptured.current) {
      if (fscrollValue >= this.#start) {
        if (!this.#isCapturedFromStart.current) {
          this.#captureFromStartListener()
        }
      } else {
        if (
          this.#isCapturedFromStart.current &&
          !this.#isReleasedFromStart.current
        ) {
          this.#releaseFromStartListener()
        }
      }

      if (fscrollValue < this.#finish) {
        if (
          this.#isReleasedFromFinish.current &&
          !this.#isCapturedFromFinish.current
        ) {
          this.#captureFromFinishListener()
        }
      } else {
        if (
          this.#isCapturedFromStart.current &&
          !this.#isReleasedFromFinish.current
        ) {
          this.#releaseFromFinishListener()
        }
      }
    }

    if (fscrollValue >= this.#start && fscrollValue < this.#finish) {
      if (!this.#isCaptured.current) {
        this.#captureListener()
      }
    } else if (this.#isCaptured.current) {
      this.#passed.set(
        step(this.#distance / 2, this.#passed.target, 0, this.#distance)
      )

      this.#releaseListener()
    }

    if (this.#isCapturedOnce && this.#captureOnceCSSProperty.current) {
      if (this.#capturedCSSProperty.current) {
        this.#targetElement.classList.add(this.#capturedCSSProperty.current)
      }
      this.#isDisabled = true
    }
  }

  public disable() {
    this.style.cssText = ''

    this.#directionPosition = 0
    this.#directionSize = 0
    this.#passed.reset()
    this.#progress = 0
    this.#start = 0
    this.#distance = 0
    this.#finish = 0
    this.#isResized = false
    this.#isCaptured.current = false
    this.#isReleased.current = false
    this.#isCapturedFromStart.current = false
    this.#isReleasedFromStart.current = false
    this.#isCapturedFromFinish.current = false
    this.#isReleasedFromFinish.current = false
    this.#isCapturedOnce = false
    this.#isDisabled = true

    this.#removeCurrentMarks()
  }

  public enable() {
    this.#isDisabled = false
  }

  protected connectedCallback() {
    this.scrollContainer = new ScrollSegmentDefaultContainer(this)
  }

  protected disconnectedCallback() {
    if (this.#scrollContainer instanceof ScrollSegmentDefaultContainer) {
      this.#scrollContainer.destroy()
    }

    this.#disconnect()
  }

  protected removeVar(name: string | undefined) {
    if (name) {
      this.#targetElement.style.removeProperty(`--${name}`)
    }
  }

  protected setVar(name: string | undefined, value: string | number) {
    if (name) {
      const v = typeof value === 'number' ? value.toFixed(6) : value
      this.#targetElement.style.setProperty(`--${name}`, v)
    }
  }

  protected getDistance() {
    return this.#directionSize + this.#moverDirectionSize
  }

  protected getStart() {
    return this.#directionPosition - this.#moverDirectionSize
  }

  protected findAnotherScrollEntries = debounce(() => {
    const allScrollEntriesAbove = scrollEntries.getAll(this).reverse()

    let scrollIndex = 0

    allScrollEntriesAbove.forEach((entry, i) => {
      if (entry.element === this.#scrollContainer) {
        scrollIndex = i
      }
    })

    this.#anotherScrollEntries = allScrollEntriesAbove.slice(scrollIndex + 1)
    this.tick()
  }, 0)

  #connect() {
    if (!this.#scrollContainer) {
      return
    }

    this.#isCaptured.subscribe((state) => {
      if (state.current) {
        dispatchEvent(this, 'scrollSegmentCapture', {
          composed: true,
          custom: true,
        })
      }
    })

    this.#isCapturedFromStart.subscribe((state) => {
      if (state.current) {
        dispatchEvent(this, 'scrollSegmentCaptureFromStart', {
          composed: true,
          custom: true,
        })
      }
    })

    this.#isCapturedFromFinish.subscribe((state) => {
      if (state.current) {
        dispatchEvent(this, 'scrollSegmentCaptureFromFinish', {
          composed: true,
          custom: true,
        })
      }
    })

    this.#isReleased.subscribe((state) => {
      if (state.current) {
        dispatchEvent(this, 'scrollSegmentRelease', {
          composed: true,
          custom: true,
        })
      }
    })

    this.#isReleasedFromStart.subscribe((state) => {
      if (state.current) {
        dispatchEvent(this, 'scrollSegmentReleaseFromStart', {
          composed: true,
          custom: true,
        })
      }
    })

    this.#isReleasedFromFinish.subscribe((state) => {
      if (state.current) {
        dispatchEvent(this, 'scrollSegmentReleaseFromFinish', {
          composed: true,
          custom: true,
        })
      }
    })

    this.#dampingCSSProperty.observe()
    this.#massCSSProperty.observe()
    this.#stiffnessCSSProperty.observe()
    this.#targetCSSProperty.observe()
    this.#disabledCSSProperty.observe()
    this.#distanceOffsetCSSProperty.observe()
    this.#startOffsetCSSProperty.observe()
    this.#captureOnceCSSProperty.observe()
    this.#capturedCSSProperty.observe()
    this.#releasedCSSProperty.observe()
    this.#capturedFromStartCSSProperty.observe()
    this.#capturedFromFinishCSSProperty.observe()
    this.#releasedFromStartCSSProperty.observe()
    this.#releasedFromFinishCSSProperty.observe()
    this.#passedVarCSSProperty.observe()
    this.#progressVarCSSProperty.observe()
    this.#progressArcVarCSSProperty.observe()
    this.#progressArcMultCSSProperty.observe()
    this.#animationVarTypeCSSProperty.observe()
    this.#distanceVarCSSProperty.observe()
    this.#startVarCSSProperty.observe()
    this.#finishVarCSSProperty.observe()

    let isConnected = false

    this.findAnotherScrollEntries()

    if (!this.#disabledCSSProperty.current) {
      this.enable()
    }

    this.#dampingCSSProperty.subscribe((e) => {
      this.#passed.damping = e.current
    })

    this.#massCSSProperty.subscribe((e) => {
      this.#passed.mass = e.current
    })

    this.#stiffnessCSSProperty.subscribe((e) => {
      this.#passed.stiffness = e.current
    })

    this.#targetCSSProperty.subscribe((e) => {
      if (e.previous) {
        this.#removeCurrentMarks()
      }

      if (e.current) {
        if (e.current === 'parent') {
          this.#targetElement = this.parentElement || this
        } else {
          this.#targetElement = document.querySelector(e.current) || this
        }
      } else {
        this.#targetElement = this
      }
    })

    this.#disabledCSSProperty.subscribe((e) => {
      if (e.current && !e.previous) {
        this.disable()
      } else if (!e.current && e.previous) {
        this.resize()
        this.enable()
      }
    })

    this.#startOffsetCSSProperty.subscribe(() => {
      if (isConnected && !this.#isDisabled) {
        this.resize()
      }
    })

    this.#distanceOffsetCSSProperty.subscribe(() => {
      if (isConnected && !this.#isDisabled) {
        this.resize()
      }
    })

    this.#capturedCSSProperty.subscribe((e) => {
      this.#handleClassSetting(e)
    })

    this.#capturedFromStartCSSProperty.subscribe((e) => {
      this.#handleClassSetting(e)
    })

    this.#capturedFromFinishCSSProperty.subscribe((e) => {
      this.#handleClassSetting(e)
    })

    this.#releasedCSSProperty.subscribe((e) => {
      this.#handleClassSetting(e)
    })

    this.#releasedFromStartCSSProperty.subscribe((e) => {
      this.#handleClassSetting(e)
    })

    this.#releasedFromFinishCSSProperty.subscribe((e) => {
      this.#handleClassSetting(e)
    })

    this.#captureOnceCSSProperty.subscribe((v) => {
      if (this.#isDisabled) return

      if (!v.current && v.previous) {
        this.resize()
        this.enable()
      }
    })

    this.#passedVarCSSProperty.subscribe((v) => {
      if (this.#isDisabled) return

      this.removeVar(v.previous)
      this.setVar(v.current, this.passed.current)
    })

    this.#progressVarCSSProperty.subscribe((v) => {
      if (this.#isDisabled) return
      this.removeVar(v.previous)
      this.setVar(v.current, this.#progress)
    })

    this.#progressArcVarCSSProperty.subscribe((v) => {
      if (this.#isDisabled) return
      this.removeVar(v.previous)
      this.setVar(v.current, this.progressArc)
    })

    this.#progressArcMultCSSProperty.subscribe((v) => {
      if (this.#isDisabled) return
      this.#updateProgress()
    })

    this.#startVarCSSProperty.subscribe((v) => {
      if (this.#isDisabled) return

      this.removeVar(v.previous)
      this.setVar(v.current, this.#start)
    })

    this.#finishVarCSSProperty.subscribe((v) => {
      if (this.#isDisabled) return

      this.removeVar(v.previous)
      this.setVar(v.current, this.#finish)
    })

    this.#distanceVarCSSProperty.subscribe((v) => {
      if (this.#isDisabled) return

      this.removeVar(v.previous)
      this.setVar(v.current, this.#distance)
    })

    this.#passed.subscribe((e) => {
      if (this.#skipPassNotification) {
        this.#skipPassNotification = false
        return
      }

      this.#updateProgress()
    })

    windowResizer.subscribe(this.#resizeListener, RESIZE_ORDER.SCROLL + 1)

    this.scrollContainer.onScroll(this.#tickListener)

    isConnected = true
  }

  #disconnect() {
    if (!this.#scrollContainer) {
      return
    }

    windowResizer.unsubscribe(this.#resizeListener)

    this.scrollContainer.offScroll(this.#tickListener)

    this.#dampingCSSProperty.close()
    this.#massCSSProperty.close()
    this.#stiffnessCSSProperty.close()
    this.#targetCSSProperty.close()
    this.#disabledCSSProperty.close()
    this.#distanceOffsetCSSProperty.close()
    this.#startOffsetCSSProperty.close()
    this.#captureOnceCSSProperty.close()
    this.#capturedCSSProperty.close()
    this.#releasedCSSProperty.close()
    this.#capturedFromStartCSSProperty.close()
    this.#capturedFromFinishCSSProperty.close()
    this.#releasedFromStartCSSProperty.close()
    this.#releasedFromFinishCSSProperty.close()
    this.#passedVarCSSProperty.close()
    this.#progressVarCSSProperty.close()
    this.#progressArcVarCSSProperty.close()
    this.#progressArcMultCSSProperty.close()
    this.#distanceVarCSSProperty.close()
    this.#startVarCSSProperty.close()
    this.#finishVarCSSProperty.close()
    this.#isCaptured.close()
    this.#isReleased.close()
    this.#isCapturedFromStart.close()
    this.#isReleasedFromStart.close()
    this.#isCapturedFromFinish.close()
    this.#isReleasedFromFinish.close()
    this.disable()
    this.#passed.close()
  }

  #captureListener() {
    this.#isCaptured.current = true
    this.#isReleased.current = false
    this.#isCapturedOnce = true

    if (this.#releasedCSSProperty.current) {
      this.#targetElement.classList.remove(this.#releasedCSSProperty.current)
    }

    if (this.#releasedFromFinishCSSProperty.current) {
      this.#targetElement.classList.remove(
        this.#releasedFromFinishCSSProperty.current
      )
    }

    if (this.#releasedFromFinishCSSProperty.current) {
      this.#targetElement.classList.remove(
        this.#releasedFromFinishCSSProperty.current
      )
    }

    if (this.#capturedCSSProperty.current) {
      this.#targetElement.classList.add(this.#capturedCSSProperty.current)
    }
  }

  #releaseListener() {
    this.#isReleased.current = true
    this.#isCaptured.current = false
    this.#isCapturedOnce = true

    if (this.#capturedCSSProperty.current) {
      this.#targetElement.classList.remove(this.#capturedCSSProperty.current)
    }

    if (this.#capturedFromStartCSSProperty.current) {
      this.#targetElement.classList.remove(
        this.#capturedFromStartCSSProperty.current
      )
    }

    if (this.#capturedFromFinishCSSProperty.current) {
      this.#targetElement.classList.remove(
        this.#capturedFromFinishCSSProperty.current
      )
    }

    if (this.#releasedCSSProperty.current) {
      this.#targetElement.classList.add(this.#releasedCSSProperty.current)
    }
  }

  #captureFromStartListener() {
    this.#isCaptured.current = true
    this.#isCapturedFromStart.current = true
    this.#isReleasedFromStart.current = false

    if (this.#capturedFromStartCSSProperty.current) {
      this.#targetElement.classList.add(
        this.#capturedFromStartCSSProperty.current
      )
    }
  }

  #captureFromFinishListener() {
    this.#isCaptured.current = true
    this.#isCapturedFromFinish.current = true
    this.#isReleasedFromFinish.current = false

    if (this.#capturedFromFinishCSSProperty.current) {
      this.#targetElement.classList.add(
        this.#capturedFromFinishCSSProperty.current
      )
    }
  }

  #releaseFromStartListener() {
    this.#isReleased.current = true
    this.#isReleasedFromStart.current = true
    this.#isCapturedFromStart.current = false

    if (this.#releasedFromFinishCSSProperty.current) {
      this.#targetElement.classList.add(
        this.#releasedFromFinishCSSProperty.current
      )
    }
  }

  #releaseFromFinishListener() {
    this.#isReleased.current = true
    this.#isReleasedFromFinish.current = true
    this.#isCapturedFromFinish.current = false

    if (this.#releasedFromFinishCSSProperty.current) {
      this.#targetElement.classList.add(
        this.#releasedFromFinishCSSProperty.current
      )
    }
  }

  #resizeListener = () => {
    if (!this.#isDisabled) {
      this.resize()
    }
  }

  #tickListener = () => {
    if (!this.#isDisabled && this.#isResized) {
      this.tick()
    }
  }

  #updateProgress() {
    const passedValue = this.#passed[this.#animationVarTypeCSSProperty.current]

    this.setVar(this.#passedVarCSSProperty.current, passedValue)

    this.#progress = passedValue / this.#distance || 0

    this.setVar(this.#progressVarCSSProperty.current, this.#progress)

    if (this.#progressArcVarCSSProperty.current) {
      this.setVar(this.#progressArcVarCSSProperty.current, this.progressArc)
    }
  }

  #handleClassSetting(e: { current: string; previous?: string }) {
    if (this.#isDisabled) {
      e.previous && this.#targetElement.classList.remove(e.previous)
      e.current && this.#targetElement.classList.remove(e.current)
      return
    }

    if (e.current && this.#isCaptured.current) {
      e.previous && this.#targetElement.classList.remove(e.previous)
      this.#targetElement.classList.add(e.current)
    } else if (!e.current && e.previous) {
      this.#targetElement.classList.remove(e.previous)
    }
  }

  #removeClasses(...className: (string | undefined)[]) {
    className.forEach((c) => {
      c && this.#targetElement.classList.remove(c)
    })
  }

  #removeVars(...vars: (string | undefined)[]) {
    vars.forEach((v) => {
      if (v) {
        this.#targetElement.style.removeProperty(`--${v}`)
      }
    })
  }

  #removeCurrentMarks() {
    this.#removeClasses(
      this.#capturedCSSProperty.current,
      this.#capturedFromStartCSSProperty.current,
      this.#capturedFromFinishCSSProperty.current,
      this.#releasedCSSProperty.current,
      this.#releasedFromStartCSSProperty.current,
      this.#releasedFromFinishCSSProperty.current
    )
    this.#removeVars(
      this.#passedVarCSSProperty.current,
      this.#progressVarCSSProperty.current,
      this.#progressArcVarCSSProperty.current,
      this.#distanceVarCSSProperty.current,
      this.#startVarCSSProperty.current,
      this.#finishVarCSSProperty.current
    )
  }
}

if (isBrowser && !customElements.get('scroll-segment')) {
  customElements.define('scroll-segment', ScrollSegmentElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'scroll-segment': ScrollSegmentElement
  }

  interface HTMLElementEventMap extends ScrollSegmentEvents {}
}
