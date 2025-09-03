export * from './type'

export {
  type ComponentConnectCallback,
  type ComponentDisconnectCallback,
} from './ComponentElement'
export { Fragment, h, indexMap } from './h'
export { useRef } from './hooks/common'
export { useConnect, useDisconnect } from './hooks/component/lifecycle'
export {
  useInternals,
  type UseInternalsCallback,
} from './hooks/component/useInternals'
export { useShadow, type UseShadowCallback } from './hooks/component/useShadow'
export {
  useStylesheet,
  type UseStylesheetNestedObject,
  type UseStylesheetSource,
} from './hooks/component/useStylesheet'
export {
  useComposedStore,
  useDerivedArrayStore,
  useDerivedKeyedArrayStore,
  useDerivedStore,
  useResourceStore,
  useStore,
} from './hooks/store'
export { hydrate } from './hydrate'
export { render } from './render'

export { aptechkaVite } from './plugins/vite'
