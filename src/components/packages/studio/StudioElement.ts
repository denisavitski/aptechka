import { CustomElement, define } from '@packages/custom-element'
import { element, createStylesheet } from '@packages/element-constructor'
import { TweakerElement } from './tweaker/TweakerElement'
import { studioTheme } from './studioTheme'
import { studioStorage } from './studioStorage'

const stylesheet = createStylesheet({
  ':host': {
    fontFamily: 'sans-serif',

    position: 'fixed',
    top: '0',
    left: '0',

    zIndex: '1000',

    display: 'block',

    width: '100%',
    height: '100%',

    ...studioTheme.style,
  },
})

@define('e-studio')
export class StudioElement extends CustomElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).adoptedStyleSheets.push(stylesheet)

    studioStorage.load()

    element(this, {
      shadowChildren: [new TweakerElement()],
    })
  }

  protected connectedCallback() {
    window.addEventListener('beforeunload', this.#unloadListener)
  }

  protected disconnectedCallback() {
    window.removeEventListener('beforeunload', this.#unloadListener)
    studioStorage.save()
  }

  #unloadListener = () => {
    studioStorage.save()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-studio': StudioElement
  }
}
