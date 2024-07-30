import { Attribute, AttributeOptions } from '@packages/attribute'
import { StoreManagerType } from '@packages/store'
import { _createStore } from './basic/_createStore'
import { ElementOrSelector } from '@packages/utils'
import { currentComponentElement } from '../globals'
import { onConnect } from './basic/onConnect'

export function watchAttribute<T extends string | number | boolean>(
  name: string,
  defaultValue: T,
  options?: AttributeOptions<T> & {
    elementOrSelector?: ElementOrSelector<HTMLElement>
  }
) {
  const attribute = new Attribute<T>(
    options?.elementOrSelector || currentComponentElement.value,
    name,
    defaultValue,
    options
  )

  onConnect(() => {
    attribute.observe()

    return () => {
      attribute.close()
    }
  })

  return attribute
}
