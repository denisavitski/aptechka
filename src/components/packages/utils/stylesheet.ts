import 'construct-style-sheets-polyfill'
import { isBrowser } from './browser'
import { Style, styleToString } from './jss'

export function createStylesheet(value: Style | string) {
  if (isBrowser) {
    const styleSheet = new CSSStyleSheet()

    styleSheet.replaceSync(
      typeof value === 'string' ? value : styleToString(value)
    )

    return styleSheet
  }

  return null!
}
