import { _createStore } from '@packages/jsx/hooks'
import { Attribute, AttributeOptions } from '..'

export function createAttribute<T extends number | string | boolean>(
  name: string,
  defaultValue: T,
  options?: AttributeOptions<T>
) {
  return _createStore((e) => {
    if (!e) {
      throw new Error('[createAttribute]: no active component')
    }

    return new Attribute(e, name, defaultValue, options)
  })
}
