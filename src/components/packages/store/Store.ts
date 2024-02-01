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
export type StoreValidateCallback<StoreType> = (value: StoreType) => StoreType

export interface StoreManager {
  type: string
  disabled?: boolean
}

export interface StoreStringManager extends StoreManager {
  type: 'string'
}

export interface StoreNumberManager extends StoreManager {
  type: 'number'
  min?: number
  max?: number
  step?: number
}

export interface StoreRangeManager extends StoreManager {
  type: 'range'
  min?: number
  max?: number
  step?: number
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
  range: StoreRangeManager
  number: StoreNumberManager
  string: StoreStringManager
}

export type StoreManagerType = keyof StoreManagers

export interface StorePassport<T extends StoreManagerType = StoreManagerType> {
  name: string
  description?: string
  manager?: StoreManagers[T]
}

export interface StoreOptions<
  StoreType,
  StoreManager extends StoreManagerType = StoreManagerType
> {
  equalityCheck?: StoreEqualityCheckCallback<StoreType>
  passport?: StorePassport<StoreManager>
  validate?: StoreValidateCallback<StoreType>
  skipSubscribeNotification?: boolean
}

export class Store<
  StoreType = unknown,
  StoreManager extends StoreManagerType = StoreManagerType,
  Entry extends StoreEntry<StoreType> = StoreEntry<StoreType>
> {
  #passport: StorePassport | undefined
  #initial: StoreType
  #previous: StoreType | undefined
  #current: StoreType
  #equalityCheck: StoreEqualityCheckCallback<StoreType>
  #callbacks = new Set<StoreCallback<Entry>>()
  #validate: StoreValidateCallback<StoreType>
  #skipSubscribeNotification: boolean

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

    this.#validate = options?.validate || ((value) => value)

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
      this.#current = this.#validate(value)
      this.#notify()
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

  public subscribe(callback: StoreCallback<Entry>) {
    if (this.#passport && !this.#callbacks.size) {
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

    if (this.#passport && !this.#callbacks.size) {
      unshareStore(this)
    }
  }

  public reset() {
    this.current = this.initial
  }

  public close() {
    this.#callbacks.clear()

    if (this.#passport) {
      unshareStore(this)
    }
  }

  #notify() {
    for (const callback of this.#callbacks) {
      callback(this.entry)
    }
  }
}

export const activeStores = new Store<Array<Store<any, any, any>>>([])

function shareStore(store: Store<any, any, any>) {
  if (
    !activeStores.current.find((s) => s.passport!.name === store.passport!.name)
  ) {
    activeStores.current = [...activeStores.current, store]
  }
}

function unshareStore(store: Store<any, any, any>) {
  if (activeStores.current.includes(store)) {
    activeStores.current = activeStores.current.filter((s) => s !== store)
  }
}
