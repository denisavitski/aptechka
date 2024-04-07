import { Axes2D } from '@packages/utils'
import { getAllParentElements } from '@packages/utils/dom'

export interface ScrollEntry {
  axis: Axes2D
  value: number
  element: HTMLElement
}

class ScrollEntries {
  #elements: Set<HTMLElement> = new Set()
  #entires: WeakMap<HTMLElement, ScrollEntry> = new WeakMap()

  public register(element: HTMLElement) {
    this.#entires.set(element, {
      axis: 'y',
      value: 0,
      element,
    })

    this.#elements.add(element)
  }

  public unregister(element: HTMLElement) {
    this.#entires.delete(element)
    this.#elements.delete(element)
  }

  public update(element: HTMLElement, axis: Axes2D, value: number) {
    const entry = this.#entires.get(element)!
    entry.axis = axis
    entry.value = value
  }

  public hasEntry(element: HTMLElement) {
    return this.#entires.has(element)
  }

  public getEntry(element: HTMLElement) {
    return this.#entires.get(element)!
  }

  public getAll(element: HTMLElement) {
    const elements = getAllParentElements(element).filter((parentElement) => {
      return this.#elements.has(parentElement)
    })

    const entries: Array<ScrollEntry> = []

    elements.forEach((element) => {
      if (this.#entires.has(element)) {
        entries.push(this.#entires.get(element)!)
      }
    })

    return entries
  }
}

export const scrollEntries = new ScrollEntries()
