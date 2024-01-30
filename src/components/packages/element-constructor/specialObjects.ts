import { ElementConstructorJSS } from './ElementConstructor'
import { style } from './htmlTags'

export function stylesheet(object?: ElementConstructorJSS) {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(style(object).rootElements[0].innerHTML)
  return sheet
}
