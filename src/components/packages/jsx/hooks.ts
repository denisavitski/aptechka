import { windowResizer, WindowResizerCallback } from '@packages/window-resizer'
import {
  ComponentCustomElementConnectCallback,
  ComponentCustomElementCreateCallback,
  currentComponentElement,
} from './ComponentCustomElement'
import {
  elementResizer,
  ElementResizerCallback,
} from '@packages/element-resizer'
import {
  createStylesheet,
  ElementConstructorJSS,
  ElementConstructorRef,
  style,
} from '@packages/element-constructor'
import { ElementOrSelector } from '@packages/utils'
import { intersector, IntersectorCallback } from '@packages/intersector'
import { ticker, TickerAddOptions, TickerCallback } from '@packages/ticker'

type HookElementTarget = ElementOrSelector | ElementConstructorRef<any>

function getTargetElement(
  componentElement?: HTMLElement,
  element?: HookElementTarget
) {
  return element
    ? typeof element === 'string' || element instanceof Node
      ? element
      : element.current
    : componentElement
}

export function useConnect(callback: ComponentCustomElementConnectCallback) {
  currentComponentElement.connectCallbacks.add(callback)
}

export function useDisconnect(callback: ComponentCustomElementConnectCallback) {
  currentComponentElement.disconnectCallbacks.add(callback)
}

export function useCreate(callback: ComponentCustomElementCreateCallback) {
  currentComponentElement.createCallbacks.add(callback)
}

export function useWindowResize(
  callback: WindowResizerCallback,
  order?: number | undefined
) {
  useConnect(() => {
    return windowResizer.subscribe(callback, order)
  })
}

export function useElementResize(
  callback: ElementResizerCallback,
  element?: HookElementTarget
) {
  useConnect((e) => {
    return elementResizer.subscribe(getTargetElement(e, element), callback)
  })
}

export function useIntersection(
  callback: IntersectorCallback,
  element?: HookElementTarget
) {
  useConnect((e) => {
    return intersector.subscribe(getTargetElement(e, element), callback)
  })
}

export function useAnimationFrame(
  callback: TickerCallback,
  options?: Omit<TickerAddOptions, 'culling'> & {
    culling?: HookElementTarget | boolean
  }
) {
  useConnect((e) => {
    return ticker.subscribe(callback, {
      ...options,
      culling:
        typeof options?.culling === 'boolean'
          ? options?.culling
            ? e
            : undefined
          : getTargetElement(undefined, options?.culling),
    })
  })
}

export function useStylesheet(object?: ElementConstructorJSS | undefined) {
  useCreate((e) => {
    if (e.shadowRoot) {
      e.shadowRoot.adoptedStyleSheets.push(createStylesheet(object))
    }
  })

  useConnect((e) => {
    if (!e.shadowRoot) {
      const styleElement = style(object).rootElements[0]

      const styleTags = [...document.head.querySelectorAll('style')]

      if (!styleTags.find((s) => s.outerHTML === styleElement.outerHTML)) {
        document.head.appendChild(styleElement)

        return () => {
          styleElement.remove()
        }
      }
    }
  })
}
