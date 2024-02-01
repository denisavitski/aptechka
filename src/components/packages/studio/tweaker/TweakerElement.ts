import { define } from '@packages/custom-element'
import { createStylesheet } from '@packages/element-constructor'
import { Animated } from '@packages/animation'
import { Store, activeStores } from '@packages/store'
import { debounce } from '@packages/utils'

import { studioTheme } from '../studioTheme'
import { TweakerFolderElement } from './TweakerFolderElement'

const stylesheet = createStylesheet({
  ':host': {
    position: 'absolute',
    top: '20px',
    right: '20px',

    width: studioTheme.sizeTweakerWidth.var,

    backgroundColor: studioTheme.colorDark.var,
    borderRadius: studioTheme.sizeBorderRadius.var,
  },
})

export interface StoreBox {
  store: Store
  remainingFolders: Array<string>
}

@define('e-tweaker')
export class TweakerElement extends TweakerFolderElement {
  constructor() {
    super({
      key: '',
    })

    this.shadowRoot!.adoptedStyleSheets.push(stylesheet)
  }

  protected override connectedCallback() {
    super.connectedCallback()
    activeStores.subscribe(this.#storesChangeListener)
  }

  protected override disconnectedCallback() {
    super.disconnectedCallback()
    activeStores.unsubscribe(this.#storesChangeListener)
  }

  #storesChangeListener = debounce(() => {
    activeStores.current.forEach((store) => {
      if (!(store instanceof Animated)) {
        const sname = store.passport!.name.split('.')

        this.handleStore({
          store: store,
          remainingFolders: sname.length > 1 ? sname.slice(0, -1) : [],
        })
      }
    })
  }, 10)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker': TweakerElement
  }
}
