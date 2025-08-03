import { activeComponent } from '@packages/jsx/ComponentElement'
import { camelToKebab } from '@packages/utils'
import type * as CSS from 'csstype'
import { useConnect } from './lifecycle'

export type UseStylesheetNestedObject = {
  [key: string]: CSS.Properties | UseStylesheetNestedObject
}

export type UseStylesheetSource =
  | CSS.Properties
  | {
      [key: string]: CSS.Properties | UseStylesheetNestedObject
    }

function createStylesheet(cssText: string) {
  const styleSheet = new CSSStyleSheet()
  styleSheet.replaceSync(cssText)
  return styleSheet
}

function generateCSS(source: UseStylesheetSource) {
  let cssText = ''

  const processObject = (obj: UseStylesheetSource, selector?: string): void => {
    if (selector) {
      cssText += `${selector} {`
    }

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) {
        processObject(value, key)
      } else {
        cssText += `${camelToKebab(key)}: ${value};`
      }
    }

    if (selector) {
      cssText += '}'
    }
  }

  processObject(source)
  return cssText
}

function addStylesToShadowRoot(
  shadowRoot: ShadowRoot,
  cssText: string,
): () => void {
  const newStylesheet = createStylesheet(cssText)
  const destroyCallbacks: Array<() => void> = []

  for (const currentStylesheet of shadowRoot.adoptedStyleSheets) {
    const newRules = Array.from(newStylesheet.cssRules).filter((newRule) => {
      return !Array.from(currentStylesheet.cssRules).some(
        (currentRule) => currentRule.cssText === newRule.cssText,
      )
    })

    newRules.forEach((newRule) => {
      const index = currentStylesheet.insertRule(newRule.cssText)
      destroyCallbacks.push(() => currentStylesheet.deleteRule(index))
    })
  }

  return () => destroyCallbacks.forEach((callback) => callback())
}

function addStylesToDocument(cssText: string): () => void {
  const styleElement = document.createElement('style')
  styleElement.textContent = cssText
  document.head.appendChild(styleElement)
  return () => styleElement.remove()
}

export function useStylesheet(source: UseStylesheetSource): void {
  const cssText = generateCSS(source)

  if (activeComponent.current.shadowRoot) {
    activeComponent.current.shadowRoot.adoptedStyleSheets = [
      ...activeComponent.current.shadowRoot.adoptedStyleSheets,
      createStylesheet(cssText),
    ]
    return
  }

  useConnect((element) => {
    const rootNode = element.getRootNode()

    if (rootNode === document) {
      const existingStyle = Array.from(
        document.head.querySelectorAll('style'),
      ).find((style) => style.textContent === cssText)

      if (!existingStyle) {
        return addStylesToDocument(cssText)
      }
    } else if (rootNode instanceof ShadowRoot) {
      return addStylesToShadowRoot(rootNode, cssText)
    }

    return undefined
  })
}
