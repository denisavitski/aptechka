import { ElementConstructorJSS } from './ElementConstructor'
import { style } from './tags'

export function createStylesheet<T extends ElementConstructorJSS>(object?: T) {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(style(object).node.innerHTML)
  return sheet
}
