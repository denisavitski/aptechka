import '@packages/accordion'

import { CustomElement, define } from '@packages/custom-element'
import { div, element, stylesheet } from '@packages/element-constructor'

import { vars } from '../shared'

const style = stylesheet({
  '.wrapper': {
    boxSizing: 'border-box',
    padding: vars.sizePaddingMedium.var,
    backgroundColor: `rgba(255, 255, 255, 0.1)`,
    borderRadius: vars.sizeBorderRadius.var,
  },

  '.head': {
    width: '100%',
    height: '20px',
    backgroundColor: vars.colorLight,
    borderRadius: vars.sizeBorderRadius.var,
  },

  '.body': {
    transitionProperty: 'height',
    transitionDuration: vars.durationShort.var,
  },

  '.body-content': {
    boxSizing: 'border-box',
    padding: vars.sizePaddingLarge.var,
  },
})

export interface TweakerFolderParameters {
  key: string
  name?: string
}

@define('e-tweaker-folder')
export class TweakerFieldElement extends CustomElement {
  #key: string
  #name: string

  constructor(parameters?: TweakerFolderParameters) {
    super()

    this.#key = parameters?.key || this.getAttribute('key') || 'unnamed'

    this.#name =
      parameters?.name || this.getAttribute('name') || this.#key || 'unnamed'

    this.attachShadow({ mode: 'open' }).adoptedStyleSheets.push(style)

    element(this, {
      shadowChildren: [div({})],
    })
  }

  public get name() {
    return this.#name
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
