import { Store, StoreManagerType } from '@packages/store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { TweakerBooleanManagerElement } from './TweakerBooleanManagerElement'
import { TweakerColorManagerElement } from './TweakerColorManagerElement'
import { TweakerLinkManagerElement } from './TweakerLinkManagerElement'
import { TweakerNumberManagerElement } from './TweakerNumberManagerElement'
import { TweakerSelectManagerElement } from './TweakerSelectManagerElement'
import { TweakerStringManagerElement } from './TweakerStringManagerElement'

export const tweakerManagerConstructors: {
  [key in StoreManagerType]: typeof TweakerStoreManagerElement<Store<any, any>>
} = {
  boolean: TweakerBooleanManagerElement,
  color: TweakerColorManagerElement,
  link: TweakerLinkManagerElement,
  number: TweakerNumberManagerElement,
  select: TweakerSelectManagerElement,
  string: TweakerStringManagerElement,
}
