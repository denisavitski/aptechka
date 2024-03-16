import { useConnect } from '@packages/jsx/hooks'
import { ElementResizerCallback, elementResizer } from '..'
import { ElementOrSelector } from '@packages/utils'

export function useElementResize(
  elementOrSelector: ElementOrSelector,
  callback: ElementResizerCallback
): void
export function useElementResize(
  elementOrSelector: ElementOrSelector,
  callback: ElementResizerCallback
): void
export function useElementResize(...args: any[]): void {
  useConnect((e) => {
    const element = args.length > 1 ? args[0] : e
    const callback = args.length > 1 ? args[1] : args[0]

    return elementResizer.subscribe(element, callback)
  })
}
