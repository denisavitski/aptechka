import { CSSProperty, CSSPropertyOptions } from '@packages/css-property'
import { StoreSubscribeCallback } from '@packages/store'
import { activeComponent } from '../ComponentElement'
import { useConnect } from './component/lifecycle'

export interface UseCSSPropertyOptions<
  StoreType extends number | boolean | string,
> extends CSSPropertyOptions<StoreType> {
  callback?: StoreSubscribeCallback<StoreType>
}

export function useCSSProperty<StoreType extends number | boolean | string>(
  property: string,
  defaultValue: StoreType,
  options?: UseCSSPropertyOptions<StoreType>,
) {
  if (activeComponent.current) {
    const cssProperty = new CSSProperty(
      activeComponent.current,
      property,
      defaultValue,
      options,
    )

    useConnect(() => {
      if (options?.callback) {
        cssProperty.subscribe(options.callback)
      }

      cssProperty.observe()

      return () => {
        cssProperty.close()
      }
    })

    return cssProperty
  }
}
