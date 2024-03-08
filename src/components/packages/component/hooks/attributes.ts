import { Attribute } from '@packages/attribute'
import { onBeforeCreate, onDisconnect } from '../Component'

export function watchAttribute(name: string, defaultValue: any) {
  const attr = onBeforeCreate((e) => {
    return new Attribute(e, name, defaultValue)
  })

  onDisconnect(() => {
    attr.close()
  })

  return attr
}
