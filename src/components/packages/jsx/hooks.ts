import { windowResizer, WindowResizerCallback } from '@packages/window-resizer'
import {
  ComponentElementConnectCallback,
  ComponentElementCreateCallback,
  currentComponentElement,
} from './ComponentElement'
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
import { ElementOrSelector, isBrowser } from '@packages/utils'
import { intersector, IntersectorCallback } from '@packages/intersector'
import { ticker, TickerAddOptions, TickerCallback } from '@packages/ticker'
import {
  Composed,
  Derived,
  DerivedArray,
  Resource,
  Store,
  StoreEntry,
  StoreManagerType,
} from '@packages/store'

type HookElementTarget = ElementOrSelector | ElementConstructorRef<any>

function getTargetElement(
  componentElement?: HTMLElement,
  element?: HookElementTarget
) {
  return element
    ? typeof element === 'string' || element instanceof HTMLElement
      ? element
      : element.current
    : componentElement
}

export function useCreate(callback: ComponentElementCreateCallback) {
  currentComponentElement.createCallbacks.add(callback)
}

export function useConnect(callback: ComponentElementConnectCallback) {
  if (isBrowser) {
    currentComponentElement.connectCallbacks.add(callback)
  }
}

export function useDisconnect(callback: ComponentElementConnectCallback) {
  if (isBrowser) {
    currentComponentElement.disconnectCallbacks.add(callback)
  }
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

export function useStyle(object?: ElementConstructorJSS | undefined) {
  useCreate((e) => {
    if (e.shadowRoot) {
      e.shadowRoot.adoptedStyleSheets.push(createStylesheet(object))
    }
  })

  useConnect((e) => {
    if (!e.shadowRoot) {
      const styleElement = style(object).rootElements[0] as HTMLStyleElement

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

export function useStore<
  StoreType = unknown,
  StoreManager extends StoreManagerType = StoreManagerType,
  Entry extends StoreEntry<StoreType> = StoreEntry<StoreType>
>(
  ...parameters: ConstructorParameters<
    typeof Store<StoreType, StoreManager, Entry>
  >
) {
  const store = new Store<StoreType, StoreManager, Entry>(...parameters)

  currentComponentElement.stores.add(store)

  return store
}

export function useDerived<DerivedType, StoreType>(
  ...parameters: ConstructorParameters<typeof Derived<DerivedType, StoreType>>
) {
  const store = new Derived<DerivedType, StoreType>(...parameters)

  currentComponentElement.stores.add(store)

  return store
}

export function useDerivedArray<
  DerivedType,
  StoreType extends Array<any> = Array<any>
>(
  ...parameters: ConstructorParameters<
    typeof DerivedArray<DerivedType, StoreType>
  >
) {
  const store = new DerivedArray<DerivedType, StoreType>(...parameters)

  currentComponentElement.stores.add(store)

  return store
}

export function useResource<StoreType>(
  ...parameters: ConstructorParameters<typeof Resource<StoreType>>
) {
  const store = new Resource<StoreType>(...parameters)

  currentComponentElement.stores.add(store)

  return store
}

export function useComposed<StoreType>(
  ...parameters: ConstructorParameters<typeof Composed<StoreType>>
) {
  const store = new Composed<StoreType>(...parameters)

  currentComponentElement.stores.add(store)

  return store
}
