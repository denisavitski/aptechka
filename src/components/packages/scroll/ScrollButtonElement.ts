import { isBrowser } from '@packages/utils'
import { ScrollUserElement } from './ScrollUserElement'
import {
  button,
  createStylesheet,
  element,
  slot,
} from '@packages/element-constructor'

const stylesheet = createStylesheet({
  button: {
    all: 'inherit',
  },
})

export abstract class ScrollButtonElement extends ScrollUserElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.adoptedStyleSheets.push(stylesheet)

    if (isBrowser) {
      element(this, {
        children: [
          button({
            onClick: () => {
              this.handleClick()
            },
            children: [slot()],
          }),
        ],
      })
    }
  }

  protected abstract handleClick(): void
}
