import {
  ElementConstructorJSS,
  createStylesheet,
  style,
} from '@packages/element-constructor'
import { onBeforeCreate, onConnect } from '../Component'

export function attachStyle(object?: ElementConstructorJSS | undefined) {
  onBeforeCreate((e) => {
    if (e.shadowRoot) {
      e.shadowRoot.adoptedStyleSheets.push(createStylesheet(object))
    }
  })

  onConnect(() => {
    const styleElement = style(object).node

    const styleTags = [...document.head.querySelectorAll('style')]

    if (!styleTags.find((s) => s.outerHTML === styleElement.outerHTML)) {
      document.head.appendChild(styleElement)

      return () => {
        styleElement.remove()
      }
    }
  })
}
