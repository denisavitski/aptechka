import { Damped } from '@packages/animation'
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

export type ScrollBehaviour = 'smooth' | 'instant'

export type SectionMark = 'current' | 'previous' | 'next' | null

export type SectionmarkChangeEvent = CustomEvent<{
  mark: SectionMark
}>

class Section {
  #element: HTMLElement
  #scrollElement: ScrollElement

  #size = 0
  #position = 0
  #currentMark: SectionMark = null

  constructor(element: HTMLElement, scrollElement: ScrollElement) {
    this.#element = element
    this.#scrollElement = scrollElement

    scrollEntries.register(this.#element)
  }

  public get size() {
    return this.#size
  }

  public get position() {
    return this.#position
  }

  public destroy() {
    scrollEntries.unregister(this.#element)
    this.#element.style.transform = ''
    this.mark(null)
  }

  public setSize(value?: number) {
    if (value) {
      this.#element.style.setProperty('--size', value + 'px')

      if (this.#scrollElement.axisCSSProperty.current === 'x') {
        this.#element.style.width = value + 'px'
        this.#element.style.height = ''
      } else {
        this.#element.style.height = value + 'px'
        this.#element.style.width = ''
      }
    } else {
      this.#element.style.width = ''
      this.#element.style.height = ''
      this.#element.style.removeProperty('--size')
    }
  }

  public resize() {
    this.#size = this.#scrollElement.vertical
      ? this.#element.offsetHeight
      : this.#element.offsetWidth

    this.#position = this.#scrollElement.vertical
      ? getCumulativeOffsetTop(this.#element)
      : getCumulativeOffsetLeft(this.#element)

    this.#position -= this.#scrollElement.contentPosition
  }

  public transform() {
    let offset = 0

    const distanceAddition =
      this.#scrollElement.viewportSize *
      this.#scrollElement.sectionDistanceScaleCSSProperty.current

    if (
      this.#scrollElement.infiniteCSSProperty.current &&
      this.#scrollElement.overscroll &&
      this.#position + this.#size < this.#scrollElement.currentScrollValue
    ) {
      offset = this.#scrollElement.distance * -1 - this.#scrollElement.gap
    }

    scrollEntries.update(
      this.#element,
      this.#scrollElement.axisCSSProperty.current,
      offset
    )

    const valueToClamp = this.#scrollElement.currentScrollValue + offset
    const min =
      this.#position - this.#scrollElement.viewportSize - distanceAddition
    const max = this.#position + this.#size + distanceAddition
    const value = clamp(valueToClamp, min, max)

    if (this.#scrollElement.vertical) {
      this.#element.style.transform = `translate3d(0px, ${value * -1}px, 0px)`
    } else {
      this.#element.style.transform = `translate3d(${value * -1}px, 0px, 0px)`
    }
  }

  public mark(mark: SectionMark) {
    if (this.#currentMark !== mark) {
      if (this.#currentMark) {
        this.#element.classList.remove(this.#currentMark)
      }

      if (mark) {
        this.#element.classList.add(mark)
      }

      this.#currentMark = mark

      this.#element.dispatchEvent(
        new CustomEvent<SectionmarkChangeEvent['detail']>('sectionsChange', {
          composed: true,
          detail: {
            mark: this.#currentMark,
          },
        })
      )
    }
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

  #axisCSSProperty = new CSSProperty<Axes2D>(this, '--axis', 'y')
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
  #infiniteCSSProperty = new CSSProperty<boolean>(this, '--infinite', false)
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

  #disabledCSSProperty = new CSSProperty<boolean>(this, '--disabled', false)
  #hibernatedCSSProperty = new CSSProperty<boolean>(this, '--hibernated', false)

  #contentElement: HTMLElement = null!
  #slotElement: HTMLSlotElement = null!
  #sections: Array<Section> = []

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
        element: this.#contentElement,
      })
      this.#keyboardControls.changeEvent.subscribe(
        this.#notAutoplayControlListener
      )

      this.#dragControls = new DragControls({ element: this.#contentElement })
      this.#dragControls.changeEvent.subscribe(this.#notAutoplayControlListener)

      this.#autoplayControls = new AutoplayControls()
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

      this.#infiniteCSSProperty.subscribe((e) => {
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

      this.#damped.isRunning.subscribe((e) => {
        this.classList.toggle('active', e.current)
      })

      this.#counter.subscribe((e) => {
        if (this.#sections.length) {
          this.#updateMarks()
        }
      })
    }
  }

  public get axisCSSProperty() {
    return this.#axisCSSProperty
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

  public get infiniteCSSProperty() {
    return this.#infiniteCSSProperty
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

  public get infiniteDistance() {
    return this.#infiniteCSSProperty.current
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
    return this.currentScrollValue / this.infiniteDistance || 0
  }

  public get targetProgress() {
    return this.targetScrollValue / this.infiniteDistance || 0
  }

  public get speed() {
    return this.#damped.speed
  }

  public get direction() {
    return this.#damped.direction
  }

  public get isRunning() {
    return this.#damped.isRunning
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

  public scrollToSection(
    sectionIndex: number,
    behaviour: ScrollBehaviour = 'smooth'
  ) {
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

      if (this.#infiniteCSSProperty.current) {
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

      this.#damped.shift(shiftValue - scrolledFromNearestSection, {
        equalize: behaviour === 'instant',
      })
    }
  }

  public shiftSections(step: number, behaviour: ScrollBehaviour = 'smooth') {
    if (!this.#sections.length) {
      return
    }

    this.scrollToSection(this.#counter.current + step, behaviour)
  }

  public setPosition(
    value: number,
    behaviour: 'smooth' | 'instant' = 'smooth'
  ) {
    this.#damped.set(value, {
      equalize: behaviour === 'instant',
    })
  }

  protected connectedCallback() {
    this.#axisCSSProperty.observe()
    this.#pagesCSSProperty.observe()
    this.#splitCSSProperty.observe()
    this.#sectionalCSSProperty.observe()
    this.#autoSizeCSSProperty.observe()
    this.#wheelMaxDeltaCSSProperty.observe()
    this.#sectionsInViewCSSProperty.observe()
    this.#infiniteCSSProperty.observe()
    this.#dampingCSSProperty.observe()
    this.#massCSSProperty.observe()
    this.#stiffnessCSSProperty.observe()
    this.#mouseDragCSSProperty.observe()
    this.#sectionDistanceScaleCSSProperty.observe()
    this.#autoplayCSSProperty.observe()
    this.#autoplayCSSProperty.observe()
    this.#autoplayPauseDurationCSSProperty.observe()
    this.#autoplayUserDirectionCSSProperty.observe()
    this.#disabledCSSProperty.observe()
    this.#hibernatedCSSProperty.observe()

    this.#awake()
  }

  protected disconnectedCallback() {
    this.#axisCSSProperty.unobserve()
    this.#pagesCSSProperty.unobserve()
    this.#splitCSSProperty.unobserve()
    this.#sectionalCSSProperty.unobserve()
    this.#autoSizeCSSProperty.unobserve()
    this.#wheelMaxDeltaCSSProperty.unobserve()
    this.#sectionsInViewCSSProperty.unobserve()
    this.#infiniteCSSProperty.unobserve()
    this.#dampingCSSProperty.unobserve()
    this.#massCSSProperty.unobserve()
    this.#stiffnessCSSProperty.unobserve()
    this.#mouseDragCSSProperty.unobserve()
    this.#sectionDistanceScaleCSSProperty.unobserve()
    this.#autoplayCSSProperty.unobserve()
    this.#autoplayPauseDurationCSSProperty.unobserve()
    this.#autoplayUserDirectionCSSProperty.unobserve()
    this.#disabledCSSProperty.unobserve()
    this.#hibernatedCSSProperty.unobserve()

    this.#hibernate()
  }

  #split() {
    this.#unsplit()

    this.#slotElement.assignedElements().forEach((element) => {
      if (element instanceof HTMLElement) {
        this.#sections.push(new Section(element, this))
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

    if (!this.#infiniteCSSProperty.current) {
      const cs = getComputedStyle(this)

      const padding = this.vertical
        ? parseFloat(cs.paddingBlockStart) + parseFloat(cs.paddingBlockEnd)
        : parseFloat(cs.paddingInlineStart) + parseFloat(cs.paddingInlineEnd)

      this.#scrollSize += padding

      this.#damped.max = this.#scrollSize
    }

    if (this.#infiniteCSSProperty.current && this.#sections.length) {
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
    if (this.#infiniteCSSProperty.current) {
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
    this.#autoplayControls.pauseAndContinue(
      this.#autoplayPauseDurationCSSProperty.current
    )

    if (this.#autoplayUserDirectionCSSProperty.current) {
      this.#autoplayControls.direction = Math.sign(value) || 1
    }

    this.#controlsListener(type, value)
  }

  #controlsListener = (type: string, value: number) => {
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
    if (this.#infiniteCSSProperty.current && this.#sections.length) {
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
    if (this.#sections.length) {
      const counter = this.#counter.current

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

      this.#sections.forEach((section, index) => {
        const overflow = counter - this.limit - 1

        const currentRange = counter + this.#sectionsInViewCSSProperty.current

        const vv = this.sections.length - currentRange

        if ((index >= counter && index < currentRange) || index <= overflow) {
          section.mark('current')
        } else if (
          (index >= currentRange && index < currentRange + vv / 2) ||
          index <= overflow + this.#sectionsInViewCSSProperty.current
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
    sectionMarkChange: SectionmarkChangeEvent
  }
}
