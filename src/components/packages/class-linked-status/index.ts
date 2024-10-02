import { Store } from '@packages/store/vanilla'
import { camelToKebab } from '@packages/utils'

export class ClassLinkedStatus<
  T extends { [key in string]: boolean }
> extends Store<T> {
  #elements: Array<HTMLElement>

  constructor(element: HTMLElement | Array<HTMLElement>, value: T) {
    super(value)

    this.#elements = Array.isArray(element) ? element : [element]
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

  public set(key: keyof T, value = true) {
    this.current = { ...this.current, [key]: value }

    if (value) {
      this.#elements.forEach((el) =>
        el.classList.add(camelToKebab(key as string))
      )
    } else {
      this.#elements.forEach((el) =>
        el.classList.remove(camelToKebab(key as string))
      )
    }
  }
}
