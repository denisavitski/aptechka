import { CustomElement } from '@packages/custom-element'
import { element } from '@packages/element-constructor'
import { isBrowser } from '@packages/utils'

export abstract class AbstractButtonElement extends CustomElement {
  constructor() {
    super()

    if (isBrowser) {
      element(this, {
        style: {
          cursor: 'default',
        },
        tabIndex: this.getAttribute('tabindex') || '0',
        role: 'button',
        onKeydown: (e) => {
          if (e.code === 'Space') {
            this.click()
          }
        },
        onClick: () => {
          this.click()
        },
      })
    }
  }

  public abstract override click(): void
}
