import { TweakerBooleanManagerElement } from './TweakerBooleanManagerElement'
import { TweakerColorManagerElement } from './TweakerColorManagerElement'
import { TweakerLinkManagerElement } from './TweakerLinkManagerElement'
import { TweakerNumberManagerElement } from './TweakerNumberManagerElement'
import { TweakerSelectManagerElement } from './TweakerSelectManagerElement'
import { TweakerStringManagerElement } from './TweakerStringManagerElement'

export const tweakerManagerConstructors = {
  boolean: TweakerBooleanManagerElement,
  color: TweakerColorManagerElement,
  link: TweakerLinkManagerElement,
  number: TweakerNumberManagerElement,
  select: TweakerSelectManagerElement,
  string: TweakerStringManagerElement,
}
