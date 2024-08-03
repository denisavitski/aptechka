import { CSSProperty } from '@packages/client/css-property'
import { activeStores } from '@packages/client/store'
import { ticker } from '@packages/client/ticker'

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
