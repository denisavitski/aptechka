import { define } from '@packages/custom-element'
import { div, element, createStylesheet } from '@packages/element-constructor'
import { AccordionElement } from '@packages/accordion'
import { Store } from '@packages/store'

import arrowIcon from '@assets/icons/arrow.svg?raw'

import { studioStorage } from '../studioStorage'

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
    height: aptechkaTheme.tweakerFolderHeight.var,

    paddingLeft: aptechkaTheme.gapMedium.var,
    paddingRight: aptechkaTheme.gapMedium.var,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: aptechkaTheme.colorDarkAux.var,
    borderRadius: aptechkaTheme.borderRadius.var,
  },

  '.name': {
    fontSize: aptechkaTheme.fontSizeLarge.var,
    color: aptechkaTheme.colorLight.var,
  },

  '.body': {
    transitionProperty: 'height',
    transitionDuration: aptechkaTheme.durationShort.var,
    overflow: 'hidden',
    height: '0px',
  },

  '.body-content': {
    boxSizing: 'border-box',
    padding: aptechkaTheme.gapLarge.var,

    display: 'grid',
    gap: aptechkaTheme.gapMedium.var,
  },

  '.arrow': {
    width: '20px',
    height: '20px',
    fill: aptechkaTheme.colorLight.var,
    transition: `transform ${aptechkaTheme.durationShort.var}`,
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
  #contentWrapperElement: HTMLElement = null!

  constructor(parameters: TweakerFolderParameters) {
    super()

    this.openShadow(stylesheet)

    this.#key = parameters.key
    this.#mutationObserver = new MutationObserver(this.#mutationListener)

    element(this, {
      onAccordionItemToggle: (e) => {
        e.stopPropagation()

        if (e.detail.opened) {
          studioStorage.openPanel(this.#key)
        } else {
          studioStorage.closePanel(this.#key)
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
              children: div({
                class: 'body-content',
                children: this.#content,
                ref: (e) =>
                  (this.#contentWrapperElement =
                    e.firstElementChild as HTMLElement),
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

  protected override connectedCallback() {
    super.connectedCallback()

    setTimeout(() => {
      if (studioStorage.isPanelOpened(this.#key)) {
        this.openAll({ skipTransition: true })
      }
    }, 50)

    this.#mutationObserver.observe(this.#contentWrapperElement, {
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
