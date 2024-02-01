import '@packages/accordion'

import { Store } from '@packages/store'
import { CustomElement, define } from '@packages/custom-element'
import { div, element, createStylesheet } from '@packages/element-constructor'

import { studioTheme } from '../studioTheme'

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
  #key: string

  constructor(parameters: TweakerFieldParameters) {
    super()

    this.#key = parameters.store.passport!.name

    this.attachShadow({ mode: 'open' }).adoptedStyleSheets.push(stylesheet)

    element(this, {
      shadowChildren: [div({ class: 'name', children: this.#key })],
    })
  }

  public get key() {
    return this.#key
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-field': TweakerFieldElement
  }
}
