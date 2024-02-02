import '@packages/accordion'

import { Store, activeStores } from '@packages/store'
import { CustomElement, define } from '@packages/custom-element'
import { div, element, createStylesheet } from '@packages/element-constructor'

import { studioTheme } from '../studioTheme'
import { TweakerNumberManagerElement } from './TweakerNumberManagerElement'

const stylesheet = createStylesheet({
  '.host': {
    color: studioTheme.colorLight.var,
  },
})

export interface TweakerFieldParameters {
  store: Store<any>
}

@define('e-tweaker-field')
export class TweakerFieldElement extends CustomElement {
  #store: Store<any, any, any> = null!
  #key: string

  constructor(parameters: TweakerFieldParameters) {
    super()
    this.#store = parameters.store
    this.#key = this.#store.passport!.name

    this.attachShadow({ mode: 'open' }).adoptedStyleSheets.push(stylesheet)

    element(this, {
      shadowChildren: [
        div({ class: 'name', children: this.#key }),
        new TweakerNumberManagerElement(this.#store),
      ],
    })
  }

  public get key() {
    return this.#key
  }

  protected connectedCallback() {
    activeStores.subscribe(this.#storesChangeListener)
  }

  protected disconnectedCallback() {
    activeStores.unsubscribe(this.#storesChangeListener)
  }

  #storesChangeListener = () => {
    if (!activeStores.current.includes(this.#store)) {
      this.remove()
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-field': TweakerFieldElement
  }
}
