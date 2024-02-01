import { define } from '@packages/custom-element'
import {
  ElementConstructorChildren,
  div,
  element,
  stylesheet,
} from '@packages/element-constructor'

import { vars } from '../shared'
import { AccordionElement } from '@packages/accordion'
import { Store, StoreEntry, activeStores } from '@packages/store'
import { Animated } from '@packages/animation'
import { TweakerFieldElement } from './TweakerFieldElement'

const style = stylesheet({
  '.wrapper': {
    boxSizing: 'border-box',
    backgroundColor: `rgba(255, 255, 255, 0.1)`,
    borderRadius: vars.sizeBorderRadius.var,
  },

  '.head': {
    width: '100%',
    height: '40px',
    backgroundColor: vars.colorDarkAux.var,
    borderRadius: vars.sizeBorderRadius.var,
  },

  '.body': {
    transitionProperty: 'height',
    transitionDuration: vars.durationShort.var,
    overflow: 'hidden',
    height: '0px',
  },

  '.body-content': {
    boxSizing: 'border-box',
    padding: vars.sizePaddingLarge.var,
    display: 'grid',
    gap: vars.sizePaddingLarge.var,
  },
})

export interface TweakerFolderParameters {
  key: string
  name?: string
}

@define('e-tweaker-folder')
export class TweakerFolderElement extends AccordionElement {
  #key: string
  #name: string
  #head = new Store<ElementConstructorChildren | null>(null)
  #content = new Store<Array<TweakerFolderElement | TweakerFieldElement>>([])

  constructor(parameters?: TweakerFolderParameters) {
    super()

    this.#key = parameters?.key || this.getAttribute('key') || 'unnamed'

    this.#name =
      parameters?.name || this.getAttribute('name') || this.#key || 'unnamed'

    this.attachShadow({ mode: 'open' }).adoptedStyleSheets.push(style)

    element(this, {
      shadowChildren: [
        div({
          class: 'wrapper',
          children: [
            div({
              class: 'head',
              children: [this.#head],
            }),
            div({
              class: 'body',
              children: [
                div({ class: 'body-content', children: [this.#content] }),
              ],
            }),
          ],
        }),
      ],
    })
  }

  public get name() {
    return this.#name
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
    activeStores.subscribe(this.#storesChangeListener)
  }

  protected override disconnectedCallback() {
    super.disconnectedCallback()
    activeStores.unsubscribe(this.#storesChangeListener)
  }

  // TODO
  #storesChangeListener = (e: StoreEntry<Store<any, any>[]>) => {
    e.current.forEach((store) => {
      if (!(store instanceof Animated)) {
      }
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-folder': TweakerFolderElement
  }
}
