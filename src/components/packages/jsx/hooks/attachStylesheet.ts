import {
  ElementConstructorJSS,
  createStylesheet,
  style,
} from '@packages/element-constructor'
import { withCurrentComponent } from './withCurrentComponent'
import { onConnect } from './onConnect'

export function attachStylesheet(object?: ElementConstructorJSS | undefined) {
  withCurrentComponent((e) => {
    if (e.shadowRoot) {
      e.shadowRoot.adoptedStyleSheets.push(createStylesheet(object))
    }
  })

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
          currentStylesheet.insertRule(newRule.cssText)
        })
      })
    }
  })
}
