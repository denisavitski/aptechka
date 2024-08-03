import { CSSProperty, CSSPropertyOptions } from '@packages/client/css-property'
import { StoreManagerType } from '@packages/client/store'
import { _createStore } from './basic/_createStore'
import { ElementOrSelector } from '@packages/client/utils'
import { currentComponentElement } from '../globals'
import { onConnect } from './basic/onConnect'

export function watchCSSProperty<
  StoreType extends number | boolean | string,
  StoreManager extends StoreManagerType = StoreManagerType
>(
  property: string,
  defaultValue: StoreType,
  options?: CSSPropertyOptions<StoreType, StoreManager> & {
    elementOrSelector?: ElementOrSelector<HTMLElement>
  }
) {
  const cssProperty = new CSSProperty<StoreType, StoreManager>(
    options?.elementOrSelector || currentComponentElement.value,
    property,
    defaultValue,
    options
  )

  onConnect(() => {
    cssProperty.observe()

    return () => {
      cssProperty.close()
    }
  })

  return cssProperty
}
