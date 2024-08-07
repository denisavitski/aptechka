import { isBrowser } from '@packages/client/utils'
import { Store, activeStores } from './Store'

export interface StoreRegistryStateStore {
  name: string
  value: any
}

export type StoreRegistryState = {
  stores: Array<StoreRegistryStateStore>
}

class StoreRegistry {
  #loadedState: StoreRegistryState | null = null
  #projectName: string = ''
  #localStoreRegistryName = ''

  constructor() {
    if (isBrowser) {
      this.#projectName =
        document.documentElement.getAttribute('data-project') || 'unnamed'
      this.#localStoreRegistryName = this.#projectName
        ? this.#projectName + '-store-registry'
        : 'store-registry'
    }
  }

  public get projectName() {
    return this.#projectName
  }

  public get localStoreRegistryName() {
    return this.#localStoreRegistryName
  }

  public get loadedState() {
    return this.#loadedState
  }

  public saveState() {
    const fullState = this.getState()
    const stringState = JSON.stringify(fullState)
    localStorage.setItem(this.#localStoreRegistryName, stringState)
  }

  public loadState(
    state: string | StoreRegistryState | null = localStorage.getItem(
      this.#localStoreRegistryName
    )
  ) {
    if (state) {
      if (typeof state === 'string') {
        this.#loadedState = JSON.parse(state) as StoreRegistryState
      } else {
        this.#loadedState = state
      }

      activeStores.current.forEach((store) => {
        if (store.passport) {
          this.updateStore(store)
        }
      })
    }
  }

  public resetState() {
    activeStores.current.forEach((store) => {
      if (store.passport) {
        store.reset()
      }
    })

    this.saveState()
  }

  public updateStore(store: Store<any, any>) {
    if (!Array.isArray(this.#loadedState?.stores)) {
      return store
    }

    const passport = store.passport

    if (passport) {
      const match = this.#loadedState?.stores.find(
        (s) => s.name === passport.name
      )

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
      if (store.passport) {
        if (!state.stores.find((s) => s.name === store.passport!.name)) {
          state.stores.push({
            value: store.current as any,
            name: store.passport.name,
          })
        }
      }
    })

    return state
  }
}

export const storeRegistry = new StoreRegistry()
