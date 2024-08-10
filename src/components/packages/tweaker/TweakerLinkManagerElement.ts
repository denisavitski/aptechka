import { Store } from '@packages/store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { a, createStylesheet, element } from '@packages/element-constructor'

const stylesheet = createStylesheet({
  a: {
    color: 'inherit',
    fontSize: 'var(--font-size-small)',
  },
})

export class TweakerLinkManagerElement extends TweakerStoreManagerElement<
  Store<string, 'link'>
> {
  constructor(...stores: Array<Store<string, 'link'>>) {
    super(...stores)

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.adoptedStyleSheets.push(stylesheet)

    console.log(this.firstStore)

    element(this, {
      children: [
        a({
          href: this.firstStore,
          target: this.firstStore.passport?.manager?.sameWindow
            ? '_self'
            : '_blank',
          children: this.firstStore,
        }),
      ],
    })
  }
}

if (!customElements.get('e-tweaker-link-manager')) {
  customElements.define('e-tweaker-link-manager', TweakerLinkManagerElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-link-manager': TweakerLinkManagerElement
  }
}
