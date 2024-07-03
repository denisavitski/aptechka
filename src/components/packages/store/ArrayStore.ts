import { Store, StoreEntry, StoreManagerType, StoreOptions } from './Store'

export class ArrayStore<
  StoreType,
  StoreManager extends StoreManagerType = StoreManagerType,
  Entry extends StoreEntry<Array<StoreType>> = StoreEntry<Array<StoreType>>
> extends Store<Array<StoreType>, StoreManager, Entry> {
  constructor(
    value: Array<StoreType>,
    options?: StoreOptions<Array<StoreType>, StoreManager>
  ) {
    super(value, options)
  }

  public push(...values: Array<StoreType>) {
    this.current = [...this.current, ...values]
  }

  public add(...values: Array<StoreType>) {
    this.push(...values.filter((v) => !this.current.includes(v)))
  }

  public filter(...parameters: Parameters<Array<StoreType>['filter']>) {
    this.current = this.current.filter(...parameters)
  }

  public reduce(...parameters: Parameters<Array<StoreType>['reduce']>) {
    return this.current.reduce(...parameters)
  }

  public forEach(...parameters: Parameters<Array<StoreType>['forEach']>) {
    this.current.forEach(...parameters)
  }

  public every(...parameters: Parameters<Array<StoreType>['every']>) {
    return this.current.every(...parameters)
  }

  public find(...parameters: Parameters<Array<StoreType>['find']>) {
    return this.current.find(...parameters)
  }

  public includes(...parameters: Parameters<Array<StoreType>['includes']>) {
    return this.current.includes(...parameters)
  }

  public some(...parameters: Parameters<Array<StoreType>['some']>) {
    return this.current.some(...parameters)
  }

  public remove(value: StoreType) {
    this.current = this.current.filter((v) => v !== value)
  }

  public splice(...parameters: Parameters<Array<any>['slice']>) {
    this.current = this.current.slice(...parameters)
  }

  public pop() {
    const last = this.current[this.current.length - 1]

    if (last) {
      this.splice(0, -1)
    }

    return last
  }

  public shift() {
    const first = this.current[0]

    if (first) {
      this.splice(1)
    }

    return first
  }

  public unshift(...values: Array<StoreType>) {
    this.current = [...values, ...this.current]
  }

  public sort(...parameters: Parameters<Array<any>['sort']>) {
    const clone = [...this.current].sort(...parameters)

    this.current = clone
  }
}
