import { Derived } from '@packages/store'
import { _createStore } from '../basic/_createStore'

export function createDerivedComponent<DerivedType, StoreType>(
  ...parameters: ConstructorParameters<typeof Derived<DerivedType, StoreType>>
) {
  const [store, callback, options] = parameters

  return _createStore(
    new Derived(store, (v) => (() => callback(v)) as any, options)
  )
}
