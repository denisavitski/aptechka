import { ElementConstructorRef } from '@packages/element-constructor'
import { ElementOrSelector } from '@packages/utils'

export type HookElementTarget = ElementOrSelector | ElementConstructorRef<any>

export function getTargetElement(
  componentElement?: HTMLElement,
  element?: HookElementTarget
) {
  return element
    ? typeof element === 'string' || element instanceof HTMLElement
      ? element
      : element.current
    : componentElement
}
