import { onConnect } from '@packages/jsx/hooks'
import { ElementResizerCallback, elementResizer } from '..'
import { ElementOrSelector } from '@packages/utils'

export function onElementResize(
  elementOrSelector: ElementOrSelector,
  callback: ElementResizerCallback
): void
export function onElementResize(callback: ElementResizerCallback): void
export function onElementResize(...args: any[]): void {
  onConnect((e) => {
    const element = args.length > 1 ? args[0] : e
    const callback = args.length > 1 ? args[1] : args[0]

    return elementResizer.subscribe(element, callback)
  })
}
