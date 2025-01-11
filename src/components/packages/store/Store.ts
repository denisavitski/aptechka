import { Notifier } from '@packages/notifier'
import { storeRegistry } from './StoreRegistry'

export interface StoreState<StoreType> {
  current: StoreType
  previous: StoreType | undefined
  initial: StoreType
}

export type StoreSubscribeCallback<StoreType> = (
  state: StoreState<StoreType>
) => void

export type StoreEqualityCheckCallback<StoreType> = (
  currentValue: StoreType,
  newValue: StoreType
) => boolean

export type StoreMiddleware<T> = (value: T) => T

export interface StoreOptions<StoreType> {
  name?: string
  __manager?: any
  equalityCheck?: StoreEqualityCheckCallback<StoreType>
  validate?: StoreMiddleware<StoreType>
  skipSubscribeNotification?: boolean
  notifyAndClose?: boolean
  invisible?: boolean
}

export class Store<StoreType = unknown> {
  #name: string | undefined
  // REMOVE
  __manager?: any
  #state: StoreState<StoreType>
  #equalityCheck: StoreEqualityCheckCallback<StoreType>
  #notifier = new Notifier<StoreSubscribeCallback<StoreType>>()
  #skipSubscribeNotification: boolean
  #middlewares: Set<StoreMiddleware<StoreType>> | undefined
  #notifyAndClose: boolean
  #invisible: boolean

  constructor(value: StoreType, options?: StoreOptions<StoreType>) {
    this.#name = options?.name

    this.__manager = options?.__manager

    this.#state = {
      initial: value,
      previous: undefined,
      current: value,
    }

    this.#equalityCheck =
      options?.equalityCheck ||
      ((currentValue, newValue) => currentValue === newValue)

    if (options?.validate) {
      this.addMiddleware(options.validate)
    }

    this.#notifyAndClose = options?.notifyAndClose || false
    this.#invisible = options?.invisible || false

    this.#skipSubscribeNotification =
      options?.skipSubscribeNotification || false

    if (this.#name) {
      storeRegistry.updateStore(this)
    }
  }

  public get name() {
    return this.#name
  }

  public get initial() {
    return this.#state.initial
  }

  public get previous() {
    return this.#state.previous
  }

  public get current() {
    return this.#state.current
  }

  public set current(value: StoreType) {
    if (!this.#equalityCheck(this.#state.current, value)) {
      this.#state.previous = this.#state.current

      if (this.#middlewares) {
        for (const middleware of this.#middlewares) {
          value = middleware(value)
        }
      }

      this.#state.current = value

      this.notify()

      if (this.#notifyAndClose) {
        this.close()
      }
    }
  }

  public get subscribers() {
    return this.#notifier.subscribers
  }

  public notify() {
    this.#notifier.notify(this.#state)
  }

  public addMiddleware(middleware: StoreMiddleware<StoreType>) {
    if (!this.#middlewares) {
      this.#middlewares = new Set()
    }

    this.#middlewares.add(middleware)
  }

  public removeMiddleware(middleware: StoreMiddleware<StoreType>) {
    this.#middlewares?.delete(middleware)

    if (!this.#middlewares?.size) {
      this.#middlewares = undefined
    }
  }

  public subscribe(
    callback: StoreSubscribeCallback<StoreType>,
    order?: number
  ) {
    if (!this.#invisible && !this.#notifier.size) {
      shareStore(this)
    }

    this.#notifier.subscribe(callback, order)

    if (!this.#skipSubscribeNotification) {
      callback(this.#state)
    }

    return () => {
      this.unsubscribe(callback)
    }
  }

  public unsubscribe(callback: StoreSubscribeCallback<StoreType>) {
    this.#notifier.unsubscribe(callback)

    if (!this.#notifier.size) {
      unshareStore(this)
    }
  }

  public reset() {
    this.current = Array.isArray(this.initial)
      ? [...this.initial]
      : (this.initial as any)
  }

  public close() {
    this.#notifier.close()

    this.#state.previous = undefined
    this.#state.current = this.#state.initial

    unshareStore(this)
  }
}

export const activeStores = new Store<Array<Store<any>>>([], {
  invisible: true,
})

function shareStore(store: Store<any>) {
  if (!activeStores.current.includes(store)) {
    activeStores.current = [...activeStores.current, store]
  }
}

function unshareStore(store: Store<any>) {
  if (activeStores.current.includes(store)) {
    activeStores.current = activeStores.current.filter((s) => s !== store)
  }
}
