import { Store } from '@packages/store'
import { camelToKebab } from '@packages/utils'

export type ElementLinkedStoreValueType = boolean | string | number

export class ElementLinkedStore<
  T extends { [key in string]: ElementLinkedStoreValueType }
> extends Store<T> {
  #elements: Array<HTMLElement>

  constructor(element: HTMLElement | Array<HTMLElement>, value: T) {
    super(value)

    this.#elements = Array.isArray(element) ? element : [element]

    for (const key in this.initial) {
      this.set(key as Extract<keyof T, 'string'>, this.initial[key]!)
    }
  }

  public addElement(element: HTMLElement) {
    this.#elements.push(element)
  }

  public removeElement(element: HTMLElement) {
    this.#elements = this.#elements.filter((el) => el !== element)
  }

  public isTrue(key: keyof T) {
    return this.current[key] === true
  }

  public isFalse(key: keyof T) {
    return this.current[key] === false
  }

  public override reset() {
    super.reset()

    for (const key in this.initial) {
      this.set(key as Extract<keyof T, 'string'>, this.initial[key as keyof T]!)
    }
  }

  public set(key: keyof T, value: ElementLinkedStoreValueType) {
    const k = key as string

    this.current = { ...this.current, [key]: value }

    if (k.startsWith('--')) {
      if (value) {
        this.#elements.forEach((el) =>
          el.style.setProperty(k, value.toString())
        )
      } else {
        this.#elements.forEach((el) => el.style.removeProperty(k))
      }
    } else {
      if (value) {
        this.#elements.forEach((el) => el.classList.add(camelToKebab(k)))
      } else {
        this.#elements.forEach((el) => el.classList.remove(camelToKebab(k)))
      }
    }
  }
}
