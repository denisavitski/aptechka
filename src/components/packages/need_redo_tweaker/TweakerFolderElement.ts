import { Store } from '@packages/store'
import { createStylesheet, div, element } from './element-constructor'

import arrowIcon from '@assets/icons/arrow.svg?raw'

import { tweakerStorage } from './tweakerStorage'

import { isBrowser } from '@packages/utils'
import { StoreBox } from './TweakerElement'
import { TweakerFieldElement } from './TweakerFieldElement'
import { aptechkaTheme } from './theme'

const stylesheet = createStylesheet({
  '.wrapper': {
    boxSizing: 'border-box',
    backgroundColor: `rgba(255, 255, 255, 0.1)`,
    borderRadius: aptechkaTheme.borderRadius.var,
  },

  '.head': {
    boxSizing: 'border-box',

    width: '100%',
    height: 'var(--tweaker-folder-height)',

    paddingLeft: 'var(--gap-medium)',
    paddingRight: 'var(--gap-medium)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: aptechkaTheme.colorMainAux.var,
    borderRadius: aptechkaTheme.borderRadius.var,
  },

  '.name': {
    fontSize: 'var(--font-size-large)',
    color: aptechkaTheme.colorFont.var,
  },

  '.body': {
    display: 'none',
    overflow: 'hidden',
    '@supports (height: calc-size(auto))': {
      height: '0',
    },
  },

  ':host(.opened) .body': {
    height: 'calc-size(auto)',
    display: 'block',

    '@starting-style': {
      height: '0',
    },
  },

  '.body-content': {
    boxSizing: 'border-box',
    padding: 'var(--gap-large)',

    display: 'grid',
    gap: 'var(--gap-medium)',
  },

  '.arrow': {
    width: '20px',
    height: '20px',
    fill: aptechkaTheme.colorFont.var,
  },

  ':host(.opened) .arrow': {
    transform: 'scaleY(-1)',
  },
})

export interface TweakerFolderParameters {
  key: string
  storeBox?: StoreBox
}

export class TweakerFolderElement extends HTMLElement {
  #key: string
  #head = new Store<any>(null)
  #content = new Store<Array<TweakerFolderElement | TweakerFieldElement>>([])
  #mutationObserver: MutationObserver
  #bodyElement: HTMLElement = null!
  #contentElement: HTMLElement = null!
  #contentRootElement: HTMLElement = null!

  constructor(parameters: TweakerFolderParameters) {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, stylesheet]

    this.#key = parameters.key
    this.#mutationObserver = new MutationObserver(this.#mutationListener)

    element(this, {
      children: [
        div({
          class: 'wrapper',
          children: [
            div({
              class: 'head',
              onClick: (e) => {
                this.classList.toggle('opened')

                if (this.classList.contains('opened')) {
                  tweakerStorage.openPanel(this.#key)
                } else {
                  tweakerStorage.closePanel(this.#key)
                }
              },
              children: [
                this.#key
                  ? div({
                      class: 'name',
                      children: [this.#key.split('.').slice(-1).toString()],
                    })
                  : null,
                this.#head,
                element(arrowIcon, {
                  class: 'arrow',
                }),
              ],
            }),
            div({
              class: 'body',
              ref: (e) => {
                this.#bodyElement = e
              },
              children: div({
                class: 'body-content',
                children: this.#content,
                ref: (e) => {
                  this.#contentElement = e
                  this.#contentRootElement = e.firstElementChild as HTMLElement
                },
              }),
            }),
          ],
        }),
      ],
    })

    if (parameters?.storeBox) {
      this.handleStore(parameters.storeBox)
    }
  }

  public get key() {
    return this.#key
  }

  public get head() {
    return this.#head
  }

  public get content() {
    return this.#content
  }

  public get bodyElement() {
    return this.#bodyElement
  }

  public get contentElement() {
    return this.#contentElement
  }

  protected connectedCallback() {
    if (tweakerStorage.isPanelOpened(this.#key)) {
      this.classList.add('opened')
    }

    setTimeout(() => {
      this.classList.add('transition-allowed')
    })

    this.#mutationObserver.observe(this.#contentRootElement, {
      childList: true,
    })
  }

  protected handleStore(storeBox: StoreBox) {
    if (storeBox.remainingFolders.length) {
      const sname = storeBox.store.name!
      const splittedName = sname.split('.')
      const key = splittedName
        .slice(0, splittedName.length - storeBox.remainingFolders.length)
        .join('.')

      const found = this.#content.current.find((v) => v.key === key)

      if (found instanceof TweakerFolderElement) {
        found.handleStore({
          store: storeBox.store,
          remainingFolders: storeBox.remainingFolders.slice(1),
        })
      } else {
        this.#content.current = [
          ...this.#content.current,
          new TweakerFolderElement({
            key,
            storeBox: {
              store: storeBox.store,
              remainingFolders: storeBox.remainingFolders.slice(1),
            },
          }),
        ]
      }
    } else {
      const found = this.#content.current.find(
        (v) => v.key === storeBox.store.name,
      )

      if (found instanceof TweakerFieldElement) {
        found.addStore(storeBox.store)
      } else {
        this.#content.current = [
          ...this.#content.current,
          new TweakerFieldElement({
            store: storeBox.store,
          }),
        ]
      }
    }
  }

  #mutationListener: MutationCallback = (mutations) => {
    let removedNodes: Array<Node> = []
    let addedNodes: Array<Node> = []

    mutations.forEach((m) => {
      removedNodes = [...removedNodes, ...m.removedNodes]
      addedNodes = [...addedNodes, ...m.addedNodes]
    })

    this.#content.current = this.#content.current.filter(
      (v) => !removedNodes.includes(v),
    )

    if (this.#key && !this.#content.current.length && !addedNodes.length) {
      this.remove()
    }
  }
}

if (isBrowser && !customElements.get('e-tweaker-folder')) {
  customElements.define('e-tweaker-folder', TweakerFolderElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-folder': TweakerFolderElement
  }
}
