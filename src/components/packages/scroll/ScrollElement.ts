import { Damped } from '@packages/animation'
import { Attribute } from '@packages/attribute'
import {
  WheelControls,
  KeyboardControls,
  ControlsValue,
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

export type ScrollBehaviour = 'smooth' | 'instant'

class Section {
  #element: HTMLElement
  #scrollElement: ScrollElement

  #size = 0
  #position = 0

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

    const df = this.#scrollElement.viewportSize - this.#size

    if (
      this.#scrollElement.infiniteAttribute.current &&
      this.#scrollElement.overscroll &&
      this.#position + this.#size < this.#scrollElement.currentScrollValue
    ) {
      offset = this.#scrollElement.distance * -1 - this.#scrollElement.gap
    }

    scrollEntries.update(
      this.#element,
      this.#scrollElement.axisAttibute.current,
      offset
    )

    const valueToClamp = this.#scrollElement.currentScrollValue + offset
    const min = this.#position - this.#scrollElement.viewportSize - df
    const max = this.#position + this.#size + df
    const value = clamp(valueToClamp, min, max)

    if (this.#scrollElement.vertical) {
      this.#element.style.transform = `translate3d(0px, ${value * -1}px, 0px)`
    } else {
      this.#element.style.transform = `translate3d(${value * -1}px, 0px, 0px)`
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
    position: 'absolute',
    top: '0',
    left: '0',

    width: '100%',
    height: '100%',
  },

  '.content': {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    gap: 'var(--gap, 0px)',
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

  #axisAttribute = new Attribute<Axes2D>(this, 'axis', 'y')
  #pagesAttribute = new Attribute<number>(this, 'pages', 0, {
    validate: (v) => Math.max(0, v - 1),
  })
  #splitAttribute = new Attribute<boolean>(this, 'split', false)
  #sectionalAttribute = new Attribute<boolean>(this, 'sectional', false)
  #wheelMaxDeltaAttribute = new Attribute<boolean>(
    this,
    'wheel-max-delta',
    false
  )
  #infiniteAttribute = new Attribute<boolean>(this, 'infinite', false)
  #dampingAttribute = new Attribute<number>(this, 'damping', 0.03)
  #disabledAttribute = new Attribute<boolean>(this, 'disabled', false)
  #hibernatedAttribute = new Attribute<boolean>(this, 'hibernated', false)

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

  #counter = new Store(0)

  #overscroll = 0
  #distance = 0

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
              flexDirection: new Derived(this.#axisAttribute, (e) =>
                e === 'x' ? 'row' : 'column'
              ),
            },
            ref: (e) => (this.#contentElement = e),
          }),
        ],
      })

      this.#wheelControls = new WheelControls({ element: this })
      this.#wheelControls.changeEvent.subscribe(this.#controlsListener)

      this.#keyboardControls = new KeyboardControls({ element: this })
      this.#keyboardControls.changeEvent.subscribe(this.#controlsListener)

      this.#axisAttribute.subscribe(({ current }) => {
        this.#contentElement.style.flexDirection =
          current === 'x' ? 'row' : 'column'

        this.#wheelControls.axis = this.#wheelMaxDeltaAttribute.current
          ? 'max'
          : current

        if (this.isConnected) {
          this.#resizeListener()
        }
      })

      this.#wheelMaxDeltaAttribute.subscribe((e) => {
        this.#wheelControls.axis = e.current
          ? 'max'
          : this.#axisAttribute.current
      })

      this.#pagesAttribute.subscribe(() => {
        if (this.isConnected) {
          this.#resizeListener()
        }
      })

      this.#splitAttribute.subscribe(({ current }) => {
        if (this.isConnected) {
          if (current) {
            this.#split()
          } else {
            this.#unsplit()
          }
        }
      })

      this.#sectionalAttribute.subscribe((e) => {
        this.#counter.current = 0
        this.#wheelControls.debounce = e.current
        this.#damped.reset()

        if (this.isConnected) {
          if (e.current && !e.previous) {
            this.#split()
          } else if (!e.current && e.previous) {
            this.#unsplit()
          }
        }
      })

      this.#infiniteAttribute.subscribe((e) => {
        if (!e.current) {
          this.#overscroll = 0
          this.#damped.max = this.#scrollSize
          this.#damped.min = 0
        } else {
          if (this.isConnected) {
            if (!this.#sections.length) {
              this.#splitAttribute.current = true
            }
          }

          if (this.#sections.length) {
            this.#damped.max = Infinity
            this.#damped.min = -Infinity
          }
        }
      })

      this.#dampingAttribute.subscribe((e) => {
        this.#damped.damping = e.current
      })

      this.#disabledAttribute.subscribe((e) => {
        if (e.current && !e.previous) {
          this.#disable()
        } else if (!e.current && e.previous) {
          this.#enable()
        }
      })

      this.#hibernatedAttribute.subscribe((e) => {
        if (e.current && !e.previous) {
          this.#hibernate()
        } else if (!e.current && e.previous) {
          this.#awake()
        }
      })
    }
  }

  public get dampingAttribute() {
    return this.#dampingAttribute
  }

  public get axisAttibute() {
    return this.#axisAttribute
  }

  public get pagesAttibute() {
    return this.#pagesAttribute
  }

  public get splitAttibute() {
    return this.#splitAttribute
  }

  public get sectionalAttibute() {
    return this.#sectionalAttribute
  }

  public get infiniteAttribute() {
    return this.#infiniteAttribute
  }

  public get dampingAttibute() {
    return this.#dampingAttribute
  }

  public get disabledAttibute() {
    return this.#disabledAttribute
  }

  public get hibernatedAttibute() {
    return this.#hibernatedAttribute
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

  public get distance() {
    return this.#distance
  }

  public get overscroll() {
    return this.#overscroll
  }

  public get vertical() {
    return this.#axisAttribute.current === 'y'
  }

  public get currentProgress() {
    return this.currentScrollValue / this.#distance || 0
  }

  public get targetProgress() {
    return this.targetScrollValue / this.#distance || 0
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

  public onScroll(...parameters: Parameters<Damped['subscribe']>) {
    return this.#damped.subscribe(...parameters)
  }

  public offScroll(...parameters: Parameters<Damped['unsubscribe']>) {
    this.#damped.unsubscribe(...parameters)
  }

  public get context() {
    return {
      currentScrollValue: this.currentScrollValue,
      targetScrollValue: this.targetScrollValue,
      contentElement: this.contentElement,
      position: this.position,
      contentPosition: this.contentPosition,
      viewportSize: this.viewportSize,
      scrollSize: this.scrollSize,
      gap: this.gap,
      counter: this.counter,
      distance: this.distance,
      overscroll: this.overscroll,
      vertical: this.vertical,
      currentProgress: this.currentProgress,
      targetProgress: this.targetProgress,
      speed: this.speed,
      direction: this.direction,
      isRunning: this.isRunning,
      range: this.range,
      curve: this.curve,
      visible: this.visible,
    }
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

  // TODO: Поправить значение когда скролл не секционный ??
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

      const limit = this.#sections.length - 1

      if (this.#infiniteAttribute.current) {
        if (this.#counter.current === 0 && previousCounter === limit) {
          shiftValue =
            this.#scrollSize +
            this.#viewportSize -
            previousSection.position +
            this.#gap
        } else if (this.#counter.current === limit && previousCounter === 0) {
          shiftValue =
            currentSection.position -
            (this.#scrollSize + this.#viewportSize + this.#gap)
        } else {
          shiftValue = currentSection.position - previousSection.position
        }
      } else {
        shiftValue = currentSection.position - previousSection.position
      }

      this.#damped.shift(shiftValue, behaviour === 'instant')
    }
  }

  public shiftSections(
    direction: number,
    behaviour: ScrollBehaviour = 'smooth'
  ) {
    if (!this.#sections.length) {
      return
    }

    this.scrollToSection(this.#counter.current + direction, behaviour)
  }

  public setPosition(
    value: number,
    behaviour: 'smooth' | 'instant' = 'smooth'
  ) {
    this.#damped.set(value, behaviour === 'instant')
  }

  protected connectedCallback() {
    this.#awake()
  }

  protected disconnectedCallback() {
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

    this.#resizeListener()
  }

  #unsplit() {
    this.#sections.forEach((section) => {
      section.destroy()
    })

    this.#sections = []
  }

  #disable() {
    this.#damped.unsubscribe(this.#animatedChangeListener)
    this.#damped.stopAnimation()

    this.#wheelControls.disconnect()
    this.#keyboardControls.disconnect()
  }

  #enable() {
    this.#damped.subscribe(this.#animatedChangeListener)

    this.#wheelControls.connect()
    this.#keyboardControls.connect()
  }

  #hibernate() {
    windowResizer.unsubscribe(this.#resizeListener)

    this.#damped.reset()

    this.#disable()

    this.#contentElement.style.transform = ''

    if (this.#splitAttribute.current) {
      this.#unsplit()
    }

    scrollEntries.unregister(this)
  }

  #awake() {
    if (this.#splitAttribute.current) {
      this.#split()
    }

    scrollEntries.register(this)

    windowResizer.subscribe(this.#resizeListener, RESIZE_ORDER.SCROLL)

    this.#enable()
  }

  #resizeListener = () => {
    const prevProgress = this.currentScrollValue / this.#scrollSize || 0

    this.#position = this.vertical
      ? getCumulativeOffsetTop(this)
      : getCumulativeOffsetLeft(this)

    this.#contentPosition = this.vertical
      ? getCumulativeOffsetTop(this.#contentElement)
      : getCumulativeOffsetLeft(this.#contentElement)

    this.#viewportSize = this.vertical ? this.offsetHeight : this.offsetWidth

    if (this.#pagesAttribute.current) {
      this.#scrollSize = this.#viewportSize * this.#pagesAttribute.current
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

    this.#gap = cssUnitParser.parse(getComputedStyle(this.#contentElement).gap)

    if (!this.#infiniteAttribute.current) {
      const cs = getComputedStyle(this)

      this.#scrollSize += this.vertical
        ? parseFloat(cs.paddingBlockStart) + parseFloat(cs.paddingBlockEnd)
        : parseFloat(cs.paddingInlineStart) + parseFloat(cs.paddingInlineEnd)

      this.#damped.max = this.#scrollSize
    }

    this.#sections.forEach((section) => {
      section.resize()
      section.transform()
    })

    if (this.#infiniteAttribute.current && this.#sections.length) {
      const lastSection = this.#sections[this.#sections.length - 1]
      const lastSectionMax =
        lastSection.position + lastSection.size - this.#viewportSize
      const lastSectionMargin = this.#scrollSize - lastSectionMax
      this.#distance =
        lastSection.position + lastSection.size + lastSectionMargin
    } else {
      this.#distance = this.#scrollSize
    }

    if (this.#sectionalAttribute.current && this.#sections.length) {
      const section = this.#sections[this.#counter.current]
      this.#damped.set(section.position, true)
    } else {
      this.#damped.set(prevProgress * this.#scrollSize, true)
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

        if (
          // this.targetScrollValue + this.viewportSize / 2 >=
          this.targetScrollValue + this.viewportSize / 2 >=
          section.position
        ) {
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

    scrollEntries.update(this, this.#axisAttribute.current, currentScrollValue)
  }

  #setCounter(value: number) {
    if (this.#infiniteAttribute.current) {
      this.#counter.current = value % this.#sections.length
      this.#counter.current =
        this.#counter.current < 0
          ? this.#sections.length + this.#counter.current
          : this.#counter.current
    } else {
      this.#counter.current = clamp(value, 0, this.#sections.length - 1)
    }
  }

  #controlsListener = (value: ControlsValue) => {
    if (typeof value === 'number') {
      if (this.#sectionalAttribute.current) {
        const direction = Math.sign(value)

        if (this.#sections.length) {
          this.shiftSections(direction)
        } else {
          this.#damped.shift(direction * this.#viewportSize)
        }
      } else {
        this.#damped.shift(value)
      }
    } else if (value === 'min') {
      this.#damped.set(this.#damped.min)
    } else if (value === 'max') {
      this.#damped.set(this.#damped.length)
    }
  }

  #getScrollValue(type: 'target' | 'current' = 'current') {
    if (this.#infiniteAttribute.current && this.#sections.length) {
      const mod =
        this.#damped[type] % (this.#scrollSize + this.#viewportSize + this.#gap)

      const value =
        mod < 0 ? this.#scrollSize + mod + this.#viewportSize + this.#gap : mod

      return value
    } else {
      return this.#damped[type]
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll': ScrollElement
  }
}
