import { SelectElement } from './SelectElement'

export class SelectUserElement extends HTMLElement {
  #selectElement: SelectElement = null!

  public get selectElement() {
    return this.#selectElement
  }

  protected connectedCallback() {
    const selectElement = (this.assignedSlot?.getRootNode() as ShadowRoot)
      ?.host as SelectElement

    if (selectElement) {
      this.#selectElement = selectElement
    } else {
      console.log(this, 'e-select not found')
    }
  }
}
