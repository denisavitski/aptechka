import { define } from '@packages/custom-element'
import { stylesheet } from '@packages/element-constructor'

import { vars } from '../shared'
import { TweakerFolderElement } from './TweakerFolderElement'

const style = stylesheet({
  ':host': {
    position: 'absolute',
    top: '20px',
    right: '20px',

    width: vars.sizeTweakerWidth.var,

    backgroundColor: vars.colorDark.var,
    borderRadius: vars.sizeBorderRadius.var,
  },
})

@define('e-tweaker')
export class TweakerElement extends TweakerFolderElement {
  constructor() {
    super({
      key: 'tweaker',
    })

    this.shadowRoot!.adoptedStyleSheets.push(style)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker': TweakerElement
  }
}
