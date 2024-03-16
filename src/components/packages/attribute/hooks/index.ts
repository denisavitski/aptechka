import { useCreate, useDisconnect } from '@packages/jsx/hooks'
import { Attribute, AttributeOptions } from '..'

export function useAttribute<T extends number | string | boolean>(
  name: string,
  defaultValue: T,
  options?: AttributeOptions<T>
) {
  const attribute = useCreate((e) => {
    return new Attribute(e, name, defaultValue, options)
  })

  useDisconnect(() => attribute.close())

  return attribute
}
