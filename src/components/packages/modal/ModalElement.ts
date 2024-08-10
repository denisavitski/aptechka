import {
  createStylesheet,
  element,
  div,
  slot,
  span,
} from '@packages/element-constructor'

import { PopoverElement } from '@packages/popover'
import { aptechkaTheme } from '@packages/theme'

import { isBrowser } from '@packages/utils'

const stylesheet = createStylesheet({
  ':host': {
    position: 'fixed',
    top: '0',
    left: '0',

    zIndex: '1',

    width: '100%',
    height: '100%',

    transitionProperty: 'opacity',
    transitionDuration: 'var(--transition-duration)',
  },

  ':host::before': {
    content: '""',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '-1',
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--backdrop, rgba(0, 0, 0, 0.8))',
  },

  '.inner': {
    width: '100%',
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    overflow: 'hidden auto',
  },

  '.overflow .inner': {
    alignItems: 'flex-start',
  },

  '.content': {
    position: 'relative',
  },

  '.close-button': {
    position: 'absolute',
    zIndex: '1',
    top: 'var(--close-button-top, 0.5em)',
    right: 'var(--close-button-right, 0.5em)',

    background: 'none',
    border: 'none',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
  },

  '.close-button-default': {
    width: 'var(--close-button-size, 1.5em)',
    height: 'var(--close-button-size, 1.5em)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    transitionProperty: 'transform',
    transitionDuration: 'var(--transition-duration)',
    willChange: 'transform',
  },

  '.close-button:hover .close-button-default': {
    transform: 'scale(0.9)',
  },

  '.close-button:active .close-button-default': {
    transform: 'scale(0.7)',
  },

  '.close-button-default::before, .close-button-default::after': {
    content: '""',

    position: 'absolute',

    width: 'var(--close-button-thickness, 0.1em)',
    height: '100%',

    backgroundColor: `var(--close-button-color, ${aptechkaTheme.colorMain.var})`,
  },

  '.close-button-default::before': {
    transform: 'rotate(-45deg)',
  },

  '.close-button-default::after': {
    transform: 'rotate(45deg)',
  },
})

export class ModalElement extends PopoverElement {
  #resizeObserver: ResizeObserver = null!
  #innerElement: HTMLElement = null!

  constructor() {
    super()

    if (isBrowser) {
      const shadow = this.attachShadow({ mode: 'open' })
      shadow.adoptedStyleSheets.push(stylesheet)

      element(this, {
        children: div({
          class: 'inner',
          outside: true,
          children: div({
            class: 'content',
            children: [
              element('e-popover-button', {
                type: 'close',
                target: 'parent',
                class: 'close-button',
                lightChildren: [
                  slot({
                    name: 'close-button',
                    children: span({ class: 'close-button-default' }),
                  }),
                ],
              }),
              slot(),
            ],
          }),
          ref: (e) => (this.#innerElement = e),
        }),
      })

      this.#resizeObserver = new ResizeObserver(() => {
        if (this.#innerElement.scrollHeight > this.#innerElement.clientHeight) {
          this.classList.add('overflow')
        } else {
          this.classList.remove('overflow')
        }
      })
    }
  }

  protected override connectedCallback() {
    super.connectedCallback()

    this.#resizeObserver.observe(this)
  }

  protected override disconnectedCallback() {
    super.disconnectedCallback()

    this.#resizeObserver.disconnect()
  }
}

if (!customElements.get('e-modal')) {
  customElements.define('e-modal', ModalElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-modal': ModalElement
  }
}
