import {
  button,
  createStylesheet,
  div,
  element,
  input,
  label,
} from '@packages/element-constructor'
import { Store, activeStores, storeRegistry } from '@packages/store'
import { createJSONAndSave, debounce, setupDrag } from '@packages/utils'
import { ViewportMediaRules } from '@packages/device'
import { aptechkaTheme } from './theme'

import resetIcon from '@assets/icons/reset.svg?raw'
import copyIcon from '@assets/icons/copy.svg?raw'
import downloadIcon from '@assets/icons/download.svg?raw'
import uploadIcon from '@assets/icons/upload.svg?raw'

import { TweakerFolderElement } from './TweakerFolderElement'
import { tweakerStorage } from './tweakerStorage'

const stylesheet = createStylesheet({
  ':host': {
    '--tweaker-width': '550px',
    '--tweaker-offset': '20px',
    '--tweaker-folder-height': '35px',
    '--height-input': '25px',
    '--gap-large': '12px',
    '--gap-medium': '10px',
    '--gap-small': '8px',
    '--gap-extra-small': '4px',
    '--font-size-large': '16px',
    '--font-size-medium': '14px',
    '--font-size-small': '12px',
    '--duration-short': '0.2s',

    fontFamily: 'sans-serif',

    position: 'absolute',
    top: 'var(--tweaker-offset)',
    right: 'var(--tweaker-offset)',

    width: 'var(--tweaker-width)',

    backgroundColor: aptechkaTheme.colorMain.var,
    borderRadius: aptechkaTheme.borderRadius.var,

    transition: 'opacity 0.1s',

    zIndex: '100',

    opacity: '0.1',
  },

  ':host(:hover)': {
    opacity: '1 !important',
  },

  '.resize': {
    position: 'absolute',
    left: '0',
    top: '0',
    width: 'calc(var(--tweaker-width) * 0.025)',
    height: '100%',
    zIndex: '1',
    cursor: 'ew-resize',
  },

  '.tweaker-buttons': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--gap-extra-small)',
  },

  '.tweaker-button': {
    width: '18px',
    height: '18px',

    padding: '0',
    margin: '0',

    background: 'none',
    border: 'none',

    fill: aptechkaTheme.colorFont.var,
    transitionProperty: `fill`,
    transitionDuration: 'var(--duration-short)',
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
        var(--tweaker-offset) * 2 + 
        var(--tweaker-folder-height)
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

      width: '100% !important',

      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
    },

    ':host .body-content': {
      maxHeight: `calc(
        100dvh - 
        var(--tweaker-folder-height)
      )`,
    },
  },
})

export interface StoreBox {
  store: Store
  remainingFolders: Array<string>
}

export class TweakerElement extends TweakerFolderElement {
  #scrollRestored = false

  constructor() {
    super({
      key: '',
    })

    tweakerStorage.load()

    this.shadowRoot!.adoptedStyleSheets.push(stylesheet)

    this.head.current = [
      div({
        class: 'tweaker-buttons',
        onClick: (e) => {
          e.stopPropagation()
        },

        children: [
          button({
            class: 'tweaker-button',
            children: resetIcon,
            onClick: () => {
              storeRegistry.resetState()
            },
          }),
          button({
            class: ['tweaker-button'],
            children: [copyIcon],
            onClick: () => {
              navigator.clipboard.writeText(
                JSON.stringify(storeRegistry.getState())
              )
            },
          }),
          button({
            class: 'tweaker-button',
            children: downloadIcon,
            onClick: () => {
              createJSONAndSave(storeRegistry.name, storeRegistry.getState())
            },
          }),
          label({
            class: 'tweaker-button',
            children: [
              uploadIcon,
              input({
                type: 'file',
                style: {
                  display: 'none',
                },
                onChange: (e) => {
                  const input = e.currentTarget as HTMLInputElement

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
                },
              }),
            ],
          }),
        ],
      }),
    ]

    element(this.bodyElement, {
      children: [
        div({
          class: 'resize',
          onPointerdown: (grabEvent) => {
            grabEvent.preventDefault()

            const rect = this.getBoundingClientRect()

            const scrollValue = this.contentElement.scrollTop

            setupDrag(
              (moveEvent) => {
                const dx = grabEvent.x - moveEvent.x

                const newSize = Math.max(400, rect.width + dx)

                this.style.width = newSize + 'px'

                tweakerStorage.changeSize('tweaker', newSize)
              },
              () => {
                setTimeout(() => {
                  this.contentElement.scroll({
                    top: scrollValue,
                  })
                }, 10)
              }
            )
          },
          onDblclick: () => {
            this.style.width = ''

            tweakerStorage.changeSize('tweaker', null)
          },
        }),
      ],
    })
  }

  protected override connectedCallback() {
    super.connectedCallback()

    window.addEventListener('beforeunload', this.#unloadListener)
    activeStores.subscribe(this.#storesChangeListener)

    if (tweakerStorage.changedSizes('tweaker')) {
      this.style.width = tweakerStorage.changedSizes('tweaker') + 'px'
    }
  }

  protected disconnectedCallback() {
    window.removeEventListener('beforeunload', this.#unloadListener)
    tweakerStorage.save()

    activeStores.unsubscribe(this.#storesChangeListener)
  }

  #unloadListener = () => {
    tweakerStorage.save()
  }

  #storesChangeListener = debounce(() => {
    activeStores.current.forEach((store) => {
      if (store.name) {
        const sname = store.name.split('.')

        this.handleStore({
          store: store,
          remainingFolders: sname.length > 1 ? sname.slice(0, -1) : [],
        })
      }
    })

    if (!this.#scrollRestored) {
      this.#scrollRestored = true

      this.contentElement.scroll({
        top: tweakerStorage.scrollValue,
      })

      this.contentElement.addEventListener('scroll', () => {
        tweakerStorage.scrollValue = this.contentElement.scrollTop
      })
    }
  }, 10)
}

if (!customElements.get('e-tweaker')) {
  customElements.define('e-tweaker', TweakerElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker': TweakerElement
  }
}
