import { CustomElement, define } from '@packages/custom-element'
import { Attribute } from '@packages/attribute'

@define('e-accordion')
export class AccordionElement extends CustomElement {
  #axisAttribute = new Attribute(this, 'axis', 'y')
  #multipleAttribute = new Attribute(this, 'multiple', false)

  constructor() {
    super()

    this.#axisAttribute.subscribe((e) => {
      console.log(e)
    })
  }

  public get axisAttribute() {
    return this.#axisAttribute
  }

  public get multipleAttribute() {
    return this.#multipleAttribute
  }

  protected connectedCallback() {}

  protected disconnectedCallback() {}
}
