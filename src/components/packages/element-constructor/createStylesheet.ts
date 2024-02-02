import { ElementConstructorJSS } from './ElementConstructor'
import { style } from './htmlTags'

export function createStylesheet<T extends ElementConstructorJSS>(object?: T) {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(style(object).rootElements[0].innerHTML)
  return sheet
}
