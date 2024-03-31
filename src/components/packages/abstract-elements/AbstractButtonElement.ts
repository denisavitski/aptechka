import { CustomElement } from '@packages/custom-element'
import {
  button,
  createStylesheet,
  element,
  slot,
} from '@packages/element-constructor'
import { isBrowser } from '@packages/utils'

const stylesheet = createStylesheet({
  button: {
    all: 'inherit',
  },
})

export abstract class AbstractButtonElement extends CustomElement {
  constructor() {
    super()

    this.openShadow(stylesheet)

    if (isBrowser) {
      element(this, {
        children: [
          button({
            onClick: () => {
              this.click()
            },
            children: [slot()],
          }),
        ],
      })
    }
  }

  public abstract override click(): void
}
