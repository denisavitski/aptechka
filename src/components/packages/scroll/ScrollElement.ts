import { Damped, Tweened } from '@packages/animation'
import {
  WheelControls,
  KeyboardControls,
  DragControls,
  AutoplayControls,
} from '@packages/controls'
import { define, CustomElement } from '@packages/custom-element'
import { TICK_ORDER, RESIZE_ORDER } from '@packages/order'
import { windowResizer } from '@packages/window-resizer'
import { scrollEntries } from '@packages/scroll-entries'
import { Derived, Store } from '@packages/store'
import {
  getCumulativeOffsetTop,
  getCumulativeOffsetLeft,
  Axes2D,
  isBrowser,
  clamp,
  EasingFunction,
  easeInOutExpo,
} from '@packages/utils'
import {
  createStylesheet,
  div,
  element,
  slot,
} from '@packages/element-constructor'
import { cssUnitParser } from '@packages/css-unit-parser'
import { CSSProperty } from '@packages/css-property'
import { device } from '@packages/device'
import { elementResizer } from '@packages/element-resizer'
import { ScrollSection } from './ScrollSection'

export type ScrollBehaviour = 'smooth' | 'instant'

export interface ScrollSetOptions {
  behaviour?: ScrollBehaviour
  tween?: {
    easing?: EasingFunction
    duration: number
  }
}

const stylesheet = createStylesheet({
  ':host': {
    position: 'relative',

    width: '100%',
    height: '100%',

    display: 'block',
    outline: 'none',
  },

  ':host([hibernated="true"])': {
    display: 'contents',
  },

  '.static': {
    position: 'var(--static-position, absolute)',
    top: 'var(--static-top, 0)',
    left: 'var(--static-left, 0)',

    width: 'var(--static-width, 100%)',
    height: 'var(--static-height, 100%)',
  },

  '.content': {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    gap: 'var(--gap, 0px)',
    willChange: 'var(--will-change, transform)',
  },

  ':host([hibernated="true"]) .content': {
    display: 'contents',
  },

  '::slotted(*)': {
    flexShrink: '0',
  },
})

@define('e-scroll')
export class ScrollElement extends CustomElement {
  #damped: Damped = null!

  #controlsCSSProperty = new CSSProperty<boolean>(this, '--controls', true)
  #axisCSSProperty = new CSSProperty<Axes2D>(this, '--axis', 'y')
  #directionCSSProperty = new CSSProperty<number>(this, '--direction', 0)
  #pagesCSSProperty = new CSSProperty<number>(this, '--pages', 0, {
    validate: (v) => Math.max(0, v - 1),
  })
  #splitCSSProperty = new CSSProperty<boolean>(this, '--split', false)
  #sectionalCSSProperty = new CSSProperty<boolean>(this, '--sectional', false)
  #autoSizeCSSProperty = new CSSProperty<boolean>(this, '--auto-size', false)
  #wheelMaxDeltaCSSProperty = new CSSProperty<boolean>(
    this,
    '--wheel-max-delta',
    false
  )
  #sectionsInViewCSSProperty = new CSSProperty<number>(
    this,
    '--sections-in-view',
    1
  )
  #loopCSSProperty = new CSSProperty<boolean>(this, '--loop', false)
  #dampingCSSProperty = new CSSProperty<number>(this, '--damping', 20)
  #massCSSProperty = new CSSProperty<number>(this, '--mass', 0)
  #stiffnessCSSProperty = new CSSProperty<number>(this, '--stiffness', 0)
  #mouseDragCSSProperty = new CSSProperty<boolean>(this, '--mouse-drag', false)
  #sectionDistanceScaleCSSProperty = new CSSProperty<number>(
    this,
    '--section-distance-scale',
    0.5
  )
  #autoplayCSSProperty = new CSSProperty<number>(this, '--autoplay', 0)
  #autoplayPauseDurationCSSProperty = new CSSProperty<number>(
    this,
    '--autoplay-pause-duration',
    0
  )
  #autoplayUserDirectionCSSProperty = new CSSProperty<boolean>(
    this,
    '--autoplay-user-direction',
    false
  )
  #classesCSSProperty = new CSSProperty<number>(this, '--classes', 0)
  #currentIndexStartOffsetCSSProperty = new CSSProperty<number>(
    this,
    '--current-index-start-offset',
    0
  )
  #currentIndexEndOffsetCSSProperty = new CSSProperty<number>(
    this,
    '--current-index-end-offset',
    0
  )
  #focusDelayCSSProperty = new CSSProperty<number>(this, '--focus-delay', 0)
  #focusDurationCSSProperty = new CSSProperty<number>(
    this,
    '--focus-duration',
    3000
  )

  #disabledCSSProperty = new CSSProperty<boolean>(this, '--disabled', false)
  #hibernatedCSSProperty = new CSSProperty<boolean>(this, '--hibernated', false)

  #contentElement: HTMLElement = null!
  #slotElement: HTMLSlotElement = null!
  #sections: Array<ScrollSection> = []

  #position = 0
  #contentPosition = 0
  #viewportSize = 0
  #scrollSize = 0
  #gap = 0

  #wheelControls: WheelControls = null!
  #keyboardControls: KeyboardControls = null!
  #dragControls: DragControls = null!
  #autoplayControls: AutoplayControls = null!

  #counter = new Store(0)

  #overscroll = 0
  #distance = 0

  #disabled = true
  #hibernated = true

  #focusTimeoutId: ReturnType<typeof setTimeout> | undefined

  #setTween = new Tweened()

  constructor() {
    super()

    if (isBrowser) {
      this.#damped = new Damped(0, {
        damping: 0.01,
        min: 0,
        order: TICK_ORDER.SCROLL,
      })

      this.openShadow(stylesheet)

      element(this, {
        tabIndex: 0,
        children: [
          div({
            class: 'static',
            children: [slot({ name: 'static' })],
          }),
          div({
            class: 'content',
            children: [slot({ ref: (e) => (this.#slotElement = e) })],
            style: {
              flexDirection: new Derived(this.#axisCSSProperty, (e) =>
                e === 'x' ? 'row' : 'column'
              ),
            },
            ref: (e) => (this.#contentElement = e),
          }),
        ],
      })

      this.#wheelControls = new WheelControls({ element: this.#contentElement })
      this.#wheelControls.changeEvent.subscribe(
        this.#notAutoplayControlListener
      )

      this.#keyboardControls = new KeyboardControls({
        element: this,
      })

      this.#keyboardControls.changeEvent.subscribe(
        this.#notAutoplayControlListener
      )

      this.#dragControls = new DragControls({ element: this.#contentElement })
      this.#dragControls.changeEvent.subscribe(this.#notAutoplayControlListener)

      this.#autoplayControls = new AutoplayControls({
        culling: this,
      })
      this.#autoplayControls.changeEvent.subscribe(this.#controlsListener)

      this.#axisCSSProperty.subscribe(({ current }) => {
        this.#contentElement.style.flexDirection =
          current === 'x' ? 'row' : 'column'

        this.#wheelControls.axis = this.#wheelMaxDeltaCSSProperty.current
          ? 'max'
          : current

        this.#keyboardControls.dimension = current === 'x' ? 'width' : 'height'

        this.#dragControls.axis = current

        if (current === 'x') {
          this.style.touchAction = 'pan-y'
        } else if (current === 'y') {
          this.style.touchAction = 'pan-x'
        }

        if (this.isConnected) {
          this.#resizeListener()
        }
      })

      this.#wheelMaxDeltaCSSProperty.subscribe((e) => {
        this.#wheelControls.axis = e.current
          ? 'max'
          : this.#axisCSSProperty.current
      })

      this.#pagesCSSProperty.subscribe(() => {
        if (this.isConnected) {
          this.#resizeListener()
        }
      })

      this.#splitCSSProperty.subscribe(({ current }) => {
        if (this.isConnected) {
          if (current) {
            this.#split()
          } else {
            this.#unsplit()
          }
        }
      })

      this.#sectionalCSSProperty.subscribe((e) => {
        this.#wheelControls.debounce = e.current
        this.#dragControls.swipe = e.current
        this.#autoplayControls.interval = e.current

        if (this.isConnected) {
          if (e.current && !e.previous && !this.#sections.length) {
            this.#split()
          } else if (!e.current && e.previous && this.#sections.length) {
            this.#unsplit()
          }
        }
      })

      this.#autoSizeCSSProperty.subscribe((e) => {
        if (this.isConnected) {
          this.#resizeListener()
          if (e.current && !e.previous && !this.#sections.length) {
            this.#split()
          } else if (!e.current && e.previous && this.#sections.length) {
            this.#unsplit()
          }
        }
      })

      this.#sectionsInViewCSSProperty.subscribe((e) => {
        if (this.isConnected) {
          this.#resizeListener()
          this.#updateMarks()
        }
      })

      this.#loopCSSProperty.subscribe((e) => {
        if (!e.current) {
          this.#overscroll = 0
          this.#damped.max = this.#scrollSize
          this.#damped.min = 0
        } else {
          if (this.isConnected) {
            if (!this.#sections.length) {
              this.#splitCSSProperty.current = true
            }
          }

          if (this.#sections.length) {
            this.#damped.max = Infinity
            this.#damped.min = -Infinity
          }
        }
      })

      this.#dampingCSSProperty.subscribe((e) => {
        this.#damped.damping = e.current
      })

      this.#massCSSProperty.subscribe((e) => {
        this.#damped.mass = e.current
      })

      this.#stiffnessCSSProperty.subscribe((e) => {
        this.#damped.stiffness = e.current
      })

      this.#disabledCSSProperty.subscribe((e) => {
        if (e.current && !e.previous) {
          this.#disable()
        } else if (!e.current && e.previous) {
          this.#enable()
        }
      })

      this.#hibernatedCSSProperty.subscribe((e) => {
        if (e.current && !e.previous) {
          this.#hibernate()
        } else if (!e.current && e.previous) {
          this.#awake()
        }
      })

      this.#autoplayCSSProperty.subscribe((e) => {
        this.#autoplayControls.speed = e.current

        if (e.current && !e.previous) {
          this.#autoplayControls.connect()
        } else if (!e.current && e.previous) {
          this.#autoplayControls.disconnect()
        }
      })

      this.#autoplayUserDirectionCSSProperty.subscribe((e) => {
        if (!e.current) {
          this.#autoplayControls.direction = 1
        }
      })

      this.#classesCSSProperty.subscribe((e) => {
        if (this.isConnected) {
          this.#updateMarks()
        }
      })

      this.#currentIndexStartOffsetCSSProperty.subscribe((e) => {
        if (this.isConnected && this.#classesCSSProperty.current) {
          this.#updateMarks()
        }
      })

      this.#currentIndexEndOffsetCSSProperty.subscribe((e) => {
        if (this.isConnected && this.#classesCSSProperty.current) {
          this.#updateMarks()
        }
      })

      this.#damped.isRunning.subscribe((e) => {
        this.classList.toggle('active', e.current)
      })

      this.#counter.subscribe((e) => {
        if (this.#sections.length) {
          this.#updateMarks()
        }
      })

      this.#setTween.subscribe((e) => {
        if (this.#setTween.isRunning.current) {
          this.#damped.set(e.current)
        }
      })
    }
  }

  public get damped() {
    return this.#damped
  }

  public get controlsCSSProperty() {
    return this.#controlsCSSProperty
  }

  public get axisCSSProperty() {
    return this.#axisCSSProperty
  }
  public get directionCSSProperty() {
    return this.#directionCSSProperty
  }

  public get pagesCSSProperty() {
    return this.#pagesCSSProperty
  }

  public get splitCSSProperty() {
    return this.#splitCSSProperty
  }

  public get sectionalCSSProperty() {
    return this.#sectionalCSSProperty
  }

  public get autoSizeCSSProperty() {
    return this.#autoSizeCSSProperty
  }

  public get wheelMaxDeltaCSSProperty() {
    return this.#wheelMaxDeltaCSSProperty
  }

  public get sectionsInViewCSSProperty() {
    return this.#sectionsInViewCSSProperty
  }

  public get loopCSSProperty() {
    return this.#loopCSSProperty
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

  public get mouseDragCSSProperty() {
    return this.#mouseDragCSSProperty
  }

  public get sectionDistanceScaleCSSProperty() {
    return this.#sectionDistanceScaleCSSProperty
  }

  public get autoplayCSSProperty() {
    return this.#autoplayCSSProperty
  }

  public get autoplayPauseDurationCSSProperty() {
    return this.#autoplayPauseDurationCSSProperty
  }

  public get autoplayUserDirectionCSSProperty() {
    return this.#autoplayUserDirectionCSSProperty
  }

  public get classesCSSProperty() {
    return this.#classesCSSProperty
  }

  public get currentIndexStartOffsetCSSProperty() {
    return this.#currentIndexStartOffsetCSSProperty
  }

  public get currentIndexEndOffsetCSSProperty() {
    return this.#currentIndexEndOffsetCSSProperty
  }

  public get focusDelayCSSProperty() {
    return this.#focusDelayCSSProperty
  }

  public get focusDurationCSSProperty() {
    return this.#focusDurationCSSProperty
  }

  public get disabledCSSProperty() {
    return this.#disabledCSSProperty
  }

  public get hibernatedCSSProperty() {
    return this.#hibernatedCSSProperty
  }

  public get currentScrollValue() {
    return this.#getScrollValue('current')
  }

  public get targetScrollValue() {
    return this.#getScrollValue('target')
  }

  public get contentElement() {
    return this.#contentElement
  }

  public get sections() {
    return this.#sections
  }

  public get position() {
    return this.#position
  }

  public get contentPosition() {
    return this.#contentPosition
  }

  public get viewportSize() {
    return this.#viewportSize
  }

  public get scrollSize() {
    return this.#scrollSize
  }

  public get gap() {
    return this.#gap
  }

  public get counter() {
    return this.#counter
  }

  public get limit() {
    return this.#sections.length - this.#sectionsInViewCSSProperty.current
  }

  public get distance() {
    return this.#distance
  }

  public get loopDistance() {
    return this.#loopCSSProperty.current
      ? this.#distance + this.#gap
      : this.#distance
  }

  public get overscroll() {
    return this.#overscroll
  }

  public get vertical() {
    return this.#axisCSSProperty.current === 'y'
  }

  public get currentProgress() {
    return this.currentScrollValue / this.loopDistance || 0
  }

  public get targetProgress() {
    return this.targetScrollValue / this.loopDistance || 0
  }

  public override get scrollWidth(): number {
    return this.#axisCSSProperty.current === 'y' ? 0 : this.#damped.distance
  }

  public override get scrollHeight(): number {
    return this.#axisCSSProperty.current === 'x' ? 0 : this.#damped.distance
  }

  public onScroll(...parameters: Parameters<Damped['subscribe']>) {
    return this.#damped.subscribe(...parameters)
  }

  public offScroll(...parameters: Parameters<Damped['unsubscribe']>) {
    this.#damped.unsubscribe(...parameters)
  }

  //https://github.com/pmndrs/drei/blob/d3282cdd02d170ef603a5e096505d83dc93cd57a/src/web/ScrollControls.tsx#L85C7-L100C9
  public range(from: number, distance: number, margin: number = 0) {
    const start = from - margin
    const end = start + distance + margin * 2
    return this.currentProgress < start
      ? 0
      : this.currentProgress > end
      ? 1
      : (this.currentProgress - start) / (end - start)
  }

  public curve(from: number, distance: number, margin: number = 0) {
    return Math.sin(this.range(from, distance, margin) * Math.PI)
  }

  public visible(from: number, distance: number, margin: number = 0) {
    const start = from - margin
    const end = start + distance + margin * 2
    return this.currentProgress >= start && this.currentProgress <= end
  }

  public scrollToSection(sectionIndex: number, options?: ScrollSetOptions) {
    if (!this.#sections.length) {
      return
    }

    const previousCounter = this.#counter.current

    this.#setCounter(sectionIndex)

    const previousSection = this.#sections[previousCounter]
    const currentSection = this.#sections[this.#counter.current]

    if (previousSection && currentSection) {
      let shiftValue = 0

      const nearestSection = this.#findNearestSection()

      const scrolledFromNearestSection = nearestSection
        ? this.targetScrollValue - nearestSection.position
        : 0

      if (this.#loopCSSProperty.current) {
        if (
          this.#counter.current === 0 &&
          previousCounter === this.#sections.length - 1
        ) {
          shiftValue =
            this.#scrollSize +
            this.#viewportSize -
            previousSection.position +
            this.#gap
        } else if (
          this.#counter.current === this.#sections.length - 1 &&
          previousCounter === 0
        ) {
          shiftValue =
            currentSection.position -
            (this.#scrollSize + this.#viewportSize + this.#gap)
        } else {
          shiftValue = currentSection.position - previousSection.position
        }
      } else {
        shiftValue = currentSection.position - previousSection.position
      }

      this.shiftPosition(shiftValue - scrolledFromNearestSection, options)
    }
  }

  public shiftSections(step: number, options?: ScrollSetOptions) {
    if (!this.#sections.length) {
      return
    }

    this.scrollToSection(this.#counter.current + step, options)
  }

  public setPosition(value: number, options?: ScrollSetOptions) {
    if (!options?.tween) {
      this.#damped.set(value, {
        equalize: options?.behaviour === 'instant',
      })
    } else {
      this.#setTween.set(this.#damped.current, { equalize: true })
      this.#setTween.set(value, { ...options.tween })
    }
  }

  public shiftPosition(value: number, options?: ScrollSetOptions) {
    this.setPosition(this.#damped.target + value, options)
  }

  protected connectedCallback() {
    this.#controlsCSSProperty.observe()
    this.#axisCSSProperty.observe()
    this.#directionCSSProperty.observe()
    this.#pagesCSSProperty.observe()
    this.#splitCSSProperty.observe()
    this.#sectionalCSSProperty.observe()
    this.#autoSizeCSSProperty.observe()
    this.#wheelMaxDeltaCSSProperty.observe()
    this.#sectionsInViewCSSProperty.observe()
    this.#loopCSSProperty.observe()
    this.#dampingCSSProperty.observe()
    this.#massCSSProperty.observe()
    this.#stiffnessCSSProperty.observe()
    this.#mouseDragCSSProperty.observe()
    this.#sectionDistanceScaleCSSProperty.observe()
    this.#autoplayCSSProperty.observe()
    this.#autoplayCSSProperty.observe()
    this.#autoplayPauseDurationCSSProperty.observe()
    this.#autoplayUserDirectionCSSProperty.observe()
    this.#classesCSSProperty.observe()
    this.#currentIndexStartOffsetCSSProperty.observe()
    this.#currentIndexEndOffsetCSSProperty.observe()
    this.#focusDelayCSSProperty.observe()
    this.#focusDurationCSSProperty.observe()
    this.#disabledCSSProperty.observe()
    this.#hibernatedCSSProperty.observe()

    this.#awake()
  }

  protected disconnectedCallback() {
    this.#controlsCSSProperty.unobserve()
    this.#axisCSSProperty.unobserve()
    this.#directionCSSProperty.unobserve()
    this.#pagesCSSProperty.unobserve()
    this.#splitCSSProperty.unobserve()
    this.#sectionalCSSProperty.unobserve()
    this.#autoSizeCSSProperty.unobserve()
    this.#wheelMaxDeltaCSSProperty.unobserve()
    this.#sectionsInViewCSSProperty.unobserve()
    this.#loopCSSProperty.unobserve()
    this.#dampingCSSProperty.unobserve()
    this.#massCSSProperty.unobserve()
    this.#stiffnessCSSProperty.unobserve()
    this.#mouseDragCSSProperty.unobserve()
    this.#sectionDistanceScaleCSSProperty.unobserve()
    this.#autoplayCSSProperty.unobserve()
    this.#autoplayPauseDurationCSSProperty.unobserve()
    this.#autoplayUserDirectionCSSProperty.unobserve()
    this.#classesCSSProperty.unobserve()
    this.#currentIndexStartOffsetCSSProperty.unobserve()
    this.#currentIndexEndOffsetCSSProperty.unobserve()
    this.#focusDelayCSSProperty.unobserve()
    this.#focusDurationCSSProperty.unobserve()
    this.#disabledCSSProperty.unobserve()
    this.#hibernatedCSSProperty.unobserve()

    this.#hibernate()
  }

  #split() {
    this.#unsplit()

    this.#slotElement.assignedElements().forEach((element, i) => {
      if (element instanceof HTMLElement) {
        this.#sections.push(new ScrollSection(element, i, this))
      }
    })

    this.#contentElement.style.transform = ''

    this.dispatchEvent(
      new CustomEvent('sectionsChange', {
        composed: true,
      })
    )

    this.#resizeListener()

    this.#updateMarks()
  }

  #unsplit() {
    this.#sections.forEach((section) => {
      section.destroy()
    })

    this.#sections = []

    this.#counter.current = 0
    this.#damped.reset()

    this.dispatchEvent(
      new CustomEvent('sectionsChange', {
        composed: true,
      })
    )
  }

  #disable() {
    if (!this.#disabled) {
      this.#disabled = true
      this.#damped.unsubscribe(this.#animatedChangeListener)
      this.#damped.unlistenAnimationFrame()

      this.#wheelControls.disconnect()
      this.#keyboardControls.disconnect()
      this.#dragControls.disconnect()
      this.#autoplayControls.disconnect()

      clearInterval(this.#focusTimeoutId)

      this.#setTween.unlistenAnimationFrame()
    }
  }

  #enable() {
    if (this.#disabled) {
      this.#disabled = false
      this.#damped.subscribe(this.#animatedChangeListener)

      this.#wheelControls.connect()
      this.#keyboardControls.connect()
      this.#dragControls.connect()

      if (this.#autoplayCSSProperty.current) {
        this.#autoplayControls.connect()
      }
    }
  }

  #hibernate() {
    if (!this.#hibernated) {
      this.#hibernated = true

      windowResizer.unsubscribe(this.#resizeListener)
      elementResizer.unsubscribe(this.#resizeListener)

      this.#damped.reset()

      this.#disable()

      this.#contentElement.style.transform = ''

      if (this.#splitCSSProperty.current) {
        this.#unsplit()
      }

      scrollEntries.unregister(this)
    }
  }

  #awake() {
    if (this.#hibernated) {
      this.#hibernated = false

      if (this.#splitCSSProperty.current) {
        this.#split()
      }

      scrollEntries.register(this)

      windowResizer.subscribe(this.#resizeListener, RESIZE_ORDER.SCROLL)
      elementResizer.subscribe(this, this.#resizeListener)

      this.#enable()
    }
  }

  #resizeListener = () => {
    this.#damped.unlistenAnimationFrame()

    const prevProgress = this.currentScrollValue / this.#scrollSize || 0
    const prevCounter = this.#counter.current

    this.#position = this.vertical
      ? getCumulativeOffsetTop(this)
      : getCumulativeOffsetLeft(this)

    this.#contentPosition = this.vertical
      ? getCumulativeOffsetTop(this.#contentElement)
      : getCumulativeOffsetLeft(this.#contentElement)

    this.#viewportSize = this.vertical ? this.offsetHeight : this.offsetWidth

    if (this.vertical) {
      this.#gap = cssUnitParser.parse(
        getComputedStyle(this.#contentElement).rowGap
      )
    } else {
      this.#gap = cssUnitParser.parse(
        getComputedStyle(this.#contentElement).columnGap
      )
    }

    if (this.#autoSizeCSSProperty.current && this.#sections.length) {
      const ivc = this.#sectionsInViewCSSProperty.current

      const sectionSize = (this.#viewportSize - this.#gap * (ivc - 1)) / ivc

      this.#sections.forEach((section) => {
        section.setSize(sectionSize)
      })
    } else {
      this.#sections.forEach((section) => {
        section.setSize()
      })
    }

    this.#sections.forEach((section) => {
      section.resize()
    })

    if (this.#pagesCSSProperty.current) {
      this.#scrollSize = this.#viewportSize * this.#pagesCSSProperty.current
      const contentSize = this.#scrollSize + this.#viewportSize

      if (this.vertical) {
        this.#contentElement.style.width = contentSize + 'px'
        this.#contentElement.style.height = '100%'
      } else {
        this.#contentElement.style.height = contentSize + 'px'
        this.#contentElement.style.width = '100%'
      }
    } else {
      if (this.vertical) {
        this.#contentElement.style.width = '100%'
        this.#contentElement.style.height = 'max-content'
        this.#scrollSize =
          this.#contentElement.offsetHeight - this.#viewportSize
      } else {
        this.#contentElement.style.width = 'max-content'
        this.#contentElement.style.height = '100%'
        this.#scrollSize = this.#contentElement.offsetWidth - this.#viewportSize
      }
    }

    if (!this.#loopCSSProperty.current) {
      const cs = getComputedStyle(this)

      const padding = this.vertical
        ? parseFloat(cs.paddingBlockStart) + parseFloat(cs.paddingBlockEnd)
        : parseFloat(cs.paddingInlineStart) + parseFloat(cs.paddingInlineEnd)

      this.#scrollSize += padding

      this.#damped.max = this.#scrollSize
    }

    if (this.#loopCSSProperty.current && this.#sections.length) {
      const lastSection = this.#sections[this.#sections.length - 1]
      const lastSectionMax =
        lastSection.position + lastSection.size - this.#viewportSize
      const lastSectionMargin = this.#scrollSize - lastSectionMax

      this.#distance =
        lastSection.position + lastSection.size + lastSectionMargin
    } else {
      this.#distance = this.#scrollSize
    }

    if (this.#sectionalCSSProperty.current && this.#sections.length) {
      const section = this.#sections[prevCounter]

      this.#damped.set(section.position, {
        equalize: true,
      })
    } else {
      this.#damped.set(prevProgress * this.#scrollSize, {
        equalize: true,
      })
    }
  }

  #animatedChangeListener = () => {
    const currentScrollValue = this.currentScrollValue

    this.#overscroll = Math.max(0, currentScrollValue - this.#scrollSize)

    if (this.#sections.length) {
      let counter = 0

      for (let index = 0; index < this.#sections.length; index++) {
        const section = this.#sections[index]

        section.transform()

        if (this.targetScrollValue + section.size / 2 >= section.position) {
          counter = index
        }
      }

      this.#counter.current = counter
    } else {
      if (this.vertical) {
        this.#contentElement.style.transform = `translate3d(0px, ${
          currentScrollValue * -1
        }px, 0px)`
      } else {
        this.#contentElement.style.transform = `translate3d(${
          currentScrollValue * -1
        }px, 0px, 0px)`
      }
    }

    scrollEntries.update(
      this,
      this.#axisCSSProperty.current,
      currentScrollValue
    )
  }

  #setCounter(value: number) {
    if (this.#loopCSSProperty.current) {
      this.#counter.current = value % this.#sections.length
      this.#counter.current =
        this.#counter.current < 0
          ? this.#sections.length + this.#counter.current
          : this.#counter.current
    } else {
      this.#counter.current = clamp(value, 0, this.limit)
    }
  }

  #notAutoplayControlListener = (type: string, value: number) => {
    if (this.#controlsCSSProperty.current) {
      if (this.#autoplayUserDirectionCSSProperty.current) {
        this.#autoplayControls.pauseAndContinue(
          this.#autoplayPauseDurationCSSProperty.current
        )

        this.#autoplayControls.direction = Math.sign(value) || 1
      }

      this.#controlsListener(type, value)
    }
  }

  #controlsListener = (type: string, value: number) => {
    if (this.#directionCSSProperty.current) {
      if (this.#directionCSSProperty.current < 0 && value > 0) {
        return
      } else if (this.#directionCSSProperty.current > 0 && value < 0) {
        return
      }
    }

    this.#setTween.unlistenAnimationFrame()

    if (
      !this.#autoplayCSSProperty.current &&
      this.#focusDelayCSSProperty.current
    ) {
      clearInterval(this.#focusTimeoutId)

      this.#focusTimeoutId = setTimeout(() => {
        const section = this.#findNearestSection()

        if (section) {
          this.scrollToSection(section.index, {
            tween: {
              duration: this.#focusDurationCSSProperty.current,
              easing: easeInOutExpo,
            },
          })
        }
      }, this.#focusDelayCSSProperty.current)
    }

    if (
      type === 'drag' &&
      !device.isMobile &&
      !this.#mouseDragCSSProperty.current
    ) {
      return
    }

    if (this.#sectionalCSSProperty.current) {
      const direction = Math.sign(value)

      if (this.#sections.length) {
        this.shiftSections(direction)
      } else {
        this.#damped.shift(direction * this.#viewportSize)
      }
    } else {
      this.#damped.shift(value)
    }
  }

  #getScrollValue(type: 'target' | 'current' = 'current') {
    if (this.#loopCSSProperty.current && this.#sections.length) {
      const mod =
        this.#damped[type] % (this.#scrollSize + this.#viewportSize + this.#gap)

      const value =
        mod < 0 ? this.#scrollSize + mod + this.#viewportSize + this.#gap : mod

      return value
    } else {
      return this.#damped[type]
    }
  }

  #updateMarks() {
    if (this.#classesCSSProperty.current && this.#sections.length) {
      const counter =
        this.#counter.current + this.#currentIndexStartOffsetCSSProperty.current

      if (counter === 0) {
        this.classList.add('start')
      } else {
        this.classList.remove('start')
      }

      if (counter === this.limit) {
        this.classList.add('end')
      } else {
        this.classList.remove('end')
      }

      const sectionsInView =
        this.#sectionsInViewCSSProperty.current +
        this.#currentIndexEndOffsetCSSProperty.current

      this.#sections.forEach((section, index) => {
        const overflow =
          counter -
          this.limit -
          1 +
          this.#currentIndexEndOffsetCSSProperty.current

        const currentRange = counter + sectionsInView

        const vv = this.sections.length - currentRange

        if ((index >= counter && index < currentRange) || index <= overflow) {
          section.mark('current')
        } else if (
          (index >= currentRange && index < currentRange + vv / 2) ||
          index <= overflow + sectionsInView
        ) {
          section.mark('next')
        } else {
          section.mark('previous')
        }
      })
    }
  }

  #findNearestSection() {
    let nearestIndex = null
    let minDiff = Infinity

    for (let i = 0; i < this.#sections.length; i++) {
      const diff = Math.abs(this.#sections[i].position - this.targetScrollValue)

      if (diff < minDiff) {
        minDiff = diff
        nearestIndex = i
      }
    }

    return nearestIndex !== null ? this.#sections[nearestIndex] : null
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll': ScrollElement
  }

  interface HTMLElementEventMap {
    sectionsChange: CustomEvent
  }
}
