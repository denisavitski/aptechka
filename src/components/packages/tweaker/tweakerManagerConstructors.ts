import { Store, StoreManagerType } from '@packages/store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { TweakerBooleanManagerElement } from './TweakerBooleanManagerElement'
import { TweakerColorManagerElement } from './TweakerColorManagerElement'
import { TweakerLinkManagerElement } from './TweakerLinkManagerElement'
import { TweakerNumberManagerElement } from './TweakerNumberManagerElement'
import { TweakerRangeManagerElement } from './TweakerRangeManagerElement'
import { TweakerSelectManagerElement } from './TweakerSelectManagerElement'
import { TweakerStringManagerElement } from './TweakerStringManagerElement'
import { TweakerNumbersManagerElement } from './TweakerNumbersManagerElement'

export const tweakerManagerConstructors: {
  [key in StoreManagerType]: typeof TweakerStoreManagerElement<
    Store<any, any, any>
  >
} = {
  boolean: TweakerBooleanManagerElement,
  color: TweakerColorManagerElement,
  link: TweakerLinkManagerElement,
  number: TweakerNumberManagerElement,
  range: TweakerRangeManagerElement,
  select: TweakerSelectManagerElement,
  string: TweakerStringManagerElement,
  numbers: TweakerNumbersManagerElement,
}
