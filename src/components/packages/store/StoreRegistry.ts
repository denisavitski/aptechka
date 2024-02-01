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
  #loadedState: StoreRegistryState | null = null
  #projectName: string | undefined
  #localStoreRegistryName = ''

  constructor() {
    if (isBrowser) {
      this.#projectName =
        document.documentElement.getAttribute('data-project') || undefined
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
        this.updateStore(store)
      })
    }
  }

  public resetState() {
    activeStores.current.forEach((store) => {
      store.reset()
    })

    this.saveState()
  }

  public updateStore(store: Store<any, any, any>) {
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
        state.stores.push({
          value: store.current as any,
          name: store.passport.name,
        })
      }
    })

    return state
  }
}

export const storeRegistry = new StoreRegistry()
