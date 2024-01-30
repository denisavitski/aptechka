import { Animated } from '@packages/animation'
import { CustomElement, define } from '@packages/custom-element'
import { stylesheet } from '@packages/element-constructor'
import { activeStores } from '@packages/store'

const studioStylesheet = stylesheet({
  ':host': {
    display: 'block',
  },
})

@define('e-studio')
export class StudioElement extends CustomElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).adoptedStyleSheets.push(studioStylesheet)

    activeStores.subscribe((e) => {
      e.current.forEach((store) => {
        if (store instanceof Animated) {
          console.log(store)
        }
      })
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-studio': StudioElement
  }
}
