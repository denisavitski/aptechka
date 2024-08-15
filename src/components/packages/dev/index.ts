import { CSSProperty } from '@packages/css-property'
import { activeStores } from '@packages/store/vanilla'
import { ticker } from '@packages/ticker/vanilla'

export function devMode() {
  ticker.subscribe(() => {
    for (let index = 0; index < activeStores.current.length; index++) {
      const store = activeStores.current[index]

      if (store instanceof CSSProperty) {
        store.check()
      }
    }
  })
}
