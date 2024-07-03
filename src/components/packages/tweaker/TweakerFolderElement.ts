import { define } from '@packages/custom-element'
import { div, element, createStylesheet } from '@packages/element-constructor'
import { AccordionElement } from '@packages/accordion'
import { Store } from '@packages/store'

import arrowIcon from '@assets/icons/arrow.svg?raw'

import { tweakerStorage } from './tweakerStorage'

import { TweakerFieldElement } from './TweakerFieldElement'
import { StoreBox } from './TweakerElement'
import { aptechkaTheme } from '@packages/theme'

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
    transitionProperty: 'height',
    transitionDuration: 'var(--duration-short)',
    overflow: 'hidden',
    height: '0px',
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
    transition: `transform ${'var(--duration-short)'}`,
  },

  '.opened .arrow': {
    transform: 'scaleY(-1)',
  },
})

export interface TweakerFolderParameters {
  key: string
  storeBox?: StoreBox
}

@define('e-tweaker-folder')
export class TweakerFolderElement extends AccordionElement {
  #key: string
  #head = new Store<any>(null)
  #content = new Store<Array<TweakerFolderElement | TweakerFieldElement>>([])
  #mutationObserver: MutationObserver
  #bodyElement: HTMLElement = null!
  #contentElement: HTMLElement = null!

  constructor(parameters: TweakerFolderParameters) {
    super()

    this.openShadow(stylesheet)

    this.#key = parameters.key
    this.#mutationObserver = new MutationObserver(this.#mutationListener)

    element(this, {
      onAccordionItemToggle: (e) => {
        e.stopPropagation()

        if (e.detail.opened) {
          tweakerStorage.openPanel(this.#key)
        } else {
          tweakerStorage.closePanel(this.#key)
        }
      },
      children: [
        div({
          class: 'wrapper',
          children: [
            div({
              class: 'head',
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
                  this.#contentElement = e.firstElementChild as HTMLElement
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

  protected override connectedCallback() {
    super.connectedCallback()

    setTimeout(() => {
      if (tweakerStorage.isPanelOpened(this.#key)) {
        this.openAll({ skipTransition: true })
      }
    }, 50)

    this.#mutationObserver.observe(this.#contentElement, {
      childList: true,
    })
  }

  protected handleStore(storeBox: StoreBox) {
    if (storeBox.remainingFolders.length) {
      const sname = storeBox.store.passport!.name
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
        (v) => v.key === storeBox.store.passport!.name
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
      (v) => !removedNodes.includes(v)
    )

    if (this.#key && !this.#content.current.length && !addedNodes.length) {
      this.remove()
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-folder': TweakerFolderElement
  }
}
