import { Store } from '@packages/client/store'
import { camelToKebab } from '@packages/client/utils'

export class ClassLinkedStatus<
  T extends { [key in string]: boolean }
> extends Store<T> {
  #element: HTMLElement

  constructor(element: HTMLElement, value: T) {
    super(value)

    this.#element = element
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
      this.#element.classList.add(camelToKebab(key as string))
    } else {
      this.#element.classList.remove(camelToKebab(key as string))
    }
  }
}
