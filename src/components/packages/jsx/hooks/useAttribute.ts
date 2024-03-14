import { Attribute, AttributeOptions } from '@packages/attribute'
import { useCreate } from './useCreate'
import { useDisconnect } from './useDisconnect'

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
