import {
  button,
  createStylesheet,
  div,
  element,
  slot,
} from '@packages/client/element-constructor'
import {
  dispatchBeforeSizeChangeEvent,
  dispatchSizeChangeEvent,
  getElementTransitionDurationMS,
  isBrowser,
} from '@packages/client/utils'

const stylesheet = createStylesheet({
  ':host': {
    position: 'relative',
  },

  '.head': {
    width: '100%',
    cursor: 'default',
    background: 'none',
    border: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    textAlign: 'start',
    padding: '0',
    margin: '0',
  },

  '.body': {
    boxSizing: 'border-box',

    position: 'var(--position, unset)',
    top: '100%',
    left: '0',

    width: '100%',

    overflow: 'hidden',
    transitionDuration: `var(--duration, ${'var(--duration-short)'})`,
    transitionProperty: 'height',
    cursor: 'default',
  },

  '.body-inner': {
    display: 'grid',
    gap: 'var(--gap, 0px)',

    width: '100%',
    paddingTop: 'var(--gap, 0px)',
  },
})

export interface SelectToggleDetail {
  opened: boolean
}

export class SelectElement extends HTMLElement {
  static formAssociated = true

  #internals: ElementInternals = null!
  #value: string = ''
  #bodyElement: HTMLElement = null!
  #opened = false
  #timeoutId: ReturnType<typeof setTimeout> | undefined
  #resizeObserver: ResizeObserver = null!

  constructor() {
    super()

    if (isBrowser) {
      const shadow = this.attachShadow({ mode: 'open' })
      shadow.adoptedStyleSheets.push(stylesheet)

      this.#internals = this.attachInternals()

      this.#resizeObserver = new ResizeObserver(this.#resizeObserverListener)

      element(this, {
        children: [
          button({
            class: 'head',
            children: slot({ name: 'head' }),
            onClick: () => {
              if (this.opened) {
                this.close()
              } else {
                this.open()
              }
            },
          }),
          div({
            class: 'body',
            style: {
              height: '0px',
            },
            children: div({
              class: 'body-inner',
              children: slot(),
            }),
            ref: (e) => {
              this.#bodyElement = e
            },
          }),
        ],
      })
    }
  }

  public get value() {
    return this.#value
  }

  public set value(value: string) {
    this.#value = value

    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      })
    )

    this.#internals.setFormValue(this.#value)
  }

  public get internals() {
    return this.#internals
  }

  public get opened() {
    return this.#opened
  }

  public open() {
    clearTimeout(this.#timeoutId)
    this.#opened = true

    this.#bodyElement.style.display = 'grid'
    this.classList.add('triggered')

    setTimeout(() => {
      this.classList.add('opened')

      this.#bodyElement.style.height = this.#bodyElement.scrollHeight + 'px'

      this.#dispatchToggleEvent()
    }, 0)
  }

  public close() {
    this.#opened = false

    this.#bodyElement.style.height = '0px'
    this.classList.remove('opened')

    this.#dispatchToggleEvent()

    this.#timeoutId = setTimeout(() => {
      this.classList.remove('triggered')
      this.#bodyElement.style.display = 'none'
    }, getElementTransitionDurationMS(this.#bodyElement))
  }

  protected connectedCallback() {
    this.#resizeObserver.observe(this.#bodyElement)
  }

  protected disconnectedCallback() {
    clearTimeout(this.#timeoutId)
    this.#resizeObserver.disconnect()
  }

  #resizeObserverListener = () => {
    dispatchSizeChangeEvent(this)
  }

  #dispatchToggleEvent() {
    dispatchBeforeSizeChangeEvent(this)

    this.dispatchEvent(
      new CustomEvent<SelectToggleDetail>('selectToggle', {
        bubbles: true,
        composed: true,
        detail: {
          opened: this.#opened,
        },
      })
    )
  }
}

if (!customElements.get('e-select')) {
  customElements.define('e-select', SelectElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-select': SelectElement
  }

  interface HTMLElementEventMap {
    selectToggle: CustomEvent<SelectToggleDetail>
  }
}
