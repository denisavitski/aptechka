import { CustomElement, define } from '@packages/custom-element'
import { element, stylesheet } from '@packages/element-constructor'
import { TweakerElement } from './tweaker/TweakerElement'
import { vars } from './shared'

const style = stylesheet({
  ':host': {
    position: 'fixed',
    top: '0',
    left: '0',

    zIndex: '1000',

    display: 'block',

    width: '100%',
    height: '100%',

    ...vars.style,
  },
})

@define('e-studio')
export class StudioElement extends CustomElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).adoptedStyleSheets.push(style)

    element(this, {
      shadowChildren: [new TweakerElement()],
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-studio': StudioElement
  }
}
