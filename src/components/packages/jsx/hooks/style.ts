import {
  ElementConstructorJSS,
  createStylesheet,
  style,
} from '@packages/element-constructor'
import { useCreate, useConnect } from './basic'

export function useStyle(object?: ElementConstructorJSS | undefined) {
  useCreate((e) => {
    if (e.shadowRoot) {
      e.shadowRoot.adoptedStyleSheets.push(createStylesheet(object))
    }
  })

  useConnect((e) => {
    if (!e.shadowRoot) {
      const styleElement = style(object).node

      const styleTags = [...document.head.querySelectorAll('style')]

      if (!styleTags.find((s) => s.outerHTML === styleElement.outerHTML)) {
        document.head.appendChild(styleElement)

        return () => {
          styleElement.remove()
        }
      }
    }
  })
}
