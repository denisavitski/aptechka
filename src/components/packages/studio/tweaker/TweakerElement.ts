import { define } from '@packages/custom-element'
import {
  button,
  createStylesheet,
  div,
  input,
  label,
} from '@packages/element-constructor'
import { Animated } from '@packages/animation'
import { Store, activeStores, storeRegistry } from '@packages/store'
import { createJSONAndSave, debounce } from '@packages/utils'
import { ViewportMediaRules } from '@packages/device'

import resetIcon from '@assets/icons/reset.svg?raw'
import copyIcon from '@assets/icons/copy.svg?raw'
import downloadIcon from '@assets/icons/download.svg?raw'
import uploadIcon from '@assets/icons/upload.svg?raw'

import { TweakerFolderElement } from './TweakerFolderElement'
import { aptechkaTheme } from '@packages/theme'

const stylesheet = createStylesheet({
  ':host': {
    position: 'absolute',
    top: aptechkaTheme.tweakerOffset.var,
    right: aptechkaTheme.tweakerOffset.var,

    width: aptechkaTheme.tweakerWidth.var,

    backgroundColor: aptechkaTheme.colorDark.var,
    borderRadius: aptechkaTheme.borderRadius.var,

    transition: 'opacity 0.2s',

    zIndex: '100',
  },

  ':host(:hover)': {
    opacity: '1 !important',
  },

  '.tweaker-buttons': {
    display: 'flex',
    alignItems: 'center',
    gap: aptechkaTheme.gapExtraSmall.var,
  },

  '.tweaker-button': {
    width: '18px',
    height: '18px',

    padding: '0',
    margin: '0',

    background: 'none',
    border: 'none',

    fill: aptechkaTheme.colorLight.var,
    transitionProperty: `fill`,
    transitionDuration: aptechkaTheme.durationShort.var,
  },

  '.tweaker-button:hover': {
    fill: aptechkaTheme.colorActive.var,
  },

  '.tweaker-button svg': {
    width: '100%',
    height: '100%',
  },

  ':host .body-content': {
    maxHeight: `calc(
      100dvh - 
      (
        ${aptechkaTheme.tweakerOffset.var} * 2 + 
        ${aptechkaTheme.tweakerFolderHeight.var}
      )
    )`,
    overflow: 'hidden auto',

    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
  },

  ':host .body-content::-webkit-scrollbar': {
    display: 'none',
  },

  [`@media ${ViewportMediaRules['<=mobile']}`]: {
    ':host': {
      position: 'absolute',
      top: '0',
      right: '0',

      width: '100%',

      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
    },

    ':host .body-content': {
      maxHeight: `calc(
        100dvh - 
        ${aptechkaTheme.tweakerFolderHeight.var}
      )`,
    },
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

    this.addStylesheet(stylesheet)

    this.head.current = [
      div({
        class: 'tweaker-buttons',
        events: {
          click: (e) => {
            e.stopPropagation()
          },
        },
        children: [
          button({
            class: 'tweaker-button',
            children: resetIcon,
            events: {
              click: () => {
                storeRegistry.resetState()
              },
            },
          }),
          button({
            class: ['tweaker-button'],
            children: [copyIcon],
            events: {
              click: () => {
                navigator.clipboard.writeText(
                  JSON.stringify(storeRegistry.getState())
                )
              },
            },
          }),
          button({
            class: 'tweaker-button',
            children: downloadIcon,
            events: {
              click: () => {
                createJSONAndSave(
                  storeRegistry.projectName,
                  storeRegistry.getState()
                )
              },
            },
          }),
          label({
            class: 'tweaker-button',
            children: [
              uploadIcon,
              input({
                attributes: {
                  type: 'file',
                },
                style: {
                  display: 'none',
                },
                events: {
                  change: (e) => {
                    const input = e.currentTarget as HTMLInputElement

                    input.onchange = () => {
                      const file = input.files?.[0]

                      if (file) {
                        const reader = new FileReader()

                        reader.onload = (e) => {
                          const result = e.target?.result?.toString()

                          if (result) {
                            storeRegistry.loadState(result)
                          }
                        }
                        reader.readAsText(file)
                      }

                      input.onchange = null
                    }

                    input.click()
                  },
                },
              }),
            ],
            events: {
              click: () => {},
            },
          }),
        ],
      }),
    ]

    this.addEventListener('accordionItemToggle', (e) => {
      if (e.detail.opened) {
        this.style.opacity = '1'
      } else {
        this.style.opacity = '0.1'
      }
    })
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
