import { isBrowser } from '@packages/utils'
import { Store, activeStores } from './Store'

export interface StoreRegistryStateStore {
  name: string
  value: any
}

export type StoreRegistryState = {
  stores: Array<StoreRegistryStateStore>
}

class StoreRegistry {
  public storage: Storage = null!
  public name = 'store-registry'

  #loadedState: StoreRegistryState | null = null

  constructor() {
    if (isBrowser) {
      this.storage = localStorage
    }
  }

  public get loadedState() {
    return this.#loadedState
  }

  public saveState() {
    const fullState = this.getState()
    const stringState = JSON.stringify(fullState)
    localStorage.setItem(this.name, stringState)
  }

  public loadState(
    state: string | StoreRegistryState | null = localStorage.getItem(this.name)
  ) {
    if (state) {
      if (typeof state === 'string') {
        this.#loadedState = JSON.parse(state) as StoreRegistryState
      } else {
        this.#loadedState = state
      }

      activeStores.current.forEach((store) => {
        if (store.name) {
          this.updateStore(store)
        }
      })
    }
  }

  public resetState() {
    activeStores.current.forEach((store) => {
      if (store.name) {
        store.reset()
      }
    })

    this.saveState()
  }

  public updateStore(store: Store<any>) {
    if (!Array.isArray(this.#loadedState?.stores)) {
      return store
    }

    if (store.name) {
      const match = this.#loadedState?.stores.find((s) => s.name === store.name)

      if (match) {
        store.current = match.value
      }
    }

    return store
  }

  public getState() {
    const state: StoreRegistryState = {
      stores: [],
    }

    activeStores.current.forEach((store) => {
      if (store.name) {
        if (!state.stores.find((s) => s.name === store.name)) {
          state.stores.push({
            value: store.current as any,
            name: store.name,
          })
        }
      }
    })

    return state
  }
}

export const storeRegistry = new StoreRegistry()
