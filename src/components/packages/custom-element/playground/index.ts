import { ScrollElement } from '@packages/scroll'
import { CustomElement } from '../CustomElement'
import '@packages/scroll'

class MyElement extends CustomElement {
  static observedAttributes = ['size']

  private x: HTMLElement | null = null

  constructor() {
    super()

    this.dependsOn('e-scroll')

    this.onConnect(() => {
      console.log('connect')
    })

    this.onDisconnect(() => {})

    this.onAttributeChange((e) => {
      console.log(e)
    })
  }
}

if (!customElements.get('my-element')) {
  customElements.define('my-element', MyElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}

const el = document.querySelector('my-element')!

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    document.body.appendChild(el)
  } else if (e.key === '2') {
    el.remove()
  }
})
