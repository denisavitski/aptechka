import '@packages/checkbox'
import { Store, StoreMiddleware } from '@packages/store/Store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { define } from '@packages/custom-element'
import {
  createStylesheet,
  div,
  element,
  input,
} from '@packages/element-constructor'
import { aptechkaTheme } from '@packages/theme'
import { clamp, nullishCoalescing, setupDrag, toStep } from '@packages/utils'
import { elementResizer } from '@packages/element-resizer'

const stylesheet = createStylesheet({
  ':host': {
    width: '100%',

    display: 'flex',
    alignItems: 'center',
    gap: 'var(--gap-small)',
  },

  '.inputs-wrapper': {
    display: 'grid',
    gap: 'var(--gap-small)',
    width: '100%',
  },

  input: {
    boxSizing: 'border-box',
    outline: 'none',
    fontVariantNumeric: 'tabular-nums',
    fontFamily: 'inherit',
    color: 'inherit',
    border: 'none',
    fontSize: 'var(--font-size-small)',

    width: '100%',
    height: 'var(--height-input)',

    margin: '0',
    padding: `0 var(--gap-small)`,

    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: aptechkaTheme.borderRadius.var,
  },

  '.drag': {
    position: 'relative',

    width: '100%',
    height: 'calc(var(--height-input) * 0.2)',

    display: 'flex',
    alignItems: 'center',
  },

  '.drag::before': {
    content: '""',

    position: 'absolute',
    left: '0',
    width: '100%',

    zIndex: '-1',

    height: '1px',

    borderBottom: `1px solid ${aptechkaTheme.colorFont.var}`,
    transform: 'translateY(-50%)',

    opacity: '0.3',
  },

  ':host(.infinite) .drag::before': {
    borderBottom: `1px dashed ${aptechkaTheme.colorFont.var}`,
  },

  '.drag-knob': {
    '--size': 'calc(var(--height-input) * 0.4)',

    width: 'var(--size)',
    height: 'var(--size)',
  },

  '.drag-knob-inner': {
    width: '100%',
    height: '100%',

    backgroundColor: aptechkaTheme.colorFont.var,
    borderRadius: aptechkaTheme.borderRadiusSmall.var,

    transition: 'opacity var(--duration-short)',
  },

  ':host(.infinite) .grabbing .drag-knob-inner': {
    opacity: 0.3,
  },
})

@define('e-tweaker-number-manager')
export class TweakerNumberManagerElement extends TweakerStoreManagerElement<
  Store<Array<number> | number, 'number'>
> {
  #inputElements: Array<HTMLInputElement> = []
  #knobElements: Array<HTMLElement> = []

  #step: number
  #min: number
  #max: number

  #type: 'number' | 'array'
  #isFinite: boolean
  #isDragging = false

  constructor(...stores: Array<Store<Array<number> | number, 'number'>>) {
    super(...stores)

    this.openShadow(stylesheet)

    this.#min = nullishCoalescing(
      this.firstStore.passport?.manager?.min,
      -Infinity
    )
    this.#max = nullishCoalescing(
      this.firstStore.passport?.manager?.max,
      Infinity
    )

    this.#step = this.firstStore.passport?.manager?.step || 0.01

    this.#type = Array.isArray(this.firstStore.current) ? 'array' : 'number'
    this.#isFinite = isFinite(this.#max) && isFinite(this.#min)

    element(this, {
      class: !this.#isFinite ? 'infinite' : '',
      children: this.#getArray().map((v, i) => {
        return div({
          class: 'inputs-wrapper',

          children: [
            input({
              type: 'number',
              step: this.#step,
              min: this.#min,
              max: this.#max,
              ref: (e) => this.#inputElements.push(e),
              value: v,
              onChange: () => {
                this.updateStores(
                  this.#inputElements.map((el) => parseFloat(el.value))
                )
              },
            }),
            div({
              class: 'drag',
              children: [
                div({
                  class: 'drag-knob',
                  ref: (e) => this.#knobElements.push(e),
                  onPointerdown: (grabEvent) => {
                    grabEvent.preventDefault()

                    this.#isDragging = true

                    const arr = this.#getArray()
                    const startValue = arr[i]

                    const knobElement = this.#knobElements[i]
                    const inputElement = this.#inputElements[i]

                    if (knobElement && inputElement) {
                      const knobParentElement = knobElement.parentElement!
                      const distance = this.#getDistance()

                      knobParentElement.classList.add('grabbing')

                      setupDrag(
                        (moveEvent) => {
                          const delta = moveEvent.x - grabEvent.x

                          const del = this.#isFinite
                            ? knobParentElement.offsetWidth / (distance || 1)
                            : 1

                          const newValue = startValue + delta / del

                          arr[i] = newValue

                          if (!this.#isFinite) {
                            const pos = this.#getKnobPosition(knobElement, 0)

                            knobElement.style.transform = `translateX(${
                              pos + delta
                            }px)`
                          }

                          this.updateStores([...arr])
                        },
                        () => {
                          this.#isDragging = false

                          if (!this.#isFinite) {
                            const pos = this.#getKnobPosition(knobElement, 0)
                            knobElement.style.transition = 'transform 0.1s'
                            knobElement.style.transform = `translateX(${pos}px)`

                            knobParentElement.classList.remove('grabbing')

                            setTimeout(() => {
                              knobElement.style.transition = ''
                            }, 100)
                          }
                        }
                      )
                    }
                  },
                  children: div({
                    class: 'drag-knob-inner',
                  }),
                }),
              ],
            }),
          ],
        })
      }),
    })
  }

  protected connectedCallback() {
    this.firstStore.addMiddleware(this.#storeMiddleware)
    this.firstStore.subscribe(this.#storeChangeListener)

    elementResizer.subscribe(this, this.#resizeListener)
  }

  protected disconnectedCallback() {
    this.firstStore.removeMiddleware(this.#storeMiddleware)
    this.firstStore.unsubscribe(this.#storeChangeListener)

    elementResizer.unsubscribe(this.#resizeListener)
  }

  #storeMiddleware: StoreMiddleware<Array<number> | number> = (value) => {
    const arr = this.#getArray(value)

    arr.map((v, i) => {
      const number = typeof v === 'string' ? parseFloat(v) || this.#min : v

      const clamped = clamp(number, this.#min, this.#max)

      const fixed = toStep(clamped, this.#step)

      arr[i] = fixed
    })

    return this.#type === 'number' ? arr[0] : arr
  }

  #storeChangeListener = () => {
    this.#getArray().map((v, i) => {
      const inputElement = this.#inputElements[i]

      if (inputElement) {
        inputElement.value = v.toString()
      }
    })

    this.#updateKnobPositions()
  }

  #getArray(value: number | Array<number> = this.firstStore.current) {
    return Array.isArray(value) ? value : [value]
  }

  #updateKnobPositions() {
    this.#getArray().map((v, i) => {
      const knobElement = this.#knobElements[i]

      if (
        knobElement &&
        (!this.#isDragging || (this.#isDragging && this.#isFinite))
      ) {
        const position = this.#getKnobPosition(knobElement, v)
        knobElement.style.transform = `translateX(${position}px)`
      }
    })
  }

  #getDistance() {
    return this.#isFinite ? this.#max - this.#min : 0
  }

  #getKnobPosition(knobElement: HTMLElement, inputValue: number) {
    const parentElement = knobElement.parentElement!

    const distance = this.#getDistance()

    const progress = distance ? inputValue / distance : 0.5

    const position =
      (parentElement.offsetWidth - knobElement.offsetWidth) * progress

    return position
  }

  #resizeListener = () => {
    this.#updateKnobPositions()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-number-manager': TweakerNumberManagerElement
  }
}
