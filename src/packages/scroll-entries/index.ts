import { Axes2D } from '$packages/utils'

interface ScrollEntry {
  axis: Axes2D
  value: number
}

class ScrollEntries {
  #elements: Set<HTMLElement> = new Set()
  #entires: WeakMap<HTMLElement, ScrollEntry> = new WeakMap()

  public register(element: HTMLElement) {
    this.#entires.set(element, {
      axis: 'y',
      value: 0,
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

  public getClosest(element: HTMLElement): ScrollEntry | null {
    let parent = element.parentElement

    while (parent && !this.hasEntry(parent)) {
      parent = parent.parentElement
    }

    if (parent && parent !== element) {
      const entry = this.getEntry(parent)

      if (entry) {
        return entry
      } else {
        return this.getClosest(parent)
      }
    }

    return null
  }

  public getAll(element: HTMLElement) {
    const elements = Array.from(this.#elements).filter((v) => v !== element && v.contains(element))

    const entries: Array<ScrollEntry> = []

    elements.forEach((element) => {
      if (this.#entires.has(element)) {
        entries.push(this.#entires.get(element)!)
      }
    })

    return entries
  }
}

export const scrollEnties = new ScrollEntries()
