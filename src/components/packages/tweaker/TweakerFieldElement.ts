import { Store, activeStores } from '@packages/store'

import {
  div,
  element,
  createStylesheet,
  button,
} from '@packages/element-constructor'

import { StoreManagerType } from '@packages/store/Store'

import copyIcon from '@assets/icons/copy.svg?raw'
import resetIcon from '@assets/icons/reset.svg?raw'

import { tweakerManagerConstructors } from './tweakerManagerConstructors'
import { aptechkaTheme } from '@packages/theme'
import { dispatchSizeChangeEvent } from '@packages/utils'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'

const stylesheet = createStylesheet({
  ':host': {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '0.5fr 1fr',
    alignItems: 'center',
    color: aptechkaTheme.colorFont.var,
    gap: 'var(--gap-medium)',
  },

  ':host(.disabled)': {
    pointerEvents: 'none',
    opacity: 0.5,
  },

  '.head': {
    fontSize: 'var(--font-size-medium)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--gap-extra-small)',
  },

  '.head-buttons': {
    display: 'flex',
  },

  '.head-button': {
    width: '14px',
    height: '14px',

    padding: '0',
    margin: '0',
    border: 'none',
    background: 'none',

    fill: aptechkaTheme.colorFont.var,
    transitionDuration: 'var(--duration-short)',
    transitionProperty: `fill, opacity`,
    opacity: '0',
  },

  ':host(:hover) .head-button': {
    opacity: '1',
  },

  '.head-button:hover': {
    fill: aptechkaTheme.colorActive.var,
  },

  '.head-button svg': {
    width: '100%',
    height: '100%',
  },
})

export interface TweakerFieldParameters {
  store: Store<any, StoreManagerType>
}

export class TweakerFieldElement extends HTMLElement {
  #stores: Array<Store<any, StoreManagerType>> = []
  #key: string
  #name: string
  #pointerEnter = false
  #storeManager: TweakerStoreManagerElement<any>

  constructor(parameters: TweakerFieldParameters) {
    super()

    this.#stores = [parameters.store]
    this.#key = parameters.store.passport!.name
    this.#name = this.#key.split('.').slice(-1).toString()

    const type = parameters.store.passport?.manager?.type || 'string'

    this.#storeManager = new tweakerManagerConstructors[type](this.#stores[0])

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.adoptedStyleSheets.push(stylesheet)

    element(this, {
      class: {
        disabled: parameters.store.passport?.manager?.disabled || false,
      },
      onPointerleave: () => {
        this.#pointerEnter = false
      },
      onPointerenter: () => {
        this.#pointerEnter = true
      },
      children: [
        div({
          class: 'head',
          children: [
            div({ class: 'name', children: this.#name + ':' }),
            div({
              class: 'head-buttons',
              children: [
                button({
                  class: 'head-button',
                  children: copyIcon,
                  onClick: () => {
                    navigator.clipboard.writeText(this.#stores[0].current)
                  },
                }),
                button({
                  class: 'head-button',
                  children: resetIcon,
                  onClick: () => {
                    this.#stores.forEach((store) => {
                      store.reset()
                    })
                  },
                }),
              ],
            }),
          ],
        }),
        this.#storeManager,
      ],
    })
  }

  public get key() {
    return this.#key
  }

  public get name() {
    return this.#name
  }

  public get stores() {
    return this.#stores
  }

  public addStore(store: Store<any, any>) {
    this.#storeManager.addStore(store)
  }

  protected connectedCallback() {
    activeStores.subscribe(this.#storesChangeListener)
    addEventListener('keydown', this.#keydownListener)
    dispatchSizeChangeEvent(this)
  }

  protected disconnectedCallback() {
    activeStores.unsubscribe(this.#storesChangeListener)
    removeEventListener('keydown', this.#keydownListener)
  }

  #storesChangeListener = () => {
    if (!activeStores.current.find((s) => this.#stores.includes(s))) {
      this.remove()
    }
  }

  #keydownListener = (e: KeyboardEvent) => {
    if (this.#pointerEnter) {
      if ((e.metaKey || e.ctrlKey) && e.code === 'KeyC') {
        navigator.clipboard.writeText(this.#stores[0].current)
      } else if ((e.metaKey || e.ctrlKey) && e.code === 'KeyR') {
        this.#stores.forEach((store) => {
          store.reset()
        })
        e.preventDefault()
      }
    }
  }
}

if (!customElements.get('e-tweaker-field')) {
  customElements.define('e-tweaker-field', TweakerFieldElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-field': TweakerFieldElement
  }
}
