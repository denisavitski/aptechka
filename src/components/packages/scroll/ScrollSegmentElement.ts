import { CSSProperty } from '@packages/css-property'
import { RESIZE_ORDER } from '@packages/order'
import { windowResizer } from '@packages/window-resizer'
import {
  getCumulativeOffsetLeft,
  getCumulativeOffsetTop,
} from '@packages/utils/layout'
import { clamp, smootherstep, smoothstep, step } from '@packages/utils/math'
import { define } from '@packages/custom-element'
import { Store } from '@packages/store'
import { ScrollEntry, scrollEntries } from '@packages/scroll-entries'
import { ScrollUserElement } from './ScrollUserElement'
import { debounce } from '@packages/utils'

export interface ScrollSegmentResizeDetail {
  start: number
  distance: number
  finish: number
}

export interface ScrollSegmentPassDetail extends ScrollSegmentResizeDetail {
  passed: number
  progress: number
}

@define('e-scroll-segment')
export class ScrollSegmentElement extends ScrollUserElement {
  #targetCSSProperty = new CSSProperty<string>(this, '--target', '')
  #disabledCSSProperty = new CSSProperty<boolean>(this, '--disabled', false)
  #distanceOffsetCSSProperty = new CSSProperty<number>(
    this,
    '--distance-offset',
    0
  )
  #startOffsetCSSProperty = new CSSProperty<number>(this, '--start-offset', 0)
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
  #distanceVarCSSProperty = new CSSProperty<string>(this, '--distance-var', '')
  #startVarCSSProperty = new CSSProperty<string>(this, '--start-var', '')
  #finishVarCSSProperty = new CSSProperty<string>(this, '--finish-var', '')
  #smoothstepCSSProperty = new CSSProperty<boolean>(this, '--smoothstep', false)
  #smootherstepCSSProperty = new CSSProperty<boolean>(
    this,
    '--smootherstep',
    false
  )

  #isCaptured = new Store(false)
  #isReleased = new Store(false)
  #isCapturedFromStart = new Store(false)
  #isReleasedFromStart = new Store(false)
  #isCapturedFromFinish = new Store(false)
  #isReleasedFromFinish = new Store(false)

  #scrollEntries: Array<ScrollEntry> = []
  #targetElement: HTMLElement = this

  #directionPosition = 0
  #directionSize = 0
  #moverDirectionSize = 0

  #passed = 0
  #progress = 0

  #start = 0
  #distance = 0
  #finish = 0

  #isResized = false
  #isCapturedOnce = false
  #isDisabled = true

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

  public get distanceVarCSSProperty() {
    return this.#distanceVarCSSProperty
  }

  public get startVarCSSProperty() {
    return this.#startVarCSSProperty
  }

  public get finishVarCSSProperty() {
    return this.#finishVarCSSProperty
  }

  public get smoothstepCSSProperty() {
    return this.#smoothstepCSSProperty
  }

  public get smootherstepCSSProperty() {
    return this.#smootherstepCSSProperty
  }

  public get disabledCSSProperty() {
    return this.#disabledCSSProperty
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

  public resize() {
    this.#directionSize = this.scrollElement.vertical
      ? this.offsetHeight
      : this.offsetWidth

    this.#directionPosition = this.scrollElement.vertical
      ? getCumulativeOffsetTop(this, this.scrollElement)
      : getCumulativeOffsetLeft(this, this.scrollElement)

    this.#start = this.getStart()
    this.#distance = this.getDistance()

    this.#start += this.#startOffsetCSSProperty.current
    this.#distance += this.#distanceOffsetCSSProperty.current

    this.#finish = this.#start + this.#distance

    if (
      this.scrollElement.currentScrollValue > this.#finish &&
      !this.#isCaptured.current &&
      !this.#isReleased.current
    ) {
      this.#isCaptured.current = true
    }

    this.setVar(this.#startVarCSSProperty.current, this.#start)
    this.setVar(this.#finishVarCSSProperty.current, this.#finish)
    this.setVar(this.#distanceVarCSSProperty.current, this.#distance)

    this.#isResized = true
  }

  public tick() {
    let scrollValue = this.scrollElement.currentScrollValue

    this.#scrollEntries.forEach((se) => {
      scrollValue += se.value
    })

    this.#passed =
      this.updateValue(scrollValue - this.#start, 0, this.#distance) || 0
    this.#progress = this.#passed / this.#distance || 0

    const fscrollValue = Math.round(scrollValue)

    if (this.#isCaptured.current) {
      if (fscrollValue > this.#start) {
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

    if (fscrollValue > this.#start && fscrollValue < this.#finish) {
      this.#passListener()

      if (!this.#isCaptured.current) {
        this.#captureListener()
      }
    } else if (this.#isCaptured.current) {
      this.#passed = step(this.#distance / 2, this.#passed, 0, this.#distance)

      this.#progress = this.#passed / this.#distance

      this.#passListener()
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
    this.#passed = 0
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

  protected override connectedCallback() {
    super.connectedCallback()

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
    this.#distanceVarCSSProperty.observe()
    this.#startVarCSSProperty.observe()
    this.#finishVarCSSProperty.observe()
    this.#smoothstepCSSProperty.observe()
    this.#smootherstepCSSProperty.observe()

    let isConnected = false

    this.scrollElement.addEventListener(
      'sectionsChange',
      this.#sectionsChangeListener
    )

    this.#sectionsChangeListener()

    if (!this.#disabledCSSProperty.current) {
      this.enable()
    }

    this.#targetCSSProperty.subscribe((v) => {
      if (v.previous) {
        this.#removeCurrentMarks()
      }

      if (v.current) {
        if (v.current === 'parent') {
          this.#targetElement = this.parentElement || this
        } else {
          this.#targetElement = document.querySelector(v.current) || this
        }
      } else {
        this.#targetElement = this
      }
    })

    this.#disabledCSSProperty.subscribe((detail) => {
      if (detail.current && !detail.previous) {
        this.disable()
      } else if (!detail.current && detail.previous) {
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
      this.setVar(v.current, this.passed)
    })

    this.#progressVarCSSProperty.subscribe((v) => {
      if (this.#isDisabled) return
      this.removeVar(v.previous)
      this.setVar(v.current, this.#progress)
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

    windowResizer.subscribe(this.#resizeListener, RESIZE_ORDER.SEGMENT)

    this.scrollElement.onScroll(this.#tickListener)

    isConnected = true
  }

  protected disconnectedCallback() {
    windowResizer.unsubscribe(this.#resizeListener)

    this.scrollElement.offScroll(this.#tickListener)

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
    this.#distanceVarCSSProperty.close()
    this.#startVarCSSProperty.close()
    this.#finishVarCSSProperty.close()
    this.#smoothstepCSSProperty.close()
    this.#smootherstepCSSProperty.close()
    this.#isCaptured.close()
    this.#isReleased.close()
    this.#isCapturedFromStart.close()
    this.#isReleasedFromStart.close()
    this.#isCapturedFromFinish.close()
    this.#isReleasedFromFinish.close()
    this.disable()
  }

  protected removeVar(name: string | undefined) {
    if (name) {
      this.#targetElement.style.removeProperty(`--${name}`)
    }
  }

  protected setVar(name: string | undefined, value: string | number) {
    if (name) {
      this.#targetElement.style.setProperty(`--${name}`, value.toString())
    }
  }

  protected updateValue(v: number, min = 0, max = 1) {
    if (this.smootherstepCSSProperty.current) {
      return smootherstep(v, min, max) * max
    } else if (this.#smoothstepCSSProperty.current) {
      return smoothstep(v, min, max) * max
    } else {
      return clamp(v, min, max)
    }
  }

  protected getDistance() {
    return this.#directionSize + this.#moverDirectionSize
  }

  protected getStart() {
    return this.#directionPosition - this.#moverDirectionSize
  }

  #passListener() {
    this.#dispatchPassEvent()
    this.setVar(this.#passedVarCSSProperty.current, this.#passed)
    this.setVar(this.#progressVarCSSProperty.current, this.#progress)
  }

  #dispatchPassEvent() {
    this.dispatchEvent(
      new CustomEvent<ScrollSegmentPassDetail>('segmentPass', {
        detail: {
          distance: this.#distance,
          start: this.#start,
          finish: this.#finish,
          passed: this.#passed,
          progress: this.#progress,
        },
      })
    )
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
      this.#tickListener()
    }
  }

  #tickListener = () => {
    if (!this.#isDisabled && this.#isResized) {
      this.tick()
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
      this.#distanceVarCSSProperty.current,
      this.#startVarCSSProperty.current,
      this.#finishVarCSSProperty.current
    )
  }

  #sectionsChangeListener = debounce(() => {
    const allScrollEntriesAbove = scrollEntries.getAll(this).reverse()

    let scrollIndex = 0

    allScrollEntriesAbove.forEach((entry, i) => {
      if (entry.element === this.scrollElement) {
        scrollIndex = i
      }
    })

    this.#scrollEntries = allScrollEntriesAbove.slice(scrollIndex + 1)
  }, 0)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-segment': ScrollSegmentElement
  }

  interface HTMLElementEventMap {
    segmentPass: CustomEvent<ScrollSegmentPassDetail>
  }
}
