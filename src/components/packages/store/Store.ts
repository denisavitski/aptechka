import { storeRegistry } from './StoreRegistry'

export interface StoreState<StoreType> {
  current: StoreType
  previous: StoreType | undefined
  initial: StoreType
}

export type StoreCallback<StoreType> = (state: StoreState<StoreType>) => void

export type StoreEqualityCheckCallback<StoreType> = (
  currentValue: StoreType,
  newValue: StoreType
) => boolean

export interface StoreManager {
  type: string
  disabled?: boolean
  invisible?: boolean
}

export interface StoreStringManager extends StoreManager {
  type: 'string'
}

export interface StoreNumberManager extends StoreManager {
  type: 'number'
  min?: number
  max?: number
  step?: number
  ease?: number
}

export interface StoreColorManager extends StoreManager {
  type: 'color'
}

export interface StoreBooleanManager extends StoreManager {
  type: 'boolean'
}

export interface StoreLinkManager extends StoreManager {
  type: 'link'
  sameWindow?: boolean
}

export interface StoreSelectManager extends StoreManager {
  type: 'select'
  variants: Array<string>
}

export interface StoreManagers {
  select: StoreSelectManager
  link: StoreLinkManager
  boolean: StoreBooleanManager
  color: StoreColorManager
  number: StoreNumberManager
  string: StoreStringManager
}

export type StoreManagerType = keyof StoreManagers

export interface StorePassport<T extends StoreManagerType = StoreManagerType> {
  name: string
  description?: string
  manager?: StoreManagers[T]
}

export type StoreMiddleware<T> = (value: T) => T

export interface StoreOptions<
  StoreType,
  StoreManager extends StoreManagerType = StoreManagerType
> {
  equalityCheck?: StoreEqualityCheckCallback<StoreType>
  passport?: StorePassport<StoreManager> | undefined
  validate?: StoreMiddleware<StoreType>
  skipSubscribeNotification?: boolean
  notifyAndClose?: boolean
  invisible?: boolean
}

export class Store<
  StoreType = unknown,
  StoreManager extends StoreManagerType = StoreManagerType
> {
  #passport: StorePassport<StoreManager> | undefined

  #state: StoreState<StoreType>
  #equalityCheck: StoreEqualityCheckCallback<StoreType>
  #callbacks = new Set<StoreCallback<StoreType>>()
  #skipSubscribeNotification: boolean
  #middlewares: Set<StoreMiddleware<StoreType>> | undefined
  #notifyAndClose: boolean
  #invisible: boolean

  constructor(
    value: StoreType,
    options?: StoreOptions<StoreType, StoreManager>
  ) {
    this.#passport = options?.passport

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

    if (this.#passport) {
      storeRegistry.updateStore(this)
    }
  }

  public get passport() {
    return this.#passport
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

      this.#notify()

      if (this.#notifyAndClose) {
        this.close()
      }
    }
  }

  public get subscribers() {
    return this.#callbacks
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

  public subscribe(callback: StoreCallback<StoreType>) {
    if (!this.#invisible && !this.#callbacks.size) {
      shareStore(this)
    }

    this.#callbacks.add(callback)

    if (!this.#skipSubscribeNotification) {
      callback(this.#state)
    }

    return () => {
      this.unsubscribe(callback)
    }
  }

  public unsubscribe(callback: StoreCallback<StoreType>) {
    this.#callbacks.delete(callback)

    if (!this.#callbacks.size) {
      unshareStore(this)
    }
  }

  public reset() {
    this.current = Array.isArray(this.initial)
      ? [...this.initial]
      : (this.initial as any)
  }

  public close() {
    this.#callbacks.clear()

    unshareStore(this)
  }

  #notify() {
    for (const callback of this.#callbacks) {
      callback(this.#state)
    }
  }
}

export const activeStores = new Store<Array<Store<any, any>>>([], {
  invisible: true,
})

function shareStore(store: Store<any, any>) {
  if (!activeStores.current.includes(store)) {
    activeStores.current = [...activeStores.current, store]
  }
}

function unshareStore(store: Store<any, any>) {
  if (activeStores.current.includes(store)) {
    activeStores.current = activeStores.current.filter((s) => s !== store)

    console.log(activeStores.current)
  }
}
