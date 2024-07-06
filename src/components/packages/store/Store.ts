import { storeRegistry } from './StoreRegistry'

export interface StoreEntry<StoreType> {
  current: StoreType
  previous: StoreType | undefined
}

export type StoreCallback<Entry extends StoreEntry<any>> = (
  entry: Entry
) => void

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
  StoreManager extends StoreManagerType = StoreManagerType,
  Entry extends StoreEntry<StoreType> = StoreEntry<StoreType>
> {
  #passport: StorePassport<StoreManager> | undefined
  #initial: StoreType
  #previous: StoreType | undefined
  #current: StoreType
  #equalityCheck: StoreEqualityCheckCallback<StoreType>
  #callbacks = new Set<StoreCallback<Entry>>()
  #skipSubscribeNotification: boolean
  #middlewares: Set<StoreMiddleware<StoreType>> | undefined
  #notifyAndClose: boolean
  #invisible: boolean

  constructor(
    value: StoreType,
    options?: StoreOptions<StoreType, StoreManager>
  ) {
    this.#passport = options?.passport
    this.#initial = value
    this.#previous = undefined

    this.#current = value

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
    return this.#initial
  }

  public get previous() {
    return this.#previous
  }

  public get current() {
    return this.#current
  }

  public set current(value: StoreType) {
    if (!this.#equalityCheck(this.#current, value)) {
      this.#previous = this.#current

      if (this.#middlewares) {
        for (const middleware of this.#middlewares) {
          value = middleware(value)
        }
      }

      this.#current = value
      this.#notify()

      if (this.#notifyAndClose) {
        this.close()
      }
    }
  }

  public get subscribers() {
    return this.#callbacks
  }

  public get entry() {
    return {
      current: this.#current,
      previous: this.#previous,
    } as Entry
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

  public subscribe(callback: StoreCallback<Entry>) {
    if (!this.#invisible && !this.#callbacks.size) {
      shareStore(this)
    }

    this.#callbacks.add(callback)

    if (!this.#skipSubscribeNotification) {
      callback(this.entry)
    }

    return () => {
      this.unsubscribe(callback)
    }
  }

  public unsubscribe(callback: StoreCallback<Entry>) {
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
      callback(this.entry)
    }
  }
}

export const activeStores = new Store<Array<Store<any, any, any>>>([], {
  invisible: true,
})

function shareStore(store: Store<any, any, any>) {
  if (!activeStores.current.includes(store)) {
    activeStores.current = [...activeStores.current, store]
  }
}

function unshareStore(store: Store<any, any, any>) {
  if (activeStores.current.includes(store)) {
    activeStores.current = activeStores.current.filter((s) => s !== store)
  }
}
