import { Store } from '@packages/store'

export type ElementLinkedStoreValueType = boolean | string | number

export class ElementLinkedStore<
  T extends { [key in string]: ElementLinkedStoreValueType },
> extends Store<T> {
  #elements: Array<HTMLElement>

  constructor(element: HTMLElement | Array<HTMLElement>, value: T) {
    super(value)

    this.#elements = Array.isArray(element) ? element : [element]

    for (const key in this.initial) {
      this.setKey(key as Extract<keyof T, 'string'>, this.initial[key]!)
    }
  }

  public addElement(element: HTMLElement) {
    this.#elements.push(element)

    for (const key in this.current) {
      this.#updateElements([element], key, this.current[key])
    }
  }

  public removeElement(element: HTMLElement) {
    const founded = this.#elements.find((el) => el === element)

    if (founded) {
      this.#elements = this.#elements.filter((el) => el !== element)

      for (const key in this.current) {
        this.#updateElements([founded], key, false)
      }
    }
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
      this.setKey(
        key as Extract<keyof T, 'string'>,
        this.initial[key as keyof T]!,
      )
    }
  }

  public setKey(key: keyof T, value: ElementLinkedStoreValueType) {
    const k = key as string

    this.current = { ...this.current, [key]: value }

    if (k.startsWith('--')) {
      if (value) {
        this.#elements.forEach((el) =>
          el.style.setProperty(k, value.toString()),
        )
      } else {
        this.#elements.forEach((el) => el.style.removeProperty(k))
      }
    } else {
      if (value) {
        this.#elements.forEach((el) => el.classList.add(k))
      } else {
        this.#elements.forEach((el) => el.classList.remove(k))
      }
    }
  }

  #updateElements(elements: Array<HTMLElement>, key: string, value: any) {
    if (key.startsWith('--')) {
      if (value) {
        elements.forEach((el) => el.style.setProperty(key, value.toString()))
      } else {
        elements.forEach((el) => el.style.removeProperty(key))
      }
    } else {
      if (value) {
        elements.forEach((el) => el.classList.add(key))
      } else {
        elements.forEach((el) => el.classList.remove(key))
      }
    }
  }
}
