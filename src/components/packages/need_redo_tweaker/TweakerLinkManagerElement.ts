import { Store } from '@packages/store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { a, createStylesheet, element } from './element-constructor'
import { isBrowser } from '@packages/utils'

const stylesheet = createStylesheet({
  a: {
    color: 'inherit',
    fontSize: 'var(--font-size-small)',
  },
})

export class TweakerLinkManagerElement extends TweakerStoreManagerElement<
  Store<string>
> {
  constructor(...stores: Array<Store<string>>) {
    super(...stores)

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, stylesheet]

    element(this, {
      children: [
        a({
          href: this.firstStore,
          target: this.firstStore.__manager?.sameWindow ? '_self' : '_blank',
          children: this.firstStore,
        }),
      ],
    })
  }
}

if (isBrowser && !customElements.get('e-tweaker-link-manager')) {
  customElements.define('e-tweaker-link-manager', TweakerLinkManagerElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-link-manager': TweakerLinkManagerElement
  }
}
