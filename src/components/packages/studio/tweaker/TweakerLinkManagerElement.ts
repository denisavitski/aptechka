import { Store } from '@packages/store'
import { define } from '@packages/custom-element'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { a, createStylesheet, element } from '@packages/element-constructor'

const stylesheet = createStylesheet({
  a: {
    color: 'inherit',
  },
})

@define('e-tweaker-link-manager')
export class TweakerLinkManagerElement extends TweakerStoreManagerElement<
  string,
  'link'
> {
  constructor(store: Store<string, 'link'>) {
    super(store)

    this.openShadow(stylesheet)

    element(this, {
      shadowChildren: [
        a({
          attributes: {
            href: this.store,
            target: this.store.passport?.manager?.sameWindow
              ? '_self'
              : '_blank',
          },
          children: this.store,
        }),
      ],
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-link-manager': TweakerLinkManagerElement
  }
}
