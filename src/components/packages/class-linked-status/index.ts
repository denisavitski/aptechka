import { camelToKebab } from '@packages/utils'

export class ClassLinkedStatus<T extends { [key in string]: boolean }> {
  #element: HTMLElement
  #value: T
  #initial: T

  constructor(element: HTMLElement, value: T) {
    this.#element = element
    this.#value = value
    this.#initial = { ...value }
  }

  public isTrue(key: keyof T) {
    return this.#value[key] === true
  }

  public isFalse(key: keyof T) {
    return this.#value[key] === false
  }

  public reset() {
    for (const key in this.#initial) {
      this.set(
        key as Extract<keyof T, 'string'>,
        this.#initial[key as keyof T]!
      )
    }
  }

  public set(key: keyof T, value = true) {
    ;(this.#value as any)[key] = value

    if (value) {
      this.#element.classList.add(camelToKebab(key as string))
    } else {
      this.#element.classList.remove(camelToKebab(key as string))
    }
  }
}
