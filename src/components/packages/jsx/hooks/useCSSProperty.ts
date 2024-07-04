import { CSSProperty, CSSPropertyOptions } from '@packages/css-property'
import { StoreManagerType } from '@packages/store'
import { _createStore } from './basic/_createStore'
import { ElementOrSelector } from '@packages/utils'
import { currentComponentElement } from '../globals'
import { onConnect } from './basic/onConnect'

export function useCSSProperty<
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
      cssProperty.unobserve()
    }
  })

  return cssProperty
}
