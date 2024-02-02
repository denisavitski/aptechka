import '@packages/accordion'

import { Store, activeStores } from '@packages/store'
import { CustomElement, define } from '@packages/custom-element'
import { div, element, createStylesheet } from '@packages/element-constructor'

import { studioTheme } from '../studioTheme'
import { StoreManagerType } from '@packages/store/Store'
import { tweakerManagerConstructors } from './tweakerManagerConstructors'

const stylesheet = createStylesheet({
  ':host': {
    display: 'flex',
    alignItems: 'center',
    gap: studioTheme.sizePaddingMedium.var,
    color: studioTheme.colorLight.var,
  },
})

export interface TweakerFieldParameters {
  store: Store<any, StoreManagerType, any>
}

@define('e-tweaker-field')
export class TweakerFieldElement extends CustomElement {
  #store: Store<any, StoreManagerType, any> = null!
  #key: string
  #name: string

  constructor(parameters: TweakerFieldParameters) {
    super()
    this.#store = parameters.store
    this.#key = this.#store.passport!.name
    this.#name = this.#key.split('.').slice(-1).toString()

    this.attachShadow({ mode: 'open' }).adoptedStyleSheets.push(stylesheet)

    const type = this.#store.passport?.manager?.type || 'string'

    element(this, {
      shadowChildren: [
        div({ class: 'name', children: this.#name }),
        new tweakerManagerConstructors[type](this.#store),
      ],
    })
  }

  public get key() {
    return this.#key
  }

  public get name() {
    return this.#name
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
