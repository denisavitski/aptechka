import {
  ElementConstructorJSS,
  createStylesheet,
  style,
} from '@packages/client/element-constructor'
import { onConnect } from './onConnect'
import { currentComponentElement } from '@packages/client/jsx/globals'

export function attachStylesheet(object?: ElementConstructorJSS | undefined) {
  if (currentComponentElement.value.shadowRoot) {
    currentComponentElement.value.shadowRoot.adoptedStyleSheets.push(
      createStylesheet(object)
    )
  }

  onConnect((e) => {
    if (e.shadowRoot) {
      return
    }

    const rootNode = e.getRootNode()

    if (rootNode === document) {
      const styleElement = style(object).node
      const styleTags = [...document.head.querySelectorAll('style')]

      if (!styleTags.find((s) => s.outerHTML === styleElement.outerHTML)) {
        document.head.appendChild(styleElement)

        return () => {
          styleElement.remove()
        }
      }
    } else if (rootNode instanceof ShadowRoot) {
      const newStylesheet = createStylesheet(object)

      const destroyCallbacks: Array<Function> = []

      rootNode.adoptedStyleSheets.filter((currentStylesheet) => {
        const currentRules = Array.from(currentStylesheet.cssRules)

        const newRules = Array.from(newStylesheet.cssRules).filter(
          (newRule) => {
            return !currentRules.find(
              (currentRule) => currentRule.cssText === newRule.cssText
            )
          }
        )

        newRules.forEach((newRule) => {
          const index = currentStylesheet.insertRule(newRule.cssText)

          destroyCallbacks.push(() => {
            currentStylesheet.deleteRule(index)
          })
        })
      })

      return () => {
        destroyCallbacks.forEach((callback) => callback())
      }
    }
  })
}
