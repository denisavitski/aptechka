import { CustomElement } from '@packages/custom-element'
import { element } from '@packages/element-constructor'
import { isBrowser } from '@packages/utils'

export abstract class AbstractButtonElement extends CustomElement {
  constructor() {
    super()

    if (isBrowser) {
      element(this, {
        attributes: {
          tabIndex: this.getAttribute('tabindex') || '0',
          role: 'button',
        },
        style: {
          cursor: 'default',
        },
        events: {
          keydown: (e) => {
            if (e.code === 'Space') {
              this.click()
            }
          },
          click: () => {
            this.click()
          },
        },
      })
    }
  }

  public abstract override click(): void
}
